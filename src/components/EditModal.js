import * as React from 'react';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import {useState} from 'react';

// SHOW ASHLEY. Think its line one. causing this warning. it is yellow.
// react_devtools_backend.js:4061 You are loading @emotion/react when it is already loaded.
//  Running multiple instances may cause problems. This can happen if multiple versions are used,
//   or if multiple builds of the same version are used.
const EditModal = (props) => {

    // state for the form
    const [contentState, setContentState] = useState(props.content)


    // Modal State
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // style for Box from mui
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // Submit the edit form
    const submitEdit = async (event) => {
        event.preventDefault()
        // put inital state to '' and run this logic again to show

        // wont setContentState won't update on the
        //  first run but will subsequently
        // if(contentState === ''){
        //     console.log('true')
        //     console.log(props.content)
        //     // think as async event. takes time to do.
        //     setContentState(props.content)
        // } else{
        //     console.log('guess not')
        // }
        // contentState == '' ? setContentState(props.content) : ''
        // !!!!!!!!!!!! ADD MORE TO THE OBJECT SCHEMA.
      const getData =  await axios.put(`https://stormy-springs-28465.herokuapp.com/posts/${props.id}`,
      {
          post:contentState
      })

      handleClose()
      props.getPostsFunction()
    //   console.log('hi from edit Modal')
    //   console.log(getData.data)

    }

    // update state for form inputs
    const ChangeContentState = (event) => {
        //  console.log(event.target.value)
         setContentState( event.target.value)
        }

    return(
    <>
    {/* button to open Modal. A form inside to update posts. */}
    <Button onClick={handleOpen}>Edit </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={submitEdit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {/* Poster:<input /> */}
                Poster: Add prop later
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               <input className={'form-text-input'} defaultValue={props.content} onChange={ChangeContentState}/>
               <br/>
               <Button type={'submit'} variant="contained" color="success">
                Submit
                </Button>
            </Typography>
                </form>
            </Box>
        </Modal>
        </>
    )
}


export default EditModal
