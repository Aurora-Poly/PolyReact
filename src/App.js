import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Splash from "./components/Splash.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import UserLogin from "./pages/auth/UserLogin.js";
import UserRegister from "./pages/auth/UserRegister.js";
import UserSettings from "./pages/auth/UserSettings.js";
import Activity from "./pages/activity/Activity";
import ActivityDetail from "./pages/activity/ActivityDetail.js";
import PortfolioPreview from "./pages/portfolio/PortfolioPreview.js";
import PortfolioManage from "./pages/portfolio/PortfolioManage.js";
import PortfolioDetail from "./pages/portfolio/PortfolioDetail.js";
import Volunteer from "./pages/Volunteer";
import VolunteerDetail from "./pages/VolunteerDetail.js";
import Recommend from "./pages/Recommend";
import Clubs from "./pages/Clubs";
import Found404 from "./pages/Found404";

function App() {
    const insertedToken = localStorage.getItem('token');

    return(
        <Container>
            <BrowserRouter>
                <Navbar/>

            <ContentContainer>
                <Routes>
                {insertedToken ? 
                    <Route path='/' element={<PortfolioPreview/>}/>
                    :
                    <Route path='/' element={<Splash/>}/>
                }
                    <Route path='/main' element={<PortfolioPreview/>}/>
                    <Route path='/mypage' element={<PortfolioManage/>}/>
                    <Route path="/mypage/portfolio/:pk" element={<PortfolioDetail/>}/>
                    <Route path="/mypage/:user" element={<UserSettings/>}/>
                    <Route path='/activity' element={<Activity/>}/>
                    <Route path="/activity/:pk" element={<ActivityDetail/>}/>
                    <Route path='/volunteer' element={<Volunteer/>}/>
                    <Route path='/volunteer/:pk' element={<VolunteerDetail/>}/>
                    <Route path='/clubs' element={<Clubs/>}/>
                    <Route path="/recommend" element={<Recommend/>}/>
                    <Route path="/detail" element={<PortfolioDetail/>}/>
                    <Route path='/user/signup' element={<UserRegister/>}/>
                    <Route path='/user/login' element={<UserLogin/>}/>
                    <Route path='*' element={<Found404/>}/>

                </Routes>
                
                {/* <Footer/>  */}
            </ContentContainer>
            </BrowserRouter>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
`;
const ContentContainer = styled.div`
    position: absolute;
    top: 63px;
    left: 0;
    width: 100%;
    height: 100vh;
`;

export default App;
