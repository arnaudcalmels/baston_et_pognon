<?php

namespace App\Entity;

use App\Repository\ActionRepository;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ActionRepository::class)
 */
class Action
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotNull()
     * @Assert\Positive()
     */
    private $damages = 1;

    /**
     * @ORM\Column(type="boolean")
     * @Assert\NotNull()
     * @Assert\Type("bool")
     */
    private $distance = false;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotNull()
     * @Assert\Positive()
     */
    private $frequency = 1;

    /**
     * @ORM\Column(type="boolean")
     * @Assert\NotNull()
     * @Assert\Type("bool")
     */
    private $heal = false;

    /**
     * @ORM\Column(type="boolean")
     * @Assert\NotNull()
     * @Assert\Type("bool")
     */
    private $isSpecial = false;

    /**
     * @ORM\ManyToOne(targetEntity=Caracteristics::class, inversedBy="actions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $caracteristics;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDamages(): ?int
    {
        return $this->damages;
    }

    public function setDamages(int $damages): self
    {
        $this->damages = $damages;

        return $this;
    }

    public function getDistance(): ?bool
    {
        return $this->distance;
    }

    public function setDistance(bool $distance): self
    {
        $this->distance = $distance;

        return $this;
    }

    public function getFrequency(): ?int
    {
        return $this->frequency;
    }

    public function setFrequency(int $frequency): self
    {
        $this->frequency = $frequency;

        return $this;
    }

    public function getHeal(): ?bool
    {
        return $this->heal;
    }

    public function setHeal(bool $heal): self
    {
        $this->heal = $heal;

        return $this;
    }

    public function getIsSpecial(): ?bool
    {
        return $this->isSpecial;
    }

    public function setIsSpecial(bool $isSpecial): self
    {
        $this->isSpecial = $isSpecial;

        return $this;
    }

    public function getCaracteristics(): ?Caracteristics
    {
        return $this->caracteristics;
    }

    public function setCaracteristics(?Caracteristics $caracteristics): self
    {
        $this->caracteristics = $caracteristics;

        return $this;
    }
}
