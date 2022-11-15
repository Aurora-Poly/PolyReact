import styles from "../styles/Navbar.module.css";
import styled from "styled-components";
import { Link,useNavigate } from 'react-router-dom';
import { CgUserlane } from "react-icons/cg";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { useState } from "react";

function Navbar(){
    const insertedToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const doLogout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        console.log("로그아웃 되었습니다.");
        navigate('/');
        window.location.reload();
    }
    const [isClick, setIsClick]=useState(false);
    const clickToggle =()=>{
        setIsClick(!isClick);
    }

    return(
        //2022.10.06
        <div className={styles.container}>
            <div className={styles.logo}>
                <LogoLink to="/">POLY</LogoLink>
            </div>
            <div className={styles.toggle} onClick={()=>clickToggle()}><HiOutlineMenuAlt3 size="30px" color="#54d498"/></div>
            <nav className={isClick ? `${styles.active}`:`${styles.nav}`}>
                <ul>
                    {insertedToken ? (<li><StyledLink to='/mypage'>포트폴리오관리</StyledLink></li>) : null}
                    <li><StyledLink to='/activity'>대외활동/공모전</StyledLink></li>
                    <li><StyledLink to='/volunteer'>봉사활동</StyledLink></li>
                    <li><StyledLink to='/clubs'>동아리</StyledLink></li>
                </ul>
                <div className={styles.auth}>
                    {insertedToken ? 
                        ( //토큰 있으면
                        <>
                            <CgUserlane size="18px"color="#54d498"/>&nbsp;
                            <span>{username}</span>

                            <span onClick={doLogout}>로그아웃</span>
                        </>
                        ) 
                        : 
                        (
                            <span><LoginLink to='/user/login'>로그인</LoginLink></span>
                        )}
                </div>
            </nav>
            <div className={styles.clearfix}></div>
        </div>
    );
}

const LogoLink = styled(Link)`
    text-decoration: none;
    color: #526acc;

    &:visited{
        color: #526acc;
    }

`;

const StyledLink = styled(Link)`
    text-decoration: none;
    border-radius: 20px;
    margin: 10px 0;
    padding: 10px 20px;
    color: #777;
    cursor: pointer;

    /* &:hover{
        background-color: rgba(113,136,207,0.4);
        color: #fff;
        transition: all 0.3s;
    } */
    @media (max-width: 820px) {
        display: block;
    }
`;

const LoginLink = styled(Link)`
    text-decoration: none;
    background-color: #54d498;
    border-radius: 5px;
    position: relative;
    top: 4px;
    padding: 10px 20px;
    color: #fff;
    cursor: pointer;

    &:hover{
        background-color: green;
        border-radius: 5px;
        color: #fff;
        transition: all 0.3s;
    }
`;



export default Navbar;