<?php

namespace App\Controller;

use DateTime;
use App\Entity\Game;
use App\Entity\Scenario;
use App\Helper\DateHelper;
use App\Validator\GameValidator;
use App\Repository\GameRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
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

    public function new(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $gameValidator = new GameValidator($validator);

        $errorsDatas = $gameValidator->validateRequestDatas($request->getContent());

        if (count($errorsDatas) > 0) {
            $data = $errorsDatas;
            $statusCode = 403;
        } else {
            $game = new Game();
    
            $requestContent = json_decode($request->getContent());

            $this->setGameProperties($game, $requestContent, true);

            $errorsObject = $gameValidator->validateObject($game);

            if (count($errorsObject) > 0) {
                $data = $errorsDatas;
                $statusCode = 403;
            } else {
                $game->setWaitingPlayers(true);
                $em = $this->getDoctrine()->getManager();
                $em->persist($game);
                $em->flush();

                $data = $this->normalizeGame($game);
                $statusCode = 201;
            }
        }

        return new JsonResponse($data, $statusCode);       
    }

    public function endSession(Game $game)
    {
        if ($this->getUser() !== $game->getGameMaster()) {

            return new JsonResponse('Vous n\'êtes pas le maître de jeu de cette partie.', 403);
        }

        $game->setWaitingPlayers(false);
        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return new JsonResponse('OK', 200);
    }

    private function setGameProperties(Game &$game, \stdClass $datasObject, $isNew = false)
    {
        $game->setComment($datasObject->comment);
        
        if ($isNew) {

            $scenario = $this->getDoctrine()->getRepository(Scenario::class)->find($datasObject->scenarioId);
            
            $game->setScenario($scenario);
            $game->setGameMaster($this->getUser());
            $game->setCreatedAt(DateHelper::now());
        }
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
                'waitingPlayers',
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