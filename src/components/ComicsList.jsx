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
  CardHeader
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

import '../App.css';

const ComicsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [objectsData, setObjectsData] = useState(undefined);
    const[totalpg,settotalpg]=useState(0);
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

    let {pagenum} = useParams();
    let pgnum= Number(pagenum)
    let previousPage=Number(pagenum) - 1;
    let nextPage=Number(pagenum) + 1;
    let tol;

    useEffect(() => {
      async function to(){
        //console.log("hi")
        const {data} = await axios.post('http://localhost:4000/', {
              query: `query Query {
                tolval {
                  total
                }
              }`
              ,
              variables: {
                
              }
            });
            
         settotalpg(data.data.tolval.total)   

    };
    to()
  }, []);
    
        
    
    
    

    useEffect(() => {
      
        
        async function fetchData() {
          console.log('on hey load useeffect');
       try {
        
              const {data} = await axios.post('http://localhost:4000/', {
            query: `
            query Query($pagenum: Int!) {
              comics(pagenum: $pagenum) {
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
              
              "pagenum": pgnum
              
            }
          });
      
          // Handle the response data
          console.log(data.data.comics)
          setObjectsData(data.data.comics);
          setLoading(false);
              
            }
            
          catch (e) {
            
            setError({ status:"404", message: "Comics not available for the requested page" });
            setLoading(false);
          }
            //console.log(e.message);
            //console.log(e);
          }
          if(pgnum<1 ){
            setError({ status:"400", message: "Page param is invalid!" });
            setLoading(false);
            return
      
          } 
          
          const regex = /^-?\d+$/;
          if(!regex.test(pagenum)){
            //console.log("ko")
            setError({ status:"400", message: "Page param is invalid" });
            setLoading(false);
            return
          }  
        fetchData();

        
      }, [pagenum]);

   
      
        
     
      
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
        if(totalpg%50===0){
          tol=Math.floor(totalpg/50)
        }
        if(totalpg%50!==0){
          tol=Math.floor(totalpg/50)+1
        }
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

        <Grid container spacing={2}>
            {objectsData.map(comic => (
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
        {previousPage >= 1 && (
    <Button 
        variant="contained" 
        sx={{ width: '150px', mr: 1 }}  
        component={Link}
        to={`/marvel-comics/page/${previousPage}`}
    >
        Previous
    </Button>
)} 
{nextPage <= tol  &&(
    <Button 
        variant="contained" 
        sx={{ width: '150px', ml: 1 }}  
        component={Link}
        to={`/marvel-comics/page/${nextPage}`}
    >    
        Next
    </Button>
)}
       
    </div>
);
      
            

      }}
export default ComicsList;
