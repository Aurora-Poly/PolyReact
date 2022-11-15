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
    const getProfile = async ()=> {
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profile/${user}/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
            );
        console.log(response);
        setProfile({
            user: response.data.user,
            univ: response.data.univ,
            dept: response.data.dept,
            age: response.data.age,
        });
        setImage(response.data.image);
    }
    const getImage = async ()=> {
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profileimg/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
            );
            console.log(response.data[0]);
            if(response.data[0] !== undefined){
                let splitName = response.data[0].image.split('/');
                setImagename(splitName[splitName.length-1]);
                setIsExist(true);
            }
    }
    
    useEffect(()=>{
        getProfile();
        getImage();
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


    //이미지 관리=========================================================
    const [image, setImage] = useState(null);
    const [imagename, setImagename] = useState('');
    const [isExist, setIsExist] = useState(false);
    const editProfileImage =(event)=>{
        setImage(event.target.files[0]);
        setImagename(event.target.files[0].name);
        setIsExist(true);
    }

    //기존 프로필 이미지 삭제 =============================================================================
    const onClearImage=(e)=>{
        e.preventDefault();
        axios.delete(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profileimg/${user}/`,
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` }}
        ).then(function(response) {
            console.log('프로필 삭제됨');
            setIsExist(false);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //수정하기,저장하기=========================================================
    const saveAll =(e)=>{
        // e.preventDefault();
        const fd= new FormData();
        const fdi= new FormData();
        fd.append("name", profile.name);
        fd.append("age", profile.age);
        fd.append("univ", profile.univ);
        fd.append("dept", profile.dept);
        fdi.append("image", image);
        fdi.append("user", profile.user);

        axios.all([
            axios.patch(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profile/${user}/`,fd,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            }),
            axios.post(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profileimg/`,fdi,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            })
            ]).then(axios.spread((res1, res2)=>{
                console.log(res1.data);
                console.log(res2.data);
                alert("정상적으로 수정되었습니다.");
                window.location.reload();
            })).catch(function(error) {
                console.log(error);
            });
    };

    return(
                    <Form width="400px" height="450px" padding="20px" margin="70px auto">
                        <H3>유저정보</H3>
                        <Grid col="2" row="1">
                            <Username>
                                <p style={{margin: "0", marginBottom:"10px",color: "#363636",fontWeight:"600", fontSize:"14px"}}>유저명</p>
                                <p style={{margin: "0", fontWeight:"300"}}>{localStorage.getItem('username')}</p>
                            </Username>
                            <Input name="age" type="number" text="나이" placeholder="나이" value={profile.age} onChange={editProfile}/>
                        </Grid>
                        <Input name="univ" type="text" text="학교" placeholder="학교" value={profile.univ} onChange={editProfile}/>
                        <Input name="dept" type="text" text="학과" placeholder="학과" value={profile.dept} onChange={editProfile}/>
                        {imagename && isExist ? 
                            <ProfileImg>
                                <p>프로필 이미지</p>
                                <span>{imagename}</span>
                                <Button 
                                    just
                                    width="15%" 
                                    text="수정"
                                    onClick={onClearImage}
                                />
                            </ProfileImg>
                        :
                            <Input file name="image" type="file" text="프로필 이미지" placeholder="프로필 이미지" accept={"image/png,image/jpeg,image/gif"} onChange={editProfileImage} margin="10px"/>
                        }

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

const ProfileImg = styled.div`
    box-sizing: border-box;
    padding: 10px;
    height: 100px;

    >p{
        margin: 5px 0;
        margin-bottom: 10px; 
        font-size: 14px;
        font-weight: 600;
    }
    >button{
        float: right;
    }
`;



export default UserSettings;