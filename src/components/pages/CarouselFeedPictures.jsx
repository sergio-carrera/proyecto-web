import { useState } from "react";

import PropTypes from 'prop-types';
const ImageCarousel = ({ fileUrls }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? fileUrls.length - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === fileUrls.length - 1 ? 0 : prevIndex + 1));
    };
  
    return (
      <div style={stylesCarousel.carousel}>
        <img src={fileUrls[currentIndex]} alt={`Publicacion ${currentIndex}`} style={stylesCarousel.carouselImage} />
        {fileUrls.length > 1 && ( // Conditionally render the arrows
          <div style={stylesCarousel.arrowContainer}>
            <button onClick={handlePrevious} style={stylesCarousel.arrowButton}>◀</button>
            <button onClick={handleNext} style={stylesCarousel.arrowButton}>▶</button>
          </div>
        )}
      </div>
    );
  };

  export default ImageCarousel


  //Estilos Carousel
const stylesCarousel = {
    carousel: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    carouselImage: {
      width: '100%',
      borderRadius: '8px',
      height: '600px'
    },
    arrowContainer: {
      position: 'absolute',
      bottom: '10px',  // Position the arrows at the bottom
      left: '50%',  // Center the container horizontally
      transform: 'translateX(-50%)',  // Adjust for centering
      display: 'flex',
      justifyContent: 'space-between',
      width: '80px',  // Adjust to make space for the arrows
    },
    arrowButton: {
      background: 'rgba(0,0,0,0.5)',
      color: '#fff',
      border: 'none',
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '50%',
    },
  };

  ImageCarousel.propTypes = {
    fileUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  };