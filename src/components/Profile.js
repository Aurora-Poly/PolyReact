import styled from "styled-components";
import { RiSettings4Fill } from "react-icons/ri";
import { IoIosSchool,IoIosJournal } from "react-icons/io";
import { Link } from "react-router-dom";
import { POLY_SERVER } from "../API.js"; 
import axios from 'axios';
import {useState, useEffect} from 'react';

//portfolioManage 페이지의 프로필을 담는 컴포넌트
function Profile(){
    const iconStyle = {marginRight: "10px"};
    const settingStyle = {marginLeft: "10px", cursor: "pointer"};
    
    //유저정보 불러오기(이름,학교,학과)====================================================================
    const [profile,setProfile] = useState({});
    const getProfile = async ()=> {
        const response = await axios.get(`${POLY_SERVER}/user/profile/${localStorage.getItem('username')}/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
            );
        console.log(response.data);
        setProfile({
            univ: response.data.univ,
            dept: response.data.dept,
        });
    }
    //프로필 이미지 불러오기====================================================================
    const username = localStorage.getItem('username');
    const [image,setImage] = useState('');
    const getImage = async()=> {
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profileimg/`
            ,{ headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
        );
        setImage(response.data[0].image);
    }

    useEffect(()=>{
        getProfile();
        getImage();
    },[]);

    return(
        <ProfileContainer>
            {image ?
                <img src={image} width="100px" height="100px" style={{borderRadius:"100%"}}></img>
                :
                <div className="profile_image"></div>
            }
            <h2>
                {localStorage.getItem('username')}
                <Link to={`/mypage/${localStorage.getItem('username')}`}>
                    <RiSettings4Fill size="20px" style={settingStyle} />
                </Link>
            </h2>
            <div className="user_info">
                {profile.univ !== '' ?
                    <p><IoIosSchool size="15px" style={iconStyle}/>{profile.univ}</p>
                :
                    <p><IoIosSchool size="15px" style={iconStyle}/>학교</p>
                }

                {profile.dept !== '' ?
                    <p><IoIosJournal size="13px" style={iconStyle}/>{profile.dept}</p>
                :
                    <p><IoIosJournal size="13px" style={iconStyle}/>학과</p>
                }
            </div>
        </ProfileContainer>
    )
}

const ProfileContainer = styled.div`
    width: 380px;
    height: auto;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
    padding: 20px;

    >h2{margin: 10px 0;}

    .profile_image{
        width: 100px;
        height: 100px;
        border: 2px solid #e6e6e6;
        border-radius: 50%;
        background-image: url("/img/blank-profile.png");
        background-size: cover;
        background-position: center;
        margin: 0 auto;
    }
    .user_info{
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
    
        p {margin: 0;}
    }
`;

export default Profile;