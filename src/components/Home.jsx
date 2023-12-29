import React from 'react';
import { Link} from 'react-router-dom';


function Home() {
  return (
    <div>
    <header className='App-header'>
        
        <h1 className='App-title'>Welcome to The Marvel Comic collecting application</h1> </header>
        <p>This application incorporates Express, Redis and Redux.</p>
<h2>Routes You Will Need for the Frontend.</h2>
<p>/       -     Your currectly at this route</p>

<p>/marvel-comics/page/:pagenum -          Do not visit this route directly if you wish to collect comics.you have to select a subcollection first</p>
<p>/marvel-comics/:id   -        This route will show details about a single comic.</p>
<p>/marvel-comics/collections - This route will render a single, scrollable list of all the current sessions' created sub-collections and their comic "collections".</p>
<h3>Click the link Below to navigate to the Collections Listing (/marvel-comics/collections) </h3>

        <Link className='objectlink' to='/marvel-comics/collections'>
          MARVEL-COLLECTIONS
        </Link>
   
      <br />
      <br />  
    </div>
  );
}

export default Home;
