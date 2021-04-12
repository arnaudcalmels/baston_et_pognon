<?php

namespace App\Entity;

use App\Repository\MonsterRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MonsterRepository::class)
 */
class Monster
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $name;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isBoss = false;

    /**
     * @ORM\Column(type="boolean")
     */
    private $hasBooster = false;

    /**
     * @ORM\Column(type="integer")
     */
    private $level = 1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $picture;

    /**
     * @ORM\ManyToOne(targetEntity=WanderingMonsterGroup::class, inversedBy="monsters")
     */
    private $wanderingMonsterGroup;

    /**
     * @ORM\OneToOne(targetEntity=Caracteristics::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $caracteristics;

    /**
     * @ORM\ManyToOne(targetEntity=SpecialObject::class, inversedBy="monsters")
     */
    private $specialObject;

    /**
     * @ORM\ManyToOne(targetEntity=Place::class, inversedBy="monsters")
     */
    private $place;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIsBoss(): ?bool
    {
        return $this->isBoss;
    }

    public function setIsBoss(bool $isBoss): self
    {
        $this->isBoss = $isBoss;

        return $this;
    }

    public function getHasBooster(): ?bool
    {
        return $this->hasBooster;
    }

    public function setHasBooster(bool $hasBooster): self
    {
        $this->hasBooster = $hasBooster;

        return $this;
    }

    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(int $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getWanderingMonsterGroup(): ?WanderingMonsterGroup
    {
        return $this->wanderingMonsterGroup;
    }

    public function setWanderingMonsterGroup(?WanderingMonsterGroup $wanderingMonsterGroup): self
    {
        $this->wanderingMonsterGroup = $wanderingMonsterGroup;

        return $this;
    }

    public function getCaracteristics(): ?Caracteristics
    {
        return $this->caracteristics;
    }

    public function setCaracteristics(Caracteristics $caracteristics): self
    {
        $this->caracteristics = $caracteristics;

        return $this;
    }

    public function getSpecialObject(): ?SpecialObject
    {
        return $this->specialObject;
    }

    public function setSpecialObject(?SpecialObject $specialObject): self
    {
        $this->specialObject = $specialObject;

        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function setPlace(?Place $place): self
    {
        $this->place = $place;

        return $this;
    }
}
