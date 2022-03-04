import axios from 'axios';
import {useState, useEffect} from 'react'
import Auth from './components/Auth'
import AllPosts from './components/AllPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


import './App.css';

// REMEMBER YOU NEED TO HAVE .REVERSE() IN EACH AXIOS.GET OR ELSE THE DATA
// WILL WONT BE REVERSED FOR A RANDOM BUTTON
function App() {

//  form and list of all posts states
  const [allPosts, setAllPosts] = useState([])



  return (
    <>

    <h1>Social Club</h1>
    <FontAwesomeIcon icon={faCoffee} />
    <Auth allPosts={allPosts} setAllPosts={setAllPosts} />

    </>
  );
}

export default App;
