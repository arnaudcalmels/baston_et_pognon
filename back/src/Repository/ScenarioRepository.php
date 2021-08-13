<?php

namespace App\Repository;

use App\Entity\Scenario;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Scenario|null find($id, $lockMode = null, $lockVersion = null)
 * @method Scenario|null findOneBy(array $criteria, array $orderBy = null)
 * @method Scenario[]    findAll()
 * @method Scenario[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScenarioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Scenario::class);
    }

    /**
     * @return Scenario[] Returns an array of Scenario objects
     */
    public function findScenariosNotBelongToSpecificOwner($owner)
    {
        return $this->createQueryBuilder('s')
            ->where('s.owner != :owner')
            ->setParameter('owner', $owner)
            ->orderBy('s.id', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }
}
