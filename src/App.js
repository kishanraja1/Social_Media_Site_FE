import axios from 'axios';
import {useState, useEffect} from 'react'
import './App.css';
import Auth from './components/Auth'
import AllPosts from './components/AllPosts'
import Button from '@mui/material/Button';




// REMEMBER YOU NEED TO HAVE .REVERSE() IN EACH AXIOS.GET OR ELSE THE DATA
// WILL WONT BE REVERSED FOR A RANDOM BUTTON
function App() {

//  form and list of all posts states
  const [allPosts, setAllPosts] = useState([])
  const [ name, setName] = useState('')
  

  return (
    <>
    <h1>Hi</h1>

    <Auth allPosts={allPosts} setAllPosts={setAllPosts} />

    
    </>
  );
}

export default App;


// edit
// either make a new page or make modal
// fill with post name data.
// MODAL: use lightbox logic to click out of it?
// MUI framework instead
//
//
//
