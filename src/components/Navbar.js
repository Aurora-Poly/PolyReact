import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CgUserlane } from "react-icons/cg";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar(){
    const insertedToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const doLogout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        console.log("로그아웃 되었습니다.");
        navigate("/");
        window.location.reload();
    }

    return(
        <NavBox>
            <Logo>
                {insertedToken ? (
                    <StyledLink to='/'>POLY</StyledLink>
                ) : (
                    <StyledLink to='/'>POLY</StyledLink>
                )}
            </Logo>
                <Ul>
                    <Li>
                        {insertedToken ? (
                            <StyledLink to='/mypage'>포트폴리오관리</StyledLink>
                        ) : null}
                    </Li>
                    <Li>
                        <StyledLink to='/activity'>대외활동/공모전</StyledLink>
                    </Li>
                    <Li>
                        <StyledLink to='/volunteer'>봉사활동</StyledLink>
                    </Li>
                    <Li>
                        <StyledLink to='/club'>동아리</StyledLink>
                    </Li>
                </Ul>

                {insertedToken ? ( //토큰 있으면
                <>
                    <CgUserlane size="18px" color="#2e4057"/>&nbsp;&nbsp;
                    <span style={{color:"#2e4057"}}>username</span>

                    <span style={{marginLeft:"30px", color:"#2e4057", fontWeight:"600"}} onClick={doLogout}>로그아웃</span>
                </>
                ) : (
                    <div style={{marginLeft:"20px",fontWeight:"600"}}>
                        <StyledLink to='/user/login'>로그인</StyledLink>
                    </div>
                )}
        </NavBox>
    );
}


const NavBox = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    height:80px;
    background-color: transparent;
`;
const Logo = styled.div`
    height: 40px;
    font-size:30px;
    font-weight: 600;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #2e4057;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: #2e4057;
    }
`;
const Ul = styled.ul`
    display: flex;
    align-items: center;
    padding-left: 0;
    margin-left: 100px;
    margin-right: 100px;
`;
const Li = styled.li`
    display: relative;
    margin: 15px;
    font-size: 16px;
    font-weight: 500;
    opacity: 0.9;
    list-style: none;
    color: #2e4057;
`;



export default Navbar;