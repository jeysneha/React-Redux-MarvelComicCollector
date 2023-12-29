import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import {Grid} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ComicsListCard from './ComicsListCard';
function Sub(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allhan = useSelector((state) => state.han);
  const Sub = allhan.find(subs => subs.subid === props.sub.id);
  console.log(Sub)
  let cardsData=null
  cardsData =Sub && Sub.col.map((id) => {
        
         return <ComicsListCard id={id} key={id} subid={props.sub.id}/>;
         
                    });
  const deleteSub = () => {
    dispatch(actions.deleteSub(props.sub.id));
  };
  const selectSub = () => {
    
    dispatch(actions.selectSub(props.sub.id));
    navigate(`/marvel-comics/page/1`)
  
  };
  const subs_ = useSelector(state => state.subs); 
  let selectedSubId=undefined
  for(let x of subs_){
    if(x.selectedSub){
      selectedSubId=x.selectedSub
    
    }
    }


  return (
    <Card className='todo-wrapper todo'>
      <CardActions onClick={selectSub}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Sub Collection: {props.sub.name}
        </Typography>
        
      </CardContent>
      </CardActions>
      <br/> <br/>
      {selectedSubId!==props.sub.id &&(
      <CardActions>
        <Button size="small" color="primary" onClick={deleteSub}>
          Delete SubCollection
        </Button>
       
      </CardActions>)}
      
      {Sub && Sub.subid===props.sub.id&&(
        <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          flexDirection: 'row'
        }}
      >
      {cardsData} 
       
      </Grid>
      )}
      
    </Card>
  );
}

export default Sub;
