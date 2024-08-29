import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const Login = (props) => {

    const [credentials, setcredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    let usenavigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault()

        const url = `http://localhost:5000/api/auth/login`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                }, body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            // if (!response.ok) {
            //     throw new Error(`Response status: ${response.status}`);
            // }

            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save the auth-token and redirect
                localStorage.setItem('token', json.authtoken)
                localStorage.setItem('userEmail', json.user.email);
                props.showAlert('User Authenticated', 'success')
                usenavigate('/')
            }
            else {
                props.showAlert('User Authentication fails', 'danger')
            }

        } catch (error) {
            console.error(error.message);
        }

    }
    return (
        <div className='container'>

            <form onSubmit={handlesubmit} className='my-5'>
                <h3>Login to Continue InoteBook...</h3>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} name='password' className="form-control" id="password" />
                </div>
                <div className="col-auto">
                    <span id="passwordHelpInline" className="form-text">
                        Must be 5-8 characters long.
                    </span>
                </div>

                <button type="submit" className="btn btn-primary my-2" >login</button>
                <p className="form-check-label" >
                     If you don't have an account <Link to="/signup">SignUp</Link> Here
                    </p>
            </form>
        </div>
    )
}

export default Login
