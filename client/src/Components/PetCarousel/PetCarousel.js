import React, { useEffect, useState } from 'react';
import './PetCarousel.css';
import { baseUrl } from '../../db.js';
import AdoptForm from '../AdoptForm/AdoptForm';

const PetCarousel = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${baseUrl}/approvedPets`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setPets(data);
        } else if (Array.isArray(data.pets)) {
          setPets(data.pets);
        } else {
          console.error('Unexpected API response format:', data);
          setPets([]);
        }
      } catch (err) {
        console.error('Failed to fetch pets:', err);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    if (selectedPet) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPet]);

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
  };

  const handleClose = () => {
    setSelectedPet(null);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading pets...</p>;
  if (!pets.length) return <p style={{ textAlign: 'center' }}>No approved pets available.</p>;

  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-heading">🐾 Recently Approved Pets</h2>
      <div className="horizontal-scroll-container">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="carousel-card"
            role="button"
            tabIndex={0}
            onClick={() => handlePetSelect(pet)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handlePetSelect(pet);
              }
            }}
          >
            <img
              src={`${baseUrl}/images/${pet.filename}`}
              alt={pet.name}
              className="carousel-pet-img"
            />
            <div className="carousel-card-details">
              <h3>{pet.name}</h3>
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Location:</strong> {pet.area}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedPet && (
        <div className="carousel-modal-overlay" onClick={handleClose} role="presentation">
          <div
            className="carousel-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="carousel-modal-close"
              onClick={handleClose}
            >
              Close <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <AdoptForm pet={selectedPet} closeForm={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCarousel;