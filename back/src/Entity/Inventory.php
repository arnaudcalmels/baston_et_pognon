<?php

namespace App\Entity;

use App\Repository\InventoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=InventoryRepository::class)
 */
class Inventory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $boostersCount = 0;

    /**
     * @ORM\OneToMany(targetEntity=SpecialObject::class, mappedBy="inventory")
     */
    private $specialObjects;

    public function __construct()
    {
        $this->specialObjects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBoostersCount(): ?int
    {
        return $this->boostersCount;
    }

    public function setBoostersCount(int $boostersCount): self
    {
        $this->boostersCount = $boostersCount;

        return $this;
    }

    /**
     * @return Collection|SpecialObject[]
     */
    public function getSpecialObjects(): Collection
    {
        return $this->specialObjects;
    }

    public function addSpecialObject(SpecialObject $specialObject): self
    {
        if (!$this->specialObjects->contains($specialObject)) {
            $this->specialObjects[] = $specialObject;
            $specialObject->setInventory($this);
        }

        return $this;
    }

    public function removeSpecialObject(SpecialObject $specialObject): self
    {
        if ($this->specialObjects->removeElement($specialObject)) {
            // set the owning side to null (unless already changed)
            if ($specialObject->getInventory() === $this) {
                $specialObject->setInventory(null);
            }
        }

        return $this;
    }
}
