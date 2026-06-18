# Glide Food Delivery App

Glide is a food delivery application split into three main parts:

- a React Native app built with Expo Router in [glide/](glide)
- a Node.js and Express API gateway in [Backend/](Backend)
- a Python FastAPI recommendation service in [AI model/](AI%20model)

The project also includes the PostgreSQL database schema in [Database/DB Structure.sql](Database/DB%20Structure.sql).

## What the app does

The mobile app lets users:

- view the onboarding screen and sign in or sign up
- browse restaurants and highlighted offers
- search and view recommended restaurants
- keep authentication state between launches using local storage

The backend stack supports:

- user registration and login with password hashing
- restaurant and popular restaurant retrieval
- recommendation lookup through a separate Python service

## Project Structure

- [glide/](glide) - Expo mobile app
- [Backend/](Backend) - Node.js API gateway
- [AI model/](AI%20model) - FastAPI recommendation API
- [Database/](Database) - SQL schema for the PostgreSQL database
- [README.md](README.md) - project overview and setup notes

### Mobile App

The Expo app uses Expo Router for navigation.

Main routes and screens:

- [glide/app/index.tsx](glide/app/index.tsx) - onboarding landing screen
- [glide/app/auth/signin.jsx](glide/app/auth/signin.jsx) - login and sign-up screen
- [glide/app/(tabs)/home.jsx](<glide/app/(tabs)/home.jsx>) - home feed with offers and restaurant lists
- [glide/app/(tabs)/search.jsx](<glide/app/(tabs)/search.jsx>) - recommended restaurants and search entry point
- [glide/app/(tabs)/cart.jsx](<glide/app/(tabs)/cart.jsx>) - cart placeholder
- [glide/app/(tabs)/orders.jsx](<glide/app/(tabs)/orders.jsx>) - orders placeholder
- [glide/app/(tabs)/account.jsx](<glide/app/(tabs)/account.jsx>) - account placeholder

Shared state and helpers:

- [glide/contexts/UserContext.jsx](glide/contexts/UserContext.jsx) stores the authenticated user in AsyncStorage and exposes `login` and `register`
- [glide/contexts/RestaurantContext.jsx](glide/contexts/RestaurantContext.jsx) loads restaurants, popular restaurants, and user-specific recommendations
- [glide/hooks/useUser.js](glide/hooks/useUser.js) and [glide/hooks/useRestaurants.js](glide/hooks/useRestaurants.js) are context wrappers
- [glide/services/api.js](glide/services/api.js) centralizes all API calls

### Backend API

The backend is a Node.js Express app that connects to PostgreSQL.

Key routes in [Backend/server.js](Backend/server.js):

- `GET /` - health check
- `POST /login` - authenticates a user
- `POST /register` - creates a new user account
- `GET /restaurants` - returns all restaurants
- `GET /popular-restaurants` - returns the top-rated restaurants
- `GET /recommended-restaurants/:id` - asks the Python recommendation service for menu-item recommendations and maps them back to restaurant records

The backend uses:

- `pg` for database access
- `bcrypt` for password hashing and verification
- `cors` for cross-origin requests from the mobile app
- `dotenv` for environment variables

### Recommendation Service

The Python service in [AI model/main.py](AI%20model/main.py) exposes a FastAPI app.

Routes:

- `GET /` - health check
- `GET /recommend/{user_id}` - generates recommendations for a given user

It imports logic from [AI model/recommendation.py](AI%20model/recommendation.py), which is responsible for building the collaborative filtering engine and producing ranked recommendations.

### Database Schema

The schema in [Database/DB Structure.sql](Database/DB%20Structure.sql) defines the core entities used by the app:

- `users` - customer accounts and credentials
- `restaurants` - restaurant metadata, images, rating, and busy state
- `menu_items` - dishes linked to restaurants
- `orders` - order headers linked to users
- `order_items` - line items for each order
- `user_interactions` - behavior signals used by the recommendation system

## Data Flow

1. The user opens the Expo app.
2. [glide/app/\_layout.tsx](glide/app/_layout.tsx) restores the user session from AsyncStorage and redirects authenticated users into `/home`.
3. The sign-in screen sends credentials to the backend through [glide/services/api.js](glide/services/api.js).
4. The backend verifies the user against PostgreSQL and returns the user payload.
5. Once a user is available, [glide/contexts/RestaurantContext.jsx](glide/contexts/RestaurantContext.jsx) fetches personalized recommendations.
6. The backend forwards recommendation requests to the Python service, then resolves returned menu-item IDs back to restaurant data.
7. The home and search screens render the restaurant data through shared list components.

## Frontend Components

Reusable UI pieces live in [glide/components/](glide/components):

- [glide/components/OfferList.jsx](glide/components/OfferList.jsx) - promotional cards on the home screen
- [glide/components/RestaurantList.jsx](glide/components/RestaurantList.jsx) - restaurant list renderer
- [glide/components/RestaurantCard.jsx](glide/components/RestaurantCard.jsx) - single restaurant card
- [glide/components/SearchBox.jsx](glide/components/SearchBox.jsx) - search input used on the search screen
- [glide/components/TextInputField.jsx](glide/components/TextInputField.jsx) - reusable auth form field

## Setup

This repository contains multiple services, so they need to be run separately.

### 1. Mobile app

```bash
cd glide
npm install
npm start
```

Useful scripts from [glide/package.json](glide/package.json):

- `npm start` - start the Expo dev server
- `npm run android` - run on Android
- `npm run ios` - run on iOS
- `npm run web` - run on web
- `npm run lint` - lint the Expo app

### 2. Backend API

```bash
cd Backend
npm install
npm start
```

The backend expects a PostgreSQL database named `Glide` and a `.env` file with `DATABASE_PASSWORD`.

### 3. Recommendation service

```bash
cd "AI model"
pip install fastapi uvicorn pandas
uvicorn main:app --reload --port 8000
```

### 4. Database

Run [Database/DB Structure.sql](Database/DB%20Structure.sql) against PostgreSQL to create the tables.

## Notes

- The mobile app currently points API calls at an ngrok URL in [glide/services/api.js](glide/services/api.js), so you may need to update that base URL for your local environment.
- The home, cart, orders, and account screens suggest the app is still evolving, so some routes are intentionally minimal.
- The recommendation flow depends on both the PostgreSQL interaction tables and the Python model service.

## Tech Stack

- React Native
- Expo / Expo Router
- Node.js / Express
- Python / FastAPI
- PostgreSQL
- AsyncStorage for session persistence

## License

No license file is included in this repository.
