import styled from "styled-components";
import Card from "../elements/Card";
import Grid from "../elements/Grid";
import Modal from "../components/Modal";
import axios from "axios";
import React,{useEffect, useState} from "react";
import Input from "../elements/Input";
import { Link } from "react-router-dom";

function Circles(){
    //임시방편
    const insertedToken = localStorage.getItem('token');
    const [clubs, setClubs] = useState([]);

    const [title, setTitle] = React.useState('');
    const [name, setName] = React.useState('');
    const [content, setContent] = React.useState('');
    const [personnel, setPersonnel] = React.useState(0);
    const [date, setDate] = React.useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    }
    const handleName = (e) => {
        setName(e.target.value);
        console.log(name);
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

    const makeClubs =(e)=>{
        axios.post("http://127.0.0.1:8000/club/",{
            title: title,
            name: name,
            content: content,
            personnel: personnel,
            date: date
        },
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}
        }).then(function(response) {
            console.log(response);
            window.location.reload(); //새로고침
        }).catch(function(error) {
            console.log(error);
        });
    };
    

    //불러오기========================
    const getClubsList = async ()=> {
        const response = await axios.get('http://127.0.0.1:8000/club/');
        console.log(response.data.results);
        setClubs(response.data.results);
    }

    // { headers : { Authorization: "Token "+localStorage.getItem('token') }

    useEffect(()=>{
        console.log("type: ",typeof(clubs));
        getClubsList();
    }, []);

    //모달===================
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

    // const club = clubs.map(club => (
    //     <Card is_etc
    //         key={club.id}
    //         width="300px" 
    //         height="200px"
    //         title={club.title}
    //         desc={club.name}
    //         desc2={club.content}
    //         date={club.date}
    //         personnel={club.personnel}
    //         status="모집중" />
    // )).slice(0,9);

    return(
        <>
        <h1 style={{textAlign:"center", color:"##2e4057"}}>동아리</h1>

                {insertedToken ? (
                    <p style={{textAlign:"center"}}>
                        <button onClick={openModal} 
                                style={{cursor:"pointer",color:"##2e4057", backgroundColor:"transparent", outline:"0", border:"0", fontSize:"16px"}}>
                                동아리 개설
                        </button>
                    </p>
                ) : (
                    <p style={{textAlign:"center", color:"#2e4057"}}>동아리에 가입하고 싶으세요? <StyledLink to="/user/login">로그인</StyledLink></p>
                )}

                    {/* <p style={{textAlign:"center"}}>
                        <button onClick={openModal} 
                                style={{cursor:"pointer",color:"#fff", backgroundColor:"transparent", outline:"0", border:"0", fontSize:"16px"}}>
                                동아리 개설
                        </button>
                    </p> */}


        <Grid width="945px" col="3" row="1fr 1fr 1fr" colgap="15px" rowgap="20px" background="#fff" padding="20px">
        {clubs && clubs.map(club => (
                <Card key={club.id}
                    id={club.id}
                    is_etc
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

        <Modal open={modalOpen} close={closeModal} submit={submitModal} header="동아리 개설" height="480px" margin="250px auto">
            <form>
               <Input type="text" name="title" text="제목" placeholder="제목" onChange={handleTitle}/>
               <Input type="text" name="name" text="동아리명" placeholder="동아리명" onChange={handleName}/>
               <Input name="content" text="설명" cols="60" rows="10" placeholder="동아리를 소개해주세요." onChange={handleContent} multi_line/>
               <Input type="number" name="personnel" text="모집인원" placeholder="모집인원수" onChange={handlePersonnel}/>
               <Input type="date" name="date" text="등록일" onChange={handleDate}/>
            </form>
        </Modal>
        </>
    )
}

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 700;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: #2e4057;
    }
`;

export default Circles;