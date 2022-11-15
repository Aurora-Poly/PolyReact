import styled from "styled-components";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Profile from "../../components/Profile";
import { Outlet,useNavigate } from "react-router";
import {Link} from "react-router-dom";


function PortfolioManage(){
    const navigate = useNavigate();
    
    useEffect(()=>{
        navigate("home");
    },[]);
    return(
        <>
        <PortfolioManageContainer>
            <Profile />

            <TabMenu>
                <ul>
                    <li><StyledLink to="/mypage/home">Home</StyledLink></li>
                    <li><StyledLink to="/mypage/portfolio">포트폴리오</StyledLink></li>
                    <li><StyledLink to="/mypage/resume">자기소개서/이력서</StyledLink></li>
                    <li><StyledLink to="/mypage/bookmark">북마크</StyledLink></li>
                </ul>
            </TabMenu>
            <ContentContainer>

                <Outlet/>
            </ContentContainer>
        </PortfolioManageContainer>

        </>
    )
}



const PortfolioManageContainer = styled.div`
    width: 100%;
    height: 1100px;
    overflow-x: hidden;
    background-blend-mode: multiply;
    background: url('/img/blur_desk3.jpg') no-repeat center center/cover, rgba(0,0,0,0.1);
`;

const ContentContainer = styled.div`    
    width: 800px;
    height: auto;
    box-sizing: border-box;
    padding: 50px;
    margin: 0 auto;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    background-color: #fff;
`;

const TabMenu = styled.div`
    width: 500px;
    height: 50px;
    margin: 0 auto;
    margin-bottom: 10px;
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 50px;
    background-color: #fff;

    > ul{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        column-gap: 20px;

        .is-active{
            font-weight: 600;
            color: rgb(113,136,208);
        }

        li{
            list-style-type: none;
            color: rgb(169,169,169);
            cursor: pointer;
            transition: all 0.5s;
        }
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #818181;

    &:hover{
        color: #526acc;
        font-weight: 600;
    }

    &:focus,&:visited, &:link, &:active {
        text-decoration: none;
    }
`;


export default PortfolioManage;