import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from 'react';
import Input from '../../elements/Input';
import Form from '../../elements/Form';
import Button from "../../elements/Button";
import { POLY_SERVER } from "../../API";

function PortfolioEdit(){
    const {pk} = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({
        title: '',
        content: '',
        date: '',
    });
    const [image, setImage] = useState(null);
    const [imgname, setImgname] = useState(''); //이미지명
    const [isImgExist, setIsImgExist] = useState(false); //기존이미지존재여부(UI변경)
    const [editImgExist, setEditImgExist] = useState(false); //이미지수정여부(호출api변경)

    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(''); //파일명
    const [isFileExist, setIsFileExist] = useState(false); //기존파일존재여부(UI변경)
    const [editFileExist, setEditFileExist] = useState(false); //파일수정여부(호출api변경)

    //기존 이미지 존재 유무 확인
    const checkImageExist =(img)=>{
        if(img !== null){
            setIsImgExist(true);
            let splitName = img.image.split('/');
            setImgname(splitName[splitName.length-1]);
        }else{
            setIsImgExist(false);
            setImgname(null);
        }
    }

    //기존 파일 존재 유무 확인 
    const checkFileExist =(file)=>{
        if(file !== null){
            setIsFileExist(true);
            let splitName = file.file.split('/');
            setFilename(splitName[splitName.length-1]);
        }else{
            setIsFileExist(false);
            setFilename(null);
        }
    }

    //데이터 불러오기=============================================================================
    const getDetail = async() =>{
        const response = await axios.get(`${POLY_SERVER}/portfolio/${pk}/`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}});
        console.log(response);
        setDetail({
            title: response.data.title,
            content: response.data.content,
            date: response.data.date,
        });
        checkImageExist(response.data.image);
        checkFileExist(response.data.file);
    };

    //제목,내용,날짜 변경 감지=============================================================================
    const changeContent = (event) => {
		setDetail(
            {
                ...detail,
			[event.target.name]: event.target.value
		    }
        );
	};


    //이미지 변경 감지=============================================================================
    const editImage =(event)=>{
        setImage(event.target.files[0]);
        setEditImgExist(true);
    }
    //파일 변경 감지
    const editFile =(event)=>{
        setFile(event.target.files[0]);
        setEditFileExist(true);
    }

    //API(내용만 수정)=============================================================================
    const postText =()=>{
        const fd= new FormData();
        fd.append("title", detail.title);
        fd.append("content", detail.content);
        
        axios.patch(`${POLY_SERVER}/portfolio/${pk}/`,fd,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            }).then(function(response) {
                console.log(response.data);
                navigate(`/mypage/portfolio/${pk}`);
            }).catch(function(error) {
                console.log(error);
            });
    };

    //API(모두수정)=============================================================================
    const postAll =()=>{
        const fd= new FormData();
        fd.append("title", detail.title);
        fd.append("content", detail.content);
        const fdi= new FormData();
        fdi.append("image", image);
        fdi.append("post", pk);
        const fdf= new FormData();
        fdf.append("file", file);
        fdf.append("post", pk);

        axios.all([
            axios.patch(`${POLY_SERVER}/portfolio/${pk}/`,fd,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            }),
            axios.post(`${POLY_SERVER}/postimage/`,fdi,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            }),
            axios.post(`${POLY_SERVER}/postfile/`,fdf,
            { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
            })
            ]).then(axios.spread((res1, res2, res3)=>{
                console.log(res1.data);
                console.log(res2.data);
                console.log(res3.data);
                navigate(`/mypage/portfolio/${pk}`);
            })).catch(function(error) {
                console.log(error);
            });
    };
    //API(이미지수정)=============================================================================
    const postImage =()=>{
        const fd= new FormData();
        fd.append("image", image);
        fd.append("post", pk);
        axios.post(`${POLY_SERVER}/postimage/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
            navigate(`/mypage/portfolio/${pk}`);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //API(파일수정)=============================================================================
    const postFile =()=>{
        const fd= new FormData();
        fd.append("file", file);
        fd.append("post", pk);
        axios.post(`${POLY_SERVER}/postfile/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            navigate(`/mypage/portfolio/${pk}`);
        }).catch(function(error) {
            console.log(error);
        });
    }
    
    //API(이미지삭제)=====================================================================================
    const deleteImage=(e)=>{
        e.preventDefault();
        axios.delete(`${POLY_SERVER}/postimage/${pk}/`,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            setIsImgExist(false);
            setEditImgExist(false);
        }).catch(function(error) {
            console.log(error);
        });
    };
    //API(파일삭제)=======================================================================================
    const deleteFile=(e)=>{
        e.preventDefault();
        axios.delete(`${POLY_SERVER}/postfile/${pk}/`,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            setIsFileExist(false);
            setEditFileExist(false);
        }).catch(function(error) {
            console.log(error);
        });
    };


    //상태에 따른 api분기함수=========================
    const Save =(e)=>{
        e.preventDefault();
        if(editImgExist&&editFileExist){
            // console.log('postAll');
            postAll();
        }else if(editFileExist){
            // console.log('postFile');
            postFile();
        }else if(editImgExist){
            // console.log('postImage');
            postImage();
        }else{
            // console.log('postText');
            postText();
        }
    }

    useEffect(()=>{
        getDetail();
    },[]);


    return(
        <Background>
            <Form width="50%" height="610px" padding="15px" margin="0 auto" position="relative" top="70px" background="#fff">
                <Input name="title" type="text" text="제목" placeholder="제목" value={detail.title} onChange={changeContent}/>
                <Input multi_line twidth="98%" rows="20"name="content" text="내용" placeholder="내용" value={detail.content} onChange={changeContent}/>

                <div className="flex_container">
                    {isImgExist ? 
                        <div>
                            <h5>첨부이미지</h5>
                            <span>{imgname}</span>&nbsp;&nbsp;
                            <DeleteButton type="button" onClick={deleteImage}  className="btns">X</DeleteButton>
                        </div>
                    : 
                        <Input file name="image" type="file" text="이미지" placeholder="이미지" accept={"image/png,image/jpeg,image/gif"} onChange={editImage}/>
                    }
                </div>
                <div className="flex_container">
                    {isFileExist ? 
                        <div>
                            <h5>첨부파일</h5>
                            <span>{filename}</span>&nbsp;&nbsp;
                            <DeleteButton type="button" onClick={deleteFile}  className="btns">X</DeleteButton>     
                        </div>
                    :
                        <Input file name="file" type="file" text="첨부파일" placeholder="첨부파일" onChange={editFile}/>
                    }
                </div>
                                
                <BtnBox>
                    <Button just onClick={Save} text="저장" width="60px" height="35px" margin="0 10px 0 0"/>
                </BtnBox>
            </Form> 
        </Background>
    );
}

const Background = styled.div`
    height: 100vh;
    background-blend-mode: multiply;
    background: url('/img/blur_desk3.jpg') no-repeat center center/cover, rgba(0,0,0,0.1);
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

export default PortfolioEdit;