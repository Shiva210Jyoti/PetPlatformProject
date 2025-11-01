import React from 'react';
import dog from './images/Dog-care.png';
import cat from './images/Cat-care.jpg';
import rabbit from './images/Rabbit-care.jpg';
import bird from './images/Bird-care.jpg';

const careSections = [
  {
    title: "🐶 Dog Care",
    tips: [
      "🦴 Provide a high-quality, balanced dog food.",
      "🏃 Ensure daily exercise like walking or playing fetch.",
      "🧼 Bathe your dog and brush its coat regularly.",
      "🏥 Visit the vet for annual checkups and vaccinations.",
      "💓 Show love and attention to build a strong bond.",
    ],
    image: dog,
  },
  {
    title: "🐱 Cat Care",
    tips: [
      "🛏️ Provide a cozy and quiet sleeping area.",
      "🐟 Feed your cat protein-rich food and fresh water.",
      "🧹 Clean the litter box daily.",
      "🧶 Offer toys and vertical spaces like cat trees.",
      "🏥 Regular vet visits for deworming and vaccination.",
    ],
    image: cat,
  },
  {
    title: "🐰 Rabbit Care",
    tips: [
      "🥕 Feed hay, fresh greens, and rabbit pellets.",
      "🏠 Keep in a large, clean cage with room to hop.",
      "🧼 Spot clean daily and deep clean weekly.",
      "👋 Handle gently to build trust.",
      "💉 Get annual health check-ups.",
    ],
    image: rabbit,
  },
  {
    title: "🕊️ Bird Care",
    tips: [
      "🪶 Clean cage regularly and provide perches.",
      "🌿 Feed seeds, fruits, and veggies (depending on species).",
      "🎶 Provide toys and social interaction.",
      "💧 Keep fresh water available at all times.",
      "💡 Ensure proper lighting and avoid drafts.",
    ],
    image: bird,
  },
];

function InfoPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#d9fbe9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>🐾 Pet Care Information 🐾</h1>

      {careSections.map((section, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '4rem',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Image */}
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <img
              src={section.image}
              alt={section.title}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          </div>

          {/* Text with colored box */}
          <div
            style={{
              flex: '1 1 400px',
              backgroundColor: '#fff9ec',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <h2>{section.title}</h2>
            <ul>
              {section.tips.map((tip, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfoPage;
