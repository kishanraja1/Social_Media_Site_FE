import Button from '@mui/material/Button';
import axios from 'axios';
import {useState} from 'react'



const MakePost = (props) => {
    const [ newPost, setNewPost] = useState('')

     // for posting the new post
    const newPostSubmitHandler =  (event) => {
        event.preventDefault();
        axios.post(
          'https://stormy-springs-28465.herokuapp.com/posts',{
            post:newPost,
            likes:0,
            dislikes:0,
            likeBoolean:false,
            dislikeBoolean:false,
            // author: "622155e2385f63508588e9a0"
            })
            .then(() => {
              axios.get('https://stormy-springs-28465.herokuapp.com/posts')
                .then((res) =>{
                  props.setAllPosts(res.data.reverse())
          })
        })
      }

    // update state for the comment
 const commentText = (event) => {
    //  console.log(event.target.value)
     setNewPost( event.target.value)
    }

return(
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
      )
}


export default MakePost