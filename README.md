# React + Vite
# React,Redux,Graphql,Redis Application-MarvelAPI

## Welcome to The Marvel Comic collecting application:
### Created an Apollo server for the graphql backend with all the routes querying the Marvel API.  The React application will make Axios calls to these routes instead of calling the Marvel API end-points directly. Routes will check to see if the data is being requested in the Redis cache, if yes, the routes will respond with the cached data.  If the data is not in the cache, then it queries the API for the data, then stores it in the cache and respond with the data. 
### Redux is used to handle the collection/Marvel Comic states of the React application and the state persists on a page refresh.
