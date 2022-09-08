import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect, useRef} from 'react';
import Input from '../elements/Input';
import Form from '../elements/Form';


function DetailContent(){
    const {pk} = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({
        title: '',
        content: '',
        date: '',
        image: null,
        file: null
    });
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [imgname, setImgname] = useState(''); //이미지명
    const [filename, setFilename] = useState(''); //파일명

    
    //데이터 불러오기=============================================================================
    const getDetail = async() =>{
        const response = await axios.get(`http://127.0.0.1:8000/portfolio/${pk}/`, { headers : { Authorization: `Token ${localStorage.getItem('token')}`}});
        console.log(response);
        setDetail({
            title: response.data.title,
            content: response.data.content,
            date: response.data.date,
            image: response.data.image,
            file: response.data.file
        });
        console.log(detail.image);
        console.log(detail.file);

        // setImgname(response.data.image.image); //이미지명 출력
        // setFilename(response.data.file.file); //파일명 출력

        // setImgname(`${response.data.image}`==null ? "선택된 파일 없음" : `${response.data.image.image}`);
        // setFilename(`${response.data.file}`==null ? "선택된 파일 없음" : `${response.data.file.file}`);
        setImgname(detail.image !== null ? detail.image.image : "none");
        console.log(imgname);
        setFilename(detail.file !== null ? detail.file.file : "none");
        console.log(filename);
    };

    //게시글 삭제하기=============================================================================
    const handleDelete =async()=>{
        return await axios.delete(`http://127.0.0.1:8000/portfolio/${pk}/`, { headers : { Authorization: `Token ${localStorage.getItem('token')}`}})
        .then(response => {
            // handle success
            console.log(response);
            alert("삭제되었습니다.");
            navigate('/mypage');
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .then(() => {
            // always executed
        });
       
    }

    useEffect(()=>{ getDetail(); }, [imgname, filename]);


    //수정 버튼 클릭 시 변경점=============================================================================
    const [updateMode, setUpdateMode] = useState(false);
    const changeUpdate = (e) => {
		setUpdateMode(!updateMode);
	};

    //제목,내용,날짜 변경 감지=============================================================================
    const changeContent = (event) => {
		setDetail(
            {
                ...detail,
			// ...content,
			[event.target.name]: event.target.value
		    }
        );
        console.log([event.target.name], event.target.value);
	};


    //이미지 변경 감지=============================================================================
    const editImage =(event)=>{
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }
    //파일 변경 감지
    const editFile =(event)=>{
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }


    //수정하기(제목,내용,날짜)=============================================================================
    const handlePut =(e)=>{
        e.preventDefault();
        const fd= new FormData();
        fd.append("title", detail.title);
        fd.append("content", detail.content);
        fd.append("date", detail.date);
        axios.patch(`http://127.0.0.1:8000/portfolio/${pk}/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            // console.log(response);
            console.log(response.data);
            alert("수정되었습니다.");
            window.location.reload(); //새로고침
        
        }).catch(function(error) {
            console.log(error);
        });
    };
    //이미지 post(등록,수정) =============================================================================
    const handleImage =(e)=>{
        e.preventDefault();
        const fd= new FormData();
        fd.append("image", image);
        fd.append("post", pk);
        axios.post(`http://127.0.0.1:8000/postimage/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    }
    //파일 post(등록,수정)
    const handleFile =(e)=>{
        e.preventDefault();
        const fd= new FormData();
        fd.append("file", file);
        fd.append("post", pk);
        axios.post(`http://127.0.0.1:8000/postfile/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    }
    
    //기존 이미지 삭제 =============================================================================
    const onClearImage=(e)=>{
        e.preventDefault();
        axios.delete(`http://127.0.0.1:8000/postimage/${pk}/`,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    };
    //기존 파일 삭제
    const onClearFile=(e)=>{
        e.preventDefault();
        axios.delete(`http://127.0.0.1:8000/postfile/${pk}/`,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    };
    //================================================================================================

    return(
        <Div>
            {updateMode ? 
                (
                    <>
                        <Form position="relative" top="100px" padding="10px">

                            <Input name="title" type="text" text="제목" placeholder="제목" value={detail.title} onChange={changeContent}/>
                            <Input multi_line name="content" text="내용" placeholder="내용" value={detail.content} onChange={changeContent}/>
                            <Input name="date" type="date" text="날짜" placeholder="날짜" value={detail.date} onChange={changeContent}/>
                            
                            <p style={{color:"red"}}>기존 이미지를 'delete'로 지우고, 새로 첨부한 후 반드시 'post'하고 최종적으로 '저장'</p>
                            <Input name="image" type="file" text="이미지" placeholder="이미지" accept={"image/png,image/jpeg,image/gif"} onChange={editImage}/>
                            <button type="button" onClick={handleImage}>post</button>
                            <button type="button" onClick={onClearImage}>delete</button>
                            {/* <span id="head_img_name">{imgname}</span><button type="button" onClick={onClearImg}>x</button> */}
                            <p style={{color:"red"}}>기존 파일을 'delete'로 지우고, 새로 첨부한 후 반드시 'post'하고 최종적으로 '저장'</p>
                            <Input name="file" type="file" text="첨부파일" placeholder="첨부파일" onChange={editFile}/>
                            <button type="button" onClick={handleFile}>post</button>
                            <button type="button" onClick={onClearFile}>delete</button>     
                            {/* <span id="file_upload_name">{filename}</span><button type="button" onClick={onClearFile}>x</button> */}
                              
                            
                            <BtnBox>
                                <button onClick={handlePut}>저장</button> 
                                <button type="button" onClick={changeUpdate}>취소</button>
                            </BtnBox>
                        </Form>
                        
                            
                    </> 
                    
                )
                : 
                (

                    <>
                    <Form position="relative" top="100px">
                        <h3>제목:</h3>
                        <p>{detail.title}</p>
                        <h3>내용:</h3>
                        <p>{detail.content}</p>
                        <h3>날짜:</h3>
                        <p>{detail.date}</p>
                        <h3>이미지:</h3>
                        <p><a href="/">{imgname}</a></p>
                        <h3>첨부파일:</h3>
                        <p><a href="/">{filename}</a></p>
                        <BtnBox>
                            <button type="button" onClick={changeUpdate}>수정</button>
                            <button type="button" onClick={handleDelete}>삭제</button>
                        </BtnBox>
                    </Form>
                    </>
                )
                }
        </Div>
    );

}

const Div = styled.div`
    width: 700px;
    height: 700px;
    text-align: center;
    position:absolute;
    top: 50%; 
    left: 50%;
    margin-left: -350px;
    margin-top: -350px;
    background-color: #fff;
    color: #000;
`;
const BtnBox = styled.div`
    position: relative;
    bottom: -50px;
    left: 0px;
`;

const Image = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center;
`;

export default DetailContent;