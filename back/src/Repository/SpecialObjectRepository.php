<?php

namespace App\Repository;

use App\Entity\SpecialObject;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SpecialObject|null find($id, $lockMode = null, $lockVersion = null)
 * @method SpecialObject|null findOneBy(array $criteria, array $orderBy = null)
 * @method SpecialObject[]    findAll()
 * @method SpecialObject[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpecialObjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SpecialObject::class);
    }

    // /**
    //  * @return SpecialObject[] Returns an array of SpecialObject objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SpecialObject
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
