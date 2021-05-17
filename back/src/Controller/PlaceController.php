<?php

namespace App\Controller;

use App\Entity\CategoryPlaces;
use App\Entity\Place;
use App\Entity\Scenario;
use App\Validator\PlaceValidator;
use App\Repository\ScenarioRepository;
use App\Repository\CategoryPlacesRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
        $placeValidator = new PlaceValidator($validator);

        $errorsDatas = $placeValidator->validateRequestDatas($request->getContent(), true);

        if (count($errorsDatas) > 0) {
            $data = $errorsDatas;
            $statusCode = 403;
        } else {           
            $place = new Place();

            $requestContent = json_decode($request->getContent());
            $this->setPlaceProperties($place, $requestContent);

            $errorsObject = $placeValidator->validateObject($place);

            if (count($errorsObject) > 0) {
                $data = $errorsObject;
                $statusCode = 403;
            } else {
                $em = $this->getDoctrine()->getManager();

                $em->persist($place);
                $em->flush();

                $data = $this->normalizePlace($place);
                $statusCode = 201;
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
            $placeValidator = new PlaceValidator($validator);

            $errorsDatas = $placeValidator->validateRequestDatas($request->getContent());

            if (count($errorsDatas) > 0) {
                $data = $errorsDatas;
                $statusCode = 403;
            } else {   
                $requestContent = json_decode($request->getContent());
                $this->setPlaceProperties($place, $requestContent);
    
                $errorsObject = $placeValidator->validateObject($place);
    
                if (count($errorsObject) > 0) {
                    $data = $errorsObject;
                    $statusCode = 403;
                } else {
                    $em = $this->getDoctrine()->getManager();
                    $em->flush();
    
                    $data = $this->normalizePlace($place);
                    $statusCode = 200;
                }
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

    private function setPlaceProperties(Place &$place, \stdClass $datasObject)
    {
        $em = $this->getDoctrine()->getManager();
        
        if (!$place->getScenario()) {
            $scenarioRepo = $em->getRepository(Scenario::class);
            $scenario = $scenarioRepo->find($datasObject->scenarioId);
            $place->setScenario($scenario);
        }
        $categoryPlacesRepo = $em->getRepository(CategoryPlaces::class);
        $category = $categoryPlacesRepo->find($datasObject->categoryId);
        $place->setCategory($category);

        $place->setName($datasObject->name);
        $place->setDescription($datasObject->description);
        $place->setHiddenBoosterCount($datasObject->hiddenBoosterCount);

        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        $place->setPicture($serializer->normalize(null));
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