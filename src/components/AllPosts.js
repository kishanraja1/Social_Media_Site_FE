import EditModal from './EditModal'
import LikesAndDislikes from './likesAndDislikes'
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState, useEffect} from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';

const AllPosts = (props) => {

    

    const getPosts = () => {
        axios.get('https://stormy-springs-28465.herokuapp.com/posts').then((res) => {
          props.setAllPosts(res.data.reverse())
          // console.log(res.data)
        })
      }


      // delete the post
  const handleDelete = (p)=>{
    axios
        .delete(`https://stormy-springs-28465.herokuapp.com/posts/${p._id}`)
        .then(()=>{
            axios
                .get('https://stormy-springs-28465.herokuapp.com/posts')
                .then((response)=>{
                    props.setAllPosts(response.data.reverse())
                })
        })
  }

  // what starts on page load
  useEffect(() => {
    getPosts()

  },[])

return(
<ul>
        {
        props.allPosts.map((post) => {

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
      )

}

export default AllPosts