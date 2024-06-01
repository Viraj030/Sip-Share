import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CocktailDetails.css"; // Import your CSS file for the CocktailDetails component

const CocktailDetails = () => {
  const { id } = useParams(); // Get the cocktail ID from the URL
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.drinks && response.data.drinks.length > 0) {
          setCocktailDetails(response.data.drinks[0]);
        } else {
          setCocktailDetails(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cocktail details:", error);
        setLoading(false);
      }
    };

    fetchCocktailDetails();
  }, [id]);

  return (
    <div className="detailsPage">
      <div className="cocktail-details">
      <h2 className="cocktail-details-title">Cocktail Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cocktailDetails ? (
        <div className="cocktail-details-container">
          <div className="cocktail-details-image">
            <img src={cocktailDetails.strDrinkThumb} alt={cocktailDetails.strDrink} />
          </div>
          <div className="cocktail-details-content">
            <h3>{cocktailDetails.strDrink}</h3>
            <h4>Ingredients</h4>
            <ul className="ingredients-list">
              {Array.from({ length: 15 }, (_, i) => i + 1).map((index) => {
                const ingredient = cocktailDetails[`strIngredient${index}`];
                const measure = cocktailDetails[`strMeasure${index}`];
                if (ingredient && ingredient.trim() !== "") {
                  return (
                    <li key={index}>
                      {measure} {ingredient}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <h4>Preparation</h4>
            <p>{cocktailDetails.strInstructions}</p>
          </div>
        </div>
      ) : (
        <p>No details found for this cocktail.</p>
      )}
    </div>
    </div>
    
  );
};

export default CocktailDetails;
