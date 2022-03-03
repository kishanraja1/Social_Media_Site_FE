import axios from 'axios';
import {useState, useEffect} from 'react'
import './App.css';
import Register from './components/Register'

function App() {
  // temporary data bc i cannot get the get bc of cors.
  const [allPosts, setAllPosts] = useState([])
  const [ name, setName] = useState('')
  const [ newPost, setNewPost] = useState('')

  // const getPosts = () => {
  //   axios.get('localhost:3000').then((res) => {
  //     console.log(res.data)
  //   })
  // }

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
              setAllPosts(res.data)
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
                    setAllPosts(response.data)
                })
        })
  }

  // what starts on page load
  useEffect(() => {
    axios.get('https://stormy-springs-28465.herokuapp.com/posts').then((res) => {
      setAllPosts(res.data)
      // console.log(res.data)
    })
  },[])

  return (
    <>
    <Register setAllPosts={setAllPosts}/>
    <h1>Hi</h1>
    <form onSubmit={(event) => {
      newPostSubmitHandler(event)
    }}>
      {/* for name of poster. for now it will be static */}
      {/* Name: <input defaultValue={""} />
      <br></br> */}
      Post: <textarea required onChange={commentText} />
      <br></br>
      <input type={'submit'}/>

    </form>
    <div>
      <ul>
        {
        allPosts.map((post) => {

          return (
            <>
            <li key={post._id}>{post.post}
            <br/>
            <button onClick={(event) => {
                  handleDelete(post)
            }}>Delete</button>
            </li>

            </>
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
