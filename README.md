# Sip-Share

## Overview

**Sip-Share** is a web application that allows users to explore and discover various cocktail recipes. Users can search for cocktail recipes by ingredients or by the name of the cocktail. The app also includes user verification, ensuring a personalized and secure experience. Whether you're a cocktail enthusiast or a casual drinker, Sip-Share provides an easy way to find your next favorite drink.

## Features

- **Search by Ingredients**: Find cocktail recipes based on the ingredients you have on hand.
- **Search by Name**: Look up specific cocktails by their name.
- **User Verification**: Secure user authentication using Firebase to provide a personalized experience.
- **Responsive Design**: Built with React and Bootstrap, ensuring the app looks great on all devices.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Firebase (for authentication and database)
- **API**: CocktailDB API

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Viraj030/Sip-Share.git
    cd Sip-Share
    ```

2. **Install the required dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
   - Create a Firebase project in your [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Firestore Database.
   - Add your Firebase configuration to a `.env` file in the root of the project:
    ```
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

## Usage

1. **Search for Cocktails**: Use the search bar to find cocktails by name or ingredients.
2. **User Authentication**: Sign up or log in to save your favorite recipes.
3. **Explore Recipes**: Browse through the results to find detailed recipes for your chosen cocktails.

## Contributors

- **Viraj Asolkar** - [GitHub Profile](https://github.com/Viraj030)

## Contact

For any inquiries or support, please contact Viraj Asolkar at [virajasolkar0181@gmail.com](mailto:virajasolkar0181@gmail.com).


You can customize this further if needed!
