import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from 'react';
import Input from '../../elements/Input';
import Form from '../../elements/Form';
import Button from "../../elements/Button";
import {IoIosAdd} from "react-icons/io";
import {AiOutlineMinus} from "react-icons/ai";



function PortfolioDetail(){
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
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/portfolio/${pk}/`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}});
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
        setImgname(detail.image !== null ? detail.image.image : "첨부 이미지 없음");
        console.log(imgname);
        setFilename(detail.file !== null ? detail.file.file : "첨부 파일 없음");
        console.log(filename);
    };

    //게시글 삭제하기=============================================================================
    const handleDelete =async()=>{
        return await axios.delete(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/portfolio/${pk}`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}})
        .then(response => {
            // handle success
            console.log(response);
            navigate('/mypage');
        })
        .catch(error => {
            // handle error
            console.log(error);
            navigate('/mypage');
            window.location.reload();
            
        })
        .then(() => {
            // always executed
            navigate('/mypage');
            window.location.reload();
        });
       
    }

    useEffect(()=>{ 
        getDetail();
    }, [imgname, filename]);


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
        axios.patch(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/portfolio/${pk}/`,fd,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
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
        axios.post(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/postimage/`,fd,
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
        axios.post(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/postfile/`,fd,
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
        axios.delete(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/postimage/${pk}/`,
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
        axios.delete(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/postfile/${pk}/`,
        { headers: { 'Content-Type': `multipart/form-data`, Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    };
    
    //이미지 미리보기====================================================================================
    // const reader = new FileReader();
    // const showImage =()=>{
    //     reader.onload=()=>{
    //         document.querySelector('#image_show').style.backgroundImage = `url(${reader.result})`
    //         document.querySelector('#image_show').style.backgroundSize = `cover`;
    //         document.querySelector('#image_show').style.backgroundPosition = `center`;
    //     }
    //     reader.readAsDataURL();
    // }

    return(
        <Div>
            {updateMode ? 
                (
                    <>
                    {/* 수정 */}
                        <Form position="relative" top="50px" height="650px" padding="20px">
                            <Input name="title" type="text" text="제목" placeholder="제목" value={detail.title} onChange={changeContent}/>
                            <Input multi_line cols="99" rows="20"name="content" text="내용" placeholder="내용" value={detail.content} onChange={changeContent}/>
                            <Input name="date" type="date" text="날짜" placeholder="날짜" value={detail.date} onChange={changeContent}/>
                            
                            <div class="flex_container">
                                <Input file name="image" type="file" text="이미지" placeholder="이미지" accept={"image/png,image/jpeg,image/gif"} onChange={editImage}/>
                                <button type="button" onClick={handleImage}  className="btns"><IoIosAdd size="20px"/></button>
                                <button type="button" onClick={onClearImage}  className="btns"><AiOutlineMinus size="16px"/></button>
                            </div>
                            {/* <span id="head_img_name">{imgname}</span><button type="button" onClick={onClearImg}>x</button> */}

                            <div class="flex_container">
                                <Input file name="file" type="file" text="첨부파일" placeholder="첨부파일" onChange={editFile}/>
                                <button type="button" onClick={handleFile}  className="btns"><IoIosAdd size="20px"/></button>
                                <button type="button" onClick={onClearFile}  className="btns"><AiOutlineMinus size="16px"/></button>     
                            </div>
                            {/* <span id="file_upload_name">{filename}</span><button type="button" onClick={onClearFile}>x</button> */}
                              
                            <BtnEditBox>
                                <Button just onClick={changeUpdate} text="수정" width="60px" height="35px" margin="0 10px 0 0"/>
                                <Button href="/mypage" onClick={handleDelete} text="삭제" width="60px" height="35px"/>
                            </BtnEditBox>
                        </Form> 
                    </> 
                    
                )
                : 
                (
                    <>
                    <Form position="relative" top="50px" padding="20px">
                        <div style={{display:"inline-block", width:"70%"}}>
                            <h2 style={{margin:0,marginBottom:"30px"}}>{detail.title}</h2>
                        </div>
                        <span style={{float:"right",color:"#adb5bd"}}>
                            등록일: {detail.date}
                        </span>
                        <div className="e_content">
                            <h3>내용</h3>
                            <div>{detail.content}</div>
                        </div>
                        <div>
                            <h3>이미지</h3>
                            {detail.image !== null ? 
                                <div style={{background:`url(${detail.image.image})`,width:"100%", height:"500px", backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}></div>
                            : 
                                "등록된 이미지 없음"
                            }
                            {/* <p><a href="/">{imgname}</a></p> */}
                        </div>
                        <div>
                            <h3>첨부파일</h3>
                            <p><a href="/">{filename}</a></p>
                        </div>
                        <BtnBox2>
                            <Button just onClick={changeUpdate} text="수정" width="60px" height="35px" margin="0 10px 0 0"/>
                            <Button href="/mypage" onClick={handleDelete} text="삭제" width="60px" height="35px"/>
                        </BtnBox2>
                    </Form>
                    </>
                )
                }
        </Div>
    );

}

const Div = styled.div`
    width: 800px;
    height: 160vh;
    margin: 0 auto 50px auto;
    background-color: #fff;
    box-sizing: border-box;
    color: #000;

    h3{
        font-size: 15px;
    }
    p{
        font-weight: 400;
    }
    .e_content{ 
        height: 200px; 
    }
    .flex_container{
        display: inline-flex;
        justify-content: center;
        align-items:center;
    }
    .btns{
        position: relative;
        top: 20px;
        outline: 0;
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
`;

const BtnEditBox = styled.div`
    text-align: center;
    float: right;
    position: relative;
    top: 0px;
`;

const BtnBox2 = styled.div`
    text-align: center;
    float: right;
    position: relative;
    bottom: 30px;
`;

export default PortfolioDetail;