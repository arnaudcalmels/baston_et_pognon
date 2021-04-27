<?php

namespace App\Controller;

use App\Entity\Race;
use App\Repository\RaceRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RaceController extends AbstractController
{
    public function races(Request $request, RaceRepository $raceRepository): JsonResponse
    {
        $races = $raceRepository->findAll();

        $data = $this->normalizeRace($races);

        return new JsonResponse($data, 200);
    }

    /* 
     * Normalize Race Objects
     * 
    **/
    private function normalizeRace($races)
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($races, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                ]
            ]
        );
    }
}
