import axios from 'axios';
import {useState, useEffect} from 'react'
import './App.css';

function App() {
  // temporary data bc i cannot get the get bc of cors.
  const [allPosts, setAllPosts] = useState([1,2,3,4,5])
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
      'http://localhost:3000/posts',{
        post:newPost
        })
        .then(() => {
          axios.get('http://localhost:3000/posts')
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
        .delete(`http://localhost:3000/characters/${p._id}`)
        .then(()=>{
            axios
                .get('http://localhost:3000/characters')
                .then((response)=>{
                    setAllPosts(response.data)
                })
        })
  }

  // what starts on page load
  useEffect(() => {
    axios.get('http://localhost:3000/posts').then((res) => {
      console.log(res.data)
    }) 
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
            <li>{post} 
            <br/>
            <button onClick={handleDelete}>Delete</button>
            
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
