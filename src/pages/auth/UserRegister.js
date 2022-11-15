import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import Input from "../../elements/Input";
import Button from "../../elements/Button.js";
import Form from "../../elements/Form";
import {POLY_SERVER} from "../../API.js";

function UserRegister(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '', 
        email: '', 
        password: '',
        ckpassword: '',
    });

    const { username, email, password, passwordCheck } = inputs;
    const onChange =(e)=> {
        const {value, name} = e.target;
        setInputs({ ...inputs, [name]: value });
        console.log(name, value);
        if(e.key === 'Enter'){
            handleValid();
            // registerUser();
        }
    };

//유저명 중복체크(POST)=======================================================
const [isExist, setIsExist] = useState(false);
const checkUsername =(e)=>{
    e.preventDefault();
    axios
        .post(`${POLY_SERVER}/user/uniquecheck/username`, 
        {
            username: username,
            user: username,
        })
        .then(function(response) 
        {
            if(response.status == 200){
                console.log(response.status);
                alert("사용할 수 있는 유저명입니다.(사용가능)");
                setIsExist(true);
            }
        })
        .catch(function(error) {
            console.log(error);
            if(error.response.status == 400){
                console.log(error.response.status);
                alert("사용할 수 없는 유저명입니다.(사용불가)");
                setIsExist(false);
            }
        });
};


//회원가입하기(POST)=========================================================
    const registerUser =()=>{
        axios
            .post(`${POLY_SERVER}/user/signup/`, 
            {
                username: username,
                email: email,
                password: password,
                password2: passwordCheck
            })
            .then(function(response) 
            {
                console.log(response);
                alert("정상적으로 가입되었습니다. 로그인 해주세요.");
                navigate('/user/login');
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    
    // 유효성검사=========================================================
    const handleValid = (e) => {
        e.preventDefault();
        let ckUsername = username.length > 1;
        let ckUsernameExist = isExist === true;
        let ckEmail = email.includes('@') && email.includes('.');
        let specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        let ckPassword = password.length >= 8 && specialLetter >= 1;
        let ckPasswordAgain = password === passwordCheck;

        if(ckUsername && ckUsernameExist && ckEmail && ckPassword && ckPasswordAgain){
            registerUser();
        }else{
            if(!ckUsername){
                alert("유저명을 입력해주세요.");
            }else if(!ckUsernameExist){
                alert("유저명 중복체크를 해주세요.");
            }else if(!ckEmail){
                alert("이메일을 올바르게 입력해주세요.");
            }else if(!ckPassword){
                alert("비밀번호를 입력해주세요.");
            }else if(!ckPasswordAgain){
                alert("비밀번호를 확인해주세요.");
            }
        }
    }


    return(
        <Form width="400px" height="auto" margin="0 auto" padding="20px" position="relative" top="90px">
            <H>회원가입</H>
            <AuthContainer>
                <DuplicateBox>
                    <Input name="username" type="text" placeholder="username" text="유저명" onChange={onChange}/>
                    <Button 
                        just
                        width="100%" 
                        text="중복체크"
                        onClick={checkUsername}
                    />
                </DuplicateBox>
                <Input name="email" type="email" placeholder="id@gmail.com" text="이메일" onChange={onChange}/>
                <Input name="password" type="password" placeholder="영문8자이상(특수문자포함)" text="비밀번호" onChange={onChange}/>
                <Input name="passwordCheck" type="password" placeholder="비밀번호 확인" text="비밀번호 확인" onChange={onChange}/>
            </AuthContainer>

            <Button 
                just
                width="100%" 
                text="가입하기" 
                margin="20px 0 0 0"
                onClick={handleValid}
            />
        </Form>
        );
}

const H = styled.h2`
    margin: 18px 0;
    text-align: center;
`;

const AuthContainer = styled.div`
    min-width: 300px;
    width: 100%;
    margin: 0 auto;
`;

const DuplicateBox = styled.div`
    display: grid;
    grid-template-columns: 80% 20%;

    >button{
        position: relative;
        top: 36px;
    };
`;

export default UserRegister;