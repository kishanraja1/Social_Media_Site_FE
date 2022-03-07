import EditModal from './EditModal'
import LikesAndDislikes from './likesAndDislikes'
// import Button from '@mui/material/Button';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {useEffect} from 'react'
import { AiFillDelete } from "react-icons/ai"


// import DeleteIcon from '@mui/icons-material/Delete';

import '../App.css';

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
  })

return(
  <div className='postsContainer'>
          {
          props.allPosts.map((post) => {

            return (

              <Card className='posts' key={post._id} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Name</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.author}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{post.createdAt}</Card.Subtitle>
                <Card.Text>
                  {post.post}
                </Card.Text>

                {props.userObj?._id !== post.author ?
                    "": <div> <Button onClick={(event) => {
                        handleDelete(post)
                      }}>
                        <AiFillDelete />
                      </Button>

                      <EditModal content={post.post} id={post._id} getPostsFunction={ () => {
                        getPosts()
                      } } />

                      </div> }
              </Card.Body>
              <LikesAndDislikes allProps={post} likes={post.likes}
                              dislikes={post.dislikes} postID={post._id} forLike={props.forLike} userID={props.userObj}
                              
                              getPostsFunction={ () => {
                                getPosts()
                              } }/>
            </Card>

              )
          })
        }

      </div>
      )

}

export default AllPosts


// <ul>
//         {
//         props.allPosts.map((post) => {
//
//           return (
//             <li key={post._id}>{post.post}
//             <br/>
//
//             {/* checks if current user made the post.*/}
            // {props.userObj?._id != post.author ?
            //     "": <div> <Button color={'error'} variant={'contained'}onClick={(event) => {
            //         handleDelete(post)
            //       }}>
            //         Delete
            //       </Button>
            //       <EditModal content={post.post} id={post._id} getPostsFunction={ () => {
            //         getPosts()
            //       } } /> </div> }
//
//                 <LikesAndDislikes allProps={post} likes={post.likes}
//                 dislikes={post.dislikes} id={post._id} likeBoolean={post.likeBoolean} dislikeBoolean={post.dislikeBoolean}
//                  getPostsFunction={ () => {
//                   getPosts()
//                 } }/>
//               </li>
//             )
//         })
//       }
//       </ul>
