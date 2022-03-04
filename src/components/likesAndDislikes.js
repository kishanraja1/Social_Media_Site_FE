import {useState} from 'react'
import axios from 'axios'


const LikesAndDislikes = (props) => {
    // fucntion for likes and dislikes. resets the like and dislike.
    // makes api call
    // IMPORT LIKE AND DISLIKE FROM HEROKU
    const [like, setLike] = useState(props.likes)
    const [likeBoolean, setLikeBoolean] = useState(props.likeBoolean)
    const [dislike, setDislike] = useState(props.dislikes)
    const [dislikeBoolean, setDislikeBoolean] = useState(props.dislikeBoolean)

    const addLike = () => {
        if(likeBoolean){
        }else if(dislikeBoolean){
            setLikeBoolean( prevBool => true)
            setDislikeBoolean(prevBool => false)
            setLike(prevLike => prevLike +1 )
            setDislike(prevDislike => prevDislike -1)

            axios.put(
                    `https://stormy-springs-28465.herokuapp.com/posts/${props.id}`,{
                    likes: like+1,
                    dislikes:dislike-1,
                    dislikeBoolean:false,
                    likeBoolean:true
                    }).then(() => {
                        props.getPostsFunction()
                    })
             }
             else if(!dislikeBoolean ){
                setLikeBoolean( prevBool => true)
                setLike(prevLike => prevLike +1 )
                    axios.put(
                            `https://stormy-springs-28465.herokuapp.com/posts/${props.id}`,{
                            likes: like+1,
                            likeBoolean:true
                    }).then(() => {
                        props.getPostsFunction()
                    })
                }

    }


   const addDislike = () => {
        if(dislikeBoolean){
        }else if(likeBoolean){
            setDislikeBoolean(prevBool => true)
            setLikeBoolean(prevBool => false)
            setLike(prevLike => prevLike -1)
            setDislike(prevDislike => prevDislike +1 )

            axios.put(
                    `https://stormy-springs-28465.herokuapp.com/posts/${props.id}`,{
                    likes: like-1,
                    dislikes:dislike+1,
                    dislikeBoolean:true,
                    likeBoolean:false
                    }).then(() => {
                        props.getPostsFunction()
                    })

        }
        else if(!likeBoolean){
            setDislikeBoolean(true)
            setDislike(prevDislike => prevDislike +1 )

            axios.put(
                    `https://stormy-springs-28465.herokuapp.com/posts/${props.id}`,{
                    dislikes:dislike+1,
                    dislikeBoolean:true

            }).then(() => {
                props.getPostsFunction()
            })
        }
    }
    return(
        <>
            <button onClick={addLike}> Like </button>{like}<br/>
            <button onClick={addDislike}> Dislike </button>{dislike}
        </>
    )
}

export default LikesAndDislikes
