//used single component auth markdown to achieve
import React, { useState } from 'react'
import axios from 'axios'
import AllPosts from './AllPosts'
import MakePost from './MakePost'


const Auth = (props) => {
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userObj, setUserObj] = useState()


//sets username and password to blank and then posts usernam and pwd to db.
  const handleCreateUser = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    axios.post('https://stormy-springs-28465.herokuapp.com/users/createaccount',
    {
      username: username,
      password: password
    })
    //then checks the state of username and removes all errors and sets userstate to current user after creation
    .then((response) => {
      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
        //post errors, if any
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
    })
  }


//find username and pwd in in data base. functions on backend will send responses for any errors.
  const handleLogin = (event) => {
    event.preventDefault()
    axios.put('https://stormy-springs-28465.herokuapp.com/users/login',
    {
      username: username,
      password: password
    })// if we log in successfully, all error messages will be blank and we will see a logout button render
    .then((response) => {
      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setToggleError(true)
        setErrorMessage(response.data)
      }
    }).then(() => {
      axios.get(`https://stormy-springs-28465.herokuapp.com/users/findOne/${username}`,
    ).then((res) => {
      setUserObj(res.data)
    })
    })
  }

// changes state of user to empty.
  const handleLogout = () => {
    setUsername('')
    setPassword('')
    setCurrentUser({})
    handleToggleLogout()
  }

//toggle button to show need an account or already have an account
  const handleToggleForm = () => {
    setToggleError(false)
    if(toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

// toggle logout function that will determine if a logout button renders. If true, logout button will render. if false, login form will appear
  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

  
  return (
    <div>
      <div>
        {toggleLogout ?
          <button onClick={handleLogout}>Logout</button> :
          <div>
            {toggleLogin ?
              //login form
              <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                  <input type='text' placeholder='username' onChange={(event)=> {setUsername(event.target.value)}}/>
                  <input type='password' placeholder='password' onChange={(event)=> {setPassword(event.target.value)}}/>
                  {toggleError ?
                    <h5>{errorMessage}</h5>
                    :
                    null
                  }
                  <input type='submit' value='Login'/>
                </form>
              </div>
            :
            // new user form
            <div>
              <h1>Create an Account</h1>
              <form onSubmit={handleCreateUser}>
                <input type='text' placeholder='username' onChange={(event)=> {setUsername(event.target.value)}}/>
                <input type='password' placeholder='password' onChange={(event)=> {setPassword(event.target.value)}}/>
                {toggleError ?
                  <h5>{errorMessage}</h5>
                  :
                  null
                }
                <input type='submit' value='Register'/>
              </form>
            </div>
            }
            <button onClick={handleToggleForm}>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
          </div>
        }


      </div>
      {currentUser.username ?
        <div>
          <h1>Hello, {currentUser.username}, </h1>
          <MakePost allPosts={props.allPosts} setAllPosts={props.setAllPosts} userObj={userObj} />
          <br/>
          <AllPosts allPosts={props.allPosts} setAllPosts={props.setAllPosts} userObj={userObj} username={username}/>
        </div>
        :
        null
      }
    </div>
  );
}

export default Auth;
