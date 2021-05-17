<?php

namespace App\Repository;

use App\Entity\Game;
use Doctrine\ORM\Query;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    public function countGamesPerCharacter($character)
    {
        return $this->createQueryBuilder('g')
            ->select('COUNT(g.id)')
            ->where(':character MEMBER OF g.characters')
            ->setParameter('character', $character)
            ->getQuery()
            ->getResult(Query::HYDRATE_SINGLE_SCALAR)
        ;
    }
}
