<?php

namespace App\Entity;

use App\Repository\SpecialObjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SpecialObjectRepository::class)
 */
class SpecialObject
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $picture;

    /**
     * @ORM\Column(type="integer")
     */
    private $damageBonus = 0;

    /**
     * @ORM\Column(type="integer")
     */
    private $lifePointBonus = 0;

    /**
     * @ORM\Column(type="integer")
     */
    private $armorBonus = 0;

    /**
     * @ORM\ManyToOne(targetEntity=Inventory::class, inversedBy="specialObjects")
     */
    private $inventory;

    /**
     * @ORM\OneToMany(targetEntity=Monster::class, mappedBy="specialObject")
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

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getDamageBonus(): ?int
    {
        return $this->damageBonus;
    }

    public function setDamageBonus(int $damageBonus): self
    {
        $this->damageBonus = $damageBonus;

        return $this;
    }

    public function getLifePointBonus(): ?int
    {
        return $this->lifePointBonus;
    }

    public function setLifePointBonus(int $lifePointBonus): self
    {
        $this->lifePointBonus = $lifePointBonus;

        return $this;
    }

    public function getArmorBonus(): ?int
    {
        return $this->armorBonus;
    }

    public function setArmorBonus(int $armorBonus): self
    {
        $this->armorBonus = $armorBonus;

        return $this;
    }

    public function getInventory(): ?Inventory
    {
        return $this->inventory;
    }

    public function setInventory(?Inventory $inventory): self
    {
        $this->inventory = $inventory;

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
            $monster->setSpecialObject($this);
        }

        return $this;
    }

    public function removeMonster(Monster $monster): self
    {
        if ($this->monsters->removeElement($monster)) {
            // set the owning side to null (unless already changed)
            if ($monster->getSpecialObject() === $this) {
                $monster->setSpecialObject(null);
            }
        }

        return $this;
    }
}
