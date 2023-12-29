import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {Grid} from '@mui/material';
import { Button } from '@mui/material';
import {
 Card,
 CardContent,
 CardMedia,
 Typography,
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';


import '../App.css';


const SearchList = () => {
   const [loading, setLoading] = useState(true);
   
   const [formData, setFormData] = useState({name: ''});
   const [herror, hsetError] = useState('');
   const handleChange = (e) => {
       hsetError('');
       setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
     };
     const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submit action
        setSearchTerm(formData.name); // Set the searchTerm state to trigger the effect
      };
     
   const [error, setError] = useState(null);
   const [objectsData, setObjectsData] = useState(undefined);
   const [searchTerm, setSearchTerm] = useState('');
   const allhan = useSelector((state) => state.han);
   const dispatch = useDispatch();


   const subs = useSelector(state => state.subs);
   let selectedSubId=undefined
   for(let x of subs){
     if(x.selectedSub){
       selectedSubId=x.selectedSub
       //even if multiple subs are selected at varios instances after looping it'll only have the most recent one.
     }
     }
    console.log(subs)
  console.log(selectedSubId)
  console.log(allhan)
  






   const handleCollect = (comicId) => {
     if (selectedSubId) {
       dispatch(actions.collectComic(comicId,selectedSubId));
     }
   };
  
   const handleGiveUp = (comicId) => {
     if(selectedSubId){
     dispatch(actions.giveUpComic(comicId,selectedSubId));}
   };


  
   useEffect(() => {
    
      
       async function fetchData() {
         console.log('on hey load useeffect');
      
      
             const {data} = await axios.post('http://localhost:4000/', {
           query: `
           query Query( $sterm: String!) {
             Scomics( sterm: $sterm) {
               id
               digitalId
               title
               issueNumber
               variantDescription
               description
               modified
               isbn
               upc
               diamondCode
               ean
               issn
               format
               pageCount
               thumbnail {
                 path
                 extension
               }
               dates {
                 type
                 date
               }
               prices {
                 type
                 price
               }
             }
           }
           `,
           variables: {
            
            
             "sterm": searchTerm
            
           }
         });
    
         // Handle the response data
         console.log(data.data.Scomics)
         setObjectsData(data.data.Scomics);
         setLoading(false);
            
         }
        
        
        
       fetchData();
    

      
     }, [searchTerm]);


 
    
      
   
    
     if (error) {
       // Handle the error state and render an error message
      
       return (
         <div>
           <h2>Error: {error.status}</h2>
           <p>{error.message}</p>
         </div>
       );
     }




     if (loading) {
       return (
         <div>
           <h2>Loading....</h2>
         </div>
       );
     }
    
     else{
        const isDataEmpty = Array.isArray(objectsData) && objectsData.length === 0;
       const selectedSub = allhan.find(sub => sub.subid === selectedSubId);
     return(
       <div>
         {!selectedSubId&&(
           <><p>You have directly visited this page without selecting a subcollection.So you wont be able to COLLECT or GIVEUP comics.click the link below to select a subcollection and come back.</p>
             <Link className='objectlink' to='/marvel-comics/collections'>
         Click here
       </Link></>
         )}
         <br/>
         <br/>
         <form onSubmit={handleSearchSubmit}>
      <label>
        Enter Search term:
        <input
          onChange={(e) => handleChange(e)}
          id='name'
          name='name'
          placeholder='search term...'
        />
      </label>
      {herror && <p className="error">{herror}</p>}
      <button type="submit">Search</button>
    </form>
     <br/>
       <Grid container spacing={2}>
       {isDataEmpty &&(
          // Display message if no comics are found
          <div>
            <p>No comics found for the given search term.</p>
          </div>
       )}
           {objectsData && objectsData.map(comic => (
               <Grid item xs={12} sm={6} md={4} key={comic.id}>
                   <Card>
                   <Link to={`/marvel-comics/${comic.id}`}>
                    
                       <CardMedia
                           component="img"
                           height="140"
                           image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                           alt={comic.title}
                       />
                       <CardContent>
                           <Typography gutterBottom variant="h5" component="div">
                               {comic.title}
                           </Typography>
                           <Typography variant="body2" color="textSecondary">
                               Issue Number: {comic.issueNumber}
                           </Typography>
                       </CardContent>
                       </Link>
                       <CardActions>
                       {selectedSub && !selectedSub.col.includes(comic.id) && selectedSub.col.length < 20 && (
                                       <Button color="primary" onClick={() => handleCollect(comic.id)}>
                                           Collect
                                       </Button>
                                   )}
                       {!selectedSub && selectedSubId && (
                                       <Button color="primary" onClick={() => handleCollect(comic.id)}>
                                           Collect
                                       </Button>
                                   )}
                                  
                        
                        {selectedSub && selectedSub.col.includes(comic.id) && (
                                       <Button color="secondary" onClick={() => handleGiveUp(comic.id)}>
                                           Give Up
                                       </Button>
                                   )}
                       </CardActions>
                   </Card>
               </Grid>
           ))}
           
       </Grid>
       <br/>
       <br/>
     
     
   </div>
);
    
          


     }}
export default SearchList;








