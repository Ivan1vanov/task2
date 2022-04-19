import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap'


const Navbar = () => {

    const info = localStorage.getItem('currentUserName')
    const user = info !== null ? JSON.parse(info) : ''
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) {
            navigate('/hello')
        }
    }, [])

    const logoutHandler = (e: React.MouseEvent<HTMLElement>) => {
        localStorage.clear()
        navigate('/hello')
    }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
<Link className="navbar-brand" to="/">Task 3</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarText">
  <ul className="navbar-nav mr-auto">
    <li id='1' className="nav-item">
      <a className="nav-link" href="#">Source code</a>
    </li>
    <li id='1' className="nav-item">
      <Link className="nav-link" to="/">Create message</Link>
    </li>
    <li id='1' className="nav-item">
    <Link className="nav-link" to="/sended">Sended messages</Link>
    </li>
  </ul>
   {user ? (
        <Button variant='danger' onClick={logoutHandler}>
        Log out
    </Button>
   ) : (
       <span></span>
   )}

</div>
</nav>
  </div>
  )
}

export default Navbar