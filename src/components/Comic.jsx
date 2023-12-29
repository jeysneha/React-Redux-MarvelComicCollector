import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@mui/material';
import { Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import '../App.css';

const Comic = () => {
  const [objectData, setobjectData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

    
  // const classes = useStyles();
  const {id} = useParams();

 let comicid= Number(id)
 
  useEffect(() => {
    console.log('OBJECT useEffect fired');
    
    
    async function fetchData() {
      
      try {
        
        const {data} = await axios.post('http://localhost:4000/', {
      query: `
      query Query($id: Int!) {
        getComicById(_id: $id) {
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
        
          "id": comicid
        
      }
    });

    // Handle the response data
    
    setobjectData(data.data.getComicById);
    setLoading(false);
        
      } catch (e) {
        
        setError({ status:"404", message: "Comic not available" });
        setLoading(false);}
        //console.log(e.message);
    }
    
    if(comicid<1 ){
      setError({ status:"400", message: "ID param is invalid!" });
      setLoading(false);
      return

    } 
    
    const regex = /^-?\d+$/;
    if(!regex.test(id)){
      //console.log("ko")
      setError({ status:"400", message: "ID param is invalid" });
      setLoading(false);
      return
    }  

  
    fetchData();
   
  }, [id]);

  const StripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};
  if (error) {
    // Handle the error state and render an error message
    return (
      <div>
        <h2>Error {error.status}</h2>
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
    const selectedSub = allhan.find(sub => sub.subid === selectedSubId);
  return(
    <div>
       {!selectedSubId&&(
            <><p>You have directly visited this page without selecting a subcollection.So you wont be able to COLLECT or GIVEUP comic.click the link below to select a subcollection and come back.</p>
              <Link className='objectlink' to='/marvel-comics/collections'>
          Click here
        </Link></>
          )}
          <br/>
          <br/>
    
      
        <Card
        variant='outlined'
        sx={{
          maxWidth: 550,
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
          border: '1px solid #1e8678',
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
        }}>
          <CardHeader title={objectData.title} subheader={`Issue Number: ${objectData.issueNumber}`} 
          sx={{
            borderBottom: '1px solid #1e8678',
            '& .MuiTypography-root': {
            fontWeight: 'bold'}
          }}/>
          <CardMedia
            component="img"
            image={objectData.thumbnail ? `${objectData.thumbnail.path}.${objectData.thumbnail.extension}` : noImage}
            alt= "image not there"
            
          />
          <CardContent>
            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              Description:{objectData.description ? StripHtml(objectData.description) : 'Description not available'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
          
              Digital ID: {objectData.digitalId || 'N/A'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              International Standard Book Number (ISBN): {objectData.isbn || 'N/A'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              UPC: {objectData.upc || 'N/A'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              ISSN(International Standard Serial Number): {objectData.issn || 'N/A'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              EAN(European Article Numbe): {objectData.ean || 'N/A'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              Format: {objectData.format || 'N/A'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              Diamond Code: {objectData.diamondCode || 'N/A'}
            </Typography>

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              Page Count: {objectData.pageCount || 'N/A'}
            </Typography>

            

            <Typography variant='body2'
            color='textSecondary'
            component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
              Modified: {objectData.modified || 'N/A'}
            </Typography>
        
        <Typography variant="body2" color="textSecondary" component='p'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
          Dates:
          {objectData.dates && objectData.dates.map((date, index) => (
            
            <span key={index}>{`${date.type}: ${date.date}`}</span>
          ))}
        </Typography>
        <Typography variant="body2" color="textSecondary" component='p'
        sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}>
          Prices:
          {objectData.prices && objectData.prices.map((price, index) => (
            <span key={index}>{`${price.type}: $${price.price}`}</span>
          ))}
        </Typography>
          </CardContent>
          <CardActions>
          {selectedSub && !selectedSub.col.includes(objectData.id) && selectedSub.col.length < 20 && (
                                        <Button color="primary" onClick={() => handleCollect(objectData.id)}>
                                            Collect
                                        </Button>
                                    )}
               
          {!selectedSub && selectedSubId && (
                                        <Button color="primary" onClick={() => handleCollect(objectData.id)}>
                                            Collect
                                        </Button>
                                    )}
                          
            {selectedSub && selectedSub.col.includes(objectData.id) && (
                                        <Button color="secondary" onClick={() => handleGiveUp(objectData.id)}>
                                            Give Up
                                        </Button>
                                    )}
         </CardActions>
        </Card>
      
   
  
  </div>)
          }
  
};

export default Comic;
