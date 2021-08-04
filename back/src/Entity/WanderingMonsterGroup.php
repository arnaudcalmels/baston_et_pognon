<?php

namespace App\Entity;

use App\Repository\WanderingMonsterGroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=WanderingMonsterGroupRepository::class)
 */
class WanderingMonsterGroup
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=Monster::class, mappedBy="wanderingMonsterGroup", orphanRemoval=true, cascade={"remove"})
     */
    private $monsters;

    /**
     * @ORM\ManyToOne(targetEntity=Scenario::class, inversedBy="wanderingMonsters")
     * @ORM\JoinColumn(nullable=false)
     */
    private $scenario;

    public function __construct()
    {
        $this->monsters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Monster[]
     */
    public function getMonsters(): Collection
    {
        return $this->monsters;
    }

    public function addMonster(Monster $monster): self
    {
        if (!$this->monsters->contains($monster)) {
            $this->monsters[] = $monster;
            $monster->setWanderingMonsterGroup($this);
        }

        return $this;
    }

    public function removeMonster(Monster $monster): self
    {
        if ($this->monsters->removeElement($monster)) {
            // set the owning side to null (unless already changed)
            if ($monster->getWanderingMonsterGroup() === $this) {
                $monster->setWanderingMonsterGroup(null);
            }
        }

        return $this;
    }

    public function getScenario(): ?Scenario
    {
        return $this->scenario;
    }

    public function setScenario(?Scenario $scenario): self
    {
        $this->scenario = $scenario;

        return $this;
    }
}
