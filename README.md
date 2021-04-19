# taxi-map-frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The main components are:
- `OfficesRadio`: to toggle between the Singapore and London offices
- `TaxiCountSlider`: to select the number of taxis to display on the map
- `TaxiMap`: this is the main component that contains the Google Maps component with the taxi locations, the `OfficesRadio` and `TaxiCountSlider` components

### Development
To run the app in development, you can run `npm start` which will start the server on `http://localhost:3001`.

Ensure that the `taxi-map-backend` API service is up and running on `http://localhost:3000`.


### Dependencies
1. `@react-google-maps/api`: To render Google maps, I actually struggled to find a package that worked well with TypeScript. Settled on this one that seems to work well.
2. `geolib`: To find the office closest to the user's current location
3. `@material-ui/core` and `@material-ui/icons`: For styling


### Improvements
1. The app is not mobile responsive; that would possibly be the first thing to do
2. Error/empty state handling
3. Improving micro interactions when the user takes an action
4. Adding a loading indicator when the data from the backend is being fetched
5. Tests

### Challenges
1. Unfamiliarity using React with TypeScript
2. Settling on a Google Maps package to do the job
