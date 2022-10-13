import styled from "styled-components";
import { Link,useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import Input from "../../elements/Input";
import Form from "../../elements/Form";
import Button from "../../elements/Button.js";


function UserLogin(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        // if(e.key === 'Enter'){
        //     doLogin();
        // }
    }
 

    const doLogin =(e)=>{
        e.preventDefault();
        axios.post("http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/login/", {
                username: username,
                password: password
            }).then(function(response) {
                console.log(response);
                if(response.data.token){
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', username);
                    alert("로그인 성공");
                    navigate("/main");
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    return(
                <Form width="300px" height="350px" margin="0 auto" padding="20px" position="relative" top="130px">
                    <H1>로그인</H1>
                    <AuthContainer>
                        <Input name="username" type="text" placeholder="username" text="유저명" onChange={handleUsername} />
                        <Input name="password" type="password" placeholder="password" text="비밀번호" onChange={handlePassword} />
                    </AuthContainer>

                    <Holder>
                        <Button 
                            just
                            width="100%" 
                            text="로그인" 
                            margin="15px 0"
                            onClick={doLogin}
                            />
                        <br/>
                        <span>아직 회원이 아니신가요?&nbsp;</span>
                        <Link to="/user/signup">회원가입</Link>
                    </Holder>
                    </Form>
        );
}

const AuthContainer = styled.div`
    min-width: 300px;
    width: 100%;
    margin: 0 auto;
`;

const H1 = styled.h1`
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    color: #2e4057;
`;

const Holder = styled.div`
    display: block;
    text-align: center;

    > span{
        font-size: 14px;
        margin-top: 10px;
    }
`; 
export default UserLogin;