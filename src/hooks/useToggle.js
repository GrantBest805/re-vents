import {useState} from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = () => {
    setState(!state)
  }
  //  return piece of state AND a function to toggle it 
  return [state, toggle]
}

export default useToggle;