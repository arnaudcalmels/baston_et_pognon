<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210420120601 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE characters_game (characters_id INT NOT NULL, game_id INT NOT NULL, INDEX IDX_F0A363B8C70F0E28 (characters_id), INDEX IDX_F0A363B8E48FD905 (game_id), PRIMARY KEY(characters_id, game_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE characters_game ADD CONSTRAINT FK_F0A363B8C70F0E28 FOREIGN KEY (characters_id) REFERENCES characters (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE characters_game ADD CONSTRAINT FK_F0A363B8E48FD905 FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE characters_game');
    }
}
