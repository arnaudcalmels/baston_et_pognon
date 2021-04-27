<?php

namespace App\Controller;

use App\Entity\Action;
use App\Entity\Monster;
use App\Entity\Caracteristics;
use App\Repository\PlaceRepository;
use App\Validator\MonsterValidator;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MonsterController extends AbstractController
{
    public function newMonsterForAPlace(Request $request, PlaceRepository $placeRepo, ValidatorInterface $validator)
    {
        $currentUser = $this->getUser();

        $monsterValidator = new MonsterValidator($validator);
        /**
         * @var ConstraintViolationList $errors
         */
        $errors = $monsterValidator->validateRequestDatas($request->getContent());

        if (count($errors) > 0) {
            $data = $errors;
            $statusCode = 403;
        } else {
            $requestContent = json_decode($request->getContent());
            $em = $this->getDoctrine()->getManager();

            $place = $placeRepo->find($requestContent->placeId);
            if ($place->getScenario()->getOwner() !== $currentUser) {
                $data = ['Vous n\'êtes pas autorisé à modifier ce scénario'];
                $statusCode = 403;
            } else {
                $caracteristics = $requestContent->caracteristics;

                $caracteristicsObject = new Caracteristics();

                $caracteristicsObject->setArmor($caracteristics->armor);
                $caracteristicsObject->setLifePoints($caracteristics->lifePoints);

                $em->persist($caracteristicsObject);

                foreach ($caracteristics->actions as $action) {
                    $actionObject = new Action();
                    $actionObject->setDamages($action->damages);
                    $actionObject->setDistance($action->distance);
                    $actionObject->setFrequency($action->frequency);
                    $actionObject->setHeal($action->heal);
                    $actionObject->setIsSpecial($action->isSpecial);

                    $em->persist($actionObject);

                    $caracteristicsObject->addAction($actionObject);
                }


                
                $monster = new Monster();
                $monster->setName($requestContent->name);
                $monster->setIsBoss($requestContent->isBoss);
                $monster->setHasBooster($requestContent->hasBooster);
                $monster->setLevel($requestContent->level);
                $monster->setPicture($requestContent->picture);
                $monster->setCaracteristics($caracteristicsObject);
                $monster->setPlace($place);
                $em->persist($monster);

                $errorsObject = $validator->validate($monster);

                if (count($errorsObject) > 0) {
                    $data = $errorsObject;
                    $statusCode = 403;
                } else {
                    $em->flush();

                    $data = $this->normalizeMonster($monster);
                    $statusCode = 201;
                }
            }
        }

        return new JsonResponse($data, $statusCode);
    }

    public function normalizeMonster($monster): array
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($monster, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                'isBoss',
                'hasBooster',
                'level',
                'picture',
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
        ]);
    }
}