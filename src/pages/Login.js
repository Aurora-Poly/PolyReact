import Input from "../elements/Input";
import Button from "../elements/Button.js";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";


function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
 

    const doLogin =()=>{
        axios.post("http://127.0.0.1:8000/user/login/", {
                username: username,
                password: password
            }).then(function(response) {
                console.log(response);
                if(response.data.token){
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', username);
                    window.location.reload();
                }
            })
            .catch(function(error) {
                console.log(error);
                alert("존재하지 않는 유저입니다.");
            });
    };

    return(
            <Background>
                <Container>

                    <H1>로그인</H1>
                    
                    <form>
                        <Div2>
                            <Input name="username" type="text" placeholder="username" text="유저명" width="200px" onChange={handleUsername} borderRadius="50px"/>
                            <Input name="password" type="password" placeholder="****" text="비밀번호" width="200px" onChange={handlePassword} borderRadius="50px" />
                        </Div2>

                        <Link to="/">비밀번호를 잊어버리셨나요?</Link><br/>

                        <Button 
                            width="310px" 
                            text="로그인" 
                            margin="5px 0 5px 10px"
                            href="/"
                            onClick={doLogin}
                            borderRadius="50px"
                            />
                        {/* <Button 
                            width="200px"
                            margin="0 0 5px 0"
                            text="구글계정으로 로그인" 
                            href="/"/> */}

                        <br/>
                        <span>아직 회원이 아니신가요?&nbsp;</span>
                        <Link to="/user/signup">회원가입</Link>
                    </form>

                </Container>
            </Background>
        );
}

const Background = styled.div`
    width: 550px;
    height: 400px;
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

export default Login;