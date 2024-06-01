import React,  { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase"; 
import RandomCocktails from "../../Components/Navbar/RandomCocktail";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <div className="homePage">
        <div className="heroSection d-flex align-items-center justify-content-center">
          <div className=" heroContainer">
            <h2 className="mainTitle color">
              "Sip & Share: Discover the Art of Cocktail Making"
            </h2>
            <p className="mainPara color text-center">
              "Unleash your inner mixologist with Sip & Share,<br/> The ultimate
              cocktail recipe app."
            </p>
            <Link to="/recipes">
              <button className="btn btn-success">Explore Recipes</button>
            </Link>
          </div>
        </div>

        <div className="about mt-4">
          <div className="container">
            <h3 className="text-center mb-4">
              Raise the Bar on Your Cocktail Craftsmanship!
            </h3>
            <div className="container d-flex">
              <div class="card mx-2">
                <img
                  class="card-img-top"
                  src="https://10web-site.ai/75/wp-content/uploads/sites/87/2023/12/good-vibes_FVPk12Cx.webp"
                  alt="Card image cap"
                  style={{ width: "100%" }}
                />
                <div class="card-body">
                  <h4 class="card-title text-center my-2">
                    Variety of Recipes
                  </h4>
                  <p class="card-text my-1">
                    Sip & Share offers an extensive selection of cocktail
                    recipes from around the world. From classic favorites to
                    innovative new creations, users can explore the art of
                    mixology and discover new flavors and techniques. The app
                    also includes detailed instructions and tips on how to
                    create each drink, ensuring that even novice mixologists can
                    craft impressive cocktails.
                  </p>
                </div>
              </div>

              <div class="card mx-2">
                <img
                  class="card-img-top"
                  src="https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvY2t0YWlsJTIwc2hhcmluZ3xlbnwwfDB8MHx8fDA%3D"
                  alt="Card image cap"
                  style={{ width: "100%" }}
                />
                <div class="card-body">
                  <h4 class="card-title text-center my-2">
                    Easy Recipe Saving and Sharing
                  </h4>
                  <p class="card-text my-1">
                    Sip & Share makes it easy to save and share your favorite
                    cocktail recipes. With just a few clicks, users can save
                    recipes to their personal library, allowing them to easily
                    access them later. The app also includes social sharing
                    functionality, allowing users to share their favorite
                    recipes with friends and followers on social media. This
                    feature makes it simple to spread the love of mixology and
                    showcase your skills as a cocktail connoisseur.
                  </p>
                </div>
              </div>

              <div class="card mx-2">
                <img
                  class="card-img-top"
                  src="https://images.unsplash.com/photo-1516683762090-1b43c48492e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvY2t0YWlsJTIwbWFraW5nfGVufDB8MHwwfHx8MA%3D%3D"
                  alt="Card image cap"
                  style={{ width: "100%" }}
                />
                <div class="card-body">
                  <h4 class="card-title text-center my-2">
                    User-Generated Content
                  </h4>
                  <p class="card-text my-1">
                    Sip & Share is a community-driven app that encourages users
                    to share their own cocktail recipes. This feature allows for
                    a diverse range of content and ensures that users can
                    discover unique and innovative cocktails from fellow
                    mixologists. The app also includes a rating and review
                    system, allowing users to provide feedback on each recipe
                    and create a community of cocktail enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="randomCocktail mt-4">
          <div className="container d-flex flex-column">
            <h3 className="text-center color">Random Drink</h3>
            <div className="d-flex">
              <RandomCocktails />
              <RandomCocktails />
              <RandomCocktails />
              <RandomCocktails />
            </div>
            <div className="d-flex mt-3">
              <RandomCocktails />
              <RandomCocktails />
              <RandomCocktails />
              <RandomCocktails />
            </div>
            <div className="text-center mt-2">
            {user ? (
          <Link to="/recipes">
            <button className="btn btn-success">Discover Culinary Gems!</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn btn-success">Login to Discover Culinary Gems!</button>
          </Link>
        )}</div>
          </div>
        </div>
      </div>
    </>
  );
}
