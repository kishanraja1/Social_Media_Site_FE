import axios from 'axios';
import {useState, useEffect} from 'react'
import './App.css';
import EditModal from './components/EditModal'

// REMEMBER YOU NEED TO HAVE .REVERSE() IN EACH AXIOS.GET OR ELSE THE DATA
// WILL WONT BE REVERSED FOR A RANDOM BUTTON 
function App() {

  // temporary data bc i cannot get the get bc of cors.
  const [allPosts, setAllPosts] = useState([])
  const [ name, setName] = useState('')
  const [ newPost, setNewPost] = useState('')


  const getPosts = () => {
    axios.get('https://stormy-springs-28465.herokuapp.com/posts').then((res) => {
      setAllPosts(res.data.reverse())
      // console.log(res.data)
    }) 
  }

  // for posting the new post
  const newPostSubmitHandler =  (event) => {
    event.preventDefault();
    axios.post(
      'https://stormy-springs-28465.herokuapp.com/posts',{
        post:newPost
        })
        .then(() => {
          axios.get('https://stormy-springs-28465.herokuapp.com/posts')
            .then((res) =>{
              setAllPosts(res.data.reverse()) 
      })
    }) 
  }

 // update state for the comment
 const commentText = (event) => {
  //  console.log(event.target.value)
   setNewPost( event.target.value)
  }

  // delete the post
  const handleDelete = (p)=>{
    axios
        .delete(`https://stormy-springs-28465.herokuapp.com/posts/${p._id}`)
        .then(()=>{
            axios
                .get('https://stormy-springs-28465.herokuapp.com/posts')
                .then((response)=>{
                    setAllPosts(response.data.reverse())
                })
        })
  }

  // what starts on page load
  useEffect(() => {
    getPosts()
      // console.log(res.data)
   
  },[])

  return (
    <>
    <h1>Hi</h1>
    <form onSubmit={(event) => {
      newPostSubmitHandler(event)
    }}>
      {/* for name of poster. for now it will be static */}
      {/* Name: <input defaultValue={""} />
      <br></br> */}
      Post: <input 
      style={
      {width:"300px",
      height:"40px",
      borderRadius:"15px",
      border:"2px solid black"}} 
      required onChange={commentText} />
      <br></br>
      <input type={'submit'}/>

    </form>
    
    
    <div>
      <ul>
        { 
          allPosts.map((post) => {
            
            return (
            //  outter most container/ element must have a key
              <li key={post._id}>
                <div className='postDiv'>
                {post.post} 
                <br/>
                <button onClick={(event) => {
                      handleDelete(post)
                }}>Delete</button>
                <EditModal content={post.post} id={post._id} getPostsFunction={ () => {
                  getPosts()
                } } />
                </div>
              </li>
              // because react sucks
              // because react sucks
            )
        })
      }
      </ul>
    </div>
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
