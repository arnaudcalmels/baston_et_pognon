<?php

namespace App\Entity;

use App\Repository\PlaceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PlaceRepository::class)
 */
class Place
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="name.not_blank")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Assert\PositiveOrZero(message="hiddenBoostCount.positive_or_zero")
     * @Assert\NotBlank(message="hiddenBoostCount.not_blank")
     */
    private $hiddenBoosterCount;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $picture;

    /**
     * @ORM\ManyToOne(targetEntity=CategoryPlaces::class, inversedBy="places")
     * @ORM\JoinColumn(nullable=false)
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Scenario::class, inversedBy="places")
     */
    private $scenario;

    /**
     * @ORM\OneToMany(targetEntity=Monster::class, mappedBy="place")
     */
    private $monsters;

    public function __construct()
    {
        $this->monsters = new ArrayCollection();
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

    public function getHiddenBoosterCount(): ?int
    {
        return $this->hiddenBoosterCount;
    }

    public function setHiddenBoosterCount(int $hiddenBoosterCount): self
    {
        $this->hiddenBoosterCount = $hiddenBoosterCount;

        return $this;
    }

    public function getPicture(): ?array
    {
        return $this->picture;
    }

    public function setPicture(?array $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getCategory(): ?CategoryPlaces
    {
        return $this->category;
    }

    public function setCategory(?CategoryPlaces $category): self
    {
        $this->category = $category;

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
            $monster->setPlace($this);
        }

        return $this;
    }

    public function removeMonster(Monster $monster): self
    {
        if ($this->monsters->removeElement($monster)) {
            // set the owning side to null (unless already changed)
            if ($monster->getPlace() === $this) {
                $monster->setPlace(null);
            }
        }

        return $this;
    }
}
