import styled from "styled-components";
import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import Modal from "../elements/Modal";
import Input from "../elements/Input";
import Paginator from "../elements/Paginator";
import {POLY_SERVER} from "../API.js";

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
    const [listPage, setListPage] = useState(1);
    const [listCount, setListCount] = useState();
    const P_PAGE = 8;

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
        axios.post(`${POLY_SERVER}/club/`,{
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
        const response = await axios.get(`${POLY_SERVER}/club/?page_size=${listPage}`);
        console.log(response.data);
        setClubs(response.data.results);
        setListCount(response.data.count);
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
    }, [listPage]);

    return(
        <>
        <Container>
            <ClubContainer>
                <div className="titleBox">
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
                </div>


                <Grid width="1200px" col="4" row="1" colgap="15px" rowgap="15px" padding="15px" margin="0 auto 40px auto" position="relative" top="50px">
                    {clubs && clubs.map((club,index) => (
                        <ClubCard key={index}>
                            <h3>{club.title}</h3>
                            <ClubContent>
                                {club.content}
                            </ClubContent>
                            <ClubInfo>
                                <p>등록일: {club.date}</p>
                                <p>모집인원: {club.personnel}</p>
                                <p>지원연락처: {club.contact}</p>
                                <p>지원이메일: {club.apply_email}</p>
                            </ClubInfo>
                        </ClubCard>
                    ))}
                </Grid>
                <Paginator count={listCount} pcount={P_PAGE} page={listPage} setPage={setListPage}/>
            </ClubContainer>
        </Container>

        {/* 동아리 생성 모달============================================================================================== */}
        <Modal open={modalOpen} close={closeModal} submit={submitModal} header="동아리 개설" height="770px" margin="auto">
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
    width: 100%;
    height: 120vh;
    background-blend-mode: multiply;
    background: url('/img/meeting2.jpg') repeat center center/cover, rgba(0, 0, 0, 0.3);

    .titleBox{
        position: relative;
        top: 50px;
        padding: 0 20px;

        h2{ display: inline-block; width: 85%; margin: 0; color: #fff;}
    }  
`;

const ClubContainer = styled.div`
    width: 1240px;
    height: auto;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;
`;

const ClubCard = styled.div`
    height: 400px;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;

    h3{ margin: 0; height: 15%; }
`;

const ClubContent = styled.div`
    height: 45%;
    line-height: 22px;
    overflow-y: auto;
`;

const ClubInfo = styled.div`
    display: grid;
    height: 30%;
    border-top: 1px solid #e6e6e6;
    padding-top: 20px;
    margin-top: 20px;

    p{ margin: 0; font-size: 14px; }
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