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
     * @param integer $id
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
    public function new(Request $request, string $slug, MonsterValidator $monsterValidator)
    {
        $errors = $monsterValidator->validateRequestDatas($request->getContent(), true, $slug);

        if (count($errors) > 0) {
            $data = $errors;
            $statusCode = 403;
        } else {
            $em = $this->getDoctrine()->getManager();

            $requestContent = json_decode($request->getContent());

            $monster = new Monster();
            $em->persist($monster);
            $availableParentEntity = [
                'scenario' => Scenario::class,
                'place' => Place::class,
                'wanderGroup' => WanderingMonsterGroup::class,
            ];
            $repo = $this->getDoctrine()->getRepository($availableParentEntity[$slug]);
            switch($slug) {
                case 'place':
                    $place = $repo->find($requestContent->placeId);
                    $monster->setPlace($place);
                    break;

                case 'scenario':
                    $scenario = $repo->find($requestContent->scenarioId);
                    $wmg = new WanderingMonsterGroup();
                    $em->persist($wmg);
                    $scenario->addWanderingMonster($wmg);
                    $monster->setWanderingMonsterGroup($wmg);
                    break;

                case 'wanderGroup':
                    $wmg = $repo->find($requestContent->wanderGroupId);
                    $monster->setWanderingMonsterGroup($wmg);
                    break;
                }

            $this->setMonsterAndSubObjects($monster, $requestContent, $em);


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

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Edit a monster object
     *
     * @param Request $request
     * @param Monster $monster
     * @param integer $id
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function edit(Request $request, Monster $monster = null, int $id, MonsterValidator $monsterValidator)
    {
        if (!$monster) {

            return new JsonResponse(['Le monstre d\'id ('.$id.') n\'existe pas'], 404);
        } 

        $place = $monster->getPlace();

        $scenario = $place ? $place->getScenario() : $monster->getWanderingMonsterGroup()->getScenario();
        $owner = $scenario->getOwner();
        $currentUser = $this->getUser();

        if ($owner !== $currentUser) {

            return new JsonResponse(['Vous n\'êtes pas autorisé à modifier ce monstre'], 403);
        }

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

                $scenarioId = $scenario->getId();

                return $this->redirectToRoute('api_scenario', ['id' => $scenarioId]);
            }
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Delete a monster
     *
     * @param Request $request
     * @param Monster $monster
     * @param integer $id
     * @return JsonResponse
     */
    public function delete(Request $request, Monster $monster = null, int $id): JsonResponse
    {
        if (!$monster) {

            return new JsonResponse(['Le monstre d\'id ('.$id.') n\'existe pas'], 404);
        }

        $currentUser = $this->getUser();
        $place = $monster->getPlace();
        $scenario = $place ? $place->getScenario() : $monster->getWanderingMonsterGroup()->getScenario();
        $owner = $scenario->getOwner();

        if ($owner !== $currentUser) {
            $message = ['Vous n\'êtes pas autorisé à supprimer ce scénario'];
            $statusCode = 403;

            return new JsonResponse($message, $statusCode);
        } 
        
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($monster);
        $entityManager->flush();  
        
        $scenarioId = $scenario->getId();

        return $this->redirectToRoute('api_scenario', ['id' => $scenarioId]);
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
        $monster->setCaracteristics($caracteristicsObject);

        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        $picture = $serializer->normalize($datasObject->picture);
        $monster->setPicture($picture);
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