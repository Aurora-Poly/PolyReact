import Input from "../elements/Input";
import Button from "../elements/Button.js";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(){
    const [inputs, setInputs] = useState({
        username: '', 
        email: '', 
        password: '',
        ckpassword: '',
    });
    // useEffect(() => { console.log({name,age,email,password,univ,dept}); });
    const { username, email, password, password2 } = inputs;
    const onChange =(e)=> {
        const {value, name} = e.target;
        setInputs({ ...inputs, [name]: value });
        console.log(name, value);
    };

// 유효성검사
    const validEmail = email.includes('@') && email.includes('.');
    const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const validPassword = password.length >= 8 && specialLetter >= 1;
    const validCKPassword = password === password2;

// 가입하기 버튼 활성화
    const getActive = validEmail && validPassword && validCKPassword === true;
    const handleValid = () => {
        if(getActive){
                registerUser();
        }else if(!validEmail){ alert("잘못된 이메일 형식"); }
         else if(!validPassword){ alert("잘못된 비밀번호"); }
         else if(!validCKPassword){ alert("비밀번호가 다릅니다."); }
        }

    const navigate = useNavigate();

//POST
    const registerUser =()=>{
        axios
            .post("http://127.0.0.1:8000/user/signup/", {
                username: username,
                email: email,
                password: password,
                password2: password2
            }).then(function(response) {
                console.log(response);
                alert(username+"님 환영합니다.");
              }).catch(function(error) {
                console.log(error);
                // navigate('/user/signup');
              });
    };


    return(
            <Background>
                {/* 새로 적용할 회원가입폼 */}
                <Container>

                    <H1>회원가입</H1>
                    
                    <form>
                        <Div2>
                            <Input name="username" type="text" placeholder="username" text="유저명" width="200px" onChange={onChange} borderRadius="50px"/>
                            <Input name="email" type="email" placeholder="id@gmail.com" text="이메일" width="200px" onChange={onChange} borderRadius="50px"/>
                            <Input name="password" type="password" placeholder="****" text="비밀번호" width="200px" onChange={onChange} borderRadius="50px"/>
                            <Input name="password2" type="password" placeholder="비밀번호 확인" text="비밀번호 확인" width="200px" onChange={onChange} borderRadius="50px"/>
                        </Div2>

                        <Button 
                            width="310px" 
                            text="가입하기" 
                            margin="5px 0 5px 10px"
                            href="/"
                            onClick={handleValid}
                            // onClick={registerUser}
                            borderRadius="50px"
                            />
                    </form>

                </Container>
            </Background>
        );
}

const Background = styled.div`
    display: grid;
    width: 550px;
    height: 430px;
    text-align: center;
    position:absolute;
    top: 50%; 
    left: 50%;
    margin-left: -275px;
    margin-top: -220px;
    background-color: #fff;
`;

const Container = styled.div`
    display: inline-block;
    margin-top: 65px;
`;

const H1 = styled.h1`
    margin-top: 0;
    color: #2e4057;
`;

const Div2 = styled.div`
    width: 320px;
    margin: 0 auto;
`;

export default Register;