# Countries App

A web app that lists countries in the world, fetched from https://restcountries.com/.

## [Demo link](https://countries-app-taupe.vercel.app/)

This project has been deployed with Vercel and a demo can be can be viewed [here](https://countries-app-taupe.vercel.app/)

## Run locally

- Clone or download the Repository
  In the project directory:
- Run `npm install`
- Run `npm start` to run the app in development mode
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Tech stack

- React
- Material UI
- React Router DOM

## Completed Tasks/Features

- Fetch country data from API endpoint
- Render actual countries data
- Toggle to view countries in either List view or Tile/Grid view
- Search by country name
- Filter by region
- Filter by countries smaller than Lithuania
- Sort by name and area size in ascending and ascending order
- Pagination
- Single country page
- Light and dark mode
- Type checking

## Considerations

- This project developent was done with the following approach
  -- Make it work
  -- then make it fast and scalable
  -- then make it pretty

- Every component is created to be as reusable. I ensured to keep each child components eg Search, sort etc as pure and stateless as possibe. While this is a small project, this is to demonstrate that should this become bigger, these components can be reused across different sections of the app. A good example of reusablity here is the Filter component being used to filter by region and by areas smaller than Lithuania.

Interactions and data manipulation handled by parent components in a heirachical manner, with child components only dealing with call backs and rendering.

Potential enhancements for this project would include testing Redux for state managemnet
