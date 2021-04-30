<?php

namespace App\Controller;

use App\Entity\Action;
use App\Entity\Monster;
use App\Entity\Caracteristics;
use App\Entity\Place;
use App\Entity\Scenario;
use App\Entity\WanderingMonsterGroup;
use Doctrine\ORM\EntityManager;
use App\Validator\MonsterValidator;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MonsterController extends AbstractController
{
    /**
     * Get a monster
     *
     * @param Monster $monster
     * @return JsonResponse
     */
    public function monster(Monster $monster = null, int $id): JsonResponse
    {
        if (!$monster) {
            $data = ['Le monstre d\'id ('.$id.') n\'existe pas'];
            $statusCode = 404;
        } else {
            $data = $this->normalizeMonster($monster);
            $statusCode = 200;
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
    * Create a monster in object context
    *
    * @param Request $request
    * @param string $slug
    * @param ValidatorInterface $validator
    * @return JsonResponse|void
    */
    public function new(Request $request, string $slug, ValidatorInterface $validator)
    {
        $monsterValidator = new MonsterValidator($validator);

        $errors = $monsterValidator->validateRequestDatas($request->getContent(), true, $slug);

        if (count($errors) > 0) {
            $data = $errors;
            $statusCode = 403;
        } else {
            $em = $this->getDoctrine()->getManager();

            $requestContent = json_decode($request->getContent());

            switch($slug) {
                case 'place':
                    $monster = $this->createMonsterForAPlace($requestContent, $em);
                    break;

                case 'scenario':
                    $monster = $this->createMonsterForAScenario($requestContent, $em);
                    break;

                case 'wanderGroup':
                    $monster = $this->createMonsterForAWanderingMonsterGroup($requestContent, $em);
                    break;
            }

            if (!$monster) {
                // Le current user n'est pas le owner
                $data = ['Vous n\'êtes pas autorisé à effectuer cette action'];
                $statusCode = 403;

            } else {
                $em->persist($monster);

                $errorsObject = $validator->validate($monster);

                if (count($errorsObject) > 0) {
                    $data = $errorsObject;
                    $statusCode = 403;
                } else {
                    $em->flush();

                    $place = $monster->getPlace();
                    if ($place) {
                        $scenarioId = $place->getScenario()->getId();
                    } else {
                        $scenarioId = $monster->getWanderingMonsterGroup()->getScenario()->getId();
                    }

                    return $this->redirectToRoute('api_scenario', ['id' => $scenarioId]);
                }
            }               
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
    * Create a monster object in Place context
    *
    * @param \StdClass $object
    * @param EntityManager $em
    * @return Monster|null
    */
    private function createMonsterForAPlace(\StdClass $object, EntityManager $em): ?Monster
    {
        $currentUser = $this->getUser();

        $place = $em->getRepository(Place::class)->find($object->placeId);

        if ($place->getScenario()->getOwner() !== $currentUser) {

            return null;
        } else {

            $monster = $this->monsterCreation($object, $em);

            $place->addMonster($monster);

            return $monster;
        }
    }

    /**
     * Create a monster object in Scenario context
     *
     * @param \StdClass $object
     * @param EntityManager $em
     * @return Monster|null
     */
    private function createMonsterForAScenario(\StdClass $object, EntityManager $em): ?Monster
    {
        $currentUser = $this->getUser();

        $scenario = $em->getRepository(Scenario::class)->find($object->scenarioId);

        if ($scenario->getOwner() !== $currentUser) {

            return null;
        } else {

            $wanderingGroup = new WanderingMonsterGroup();

            $monster = $this->monsterCreation($object, $em);
            
            $wanderingGroup->addMonster($monster);
            $scenario->addWanderingMonster($wanderingGroup);

            return $monster;
        }
    }

    /**
     * Create a monster object in WanderingMonsterGroup context
     *
     * @param \StdClass $object
     * @param EntityManager $em
     * @return Monster|null
     */
    private function createMonsterForAWanderingMonsterGroup(\StdClass $object, EntityManager $em): ?Monster
    {
        $currentUser = $this->getUser();

        $wanderingGroup = $em->getRepository(WanderingMonsterGroup::class)->find($object->wanderGroupId);

        if ($wanderingGroup->getScenario()->getOwner() !== $currentUser) {

            return null;
        } else {

            $monster = $this->monsterCreation($object, $em);

            $wanderingGroup->addMonster($monster);

            return $monster;
        }
    }

    /**
     * Create a monster
     *
     * @param \StdClass $object
     * @param EntityManager $em
     * @return Monster
     */
    private function monsterCreation(\StdClass$object, EntityManager $em): Monster
    {
        // Création de l'objet caracteristics
        $caracteristics = $object->caracteristics;

        $caracteristicsObject = new Caracteristics();

        $caracteristicsObject->setArmor($caracteristics->armor);
        $caracteristicsObject->setLifePoints($caracteristics->lifePoints);

        $em->persist($caracteristicsObject);

        // Création et ajout des actions à l'abjet caracteristics
        foreach ($caracteristics->actions as $action) {
            $actionObject = new Action();
            $actionObject->setDamages($action->damages);
            $actionObject->setDistance($action->distance);
            $actionObject->setFrequency($action->frequency);
            $actionObject->setHeal($action->heal);
            $actionObject->setIsSpecial($action->isSpecial);

            $em->persist($actionObject);

            $caracteristicsObject->addAction($actionObject);
        }

        // Création du monstre, assignation de ses caractéristiques
        $monster = new Monster();
        $monster->setName($object->name);
        $monster->setIsBoss($object->isBoss);
        $monster->setHasBooster($object->hasBooster);
        $monster->setLevel($object->level);
        $monster->setPicture($object->picture);
        $monster->setCaracteristics($caracteristicsObject);

        return $monster;
    }

    /**
     * Normalize monster object
     *
     * @param Monster|Monster[] $monster
     * @return array
     */
    private function normalizeMonster($monster): array
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($monster, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                'isBoss',
                'hasBooster',
                'level',
                'picture',
                'caracteristics' => [
                    'id',
                    'armor',
                    'lifePoints',
                    'actions' => [
                        'id',
                        'damages',
                        'distance',
                        'frequency',
                        'heal',
                        'isSpecial',
                    ],

                ],
            ]
        ]);
    }
}