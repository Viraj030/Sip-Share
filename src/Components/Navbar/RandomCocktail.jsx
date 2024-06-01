

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RandomCocktails = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const fetchedCocktails = response.data.drinks || [];
        setCocktails(fetchedCocktails);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchCocktails();
  }, []);

  return (
    <div className='d-flex align-items-center justify-content-center px-3 pt-2' style={{  width: '100vw',  }}>
      {cocktails.map(cocktail => (
        
         <div key={cocktail.idDrink} style={{ flex: '0 0 auto', borderRadius: '5px', width:'100%' }}>
         <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         <p style={{ textAlign: 'center', margin: '5px 0', fontSize: '18px', color: 'white' }}>{cocktail.strDrink}</p>
       </div>
      ))}
    </div>
  );
};

export default RandomCocktails;
