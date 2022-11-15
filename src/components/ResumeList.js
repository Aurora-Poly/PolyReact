import axios from 'axios';
import { POLY_SERVER } from "../API.js";
import styled from "styled-components";
import React, {useState, useEffect} from 'react';
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Card from "../elements/Card";
import Modal from "../elements/Modal";
import { VscAdd } from "react-icons/vsc";

//portfolioManage페이지의 이력서,자소서를 관리하는 컴포넌트
function ResumeList(){
    const [title, setTitle] = React.useState('');
    const [comments, setComments] = React.useState('');
    const [date, setDate] = React.useState('');
    const [resume, setResume] = React.useState(null);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleComments = (e) => {
        setComments(e.target.value);
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handleResume = (e) => {
        setResume(e.target.files[0]);
    }

    //이력서 불러오기==============================================
    const [cvs, setCvs] = useState([]);
    const getCvList = async () => {
        const response = await axios.get(`${POLY_SERVER}/resume/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        setCvs(response.data.results);
    }

    //이력서 등록하기=============================================================================
    const handleResumes =()=>{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("comments", comments);
        formData.append("date", date);
        formData.append('resume', resume);
        axios.post("http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/resume/",formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //이력서,자기소개서 모달=============================================================================
    const [modalResOpen, setResModalOpen] = useState(false);
    
    const openResModal = () => {
        setResModalOpen(true);
    };
    const submitResModal = () => {
        setResModalOpen(false);
        handleResumes(); 
    };
    const closeResModal = () => {
        setResModalOpen(false);
    };

    useEffect(()=>{
        getCvList();
    },[]);

    return(
        <>
        <Grid col="3" colgap="20px" rowgap="30px">
            <AddButton onClick={openResModal}>
                <div>
                    <p>등록하기</p>
                    <VscAdd size="20" color="#777"/>
                </div>
            </AddButton>
            {Array.from(cvs).map((resume,index) => (
                <Card no_img 
                    key={index}
                    pk={resume.pk} 
                    width="100%" 
                    height="276px"
                    title={resume.title}
                    titlesize="17px"
                    date={resume.date}
                    desc={resume.comments}
                    src="/img/light1.jpg"
                    _onClick={openResModal}/>
            ))}
        </Grid>



        {/* 이력서 post 모달============================================================================= */}
        <Modal open={modalResOpen} close={closeResModal} submit={submitResModal} header="이력서/자기소개서 등록" height="623px" margin="auto">
            <form>
                <Input name="title" type="text" text="제목" placeholder="제목" onChange={handleTitle}/>
                <Input multi_line name="comments" cols="60" rows="10" text="코멘트" placeholder="간단한 설명을 추가해주세요." onChange={handleComments}/>
                <Input name="date" type="date" text="날짜" onChange={handleDate}/>
                <Input file name="resume" type="file" text="이력서첨부" multiple="multiple" border="none" padding="20px" onChange={handleResume}/>
            </form>
        </Modal>
        </>
    )
}

const AddButton = styled.div`
    width: 100%;
    height: 276px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    color: #777;
    cursor: pointer;
    text-align: center;

    div{
        margin: 100px auto;
    }
    p{
        margin: 10px;
        font-size: 18px;
    }
`;

export default ResumeList;