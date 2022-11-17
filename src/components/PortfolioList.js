import axios from 'axios';
import { POLY_SERVER } from "../API.js";
import styled from "styled-components";
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import Grid from "../elements/Grid";
import Card from "../elements/Card";
import Input from "../elements/Input";
import Modal from "../elements/Modal";
import { VscAdd } from "react-icons/vsc";
import Paginator from "../elements/Paginator";

//portfolioManage페이지의 포트폴리오를 관리하는 컴포넌트
function PortfolioList(){
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [listPage, setListPage] = useState(1);
    const [listCount, setListCount] = useState();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleContent = (e) => {
        setContent(e.target.value);
    }
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    //포트폴리오 등록하기=============================================================================
    const handleSubmit =()=>{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);
        formData.append("file", file);
        axios.
        all([axios.post(`${POLY_SERVER}/portfolio/`,formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
        axios.post(`${POLY_SERVER}/postimage/`,formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
        axios.post(`${POLY_SERVER}/postfile/`,formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
    ]).then(function(response) {
            console.log(response.data);
            navigate('/mypage/portfolio'); 
            window.location.reload();
        }).catch(function(error) {
            console.log(error);
            navigate('/mypage/portfolio');
            window.location.reload();
        });
    };


    //포트폴리오 불러오기=============================================================================
    const [items, setItems] = useState([]);
    const getItemsList = async () => {
        const response = await axios.get(`${POLY_SERVER}/portfolio/?page_size=${listPage}`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        setItems(response.data.results);
        setListCount(response.data.count);
    }

    //포트폴리오 모달=============================================================================
    const [modalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
        setModalOpen(true);
    };
    const submitModal = () => {
        setModalOpen(false);
        handleSubmit(); // 포트폴리오 .post
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(()=>{
        getItemsList();
    },[listPage]);

    return(
        <>
        <Grid col="3" colgap="20px" rowgap="30px">
            <AddButton onClick={openModal}>
                <div>
                    <p>등록하기</p>
                    <VscAdd size="20" color="#777"/>
                </div>
            </AddButton>
            {Array.from(items).map((portfolio,index) => (
                <Card key={index}
                    pk={portfolio.pk}
                    width="100%" 
                    height="276px"
                    title={portfolio.title}
                    titlesize="17px"
                    date={portfolio.date}
                    desc={portfolio.content}
                    src={portfolio.image==null||""? "/img/no_image_50px.png" : portfolio.image.image}
                    _onClick={openModal}/>
            ))}     
        </Grid>
        <Paginator count={listCount} pcount="8" page={listPage} setPage={setListPage}/>

        {/* 포트폴리오 post 모달=============================================================================*/}
        <Modal open={modalOpen} close={closeModal} submit={submitModal} header="포트폴리오 등록" height="670px" margin="auto">
            <form>
                <Input name="title" type="text" text="제목" placeholder="제목" onChange={handleTitle}/>
                <Input multi_line name="content" cols="60" rows="13" text="내용" placeholder="내용을 입력해주세요." onChange={handleContent}/>
                <Input file name="image" type="file" text="이미지" accept={"image/png,image/jpeg,image/gif"} border="none" onChange={handleImage} padding="0 0 20px 0"/>
                <Input file name="file" type="file" text="파일첨부" multiple="multiple" border="none" onChange={handleFile} padding="0 0 20px 0"/>
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

export default PortfolioList;