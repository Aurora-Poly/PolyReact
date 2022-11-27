import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from 'react';
import Input from '../../elements/Input';
import Form from '../../elements/Form';
import Button from "../../elements/Button";
import {IoIosAdd} from "react-icons/io";
import {AiOutlineMinus} from "react-icons/ai";
import {POLY_SERVER} from "../../API.js";

function PortfolioResumeDetail(){
    const {pk} = useParams();
    const navigate = useNavigate();

    const [detail, setDetail] = useState({
        title: '',
        content: '',
        date: '',
    });

    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(''); //파일명

    //이력서,자소서 불러오기=============================================================================
    const getCvList = async () => {
        const response = await axios.get(`${POLY_SERVER}/resume/${pk}/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
        );
        console.log(response);
        setDetail({
            title: response.data.title,
            content: response.data.comments,
            date: response.data.date,
            // file: response.data.resume_file,
        });
        if(response.data.resume_file !== null){
            setFile(response.data.resume_file);
            let splitName = response.data.resume_file.file.split('/');
            setFilename(splitName[splitName.length-1]);
        }
    }

    

    //게시글 삭제하기=============================================================================
    const handleDelete =async()=>{
        return await axios.delete(`${POLY_SERVER}/resume/${pk}`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}})
        .then(response => {
            // handle success
            console.log(response);
            navigate('/mypage/resume');
        })
        .catch(error => {
            // handle error
            console.log(error);
            navigate('/mypage/resume');
            
        })
        .then(() => {
            // always executed
            navigate('/mypage/resume');
        });
       
    }

    //파일 변경 감지
    const editFile =(event)=>{
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    //파일 post(등록,수정)
    const handleFile =(e)=>{
        e.preventDefault();
        const fd= new FormData();
        fd.append("file", file);
        fd.append("post", pk);
        axios.post(`${POLY_SERVER}/postfile/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //기존 파일 삭제
    const onClearFile=(e)=>{
        e.preventDefault();
        axios.delete(`${POLY_SERVER}/postfile/${pk}/`,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //수정하기(제목,내용)=============================================================================
    const handlePut =(e)=>{
        e.preventDefault();
        const fd= new FormData();
        fd.append("title", detail.title);
        fd.append("comments", detail.content);
        axios.patch(`${POLY_SERVER}/resume/${pk}/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
            alert("수정되었습니다.");
            window.location.reload(); //새로고침
        }).catch(function(error) {
            console.log(error);
        });
    };

    useEffect(()=>{ 
        getCvList();
    }, [filename]);

    return(

        <Background>
            <Div>
                <Form position="relative" top="50px" padding="20px" background="#fff">
                    <p>마이페이지 / 이력서,자기소개서</p>
                    <div style={{display:"inline-block", width:"70%"}}>
                        <h2 style={{margin:0,marginBottom:"30px"}}>{detail.title}</h2>
                    </div>
                    <span style={{float:"right",color:"#adb5bd",fontSize:"14px"}}>
                        등록일: {detail.date}
                    </span>
                    <div className="e_content">
                        <h3>내용</h3>
                        <div>{detail.content}</div>
                    </div>
                    <div>
                        <h3>첨부파일</h3>
                        {filename !== null ? 
                        <p>{filename}</p>
                    :
                        "등록된 파일 없음"
                        }
                    </div>
                    <BtnBox>
                        <Button just onClick={()=>{navigate(`/mypage/resume/edit/${pk}`)}} text="수정" width="60px" height="35px" margin="0 10px 0 0"/>
                        <Button href="/mypage" onClick={handleDelete} text="삭제" width="60px" height="35px"/>
                    </BtnBox>
                </Form>
            </Div>
        </Background>
    )

}


const Background = styled.div`
    height: 1000px;
    background-blend-mode: multiply;
    background: url('/img/blur_desk3.jpg') no-repeat center center/cover, rgba(0,0,0,0.1);
`;

const Div = styled.div`
    width: 800px;
    height: auto;
    margin: 0 auto 50px auto;
    box-sizing: border-box;
    color: #363636;
`;
const BtnEditBox = styled.div`
    text-align: center;
    float: right;
    position: relative;
    top: -30px;
`;
const BtnBox = styled.div`
    text-align: center;
    float: right;
    position: relative;
    bottom: 30px;
`;

export default PortfolioResumeDetail;
