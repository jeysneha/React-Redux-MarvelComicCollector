import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import '../App.css';
function AddSub() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({name: ''});
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setError('');
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };
  const addSub = () => {
    if (!formData.name.trim() || formData.name.length > 100) {
      setError('BadInput 400: Invalid Input Name It must be between 1 and 100 characters.');
      return;
    }
    dispatch(actions.addSub(formData.name));
    document.getElementById('name').value = '';
    setFormData({ name: '' });
  };
  console.log(formData);
  return (
    <div className='add'>
      <div className='input-selection'>
        <label>
          Enter Sub Collection Name:
          <input
            onChange={(e) => handleChange(e)}
            id='name'
            name='name'
            placeholder='Subcollection name...'
          />
        </label>
        <br />
        {error && <p className="error">{error}</p>}
      </div>
      <button onClick={addSub}>Click to Add it!</button>
    </div>
  );
}

export default AddSub;
