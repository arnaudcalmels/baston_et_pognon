<?php

namespace App\Controller;

use App\Entity\Scenario;
use App\Repository\ScenarioRepository;
use App\Validator\ScenarioValidator;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ScenarioController extends AbstractController
{
    /**
     * Get a scenario
     *
     * @param Scenario $scenario
     * @return JsonResponse
     */
    public function scenario(Scenario $scenario): JsonResponse
    {   
        $data = $this->normalizeScenario($scenario);

        return new JsonResponse($data, 200);
    }

    /**
     * Get all Scenarios of current user
     *
     * @param Request $request
     * @param ScenarioRepository $scenarioRepo
     * @return JsonResponse
     */
    public function scenariosByOwner(Request $request, ScenarioRepository $scenarioRepo): JsonResponse
    {
        $currentUser = $this->getUser();

        $scenarios = $scenarioRepo->findBy([
            'owner' => $currentUser,
        ]);

        $data = $this->normalizeScenario($scenarios);

        return new JsonResponse($data, 200);
    }

    /**
     * Get all scenarios not belong to current user
     *
     * @param Request $request
     * @param ScenarioRepository $scenarioRepo
     * @return JsonResponse
     */
    public function scenariosOfOtherOwnerThanCurrentUser(Request $request, ScenarioRepository $scenarioRepo): JsonResponse
    {
        $currentUser = $this->getUser();

        $scenarios = $scenarioRepo->findScenariosNotBelongToSpecificOwner($currentUser);
        $data = $this->normalizeScenario($scenarios);

        return new JsonResponse($data, 200);
    }

    /**
     * Create a scenario for the current user
     *
     * @param Request $request
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function new(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $scenarioValidator = new ScenarioValidator($validator);

        $errorsDatas = $scenarioValidator->validateRequestDatas($request->getContent());

        if (count($errorsDatas) > 0) {
            $data = $errorsDatas;
            $statusCode = 403;
        } else {
            $scenario = new Scenario();
    
            $requestContent = json_decode($request->getContent());

            $this->setScenarioProperties($scenario, $requestContent);

            $errorsObject = $scenarioValidator->validateObject($scenario);

            if (count($errorsObject) > 0) {
                $data = $errorsDatas;
                $statusCode = 403;
            } else {
                $em = $this->getDoctrine()->getManager();
                $em->persist($scenario);
                $em->flush();

                $data = $this->normalizeScenario($scenario);
                $statusCode = 201;
            }
        }

        return new JsonResponse($data, $statusCode);       
    }

    /**
     * Edit a scenario
     *
     * @param Request $request
     * @param Scenario $scenario
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function edit(Request $request, Scenario $scenario = null, ValidatorInterface $validator): JsonResponse
    {
        $currentUser = $this->getUser();
        if (!$scenario) {
            $error = ['Ce scénario n\'existe pas'];
            $statusCode = 404;
        } elseif ($currentUser !== $scenario->getOwner()) {
            $error = ['Vous n\'êtes pas autorisé à modifier ce scénario'];
            $statusCode = 403;
        }
        if (isset($error)) {
            return new JsonResponse($error, $statusCode);
        }

        $scenarioValidator = new ScenarioValidator($validator);

        $errorsDatas = $scenarioValidator->validateRequestDatas($request->getContent());

        if (count($errorsDatas) > 0) {
            $data = $errorsDatas;
            $statusCode = 403;
        } else {
            $requestContent = json_decode($request->getContent());

            $this->setScenarioProperties($scenario, $requestContent);

            $errorsObject = $scenarioValidator->validateObject($scenario);

            if (count($errorsObject) > 0) {
                $data = $errorsDatas;
                $statusCode = 403;
            } else {
                $em = $this->getDoctrine()->getManager();
                $em->flush();

                $data = $this->normalizeScenario($scenario);
                $statusCode = 200;
            }
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Delete a scenario
     *
     * @param Request $request
     * @param Scenario $scenario
     * @return JsonResponse
     */
    public function delete(Request $request, Scenario $scenario = null): JsonResponse
    {
        $currentUser = $this->getUser();
        $owner = $scenario ? $scenario->getOwner() : null;

        if (!$scenario) {
            $message = ['Ce scénario n\'existe pas'];
            $statusCode = 404;
        } elseif ($owner !== $currentUser) {
            $message = ['Vous n\'êtes pas autorisé à supprimer ce scénario'];
            $statusCode = 403;
        } else {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($scenario);
            $entityManager->flush();  
            
            $message = 'Suppression OK';
            $statusCode = 200;
        }

        return new JsonResponse($message, $statusCode);
    }

    /**
     * Set properties of Scenario
     *
     * @param Scenario $scenario
     * @param \stdClass $datasObject
     * @return void
     */
    private function setScenarioProperties(Scenario &$scenario, \stdClass $datasObject)
    {
        $scenario->setName($datasObject->name);
        $scenario->setDescription($datasObject->description);
        $scenario->setMaxPlayers($datasObject->maxPlayers);
        $scenario->setCharacterLevel($datasObject->characterLevel);

        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);
        $picture = $serializer->normalize($datasObject->picture);
        $scenario->setPicture($picture);

        if (!$scenario->getOwner()) {
            $scenario->setOwner($this->getUser());
        }
    }

    /**
     * Normalize Scenario Objects
     *
     * @param Scenario|Scenario[] $scenario
     * @return array
     */
    private function normalizeScenario($scenario): array
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($scenario, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                'description',
                'maxPlayers',
                'characterLevel',
                'picture',
                'places' => [
                    'id',
                    'name',
                    'description',
                    'hiddenBoosterCount',
                    'picture',
                    'category' => [
                        'id',
                        'name',
                    ],
                    'monsters' => [
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
                    ],
                ],
                'wanderingMonsters' => [
                    'id',
                    'monsters' => [
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
                    ],
                ]
            ]
        ]);
    }
}