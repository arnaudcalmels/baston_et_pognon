<?php

namespace App\Entity;

use App\Repository\ProfessionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProfessionRepository::class)
 */
class Profession
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=40)
     */
    private $name;

    /**
     * @ORM\OneToOne(targetEntity=Caracteristics::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $caracteristics;

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

    public function getCaracteristics(): ?Caracteristics
    {
        return $this->caracteristics;
    }

    public function setCaracteristics(Caracteristics $caracteristics): self
    {
        $this->caracteristics = $caracteristics;

        return $this;
    }
}
