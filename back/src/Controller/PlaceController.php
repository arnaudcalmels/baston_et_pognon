<?php

namespace App\Controller;

use App\Entity\Place;
use App\Repository\CategoryPlacesRepository;
use App\Repository\PlaceRepository;
use App\Repository\ScenarioRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;

class PlaceController extends AbstractController
{
    /**
     * Get a place
     *
     * @param Place $place
     * @return JsonResponse
     */
    public function place(Place $place = null): JsonResponse
    {
        if (!$place) {
            $data = ['Ce lieu n\'existe pas'];
            $statusCode = 404;
        } else {
            $data = $this->normalizePlace($place);
            $statusCode = 200;
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Create a place for a scenario
     *
     * @param Request $request
     * @param ValidatorInterface $validator
     * @return JsonResponse|RedirectResponse
     */
    public function new(Request $request, ScenarioRepository $scenarioRepo, CategoryPlacesRepository $categoryPlacesRepo, ValidatorInterface $validator)
    {
        $currentUser = $this->getUser();

        $requestContent = json_decode($request->getContent());

        $scenarioNotFound = false;
        if (isset($requestContent->scenarioId)) {
            $scenario = $scenarioRepo->find($requestContent->scenarioId);
            if (!$scenario) {
                $scenarioNotFound = true;
            }
        } else {
            $scenarioNotFound = true;
        }

        if ($scenarioNotFound) {
            $data = ['Scénario non trouvé'];
            $statusCode = 404;
        } elseif ($scenario->getOwner() !== $currentUser) {
            $data = ['Vous n\'êtes pas autorisé à modifier ce scénario'];
            $statusCode = 403;
        } else {
            $place = new Place();
            $place->setScenario($scenario);

            $errors = [];

            if (isset($requestContent->name)) {
                $place->setName($requestContent->name);
            }
            if (isset($requestContent->description)) {
                $place->setDescription($requestContent->description);
            }
            if (isset($requestContent->hiddenBoosterCount)) {
                $place->setHiddenBoosterCount($requestContent->hiddenBoosterCount);
            }
            if (isset($requestContent->picture)) {
                $normalizers = [new ObjectNormalizer()];
                $serializer = new Serializer($normalizers);

                $place->setPicture($serializer->normalize($requestContent->picture));
            }
            if (isset($requestContent->categoryId)) {
                $categoryPlaces = $categoryPlacesRepo->find($requestContent->categoryId);
                if ($categoryPlaces) {
                    $place->setCategory($categoryPlaces);
                } else {
                    $errors[] = "La catégorie ($requestContent->categoryId) n'existe pas";
                }
            } else {
                $errors[] = 'La catégorie est obligatoire';
            }

            $errorsValidation = $validator->validate($place);
            if (count($errorsValidation) > 0 ) {
                    foreach ($errorsValidation as $error) {
                        /** @var ConstraintViolation $error */
                        $errors[] = $error->getMessage();
                    }
            }

            if (count($errors) > 0) {
                $data = $errors;
                $statusCode = 403;
            } else {
                $em = $this->getDoctrine()->getManager();
                $em->persist($place);
                $em->flush();
        
                return $this->redirectToRoute('api_scenario', ['id' => $requestContent->scenarioId]);
            }
        } 

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Edit a place
     *
     * @param Request $request
     * @param Place $place
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function edit(Request $request, Place $place = null, CategoryPlacesRepository $categoryPlacesRepo, ValidatorInterface $validator): JsonResponse
    {
        $currentUser = $this->getUser();
        if (!$place) {
            $data = ['Ce lieu n\'existe pas'];
            $statusCode = 404;
        } elseif ($currentUser !== $place->getScenario()->getOwner()) {
            $data = ['Vous n\'êtes pas autorisé à modifier ce lieu'];
            $statusCode = 403;
        } else {
            $requestContent = json_decode($request->getContent());

            if (isset($requestContent->name)) {
                $place->setName($requestContent->name);
            }
            if (isset($requestContent->description)) {
                $place->setDescription($requestContent->description);
            }
            if (isset($requestContent->hiddenBoosterCount)) {
                $place->setHiddenBoosterCount($requestContent->hiddenBoosterCount);
            }
            if (isset($requestContent->picture)) {
                $place->setPicture($requestContent->picture);
            }
            if (isset($requestContent->categoryId)) {
                $categoryPlaces = $categoryPlacesRepo->find($requestContent->categoryId);
                if ($categoryPlaces) {
                    $place->setCategory($categoryPlaces);
                } else {
                    $errors[] = 'La catégorie est obligatoire';
                }
            } else {
                $errors[] = 'La catégorie est obligatoire';
            }

            $errorsValidation = $validator->validate($place);
            if (count($errorsValidation) > 0 ) {
                    foreach ($errorsValidation as $error) {
                        /** @var ConstraintViolation $error */
                        $errors[] = $error->getMessage();
                    }
            }

            if (count($errors) > 0) {
                $data = $errors;
                $statusCode = 403;
             } else {
                $em = $this->getDoctrine()->getManager();
                $em->flush();
        
                $data = $this->normalizePlace($place);
                $statusCode = 200;  
            }
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Delete a place
     *
     * @param Place $place
     * @return JsonResponse
     */
    public function delete(Place $place = null): JsonResponse
    {
        $currentUser = $this->getUser();
        if (!$place) {
            $data = ['Ce lieu n\'existe pas'];
            $statusCode = 404;
        } elseif ($currentUser !== $place->getScenario()->getOwner()) {
            $data = ['Vous n\'êtes pas autorisé à modifier ce lieu'];
            $statusCode = 403;
        } else {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($place);
            $entityManager->flush();  
            
            $message = 'Suppression OK';
            $statusCode = 200;
        }

        return new JsonResponse($message, $statusCode);
    }

    /**
     * Normalize Place Objects
     *
     * @param Place|Place[] $place
     * @return array
     */
    private function normalizePlace($place): array
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($place, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                'description',
                'hiddentBoosterCount',
                'picture',
                'monsters' => [
                    'id',
                    'name',
                ],
                'category' => [
                    'id',
                    'name',
                ],
            ]
        ]);
    }
}