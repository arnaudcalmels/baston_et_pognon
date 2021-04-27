<?php

namespace App\Controller;

use App\Entity\Profession;
use App\Repository\ProfessionRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProfessionController extends AbstractController
{
    public function professions(Request $request, ProfessionRepository $professionRepository): JsonResponse
    {
        $profession = $professionRepository->findAll();

        $data = $this->normalizeProfession($profession);

        return new JsonResponse($data, 200);
    }

    /* 
     * Normalize Profession Objects
     * 
    **/
    private function normalizeProfession($profession)
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($profession, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
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
            ]
        );
    }
}
