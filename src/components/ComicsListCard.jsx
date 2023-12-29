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

const ComicsListCard = ({id,subid}) => {
  const [objectData, setobjectData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const classes = useStyles();
  const allhan = useSelector((state) => state.han);

  const dispatch = useDispatch();

 console.log(allhan)
  
  
  const handleGiveUp = (comicId,subid) => {
    dispatch(actions.giveUpComic(comicId,subid));
  };


 const comicid= id
 
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
    if(!regex.test(comicid)){
      //console.log("ko")
      setError({ status:"400", message: "ID param is invalid" });
      setLoading(false);
      return
    }  

  
    fetchData();
   
  }, [comicid]);

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
  return (
   
    
      
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
          <Link to={`/marvel-comics/${objectData.id}`}>
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
          </Link>
          <CardActions>

                            {subid && (
                              <Button color="secondary" onClick={() => handleGiveUp(objectData.id,subid)}>
                                Give Up
                              </Button>
                            )}
         </CardActions>
        </Card>

   
  );
          }
  
};

export default ComicsListCard;
