import { useState, useEffect } from 'react'
import axios from 'axios'

const Register = () => {

  // state for user field
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [matchPwd, setMatchPwd] = useState('')

  //error or successful create
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
            axios.post(
              'http://localhost:3000/users',{
                username: user,
                password: pwd
              }
            )
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
    }




  return (
    <div>
    {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ) : (
            <section>
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />


                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />

                    <button disabled={!user || !pwd ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="#">Sign In</a>
                    </span>
                </p>
            </section>
        )}
    </div>
  )
}

export default Register
