<?php

namespace App\Controller;

use App\Entity\Characters;
use App\Entity\Inventory;
use App\Repository\CharactersRepository;
use App\Repository\GameRepository;
use App\Repository\ProfessionRepository;
use App\Repository\RaceRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CharactersController extends AbstractController
{
    public function charactersByOwner(Request $request, CharactersRepository $charactersRepository): JsonResponse
    {
        $currentUser = $this->getUser();

        $characters = $charactersRepository->findBy([
            'owner' => $currentUser->getId(),
        ]);

        $data = $this->normalizeCharacters($characters);

        return new JsonResponse($data, 200);
    }

    public function new(Request $request, ProfessionRepository $professionRepo, RaceRepository $raceRepo): JsonResponse
    {
        $currentUser = $this->getUser();

        $requestContent = json_decode($request->getContent());

        $character = new Characters();
        $character->setOwner($currentUser);
        $character->setName($requestContent->name);
        $race = $raceRepo->find($requestContent->raceId);
        $character->setRace($race);
        $character->setSex($requestContent->sex);
        $profession = $professionRepo->find($requestContent->professionId);
        $character->setProfession($profession);
        $character->setInventory(new Inventory);

        $em = $this->getDoctrine()->getManager();
        $em->persist($character);
        $em->flush();

        $data = $this->normalizeCharacters($character);

        return new JsonResponse($data, 200);
    }

    public function edit(
        Request $request,
        Characters $character,
        ProfessionRepository $professionRepo,
        RaceRepository $raceRepo,
        GameRepository $gameRepo
        ): JsonResponse
    {
        $owner = $character->getOwner();
        $currentUser = $this->getUser();
        $gameCount = $gameRepo->countGamesByCharacter($character);

        if ($owner !== $currentUser) {
            $data = ['Vous n\'êtes pas autorisé à modifier ce personnage'];
            $statusCode = 403;
        } elseif ($gameCount > 0) {
            $data = ['Un personnage ayant déjà participé à une partie en ligne ne peut pas être modifié'];
            $statusCode = 403;
        } else {
            $requestContent = json_decode($request->getContent());

            $character->setName($requestContent->name);
            $race = $raceRepo->find($requestContent->raceId);
            $character->setRace($race);
            $character->setSex($requestContent->sex);
            $profession = $professionRepo->find($requestContent->professionId);
            $character->setProfession($profession);

            $em = $this->getDoctrine()->getManager();
            $em->flush();

            $data = $this->normalizeCharacters($character);
            $statusCode = 200;

        }

        return new JsonResponse($data, $statusCode);
    }

    public function delete(Request $request, Characters $character): JsonResponse
    {
        $currentUser = $this->getUser();
        $owner = $character->getOwner();

        if ($owner !== $currentUser) {
            $message = 'Vous n\'êtes pas autorisé à supprimer ce personnage';
            $statusCode = 403;
        } else {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($character);
            $entityManager->flush();  
            
            $message = 'Suppression OK';
            $statusCode = 200;
        }

        return new JsonResponse($message, $statusCode);
    }

    /* 
     * Normalize Characters Objects
     * 
    **/
    private function normalizeCharacters($characters)
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($characters, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                'sex',
                'level',
                'profession' => [
                    'id',
                    'name',
                ],
                'race' => [
                    'id',
                    'name',
                    ],
                'inventory' => [
                    'boostersCount',
                    'specialObjects' => [
                        'id',
                        'name',
                    ],
                ],
            ]
        ]);
    }
}
