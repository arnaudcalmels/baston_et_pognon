<?php

namespace App\Controller;

use App\Entity\Inventory;
use App\Entity\Characters;
use App\Entity\Profession;
use App\Entity\Race;
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
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function new(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $characterValidator = new CharactersValidator($validator);

        $errorsDatas = $characterValidator->validateRequestDatas($request->getContent());

        if (count($errorsDatas) > 0) {
            $data = $errorsDatas;
            $statusCode = 403;
        } else {
            $requestContent = json_decode($request->getContent());

            $character = new Characters();
            $this->setCharacterProperties($character, $requestContent);

            $errorsObject = $characterValidator->validateObject($character);

            if (count($errorsObject) > 0 ) {
                $data = $errorsObject;
                $statusCode = 403;
            } else {
                $em = $this->getDoctrine()->getManager();
                $em->persist($character);
                $em->flush();
        
                $data = $this->normalizeCharacters($character);
                $statusCode = 201;  
            }
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
        Characters $character = null,
        GameRepository $gameRepo,
        ValidatorInterface $validator
        ): JsonResponse
    {
        $owner = $character->getOwner();
        $currentUser = $this->getUser();
        $gameCount = $gameRepo->countGamesPerCharacter($character);

        if (!$character) {
            $error = ['Ce personnage n\'existe pas'];
            $statusCode = 404;
        } elseif ($owner !== $currentUser) {
            $error = ['Vous n\'êtes pas autorisé à modifier ce personnage'];
            $statusCode = 403;
        } elseif ($gameCount > 0) {
            $error = ['Un personnage ayant déjà participé à une partie en ligne ne peut pas être modifié'];
            $statusCode = 403;
        }
        if (isset($error)) {

            return new JsonResponse($error, $statusCode);
        }

        $characterValidator = new CharactersValidator($validator);

        $errorsDatas = $characterValidator->validateRequestDatas($request->getContent());

        if (count($errorsDatas) > 0) {
            $data = $errorsDatas;
            $statusCode = 403;
        } else {

            $requestContent = json_decode($request->getContent());

            $this->setCharacterProperties($character, $requestContent);

            $errorsObject = $characterValidator->validateObject($character);

            if (count($errorsObject) > 0 ) {
                $data = $errorsObject;
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

    public function setCharacterProperties(Characters &$character, \stdClass $datasObject): Characters
    {
        $em = $this->getDoctrine()->getManager();
        $race = $em->getRepository(Race::class)->find($datasObject->raceId);
        $profession = $em->getRepository(Profession::class)->find($datasObject->professionId);

        $character->setSex($datasObject->sex)
            ->setName($datasObject->name)
            ->setRace($race)
            ->setProfession($profession)
        ;

        if (!$character->getOwner()) {
            $character->setOwner($this->getUser());
        }


        if (!$character->getInventory()) {
            $inventory = new Inventory();
            $em->persist($inventory);
            $character->setInventory($inventory);
        }

        return $character;
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
