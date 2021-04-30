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

                $errorsObject = $monsterValidator->validateObject($monster);

                if (count($errorsObject) > 0) {
                    $data = $errorsObject;
                    $statusCode = 403;
                } else {
                    $em->flush();

                    $place = $monster->getPlace();
                    $scenarioId = $place ? $place->getScenario()->getId() : $monster->getWanderingMonsterGroup()->getScenario()->getId();

                    return $this->redirectToRoute('api_scenario', ['id' => $scenarioId]);
                }
            }               
        }

        return new JsonResponse($data, $statusCode);
    }

    public function edit(Request $request, Monster $monster = null, int $id, ValidatorInterface $validator): JsonResponse
    {
        if (!$monster) {

            return new JsonResponse(['Le monstre d\'id ('.$id.') n\'existe pas'], 404);
        } 

        $place = $monster->getPlace();

        $owner = $place ? $place->getScenario()->getOwner() : $monster->getWanderingMonsterGroup()->getScenario()->getOwner();
        $currentUser = $this->getUser();

        if ($owner !== $currentUser) {

            return new JsonResponse(['Vous n\'êtes pas autorisé à modifier ce monstre'], 404);
        }

        $monsterValidator = new MonsterValidator($validator);

        $errors = $monsterValidator->validateRequestDatas($request->getContent());

        if (count($errors) > 0) {
            $data = $errors;
            $statusCode = 403;
        } else {
            $em = $this->getDoctrine()->getManager();

            $requestContent = json_decode($request->getContent());

            $this->setMonsterAndSubObjects($monster, $requestContent, $em);

            $errorsObject = $monsterValidator->validateObject($monster);

            if (count($errorsObject) > 0) {
                $data = $errorsObject;
                $statusCode = 403;
            } else {
                $em->flush();         

                $data = $this->normalizeMonster($monster);
                $statusCode = 200;
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

            $monster = new Monster();

            $this->setMonsterAndSubObjects($monster, $object, $em);

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
            $em->persist($wanderingGroup);

            $monster = new Monster();

            $this->setMonsterAndSubObjects($monster, $object, $em);
            
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


            $monster = new Monster();

            $this->setMonsterAndSubObjects($monster, $object, $em);

            $wanderingGroup->addMonster($monster);

            return $monster;
        }
    }

    /**
     * Set Monster properties and its sub objects
     *
     * @param \StdClass $object
     * @param EntityManager $em
     * @return void
     */
    private function setMonsterAndSubObjects(Monster &$monster, \StdClass $datasObject, EntityManager $em)
    {
        // Création de l'objet caracteristics
        $caracteristicsDatas = $datasObject->caracteristics;

        $caracteristicsObject = $monster->getCaracteristics();

        if (!$caracteristicsObject) {
            $caracteristicsObject = new Caracteristics();
            $em->persist($caracteristicsObject);
            $monster->setCaracteristics($caracteristicsObject);
        }

        $caracteristicsObject->setArmor($caracteristicsDatas->armor);
        $caracteristicsObject->setLifePoints($caracteristicsDatas->lifePoints);

        $actionsData = $caracteristicsDatas->actions;
        $actionsCount = count($actionsData);
        $actionsObjectCollection = $caracteristicsObject->getActions();

        // Création éventuelle d'actions et assignations des propriétés
        for ($i = 0; $i < $actionsCount; $i++) {
            if ($actionsObjectCollection[$i]) {
                $actionObject = $actionsObjectCollection[$i];
            } else {
                $actionObject = new Action();
                $em->persist($actionObject);
                $caracteristicsObject->addAction($actionObject);
            }

            $actionObject->setDamages($actionsData[$i]->damages);
            $actionObject->setDistance($actionsData[$i]->distance);
            $actionObject->setFrequency($actionsData[$i]->frequency);
            $actionObject->setHeal($actionsData[$i]->heal);
            $actionObject->setIsSpecial($actionsData[$i]->isSpecial);

        }
        // On vérifie s'il y a moins d'actions, on les supprime le cas échéant
        $countactionsObjectCollection = count($actionsObjectCollection);
        if ($countactionsObjectCollection > $i) {
            for ($i; $i < $countactionsObjectCollection; $i++) {
                $actionToDelete = $actionsObjectCollection[$i];
                $em->remove($actionToDelete);
            }
        }

        // Assignation des propriétés du monstre
        $monster->setName($datasObject->name);
        $monster->setIsBoss($datasObject->isBoss);
        $monster->setHasBooster($datasObject->hasBooster);
        $monster->setLevel($datasObject->level);
        $monster->setPicture($datasObject->picture);
        $monster->setCaracteristics($caracteristicsObject);

        // return $monster;
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