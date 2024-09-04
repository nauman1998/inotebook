import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const Signup = (props) => {

    const [user, setuser] = useState({ name: "", email: "", password: "", cpassword: "" })

    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    let usenavigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = user
        const url = `http://localhost:5000/api/auth/createuser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                }, body: JSON.stringify({ name, email, password })
            })
            // if (!response.ok) {
            //     throw new Error(`Response status: ${response.status}`);
            // }

            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save the auth-token and redirect
                localStorage.setItem('token', json.authtoken)
                usenavigate('/login')
                props.showAlert('User Created', 'success')
            }
            else {
                props.showAlert('User Creation Fails', 'danger')
            }


        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className='container'>


            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-6">
                    <img className="loginImage" src="https://project-inotebook.netlify.app/static/media/Login-signup.0eb2d81b.png" alt="something" />

                </div>
                <div class="col-lg-6 col-md-12 col-sm-6">
                    <form onSubmit={handlesubmit} className='my-5 signupform'>
                        <h3>SignUp to use Inotebook ...</h3>
                        <div className="form-group">
                            <label htmlFor="name">Enter Name:</label>
                            <input type="text" onChange={onChange} value={user.name} name='name' className="form-control" minLength={3} required id="name" aria-describedby="emailHelp" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Enter Email address:</label>
                            <input type="email" onChange={onChange} value={user.email} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Enter Password:</label>
                            <input type="password" onChange={onChange} value={user.password} minLength={5} required name='password' className="form-control" id="password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cpassword">Confirm Password:</label>
                            <input type="password" onChange={onChange} name='cpassword' minLength={5} required className="form-control" id="cpassword" />
                        </div>

                        <button type="submit" className="btn btn-primary my-2" >SignUp</button>
                        <p className="form-check-label" >
                            If you have an account  <Link to="/login">Login</Link> to continue
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
