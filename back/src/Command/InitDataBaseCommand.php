<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InitDataBaseCommand extends Command
{
    protected static $defaultName = 'app:init-database';
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }

    protected function configure()
    {
        $this->setDescription('Ajout des données de base en BDD');

        $this->setHelp('Génère les données pour les catégories de lieux ainsi que pour les professions initiales en base de données');

        $this->addArgument('force', InputArgument::OPTIONAL, 'Forcer la suppression des données des tables avant insertion des données initiales - saisir "1"');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $force = $input->getArgument('force');

        $conn = $this->entityManager->getConnection();

        // Vérification de la présence de données en base
        $datasInDb = false;
        $sqls = [
            'checkCategories' => '
                SELECT COUNT(`id`)
                FROM `category_places`
            ',
            'checkProfessions' => '
                SELECT COUNT(`id`)
                FROM `profession`
            ',
            'checkActions' => '
                SELECT COUNT(`id`)
                FROM `action`
            ',
            'checkCaracteristics' => '
                SELECT COUNT(`id`)
                FROM `caracteristics`
            ',
            'checkRacess' => '
                SELECT COUNT(`id`)
                FROM `race`
            ',
        ];

        foreach ($sqls as $object => $currentQuery) {
            if ($datasInDb)  {
                continue;
            }

            $stmt = $conn->prepare($currentQuery);
            $stmt->execute();
            $result = $stmt->fetchOne();
            $result = intval($result, 10);

            if ($result > 0) {
                $datasInDb = true;
            }
        }

        if (!$datasInDb) {
            $this->insertInDatabase($conn, $output);
        } elseif ($force) {
            $this->deleteDatasFromTables($conn, $output);         
        } else {
            $output->writeln([
                'Des données sont présentes en base de données - Arrêt de la commande.',
                '============',
                'Utiliser l\'argument 1 pour forcer l\'exécution de la commande et supprimer les données déjà présentes en BDD.',
            ]);
        }

        return Command::SUCCESS;

        // or return this if some error happened during the execution
        // (it's equivalent to returning int(1))
        // return Command::FAILURE;
    }

    private function insertInDatabase($conn, OutputInterface $output)
    {
        $sqls = [
            'catégories de lieux' => '
                INSERT INTO category_places (`id`, `name`)
                VALUES (1, "Extérieur - Ville"),
                (2, "Extérieur - Forêt"),
                (3, "Extérieur - Campagne"),
                (4, "Bâtiment"),
                (5, "Caverne")
            ',
            'caractéristiques' => '
                INSERT INTO caracteristics (`id`, `armor`, `life_points`)
                VALUES (1, 50, 100),
                (2, 80, 80),
                (3, 70, 90),
                (4, 60, 90)
            ',
            'actions' => '
                INSERT INTO action (`id`, `caracteristics_id`, `damages`, `distance`, `frequency`, `heal`, `is_special`)
                VALUES (1, 1, 10, 0, 1, 0, 0),
                (2, 1, 15, 0, 3, 0, 1),
                (3, 2, 15, 1, 1, 0, 0),
                (4, 2, 2, 0, 1, 0, 0),
                (5, 2, 20, 1, 4, 0, 1),
                (6, 3, 10, 1, 1, 0, 0),
                (7, 3, 5, 0, 1, 0, 0),
                (8, 3, 15, 1, 2, 0, 1),
                (9, 4, 20, 1, 3, 1, 1),
                (10, 4, 5, 0, 1, 0, 0),
                (11, 4, 5, 1, 1, 1, 0)

            ',
            'professions' => '
                INSERT INTO profession (`id`, `name`, `caracteristics_id`)
                VALUES (1, "Guerrier", 1),
                (2, "Mage", 2),
                (3, "Archer", 3),
                (4, "Clerc", 4)
            ',
            'races' => '
            INSERT INTO race (`id`, `name`)
            VALUES (1, "Humain"),
            (2, "Elfe"),
            (3, "Nain")
            ',

        ];

        foreach ($sqls as $object => $currentQuery) {
            $output->writeln([
                'Création des ' . $object,
                '============',
            ]);

            $stmt = $conn->prepare($currentQuery);
            $stmt->execute();   
        }
    }

    private function deleteDatasFromTables($conn, OutputInterface $output)
    {
        $sqls = [
            'Categories' => 'DELETE FROM `category_places`',
            'Professions' => 'DELETE FROM `profession`',
            'Actions' => 'DELETE FROM `action`',
            'Caracteristics' => 'DELETE FROM `caracteristics`',
            'Races' => 'DELETE FROM `race`',
        ];

        foreach ($sqls as $object => $currentQuery) {
            $output->writeln([
                'Suppression des ' . $object . ' en base de données.',
                '============',
            ]);
            $stmt = $conn->prepare($currentQuery);
            $stmt->execute();
        }

        $this->insertInDatabase($conn, $output);
    }
}
