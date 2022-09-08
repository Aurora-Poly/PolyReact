import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Splash from "./components/Splash.js";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Activity from "./pages/Activity";
import Mypage from "./pages/Mypage";

import Settings from "./pages/Settings";
import Circles from "./pages/Circles";
import Volunteer from "./pages/Volunteer";
import Found404 from "./pages/Found404";
import Main from "./pages/Main";
import Modal from "./components/Modal";
import Recommend from "./pages/Recommend";
import Detail from "./pages/Detail.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import DetailContent from "./pages/DetailContent.js";

function App() {
    const insertedToken = localStorage.getItem('token');

    return(
        <Container>
            <BrowserRouter>
                <Navbar/>

                <Routes>
                    
                    {insertedToken ? (
                        <Route path='/' element={<Main/>}></Route>
                    ) : (
                        <Route path="/" element={<Splash/>}></Route>
                    )}
                    
                    <Route path='/mypage' element={<Mypage/>}></Route>
                    <Route path="/mypage/portfolio/:pk" element={<DetailContent/>}></Route>
                    {/* <Route path="/mypage/portfolio/:pk" element={<Modal/>}></Route> */}
                    <Route path="/mypage/:user" element={<Settings/>}></Route>


                    <Route path='/activity' element={<Activity/>}></Route>
                    <Route path='/volunteer' element={<Volunteer/>}></Route>
                    <Route path='club' element={<Circles/>}></Route>

                
                    <Route path="/recommend" element={<Recommend/>}></Route>


                    <Route path="/detail" element={<Detail/>}></Route>
                    <Route path="/activity/:pk" element={<Detail/>}></Route>


                    <Route path='/user/signup' element={<Register/>}></Route>
                    <Route path='/user/login' element={<Login/>}></Route>


                    <Route path='*' element={<Found404/>}></Route>
                </Routes>
                
                {/* <Footer/>  */}
            </BrowserRouter>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.4) 0%,
      rgba(20, 20, 20, 0.4) 70%,
      rgba(20, 20, 20, 0.4)
    ),
    /* url(https://source.unsplash.com/random/1920x1080); */
    /* url("img/purple_night2.jpg"); */ 
    /* background-size: cover; */
    /* background: linear-gradient(80deg, rgba(113,136,208,0.8) 0%, rgba(135,118,176,0.9) 100%); */
    
`;

export default App;
