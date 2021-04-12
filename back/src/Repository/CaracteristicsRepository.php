<?php

namespace App\Repository;

use App\Entity\Caracteristics;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Caracteristics|null find($id, $lockMode = null, $lockVersion = null)
 * @method Caracteristics|null findOneBy(array $criteria, array $orderBy = null)
 * @method Caracteristics[]    findAll()
 * @method Caracteristics[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CaracteristicsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Caracteristics::class);
    }

    // /**
    //  * @return Caracteristics[] Returns an array of Caracteristics objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Caracteristics
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
