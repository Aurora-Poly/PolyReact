import styled from "styled-components";
import axios from "axios";
import { POLY_SERVER } from "../../API.js";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Input from '../../elements/Input';
import Form from '../../elements/Form';
import Button from "../../elements/Button";

function PortfolioResumeEdit(){
    const {pk} = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [comments, setComments] = useState('');
    const [file, setFile] = useState(null); //실질적인 파일
    const [filename, setFilename] = useState(''); //파일명
    const [isExist, setIsExist] = useState(false); //기존파일존재여부(UI변경)
    const [changeExist, setChangeExist] = useState(false); //수정파일존재여부(API호출함수변경)

    const changeTitle =(e)=>{
        setTitle(e.target.value);
    }
    const changeComments =(e)=>{
        setComments(e.target.value);
    }
    const changeFile =(e)=>{
        setFile(e.target.files[0]);
        if(e.target.files[0]){
            setChangeExist(true);
        }
    }

    //이력서,자소서 불러오기 =============================================================================
    const getResume = async () => {
        const response = await axios.get(`${POLY_SERVER}/resume/${pk}/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        console.log(response.data);
        setTitle(response.data.title);
        setComments(response.data.comments);
        setFile(response.data.resume_file);
        if(response.data.resume_file !== null){
            setIsExist(true);
            let splitName = response.data.resume_file.file.split('/');
            setFilename(splitName[splitName.length-1]);
        }else{
            setIsExist(false);
            setFilename("첨부파일없음");
        }
        console.log("기존파일 존재여부>>  ",isExist);
    }

    //API(내용수정)======================================================================================
    const postContent =()=>{
        const fd= new FormData();
        fd.append("title", title);
        fd.append("comments", comments);
        axios.put(`${POLY_SERVER}/resume/${pk}/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            navigate(`/mypage/resume/${pk}`);
        }).catch(function(error) {
            console.log(error);
        }).then(() => {
            navigate(`/mypage/resume/${pk}`);        
        });
    }

    //API(내용+파일수정)======================================================================================
    const postAll =()=>{
        const fd= new FormData();
        const fd2= new FormData();
        fd.append("title",title);
        fd.append("comments", comments);
        fd2.append("file", file);
        fd2.append("post", pk);
        axios.all([
            axios.put(`${POLY_SERVER}/resume/${pk}/`,fd,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            }),
            axios.post(`${POLY_SERVER}/resumefile/`,fd2,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            })
        ]).then(function(response) {
            navigate(`/mypage/resume/${pk}`);
            // window.location.reload();
        }).catch(function(error) {
            console.log(error);
            navigate(`/mypage/resume/${pk}`);
        }).then(() => {
            navigate(`/mypage/resume/${pk}`);
        });
    }

    //API(파일삭제)======================================================================================
    const deleteFile =(e)=>{
        e.preventDefault();
        axios.delete(`${POLY_SERVER}/resumefile/${pk}/`,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            setChangeExist(false);
            setIsExist(false);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //수정함수==================================================================================
    const Save =(e)=>{
        e.preventDefault();
        if(changeExist){
            //수정파일 있으면 모두 수정
            postAll();
        }else{
            //수정파일 없으면 내용물만 수정
            postContent();
        }
    }


    useEffect(()=>{
        getResume();
    },[]);

    return(
        <Background>
            <Form width="50%" position="relative" top="70px" margin="0 auto" padding="20px" background="#fff">
                    <Input name="title" type="text" text="제목" placeholder="제목" value={title} onChange={changeTitle}/>
                    <Input multi_line twidth="97%" rows="20"name="content" text="내용" placeholder="내용" value={comments} onChange={changeComments}/>

                    {isExist ? 
                        <div className="file-info">
                            <h5>첨부파일</h5>
                            <span>{filename}</span>&nbsp;&nbsp;
                            <DeleteButton type="button" onClick={deleteFile} className="btns">X</DeleteButton>     
                        </div>
                    :
                        <Input file name="file" type="file" text="첨부파일" placeholder="첨부파일" onChange={changeFile}/>
                    }
                                
                    <BtnBox>
                        <Button just onClick={Save} text="저장" width="60px" height="35px" margin="0 10px 0 0"/>
                    </BtnBox>
            </Form> 
        </Background>
    )
}

const Background = styled.div`
    height: 100vh;
    background-blend-mode: multiply;
    background: url('/img/blur_desk3.jpg') no-repeat center center/cover, rgba(0,0,0,0.1);

    .file-info{

    }
`;

const DeleteButton = styled.button`
    border: 0;
    color: #526acc;
    cursor: pointer;
`;

const BtnBox = styled.div`
    float: right;
    position: relative;
    top: -30px;
`;

export default PortfolioResumeEdit;