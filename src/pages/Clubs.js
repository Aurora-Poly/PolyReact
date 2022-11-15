import styled from "styled-components";
import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../elements/Card";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import Modal from "../elements/Modal";
import Input from "../elements/Input";

function Clubs(){
    //임시방편
    const insertedToken = localStorage.getItem('token');
    const [clubs, setClubs] = useState([]);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [personnel, setPersonnel] = React.useState(0);
    const [date, setDate] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [applyEmail, setApplyEmail] = React.useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    }
    const handleContent = (e) => {
        setContent(e.target.value);
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handlePersonnel = (e) => {
        setPersonnel(e.target.value);
    }
    const handleContact = (e) => {
        setContact(e.target.value);
    }
    const handleApplyEmail = (e) => {
        setApplyEmail(e.target.value);
    }

    //동아리 등록하기(POST)========================================================================
    const makeClubs =(e)=>{
        axios.post("http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/club/",{
            title: title,
            content: content,
            personnel: personnel,
            date: date,
            contact: contact,
            apply_email: applyEmail,
        },
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}
        }).then(function(response) {
            console.log(response);
            window.location.reload();
        }).catch(function(error) {
            console.log(error);
        });
    };
    

    //동아리 불러오기(GET)========================================================================
    const getClubsList = async ()=> {
        const response = await axios.get('http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/club/');
        console.log(response.data.results);
        setClubs(response.data.results);
    }
    
    //모달==============================================================================
    const [modalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
        setModalOpen(true);
    };
    const submitModal = () => {
        setModalOpen(false);
        makeClubs();
    };
    
    const closeModal = () => {
        setModalOpen(false);
    };
    
    //useEffect========================================================================
    useEffect(()=>{
        getClubsList();
    }, []);

    return(
        <>
        <Container>
            <h2>동아리</h2>
                {insertedToken ? (
                    <Button
                        just
                        width="170px"
                        height="38px"
                        text="동아리 개설하기"
                        onClick={openModal}
                    />
                ) : (
                    <>
                    <Button
                        width="170px"
                        height="38px"
                        text="로그인하기"
                        href="/user/login"
                    />
                    </>
                )}


            <Grid width="1020px" col="3" colgap="15px" rowgap="15px" padding="15px" margin="0 auto" position="relative" top="50px">
                {clubs && clubs.map((club,index) => (
                    <Card 
                        is_etc
                        key={index}
                        id={club.id}
                        width="320px"
                        height="220px"
                        title={club.title}
                        desc={club.name}
                        desc2={club.content}
                        date={club.date}
                        personnel={club.personnel}
                    />
                ))}
            </Grid>
        </Container>

        {/* 동아리 생성 모달============================================================================================== */}
        <Modal open={modalOpen} close={closeModal} submit={submitModal} header="동아리 개설" height="683px" margin="auto">
            <form>
               <Input type="text" name="title" text="제목" placeholder="제목" onChange={handleTitle}/>
               <Input multi_line name="content" text="설명" cols="60" rows="10" placeholder="동아리를 소개해주세요." onChange={handleContent}/>
               <Input type="number" name="personnel" text="모집인원" placeholder="모집인원수" onChange={handlePersonnel}/>
               <Input type="text" name="contact" text="추가연락처" placeholder="(선택)" onChange={handleContact}/>
               <Input type="email" name="applyEmail" text="지원메일" placeholder="지원서를 받을 이메일을 입력해주세요." onChange={handleApplyEmail}/>
               <Input type="date" name="date" text="등록일" onChange={handleDate}/>
            </form>
        </Modal>
        </>
    )
}

const Container = styled.div`

    h2{ 
        display: inline-block;
        margin: 0;
        position: relative; 
        top: 50px; 
        left: 270px;
    }

    button{
        position: relative; 
        top: 50px; 
        left: 1010px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 700;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: #2e4057;
    }
`;

export default Clubs;