import styled from "styled-components";
import Category from "../elements/Category";
import Card from "../elements/Card";
import Input from "../elements/Input";
import Modal from "../components/Modal";
import Grid from "../elements/Grid";
import { RiContrastDropLine, RiSettings4Fill } from "react-icons/ri";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Navigate } from "react-router";
import { useParams,Link,useNavigate } from 'react-router-dom';

function Mypage(){
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
    }, []);    

    //게시물 등록하기
    const handleSubmit =()=>{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);
        formData.append("file", file);
        axios.
        all([axios.post("http://127.0.0.1:8000/portfolio/",formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
        axios.post(`http://127.0.0.1:8000/postimage/`,formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
        axios.post(`http://127.0.0.1:8000/postfile/`,formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }),
    ]).then(function(response) {
            console.log(response.data);
            // navigate('/mypage');
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
        axios.post("http://127.0.0.1:8000/resume/",formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            // console.log(response);
            console.log(response.data);
            window.location.reload(); //새로고침
        }).catch(function(error) {
            console.log(error);
        });
    };

    //포트폴리오 불러오기=============================================================================
    const [items, setItems] = useState([]);
    const getItemsList = async () => {
        const response = await axios.get('http://127.0.0.1:8000/portfolio/',
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        setItems(response.data.results);
        console.log(response.data.results);
    }

    //이력서,자소서 불러오기=============================================================================
    const [cvs, setCvs] = useState([]);
    const getCvList = async () => {
        const response = await axios.get('http://127.0.0.1:8000/resume/',
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        setCvs(response.data.results);
        console.log(response.data.results);
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
                // <Link to="./portfolio"></Link>
                    <Li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>
                   포트폴리오&nbsp;<PortfolioBtn onClick={openModal}>+</PortfolioBtn>
                </Li>
            ),
            tabCont:(
                <Grid col="4" colgap="10px" rowgap="30px" margin="30px 70px">
                    {Array.from(items).map(portfolio => (
                            <Card key={portfolio.id}
                            pk={portfolio.pk} //url에 들어갈 것...
                            width="248px" 
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
                <Li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}>
                    자기소개서/이력서&nbsp;<PortfolioBtn onClick={openResModal}>+</PortfolioBtn>
                </Li>
            ),
            tabCont:(
                <Grid col="4" colgap="10px" rowgap="20px" margin="50px 70px">
                {Array.from(cvs).map(resume => (
                    <Card no_img 
                        key={resume.id}
                        pk={resume.pk} //url에 들어갈 것...
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
                <Li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>스크랩</Li>
            ),
            tabCont:(
                <Grid col="4" colgap="10px" rowgap="20px" margin="30px">

                </Grid>
            )
        }
    ];
    return(
            <Box>
                {/* 프로필 부분(좌)============================================================================= */}
                <ProfileArea>
                    <Profile>
                        <ProfileImage src={require("../components/img/blank-profile.png")}></ProfileImage>
                        <Userbox>
                            <span style={{fontSize:"20px", fontWeight: "600"}}>
                                {localStorage.getItem('username')}
                            </span>
                            <Link to={`/mypage/${localStorage.getItem('username')}`}>
                                <SpanIcon>
                                    <RiSettings4Fill size="20px"/>
                                </SpanIcon>
                            </Link>
                        </Userbox>

                        <p>이메일</p>
                        <p><span>대학교/전공</span></p>
                    </Profile>
                    <Category title="관심분야" c1="프로그래밍" c2="디자인" c3="창업"/>


                    {/* 포트폴리오 post모달============================================================================= */}
                    <br/>
                    <Modal open={modalOpen} close={closeModal} submit={submitModal} header="포트폴리오 등록" height="730px" margin="120px auto">
                        <form style={{textAlign:"center"}}>
                            <Input name="title" type="text" text="제목" placeholder="제목" onChange={handleTitle} margin="10px" width="540px"/>
                            <Input name="content" cols="55" rows="15" text="내용" placeholder="내용을 입력해주세요." onChange={handleContent} margin="10px" width="530px" multi_line/>
                            <Input name="image" type="file" text="이미지" accept={"image/png,image/jpeg,image/gif"} border="none" onChange={handleImage} margin="10px" width="540px"/>
                            <Input name="file" type="file" text="파일첨부" multiple="multiple" border="none" onChange={handleFile} margin="10px" width="540px"/>
                        </form>
                    </Modal>

                    {/* 이력서 post 모달============================================================================= */}
                    <Modal open={modalResOpen} close={closeResModal} submit={submitResModal} header="이력서/자기소개서 등록" height="730px" margin="120px auto">
                        <form style={{textAlign:"center"}}>
                            <Input name="title" type="text" text="제목" placeholder="제목" onChange={handleTitle} margin="10px" width="540px"/>
                            <Input name="comments" cols="55" rows="10" text="코멘트" placeholder="간단한 설명을 추가해주세요." onChange={handleComments} margin="10px" width="530px" multi_line/>
                            <Input name="date" type="date" text="날짜" onChange={handleDate} margin="10px" width="540px" border="none"/>
                            <Input name="resume" type="file" text="이력서첨부" multiple="multiple" border="none" onChange={handleResume} margin="10px" width="540px"/>
                        </form>
                    </Modal>


                </ProfileArea>

                {/* 컨텐츠 부분(우) =============================================================================*/}
                <ContentArea>
                    <TabMenu>
                        <Ul>
                            {tabContArr.map((section)=>{
                                return section.tabTitle})}
                            <Input type="text" placeholder="검색어를 입력하세요" width="320px" borderRadius="50px" padding="5px 15px" margin="0 0 0 -70px"/>
                        </Ul>
                    </TabMenu>
                    {tabContArr[activeIndex].tabCont}
                </ContentArea>
            </Box>
        )
}


const PortfolioBtn = styled.button`
    outline: 0;
    border: 0;
    color: rgb(113,136,208);
    cursor: pointer;
`;

const Box = styled.div`
    width: 1500px;
    height: 750px;
    margin: 50px auto 0 auto;
    background-color: #fff;
    border: 1px solid rgba(169,169,169,0.1);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
`;

const ProfileArea = styled.div`
    float: left;
    width: 22%;
    height: 100%;
    text-align: center;
    color: #fff;
    background: rgb(113,136,208);
    background: linear-gradient(152deg,
            rgba(113,136,208,0.6643032212885154) 0%,
            rgba(255,80,24,0.3029586834733894) 100%);
`;

const Profile = styled.div`
    margin-top: 80px;
`;

const ProfileImage = styled.div`
    border-radius: 100%;
    border: 2px solid #fff;
    width: 160px;
    height: 160px;
    margin: 0 auto 20px auto;

    background-image: url("${(props)=>props.src}");
    background-size: cover;
    background-position: center;
`;
const Userbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;
const SpanIcon = styled.span`
    margin-top: 5px;
    margin-left: 10px;
`;

const ContentArea = styled.div`
    float: left;
    width: 78%;
    height: 100%;
    background-color: rgba(211,211,211,0.2);
`;

const TabMenu = styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid rgba(169,169,169,0.66);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: #fff;

`;

const Ul = styled.ul`
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 0;

    .is-active{
        font-weight: 700;
        color: rgb(113,136,208);
        border-bottom: 2px solid rgb(113,136,208);
    }
`;

const Li = styled.li`
    list-style-type: none;
    margin-right: 60px;
    margin-top: 25px;
    cursor: pointer;
    padding: 0 10px 23px 10px;
    color: rgb(169,169,169);

    /* &:hover{
        font-weight: 700;
        color: rgb(113,136,208);
        border-bottom: 2px solid rgb(113,136,208);
    } */
`;


export default Mypage;