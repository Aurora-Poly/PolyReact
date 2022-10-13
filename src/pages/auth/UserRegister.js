import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import Input from "../../elements/Input";
import Button from "../../elements/Button.js";
import Form from "../../elements/Form";

function UserRegister(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '', 
        email: '', 
        password: '',
        ckpassword: '',
    });

    const { username, email, password, password2 } = inputs;
    const onChange =(e)=> {
        const {value, name} = e.target;
        setInputs({ ...inputs, [name]: value });
        console.log(name, value);
        if(e.key === 'Enter'){
            // handleValid();
            registerUser();
        }
    };

// 유효성검사=========================================================
    const validEmail = email.includes('@') && email.includes('.');
    const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const validPassword = password.length >= 8 && specialLetter >= 1;
    const validCKPassword = password === password2;
    const getActive = validEmail && validPassword && validCKPassword === true;
    const handleValid = () => {
        if(!validEmail|| !validPassword|| !validCKPassword){
            alert("가입실패");
        }else{
            registerUser();
        }
    }

//회원가입하기(POST)=========================================================
    const registerUser =(e)=>{
        e.preventDefault();
        axios
            .post("http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/signup/", 
            {
                username: username,
                email: email,
                password: password,
                password2: password2
            })
            .then(function(response) 
            {
                console.log(response);
                alert(username+"님 환영합니다. 로그인 해주세요.");
                navigate('/user/login');
            })
            .catch(function(error) {
                console.log(error);
            });
    };


    return(
        <Form width="400px" height="440px" margin="0 auto" padding="20px" position="relative" top="90px">
            <H1>회원가입</H1>
            <AuthContainer>
                <Input name="username" type="text" placeholder="username" text="유저명" onChange={onChange}/>
                <Input name="email" type="email" placeholder="id@gmail.com" text="이메일" onChange={onChange}/>
                <Input name="password" type="password" placeholder="영문8자이상(특수문자포함)" text="비밀번호" onChange={onChange}/>
                <Input name="password2" type="password" placeholder="비밀번호 확인" text="비밀번호 확인" onChange={onChange}/>
            </AuthContainer>

            <Button 
                just
                width="100%" 
                text="가입하기" 
                margin="20px 0 0 0"
                // onClick={handleValid}
                onClick={registerUser}
            />
        </Form>
        );
}

const H1 = styled.h1`
    margin-top: 0;
    margin-bottom: 20px;
    color: #2e4057;
    text-align: center;
`;

const AuthContainer = styled.div`
    min-width: 300px;
    width: 100%;
    margin: 0 auto;
`;

export default UserRegister;