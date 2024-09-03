import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export const Navbar = () => {

  let usenavigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    usenavigate('/login')
  }
  let location = useLocation();

  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} aria-current="page" to="/about">About</Link>
            </li>



          </ul>
          {/* {!localStorage.getItem('token')? <div className="d-flex">
            <Link className='btn btn-primary mx-1 my-1' to="/login" role='button'>Login</Link>
            <Link className='btn btn-primary mx-1 my-1'  to="signup" role='button'>SignUp</Link>
          </div>:  <button className='btn btn-primary mx-1 my-1 ' type='submit' onClick={handlelogout}   >Logout</button>} */}
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-success" type="submit">Search</button>
          </form>

          <div className="d-flex align-items-center">
            {localStorage.getItem('token') ? (
              <>


                <span className="navbar-text mx-2 text-light">Welcome !, {localStorage.getItem('userEmail')}</span>
                {/* <button className="btn btn-primary mx-1 my-1" onClick={handlelogout}>Logout</button> */}
                <div className="dropdown">
                  <button className="btn  btn-success dropdown-toggle my-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user fa-2x text-white me-2 mx-2" style={{ color: '#fff' }}></i>
                  </button>
                  <ul className="dropdown-menu my-2" aria-labelledby="dropdownMenuButton1">
                    <li> <button className="dropdown-item btn btn-primary" onClick={handlelogout}>
                Logout
              </button></li>

                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link className='btn btn-primary mx-1 my-1' to="/login" role='button'>Login</Link>
                <Link className='btn btn-primary mx-1 my-1' to="/signup" role='button'>SignUp</Link>
              </>
            )}
          </div>


        </div>
      </div>
    </nav>
  )
}
    