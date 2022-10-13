import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import Input from '../../elements/Input';
import Form from "../../elements/Form";
import Grid from "../../elements/Grid";
import Button from '../../elements/Button';

function UserSettings(){
    //프로필 불러오기=========================================================
    const [profile, setProfile] = useState({
        univ: '',
        dept: '',
        age: 0,
    });
    const {user} = useParams();
    const [image, setImage] = useState(null);
    const getProfile = async ()=> {
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profile/${user}/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
            );
        console.log(response);
        setProfile({
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

    //수정하기,저장하기=========================================================
    const saveAll =(e)=>{
        e.preventDefault();
        const fd= new FormData();
        fd.append("name", profile.name);
        fd.append("age", profile.age);
        fd.append("univ", profile.univ);
        fd.append("dept", profile.dept);
        // fd.append("image", image);
        axios.patch(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profile/${user}/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
            alert("프로필이 정상적으로 수정되었습니다.");
            window.location.reload(); //새로고침
        
        }).catch(function(error) {
            console.log(error);
        });
    };

    return(
                    <Form width="400px" height="450px" padding="20px" margin="70px auto">
                        <H3>유저정보</H3>
                        <Grid col="2" row="1">
                            <Username>
                                <h4 style={{margin: "0", marginBottom:"5px",color: "#2e4057"}}>유저명</h4>
                                <p style={{margin: "0", fontWeight:"300"}}>{localStorage.getItem('username')}</p>
                            </Username>
                            <Input name="age" type="number" text="나이" placeholder="나이" value={profile.age} onChange={editProfile}/>
                        </Grid>
                        <Input name="univ" type="text" text="학교" placeholder="학교" value={profile.univ} onChange={editProfile}/>
                        <Input name="dept" type="text" text="학과" placeholder="학과" value={profile.dept} onChange={editProfile}/>
                        <Input file name="image" type="file" text="프로필 이미지" placeholder="프로필 이미지" accept={"image/png,image/jpeg,image/gif"} onChange={editProfileImage} margin="10px"/>

                        <Button 
                            just
                            width="100%" 
                            text="수정하기" 
                            margin="20px 0 0 0"
                            onClick={saveAll}
                        />
                    </Form>

    )

}

const H3 = styled.h3`
    margin: 5px 0;
    text-align: center;
`;

const Username = styled.div`
    position: relative;
    top: 20px;
    left: 10px;
`;



export default UserSettings;