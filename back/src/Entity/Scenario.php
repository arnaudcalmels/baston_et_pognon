<?php

namespace App\Entity;

use App\Repository\ScenarioRepository;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ScenarioRepository::class)
 */
class Scenario
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le nom est obligatoire")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Positive(message="Le nombre de joueur doit être un entier positif")
     */
    private $maxPlayers;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Positive(message="Le niveau des personnages doit être un entier positif")
     */
    private $characterLevel = 1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $picture;

    /**
     * @ORM\OneToMany(targetEntity=Place::class, mappedBy="scenario")
     */
    private $places;

    /**
     * @ORM\OneToMany(targetEntity=WanderingMonsterGroup::class, mappedBy="scenario", orphanRemoval=true)
     */
    private $wanderingMonsters;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="scenarios")
     */
    private $owner;

    public function __construct()
    {
        $this->places = new ArrayCollection();
        $this->wanderingMonsters = new ArrayCollection();
    }

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getMaxPlayers(): ?int
    {
        return $this->maxPlayers;
    }

    public function setMaxPlayers(?int $maxPlayers): self
    {
        $this->maxPlayers = $maxPlayers;

        return $this;
    }

    public function getCharacterLevel(): ?int
    {
        return $this->characterLevel;
    }

    public function setCharacterLevel(int $characterLevel): self
    {
        $this->characterLevel = $characterLevel;

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

    /**
     * @return Collection|Place[]
     */
    public function getPlaces(): Collection
    {
        return $this->places;
    }

    public function addPlace(Place $place): self
    {
        if (!$this->places->contains($place)) {
            $this->places[] = $place;
        }

        return $this;
    }

    public function removePlace(Place $place): self
    {
        $this->places->removeElement($place);

        return $this;
    }

    /**
     * @return Collection|WanderingMonsterGroup[]
     */
    public function getWanderingMonsters(): Collection
    {
        return $this->wanderingMonsters;
    }

    public function addWanderingMonster(WanderingMonsterGroup $wanderingMonster): self
    {
        if (!$this->wanderingMonsters->contains($wanderingMonster)) {
            $this->wanderingMonsters[] = $wanderingMonster;
            $wanderingMonster->setScenario($this);
        }

        return $this;
    }

    public function removeWanderingMonster(WanderingMonsterGroup $wanderingMonster): self
    {
        if ($this->wanderingMonsters->removeElement($wanderingMonster)) {
            // set the owning side to null (unless already changed)
            if ($wanderingMonster->getScenario() === $this) {
                $wanderingMonster->setScenario(null);
            }
        }

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
