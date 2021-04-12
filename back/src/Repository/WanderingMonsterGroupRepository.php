<?php

namespace App\Repository;

use App\Entity\WanderingMonsterGroup;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WanderingMonsterGroup|null find($id, $lockMode = null, $lockVersion = null)
 * @method WanderingMonsterGroup|null findOneBy(array $criteria, array $orderBy = null)
 * @method WanderingMonsterGroup[]    findAll()
 * @method WanderingMonsterGroup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WanderingMonsterGroupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WanderingMonsterGroup::class);
    }

    // /**
    //  * @return WanderingMonsterGroup[] Returns an array of WanderingMonsterGroup objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WanderingMonsterGroup
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
