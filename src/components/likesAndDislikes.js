import {useState} from 'react'
import axios from 'axios'
import { BiLike, BiDislike } from 'react-icons/bi'


const LikesAndDislikes = (props) => {
    // fucntion for likes and dislikes. resets the like and dislike.
    // makes api call
    // IMPORT LIKE AND DISLIKE FROM HEROKU
    const [like, setLike] = useState(props.likes)
    const [dislike, setDislike] = useState(props.dislikes)

    const addLike = async () => {
    
      let likedObject = await axios.put(`https://stormy-springs-28465.herokuapp.com/likes/${props.userID._id}/${props.postID}`)

      setLike(likedObject.data.likes)
      setDislike(likedObject.data.dislikes)
    //   console.log(likedObject.data);
    //    setLike(likedObject.)

        // console.log(props.userID._id)
        // console.log(props.postID);
        // console.log(likedObject)

      props.getPostsFunction()

    
    }


   const addDislike = async () => {


    let likedObject = await axios.put(`https://stormy-springs-28465.herokuapp.com/likes/${props.userID._id}/${props.postID}/dislike`)

    setLike(likedObject.data.likes)
    setDislike(likedObject.data.dislikes)
    //   console.log(likedObject.data);
    //    setLike(likedObject.)

    // console.log(props.userID._id)
    // console.log(props.postID);
    // console.log(likedObject)

    props.getPostsFunction()
    }
    return(
        <>
            <button onClick={addLike}> <BiLike /> </button>{like}<br/>
            <button onClick={addDislike}> <BiDislike /> </button>{dislike}
        </>
    )
}

export default LikesAndDislikes
