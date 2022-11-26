import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from 'react';
import Form from '../../elements/Form';
import Button from "../../elements/Button";
import { POLY_SERVER } from "../../API";

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
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(''); //파일명

    //데이터 불러오기=============================================================================
    const getDetail = async() =>{
        const response = await axios.get(`${POLY_SERVER}/portfolio/${pk}/`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}});
        console.log(response);
        setDetail({
            title: response.data.title,
            content: response.data.content,
            date: response.data.date,
            image: response.data.image,
            file: response.data.file
        });
    };

    //게시글 삭제하기=============================================================================
    const handleDelete =()=>{
        axios.delete(`${POLY_SERVER}/portfolio/${pk}`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}})
        .then(response => {
            console.log(response);
            navigate('/mypage/home');
        })
        .catch(error => {
            console.log(error);
            navigate('/mypage/home');
            
        })
        .then(() => {
            navigate('/mypage/portfolio');
        });
       
    }

    useEffect(()=>{ 
        getDetail();
    }, []);

    return(
        <Background>
            <Container>
                        <Form position="relative" top="80px" padding="20px" background="#fff">
                            <div style={{display:"inline-block", width:"70%"}}>
                                <h2 style={{margin:0,marginBottom:"30px"}}>{detail.title}</h2>
                            </div>
                            <span style={{float:"right",color:"#adb5bd", fontSize:"14px"}}>
                                등록일: {detail.date}
                            </span>
                            <div className="e_content">
                                <h3>내용</h3>
                                <div>
                                    {detail.content.split('\n').map((t)=>{
                                        return (
                                            <span>
                                                {t}<br/>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <h3>이미지</h3>
                                {detail.image !== null ? 
                                <>
                                    <a href={`${detail.image.image}`} download>다운로드</a>
                                    <div 
                                        style={{background:`url(${detail.image.image})`,
                                                width:"100%", 
                                                height:"300px", 
                                                backgroundSize:"contain",
                                                backgroundPosition:"center",
                                                backgroundRepeat:"no-repeat"
                                                }}>
                                    </div>
                                </>
                                : 
                                    "등록된 이미지 없음"
                                }
                            </div>
                            <div>
                                <h3>첨부파일</h3>
                                <p>{filename}</p>
                            </div>
                            <BtnBox2>
                                <Button just onClick={()=>{navigate(`/mypage/portfolio/edit/${pk}`)}} text="수정" width="60px" height="35px" margin="0 10px 0 0"/>
                                <Button href="/mypage/home" onClick={handleDelete} text="삭제" width="60px" height="35px"/>
                            </BtnBox2>
                        </Form>
            </Container>
        </Background>
    );

}

const Background = styled.div`
    height: 100vh;
    background-blend-mode: multiply;
    background: url('/img/blur_desk3.jpg') no-repeat center center/cover, rgba(0,0,0,0.1);
`;

const Container = styled.div`
    width: 800px;
    height: auto;
    margin: 0 auto 50px auto;
    box-sizing: border-box;
    color: #363636;

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
        top: 10px;
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
    top: 50px;
`;

const BtnBox2 = styled.div`
    text-align: center;
    float: right;
    position: relative;
    bottom: 30px;
`;

export default PortfolioDetail;