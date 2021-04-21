<?php

namespace App\Controller;

use App\Entity\Inventory;
use App\Entity\Characters;
use App\Repository\GameRepository;
use App\Repository\RaceRepository;
use App\Repository\CharactersRepository;
use App\Repository\ProfessionRepository;
use App\Validator\CharactersValidator;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CharactersController extends AbstractController
{
    /**
     * Get all characters of the current User
     *
     * @param Request $request
     * @param CharactersRepository $charactersRepository
     * @return JsonResponse
     */
    public function charactersByOwner(Request $request, CharactersRepository $charactersRepository): JsonResponse
    {
        $currentUser = $this->getUser();

        $characters = $charactersRepository->findBy([
            'owner' => $currentUser->getId(),
        ]);

        $data = $this->normalizeCharacters($characters);

        return new JsonResponse($data, 200);
    }

    /**
     * Create a new character for the current User
     *
     * @param Request $request
     * @param ProfessionRepository $professionRepo
     * @param RaceRepository $raceRepo
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function new(Request $request, ProfessionRepository $professionRepo, RaceRepository $raceRepo, ValidatorInterface $validator): JsonResponse
    {
        $currentUser = $this->getUser();

        $requestContent = json_decode($request->getContent());

        $character = new Characters();
        $character->setOwner($currentUser);

        if (isset($requestContent->professionId)) {
            $profession = $professionRepo->find($requestContent->professionId);
            if (!$profession) {
                $requestContent->professionId = null;
            }
            $character->setProfession($profession);
        }
        if (isset($requestContent->raceId)) {
            $race = $raceRepo->find($requestContent->raceId);
            if (!$race) {
                $requestContent->raceId = null;
            }
            $character->setRace($race);
        }
        if (isset($requestContent->name)) {
            $character->setName($requestContent->name);
        }
        if (isset($requestContent->sex)) {
            $character->setSex($requestContent->sex);
        }
        $character->setInventory(new Inventory);

        $characterValidator = new CharactersValidator($validator);
        $errors = $characterValidator->validate($requestContent, $character);

        if (count($errors) > 0 ) {
            $data = $errors;
            $statusCode = 403;
        } else {
            $em = $this->getDoctrine()->getManager();
            $em->persist($character);
            $em->flush();
    
            $data = $this->normalizeCharacters($character);
            $statusCode = 201;  
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Edit a character
     *
     * @param Request $request
     * @param Characters $character
     * @param ProfessionRepository $professionRepo
     * @param RaceRepository $raceRepo
     * @param GameRepository $gameRepo
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function edit(
        Request $request,
        Characters $character,
        ProfessionRepository $professionRepo,
        RaceRepository $raceRepo,
        GameRepository $gameRepo,
        ValidatorInterface $validator
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

            if (isset($requestContent->professionId)) {
                $profession = $professionRepo->find($requestContent->professionId);
                if (!$profession) {
                    $requestContent->professionId = null;
                }
                $character->setProfession($profession);
            }
            if (isset($requestContent->raceId)) {
                $race = $raceRepo->find($requestContent->raceId);
                if (!$race) {
                    $requestContent->raceId = null;
                }
                $character->setRace($race);
            }
            if (isset($requestContent->name)) {
                $character->setName($requestContent->name);
            }
            if (isset($requestContent->sex)) {
                $character->setSex($requestContent->sex);
            }

            $characterValidator = new CharactersValidator($validator);
            $errors = $characterValidator->validate($requestContent, $character);

            if (count($errors) > 0 ) {
                $data = $errors;
                $statusCode = 403;
            } else {
                $em = $this->getDoctrine()->getManager();
                $em->flush();
        
                $data = $this->normalizeCharacters($character);
                $statusCode = 200;  
            }
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Delete a character
     *
     * @param Request $request
     * @param Characters $character
     * @return JsonResponse
     */
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

    /**
     * Normalize Characters Objects
     *
     * @param Characters|Characters[] $characters
     * @return array
     */
    private function normalizeCharacters($characters): array
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
