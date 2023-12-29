import Sub from './Sub';
import AddSub from './AddSub';
import {useState} from 'react';
import {useSelector} from 'react-redux';
function Subs() {
  const [addBtnToggle, setBtnToggle] = useState(false);
  const allSubs = useSelector((state) => state.subs);
  console.log('allSubcollection', allSubs);
  return (
    <div className='todo-wrapper todos'>
      <h2>My SubCollections</h2>
      <button onClick={() => setBtnToggle(!addBtnToggle)}>Add A SubCollection</button>
      <br />
      <br />
      <br />
      {addBtnToggle && <AddSub />}
      <br />
      {allSubs.map((sub) => {
        console.log(sub);
        if(sub.id){
        return <Sub key={sub.id} sub={sub} />;}
      })}
      <br />
      <br />
    </div>
  );
}

export default Subs;
