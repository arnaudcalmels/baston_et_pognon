<?php

namespace App\Controller;

use App\Repository\GameRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GameController extends AbstractController
{
    public function indexPlayables(GameRepository $gameRepository): JsonResponse
    {
        $playablesGames = $gameRepository->findPlayablesGames();

        $data = $this->normalizeGame($playablesGames);

        return new JsonResponse($data, 200);
    }

    /**
     * Normalize Game object
     *
     * @param Game|Game[] $game
     * @return array
     */
    private function normalizeGame($game): array
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($game, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'comment',
                'createdAt',
                'finishedAt',
                'characters' => [
                    'id',
                    'name',
                    'race'=> [
                        'id',
                        'name',
                    ],
                    'profession' => [
                        'id',
                        'name',
                    ]
                ],
                'scenario' => [
                    'id',
                    'name',
                    'description',
                ],
                'gameMaster' => [
                    'id',
                    'pseudo'
                ],
            ]
        ]);
    }
}