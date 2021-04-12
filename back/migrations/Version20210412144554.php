<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210412144554 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE action (id INT AUTO_INCREMENT NOT NULL, caracteristics_id INT NOT NULL, damages INT NOT NULL, distance TINYINT(1) NOT NULL, frequency INT NOT NULL, heal TINYINT(1) NOT NULL, is_special TINYINT(1) NOT NULL, INDEX IDX_47CC8C925D20926C (caracteristics_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE caracteristics (id INT AUTO_INCREMENT NOT NULL, armor INT NOT NULL, life_points INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category_places (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `character` (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, inventory_id INT NOT NULL, race_id INT NOT NULL, profession_id INT NOT NULL, name VARCHAR(100) NOT NULL, sex VARCHAR(1) NOT NULL, level INT NOT NULL, INDEX IDX_937AB0347E3C61F9 (owner_id), UNIQUE INDEX UNIQ_937AB0349EEA759 (inventory_id), INDEX IDX_937AB0346E59D40D (race_id), INDEX IDX_937AB034FDEF8996 (profession_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, game_master_id INT NOT NULL, scenario_id INT NOT NULL, created_at DATETIME NOT NULL, finished_at DATETIME DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, INDEX IDX_232B318CC1151A13 (game_master_id), UNIQUE INDEX UNIQ_232B318CE04E49DF (scenario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE inventory (id INT AUTO_INCREMENT NOT NULL, boosters_count INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE monster (id INT AUTO_INCREMENT NOT NULL, wandering_monster_group_id INT DEFAULT NULL, caracteristics_id INT NOT NULL, special_object_id INT DEFAULT NULL, place_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, is_boss TINYINT(1) NOT NULL, has_booster TINYINT(1) NOT NULL, level INT NOT NULL, picture VARCHAR(255) DEFAULT NULL, INDEX IDX_245EC6F446F0AD06 (wandering_monster_group_id), UNIQUE INDEX UNIQ_245EC6F45D20926C (caracteristics_id), INDEX IDX_245EC6F44DC6EDA7 (special_object_id), INDEX IDX_245EC6F4DA6A219 (place_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, scenario_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, hidden_booster_count INT NOT NULL, picture VARCHAR(255) DEFAULT NULL, INDEX IDX_741D53CD12469DE2 (category_id), INDEX IDX_741D53CDE04E49DF (scenario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profession (id INT AUTO_INCREMENT NOT NULL, caracteristics_id INT NOT NULL, name VARCHAR(40) NOT NULL, UNIQUE INDEX UNIQ_BA930D695D20926C (caracteristics_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE race (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(30) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE scenario (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, max_players INT DEFAULT NULL, character_level INT NOT NULL, picture VARCHAR(255) DEFAULT NULL, INDEX IDX_3E45C8D87E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE special_object (id INT AUTO_INCREMENT NOT NULL, inventory_id INT DEFAULT NULL, name VARCHAR(100) NOT NULL, picture VARCHAR(255) DEFAULT NULL, damage_bonus INT NOT NULL, life_point_bonus INT NOT NULL, armor_bonus INT NOT NULL, INDEX IDX_A9DAE4449EEA759 (inventory_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, pseudo VARCHAR(100) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE wandering_monster_group (id INT AUTO_INCREMENT NOT NULL, scenario_id INT NOT NULL, INDEX IDX_A874CE35E04E49DF (scenario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE action ADD CONSTRAINT FK_47CC8C925D20926C FOREIGN KEY (caracteristics_id) REFERENCES caracteristics (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB0347E3C61F9 FOREIGN KEY (owner_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB0349EEA759 FOREIGN KEY (inventory_id) REFERENCES inventory (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB0346E59D40D FOREIGN KEY (race_id) REFERENCES race (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB034FDEF8996 FOREIGN KEY (profession_id) REFERENCES profession (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CC1151A13 FOREIGN KEY (game_master_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CE04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id)');
        $this->addSql('ALTER TABLE monster ADD CONSTRAINT FK_245EC6F446F0AD06 FOREIGN KEY (wandering_monster_group_id) REFERENCES wandering_monster_group (id)');
        $this->addSql('ALTER TABLE monster ADD CONSTRAINT FK_245EC6F45D20926C FOREIGN KEY (caracteristics_id) REFERENCES caracteristics (id)');
        $this->addSql('ALTER TABLE monster ADD CONSTRAINT FK_245EC6F44DC6EDA7 FOREIGN KEY (special_object_id) REFERENCES special_object (id)');
        $this->addSql('ALTER TABLE monster ADD CONSTRAINT FK_245EC6F4DA6A219 FOREIGN KEY (place_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE place ADD CONSTRAINT FK_741D53CD12469DE2 FOREIGN KEY (category_id) REFERENCES category_places (id)');
        $this->addSql('ALTER TABLE place ADD CONSTRAINT FK_741D53CDE04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id)');
        $this->addSql('ALTER TABLE profession ADD CONSTRAINT FK_BA930D695D20926C FOREIGN KEY (caracteristics_id) REFERENCES caracteristics (id)');
        $this->addSql('ALTER TABLE scenario ADD CONSTRAINT FK_3E45C8D87E3C61F9 FOREIGN KEY (owner_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE special_object ADD CONSTRAINT FK_A9DAE4449EEA759 FOREIGN KEY (inventory_id) REFERENCES inventory (id)');
        $this->addSql('ALTER TABLE wandering_monster_group ADD CONSTRAINT FK_A874CE35E04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE action DROP FOREIGN KEY FK_47CC8C925D20926C');
        $this->addSql('ALTER TABLE monster DROP FOREIGN KEY FK_245EC6F45D20926C');
        $this->addSql('ALTER TABLE profession DROP FOREIGN KEY FK_BA930D695D20926C');
        $this->addSql('ALTER TABLE place DROP FOREIGN KEY FK_741D53CD12469DE2');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB0349EEA759');
        $this->addSql('ALTER TABLE special_object DROP FOREIGN KEY FK_A9DAE4449EEA759');
        $this->addSql('ALTER TABLE monster DROP FOREIGN KEY FK_245EC6F4DA6A219');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB034FDEF8996');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB0346E59D40D');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CE04E49DF');
        $this->addSql('ALTER TABLE place DROP FOREIGN KEY FK_741D53CDE04E49DF');
        $this->addSql('ALTER TABLE wandering_monster_group DROP FOREIGN KEY FK_A874CE35E04E49DF');
        $this->addSql('ALTER TABLE monster DROP FOREIGN KEY FK_245EC6F44DC6EDA7');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB0347E3C61F9');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CC1151A13');
        $this->addSql('ALTER TABLE scenario DROP FOREIGN KEY FK_3E45C8D87E3C61F9');
        $this->addSql('ALTER TABLE monster DROP FOREIGN KEY FK_245EC6F446F0AD06');
        $this->addSql('DROP TABLE action');
        $this->addSql('DROP TABLE caracteristics');
        $this->addSql('DROP TABLE category_places');
        $this->addSql('DROP TABLE `character`');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE inventory');
        $this->addSql('DROP TABLE monster');
        $this->addSql('DROP TABLE place');
        $this->addSql('DROP TABLE profession');
        $this->addSql('DROP TABLE race');
        $this->addSql('DROP TABLE scenario');
        $this->addSql('DROP TABLE special_object');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE wandering_monster_group');
    }
}
