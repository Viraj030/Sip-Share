// Recipe.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recipes.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [previousRecipes, setPreviousRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true); // User is logged in
      } else {
        setUserLoggedIn(false); // User is not logged in
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const fetchMultipleRandomCocktails = async () => {
    try {
      const cocktailsArray = [];
      const numberOfCocktails = 20; // Number of random cocktails to fetch

      for (let i = 0; i < numberOfCocktails; i++) {
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const cocktail = response.data.drinks[0];
        if (cocktail) {
          cocktailsArray.push(cocktail);
        }
      }

      setDisplayedRecipes(cocktailsArray);
      setPreviousRecipes([...cocktailsArray]);

      localStorage.setItem("storedRecipes", JSON.stringify(cocktailsArray));
      localStorage.setItem(
        "lastFetchTimestamp",
        new Date().getTime().toString()
      );
    } catch (error) {
      console.error("Error fetching multiple random cocktails:", error);
    }
  };

  useEffect(() => {
    const storedRecipes = localStorage.getItem("storedRecipes");
    const storedTimestamp = localStorage.getItem("lastFetchTimestamp");
    const lastFetchTimestamp = storedTimestamp
      ? parseInt(storedTimestamp, 10)
      : 0;
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const currentTime = new Date().getTime();

    if (storedRecipes && currentTime - lastFetchTimestamp < twentyFourHours) {
      setDisplayedRecipes(JSON.parse(storedRecipes));
      setPreviousRecipes(JSON.parse(storedRecipes));
    } else {
      fetchMultipleRandomCocktails();
    }
  }, []);
  const handleCocktailClick = (cocktail) => {
    window.location.href = `/cocktail/${cocktail.idDrink}`;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setSearchResults(response.data.drinks || []);
      if (searchTerm) {
        setDisplayedRecipes(response.data.drinks || []);
      } else {
        setDisplayedRecipes(previousRecipes); // Revert to previous recipes on search term clearing
      }
    } catch (error) {
      console.error("Error searching cocktails:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setDisplayedRecipes(initialRecipes); // Revert to initial recipes when search term is empty
    }
  };

 
  const handleDetailClick = (cocktailId) => {
    if (userLoggedIn) {
    window.location.href = `/cocktail/detail/${cocktailId}`;
    }else{
      window.location.href ="/login";
    }
  };

  const shareOnSocialMedia = (media, cocktail) => {
    if (cocktail) {
      const recipeURL = `http://192.168.0.102:3000/cocktail/${cocktail.idDrink}`;
      let shareURL = "";
      let windowHeight = 500;
      let windowWidth = 500;

      switch (media) {
        case "twitter":
          shareURL = `https://twitter.com/intent/tweet?text=Check out this amazing cocktail: ${cocktail.strDrink}&url=${recipeURL}`;
          break;
        case "facebook":
          shareURL = `fb://share/?text=Check out this amazing cocktail: ${cocktail.strDrink}&href=${recipeURL}`;
          break;
        case "whatsapp":
          shareURL = `whatsapp://send?text=Check out this amazing cocktail: ${cocktail.strDrink} - ${recipeURL}`;
          break;
        default:
          break;
      }

      if (shareURL) {
        const win = window.open(shareURL, "_blank");
        if (!win || win.closed || typeof win.closed === "undefined") {
          window.open(
            shareURL,
            "_blank",
            `height=${windowHeight},width=${windowWidth}`
          );
        }
      }
    }
  };

  return (
    <>
      <div className="recipePage">
        <div className="banner d-flex align-items-center justify-content-center">
          <div className="bannerInfo">
            <h2 style={{ color: "white" }}>
              Crafting Spectacular Cocktails: Uncover the Artistry Within!
            </h2>
            <div className="searchBar">
              <input
                type="search"
                placeholder="Search cocktails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>

        <div className="container recipeResults mt-2">
          <h3 className="text-center mb-4" style={{ color: "#c52d2f" }}>
            Recipes
          </h3>
          <div className="recipeCards">
            {displayedRecipes.map((cocktail, index) => (
              <div key={cocktail.idDrink} className="recipeCard">
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  onClick={() => handleCocktailClick(cocktail)}
                />
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <h4>{cocktail.strDrink}</h4>
                  <div className="recipeActions">
                    <Link to={`/cocktail/detail/${cocktail.idDrink}`}>
                      <button className="btn btn-sm btn-success mx-1"
                        onClick={() => handleDetailClick(cocktail.idDrink)}
                      >
                        Detail
                      </button>
                    </Link>
                    <i
                      className="fa fa-twitter mx-2"
                      style={{ fontSize: "20px", color: "#00aced" }}
                      onClick={() => shareOnSocialMedia("twitter", cocktail)}
                    ></i>
                    <i
                      className="fa fa-facebook mx-2"
                      style={{ fontSize: "20px", color: "#3b5998" }}
                      onClick={() => shareOnSocialMedia("facebook", cocktail)}
                    ></i>
                    <i
                      className="fa fa-whatsapp mx-2"
                      style={{ fontSize: "20px", color: "#25D366" }}
                      onClick={() => shareOnSocialMedia("whatsapp", cocktail)}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Recipe;
