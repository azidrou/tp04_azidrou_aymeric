<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Produit
 *
 * @ORM\Table(name="produit")
 * @ORM\Entity
 */
class Produit
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_produit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="produit_id_produit_seq", allocationSize=1, initialValue=1)
     */
    private $idProduit;

    /**
     * @var string|null
     *
     * @ORM\Column(name="adressepropriete", type="string", length=100, nullable=true)
     */
    private $adressepropriete;

    /**
     * @var int|null
     *
     * @ORM\Column(name="prix", type="integer", nullable=true)
     */
    private $prix;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=200, nullable=true)
     */
    private $description;


    /**
     * Get idProduit.
     *
     * @return int
     */
    public function getIdProduit()
    {
        return $this->idProduit;
    }

    /**
     * Set adressepropriete.
     *
     * @param string|null $adressepropriete
     *
     * @return Produit
     */
    public function setAdressepropriete($adressepropriete = null)
    {
        $this->adressepropriete = $adressepropriete;

        return $this;
    }

    /**
     * Get adressepropriete.
     *
     * @return string|null
     */
    public function getAdressepropriete()
    {
        return $this->adressepropriete;
    }

    /**
     * Set prix.
     *
     * @param int|null $prix
     *
     * @return Produit
     */
    public function setPrix($prix = null)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix.
     *
     * @return int|null
     */
    public function getPrix()
    {
        return $this->prix;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Produit
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }
}
