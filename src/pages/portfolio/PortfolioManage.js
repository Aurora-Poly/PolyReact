import styled from "styled-components";
import { RiSettings4Fill } from "react-icons/ri";
import { IoIosSchool,IoIosJournal } from "react-icons/io";
import Category from "../../elements/Category";
import Card from "../../elements/Card";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";
import Grid from "../../elements/Grid";
import Button from "../../elements/Button";
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import styles from "./PortfolioManage.module.css";

function PortfolioManage(){
    //포스팅하기
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [comments, setComments] = React.useState('');
    const [date, setDate] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [resume, setResume] = React.useState(null);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleContent = (e) => {
        setContent(e.target.value);
    }
    const handleComments = (e) => {
        setComments(e.target.value);
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    const handleResume = (e) => {
        setResume(e.target.files[0]);
    }

    useEffect(()=>{
        getItemsList();
        getCvList();
        getBookmarksList();
        getProfile();
    }, []);    

    //게시물 등록하기=============================================================================
    const handleSubmit =()=>{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);
        formData.append("file", file);
        axios.
        all([axios.post("http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/portfolio/",formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
        axios.post(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/postimage/`,formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
        axios.post(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/postfile/`,formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
    ]).then(function(response) {
            console.log(response.data);
            window.location.reload(); //새로고침
            
        }).catch(function(error) {
            console.log(error);
            window.location.reload();
        });
    };

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
            setActiveIndex(1);
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //포트폴리오 불러오기=============================================================================
    const [items, setItems] = useState([]);
    const getItemsList = async () => {
        const response = await axios.get('http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/portfolio/',
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        setItems(response.data.results);
        console.log(response.data.results);
    }

    //이력서,자소서 불러오기=============================================================================
    const [cvs, setCvs] = useState([]);
    const getCvList = async () => {
        const response = await axios.get('http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/resume/',
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        setCvs(response.data.results);
        console.log(response.data.results);
    }

    //유저정보 불러오기(이름,학교,학과)====================================================================
    const [profile,setProfile] = useState({});
    const getProfile = async ()=> {
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/user/profile/${localStorage.getItem('username')}/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
            );
        console.log(response);
        setProfile({
            univ: response.data.univ,
            dept: response.data.dept,
        });
    }

    //스크랩 목록 불러오기=============================================================================
    const [bookmarks, setBookmarks] = useState([]);
    const getBookmarksList = async () => {
        const response = await axios.get('http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/1/like-list/',
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        setBookmarks(response.data);
        console.log(response.data);
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

    //이력서,자기소개서 모달=============================================================================
    const [modalResOpen, setResModalOpen] = useState(false);
    
    const openResModal = () => {
        setResModalOpen(true);
    };
    const submitResModal = () => {
        setResModalOpen(false);
        handleResumes(); // 이력서 .post
    };
    const closeResModal = () => {
        setResModalOpen(false);
    };

    //탭메뉴=============================================================================
    const [activeIndex, setActiveIndex]=useState(0);

    const tabClickHandler=(index)=>{ 
        setActiveIndex(index);
    };
    const tabContArr=[
        {
            tabTitle:(
                <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>포트폴리오</li>
            ),
            tabCont:(
                <Grid col="4" colgap="10px" rowgap="30px" margin="20px auto" width="1230px">
                    {Array.from(items).map((portfolio,index) => (
                            <Card key={index}
                            pk={portfolio.pk}
                            width="300px" 
                            height="276px"
                            title={portfolio.title}
                            titlesize="17px"
                            date={portfolio.date}
                            desc={portfolio.content}
                            src={portfolio.image==null||""? "/img/blank-profile.png" : portfolio.image.image}
                            _onClick={openModal}/>
                        ))}     
                </Grid>
            )
        },
        {
            tabTitle:(
                <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}>자기소개서/이력서</li>
            ),
            tabCont:(
                <Grid col="4" colgap="10px" rowgap="30px" margin="30px 70px">
                    {Array.from(cvs).map((resume,index) => (
                        <Card no_img 
                            key={index}
                            pk={resume.pk} 
                            width="248px" 
                            height="276px"
                            title={resume.title}
                            titlesize="17px"
                            date={resume.date}
                            desc={resume.comments}
                            src="/img/light1.jpg"
                            _onClick={openResModal}/>
                    ))}
                </Grid>
                )
        },
        {
            tabTitle:(
                <li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>스크랩</li>
            ),
            tabCont:(
                <Grid col="4" colgap="10px" rowgap="30px" margin="30px 70px">
                    {Array.from(bookmarks).map((b,index) => (
                        <Card 
                            scrap
                            key={index}
                            pk={b.pk} 
                            width="248px" 
                            height="276px"
                            title={b.title}
                            titlesize="17px"
                            date={b.date}
                            desc={b.comments}
                            src="/img/light1.jpg"
                            _onClick={openResModal}/>
                    ))}
                </Grid>
            )
        }
    ];


    return(
        <>
        <PortfolioManageContainer>
        {/* 프로필(상)=============================================================================*/}
        <ProfileContainer>
            <Profile>
                <div className="profile_image"></div>
                <div className="user_info">
                    <h2>
                        {localStorage.getItem('username')}
                        <Link to={`/mypage/${localStorage.getItem('username')}`}>
                            <RiSettings4Fill size="20px" style={{marginLeft:"10px", cursor:"pointer"}}/>        
                        </Link>
                    </h2>
                    <p>
                        <IoIosSchool size="15px" style={{marginRight:"10px"}}/>
                        {profile.univ}
                    </p>
                    <p>
                        <IoIosJournal size="13px" style={{marginRight:"10px"}}/>
                        {profile.dept}
                    </p>
                </div>
            </Profile>
            <div className="v-line"></div>
            <Category title="관심분야" width="400px" position="relative" left="1000px" bottom="210px" color="#cccecf" border="#cccecf"/>
        </ProfileContainer>
        {/* 컨텐츠(하) =============================================================================*/}
        <ContentContainer>
            <TabMenu>
                <ul>
                    {tabContArr.map((section,index)=><span key={index}>{section.tabTitle}</span>)}
                </ul>
                <Button
                    just
                    width="170px" 
                    text="등록하기"
                    onClick={activeIndex == 0 ? openModal : openResModal}
                />
            </TabMenu>
            {tabContArr[activeIndex].tabCont}
        </ContentContainer>
        </PortfolioManageContainer>

        {/* 포트폴리오 post모달============================================================================= */}
        <br/>
        <Modal open={modalOpen} close={closeModal} submit={submitModal} header="포트폴리오 등록" height="670px" margin="auto">
            <form>
                <Input name="title" type="text" text="제목" placeholder="제목" onChange={handleTitle}/>
                <Input multi_line name="content" cols="60" rows="13" text="내용" placeholder="내용을 입력해주세요." onChange={handleContent}/>
                <Input file name="image" type="file" text="이미지" accept={"image/png,image/jpeg,image/gif"} border="none" onChange={handleImage} padding="0 0 20px 0"/>
                <Input file name="file" type="file" text="파일첨부" multiple="multiple" border="none" onChange={handleFile} padding="0 0 20px 0"/>
            </form>
        </Modal>

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



const PortfolioManageContainer = styled.div`
    width: 100%;
    overflow-x: hidden;
`;

const ProfileContainer = styled.div`
    width: 100%;
    height: 180px;
    min-width: 500px;
    background-color: #333b3e;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 10px;

    .v-line{
        border-left : 1px solid #cccecf;
        height : 120px;
        position: relative;
        bottom: 86px;
        left: 940px;
    }
`;

const Profile = styled.div`
    display: inline-flex;
    margin: 0;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 100px;
    top: 20px;
    width: 320px;

    h2,p{
        margin: 0;
        color: #cccecf;
    }

    .profile_image{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid #fff;
        background-image: url("/img/blank-profile.png");
        background-size: cover;
        background-position: center;
        margin-right: 30px;
    }

    .user_info{
        display: grid;
        row-gap: 5px;
    }
`;

const ContentContainer = styled.div`    
    background-color: rgba(230,230,230,0.3);
    height: 100vh;
`;

const TabMenu = styled.div`
    min-width: 600px;
    height: 70px;
    border-bottom: 1px solid rgba(169,169,169,0.66);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: #fff;

    > ul{
        display: inline-flex;
        align-items: center;
        margin-top: 0;
        position: relative;
        left: 80px;

        .is-active{
            font-weight: 700;
            color: rgb(113,136,208);
            border-bottom: 2px solid rgb(113,136,208);
        }

        li{
            list-style-type: none;
            margin-top: 25px;
            margin-right: 60px;
            cursor: pointer;
            padding: 0 10px 23px 10px;
            color: rgb(169,169,169);
        }
    }

    > button{
        position: relative;
        left: 720px;
    }
`;


export default PortfolioManage;