<?php

namespace App\Controller;

use App\Entity\Scenario;
use App\Repository\ScenarioRepository;
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
        $currentUser = $this->getUser();

        $scenario = new Scenario();
        $scenario->setOwner($currentUser);

        $requestContent = json_decode($request->getContent());

        if (isset($requestContent->name)) {
            $scenario->setName($requestContent->name);
        }
        if (isset($requestContent->description)) {
            $scenario->setDescription($requestContent->description);
        }
        if (isset($requestContent->maxPlayers)) {
            $scenario->setMaxPlayers($requestContent->maxPlayers);
        }
        if (isset($requestContent->characterLvl)) {
            $scenario->setCharacterLevel($requestContent->characterLvl);
        }
        if (isset($requestContent->picture)) {
            $scenario->setPicture($requestContent->picture);
        }

        $errors = $validator->validate($scenario);

        if (count($errors) > 0 ) {
                foreach ($errors as $error) {
                    /** @var ConstraintViolation $error */
                    $data[] = $error->getMessage();
                }
            $statusCode = 403;
        } else {
            $em = $this->getDoctrine()->getManager();
            $em->persist($scenario);
            $em->flush();
    
            $data = $this->normalizeScenario($scenario);
            $statusCode = 201;  
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
    public function edit(Request $request, Scenario $scenario, ValidatorInterface $validator): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($currentUser !== $scenario->getOwner()) {
            $data = ['Vous n\'êtes pas autorisé à modifier ce scénario'];
            $statusCode = 403;
        } else {
            $requestContent = json_decode($request->getContent());

            if (isset($requestContent->name)) {
                $scenario->setName($requestContent->name);
            }
            if (isset($requestContent->description)) {
                $scenario->setDescription($requestContent->description);
            }
            if (isset($requestContent->maxPlayers)) {
                $scenario->setMaxPlayers($requestContent->maxPlayers);
            }
            if (isset($requestContent->characterLvl)) {
                $scenario->setCharacterLevel($requestContent->characterLvl);
            }
            if (isset($requestContent->picture)) {
                $scenario->setPicture($requestContent->picture);
            }
    
            $errors = $validator->validate($scenario);
    
            if (count($errors) > 0 ) {
                    foreach ($errors as $error) {
                        /** @var ConstraintViolation $error */
                        $data[] = $error->getMessage();
                    }
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
    public function delete(Request $request, Scenario $scenario): JsonResponse
    {
        $currentUser = $this->getUser();
        $owner = $scenario->getOwner();

        if ($owner !== $currentUser) {
            $message = 'Vous n\'êtes pas autorisé à supprimer ce scénario';
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
                    'picture',
                    'monsters' => [
                        'id',
                        'name',
                    ],
                ],
                'wanderingMonsters' => [
                    'id',
                    'monsters' => [
                        'id',
                        'name',
                    ]
                ]
            ]
        ]);
    }
}