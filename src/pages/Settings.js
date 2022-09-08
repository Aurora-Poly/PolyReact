import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import Input from '../elements/Input';

function Settings(){
    //프로필 불러오기
    const [profile, setProfile] = useState({
        name: '',
        univ: '',
        dept: '',
        age: 0,
        image: '',
    });
    // const {user} = useParams();
    const [user,setUser] = useState(localStorage.getItem('username'));
    const [image, setImage] = useState(null);
    const getProfile = async ()=> {
        const response = await axios.get(`http://127.0.0.1:8000/user/profile/${user}/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
            );
        console.log(response);
        setProfile({
            name: response.data.name,
            univ: response.data.univ,
            dept: response.data.dept,
            age: response.data.age,
        });
        setImage(response.data.image);
    }

    useEffect(()=>{
        getProfile();
    },[])

    const editProfile =(event)=>{
		setProfile(
            {
                ...profile,
			// ...content,
			[event.target.name]: event.target.value
		    }
        );
        console.log([event.target.name], event.target.value);
	};

    const editProfileImage =(event)=>{
        setImage(event.target.files[0]);
    }

    //수정하기,저장하기
    const saveAll =(e)=>{
        e.preventDefault();
        const fd= new FormData();
        fd.append("name", profile.name);
        fd.append("age", profile.age);
        fd.append("univ", profile.univ);
        fd.append("dept", profile.dept);
        // fd.append("image", image);
        axios.patch(`http://127.0.0.1:8000/user/profile/${user}/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            // console.log(response);
            console.log(response.data);
            alert("프로필이 정상적으로 수정되었습니다.");
            window.location.reload(); //새로고침
        
        }).catch(function(error) {
            alert("접근할 수 없습니다.");
            console.log(error);
        });
    };


    

    return(
        <Box>
            <MenuArea>
                <MenuBox>
                    <H1>설정</H1>
                    <Ul>
                        <Li>회원정보수정</Li>
                        <Li>관심분야추가</Li>
                        <Li>회원탈퇴</Li>
                    </Ul>
                </MenuBox>
            </MenuArea>
            <ProfileArea>
                <ProfileEdit>
                    <Editform>
                        <H3>edit user profile</H3>
                        <Input name="name" type="text" text="이름" placeholder="이름" value={profile.name} onChange={editProfile} margin="10px"/>
                        <Input name="age" type="number" text="나이" placeholder="나이" value={profile.age} onChange={editProfile} margin="10px"/>
                        <Input name="univ" type="text" text="학교" placeholder="학교" value={profile.univ} onChange={editProfile} margin="10px"/>
                        <Input name="dept" type="text" text="학과" placeholder="학과" value={profile.dept} onChange={editProfile} margin="10px"/>
                        <Input name="image" type="file" text="프로필 이미지" placeholder="프로필 이미지" accept={"image/png,image/jpeg,image/gif"} onChange={editProfileImage} margin="10px"/>

                        <Button onClick={saveAll}>수정</Button> 
                    </Editform>
                </ProfileEdit>
            </ProfileArea>
        </Box>

    )

}

const Box = styled.div`
    width: 1500px;
    height: 750px;
    border: 1px solid #a9a9a9;
    margin: 50px auto 0 auto;
    background-color: #fff;
`;

const ProfileArea = styled.div`
    float: right;
    width: 78%;
    height: 100%;
`;

const ProfileEdit = styled.div`
    width: 600px;
    height: 325px;
    margin: 175px auto;
    /* background-color: beige; */
    border: 1px solid rgb(113,136,208);
`;

const Editform = styled.div`
    padding: 12px;
`;

const MenuArea = styled.div`
    float: left;
    width: 22%;
    height: 100%;
    text-align: center;
    color: #fff;
    background: rgb(113,136,208);
    background: linear-gradient(152deg,
            rgba(113,136,208,0.6643032212885154) 0%,
            rgba(255,80,24,0.3029586834733894) 100%);
`;

const MenuBox = styled.div`
    /* background-color: blue; */
    position: relative;
    top: 20%;
`;

const Button = styled.button`
    position: relative;
    left: 260px;
`;

const H1 = styled.h1`
    float: left;
    display: inline-block;
    margin-left: 45px;
`;

const H3 = styled.h3`
    margin: 5px 0;
    text-align: center;
`;

const Ul = styled.ul`
    padding-left: 0;
    margin-top: 26px;
    list-style-type: none;
    display: inline-block; 
`;

const Li = styled.li`
    margin-bottom: 30px;
    font-size: 18px;
    cursor: pointer;
`;

export default Settings;