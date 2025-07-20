import React from 'react'
import "../Landing.css"
import { Link, useNavigate } from 'react-router-dom'



function Landing() {
  const navi = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">SkyBridge</div>
        <div className='navlist'>
          <p onClick={() => {
            navi("/aljk23")
          }}>Join as Guest</p>
          <p onClick={() => {
            navi("/auth")

          }}>Register</p>
          <div onClick={() => {
            navi("/auth")

          }} role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="ladingMainPagecontainer">
        <div className="side-left">
          <h1> <span className='connect'>Connect</span> With You</h1>
          <h1>Loved One</h1>
          <p>Conver a distance by Video caller</p>
          <div role='button'>
            <Link to='/home' style={{ textDecoration: "none", color: "white" }}>Get Started</Link>
          </div>
        </div>
        <div className="side-right">
          <img src="/mobile.png" alt="mobile" />
        </div>
      </div>

    </div>
  )
}

export default Landing
