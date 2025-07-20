import { useState } from 'react'
import Landing from './pages/Landing'
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import VideoMeeting from './pages/VideoMeeting';
import History from './pages/History'

function App() {


  return (
    <>

    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/auth" element={<Authentication/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/history" element={<History/>} />
        <Route path="/:url" element={<VideoMeeting/>}/>
      </Routes>
      </AuthProvider>
    </Router>
   
    </>
  )
}

export default App
