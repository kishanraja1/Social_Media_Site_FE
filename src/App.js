import axios from 'axios';
import {useState, useEffect} from 'react'
import './App.css';
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './components/EditModal'
import LikesAndDislikes from './components/likesAndDislikes'
import Auth from './components/Auth'



// REMEMBER YOU NEED TO HAVE .REVERSE() IN EACH AXIOS.GET OR ELSE THE DATA
// WILL WONT BE REVERSED FOR A RANDOM BUTTON
function App() {

//  form and list of all posts states
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
        post:newPost,
        likes:0,
        dislikes:0,
        likeBoolean:false,
        dislikeBoolean:false
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

  },[])

  return (
    <>
    <Auth />
    <h1>Hi</h1>
    <form onSubmit={(event) => {
      newPostSubmitHandler(event)
    }}>
      {/* for name of poster. for now it will be static */}
      {/* Name: <input defaultValue={""} />
      <br></br> */}
      Post: <input  className={'form-text-input'} required onChange={commentText} />
      <br></br>
      <Button type={'submit'} variant="contained" color="success">
                Submit
      </Button>
    </form>

    <div>
      <ul>
        {
        allPosts.map((post) => {

          return (
            <li key={post._id}>{post.post}
            <br/>
            <Button color={'error'} variant={'contained'}onClick={(event) => {
                  handleDelete(post)
                }}>
                  Delete
                </Button>
                <EditModal content={post.post} id={post._id} getPostsFunction={ () => {
                  getPosts()
                } } />
                <LikesAndDislikes allProps={post} likes={post.likes} 
                dislikes={post.dislikes} id={post._id} likeBoolean={post.likeBoolean} dislikeBoolean={post.dislikeBoolean}
                 getPostsFunction={ () => {
                  getPosts()
                } }/>
              </li>
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
