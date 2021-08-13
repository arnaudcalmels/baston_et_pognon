<?php

namespace App\Controller;

use App\Entity\CategoryPlaces;
use App\Repository\CategoryPlacesRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CategoryPlacesController extends AbstractController
{
    public function categories(Request $request, CategoryPlacesRepository $categoryPlacesRepository): JsonResponse
    {
        $categories = $categoryPlacesRepository->findAll();

        $data = $this->normalizeCategoryPlaces($categories);

        return new JsonResponse($data, 200);
    }

    /* 
     * Normalize CategoryPlaces Objects
     * 
    **/
    private function normalizeCategoryPlaces($categories)
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($categories, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                ]
            ]
        );
    }
}
