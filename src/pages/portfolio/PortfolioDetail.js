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
    const [filename, setFilename] = useState('');
    const [imagename, setImagename] = useState('');

    //데이터 불러오기=============================================================================
    const getDetail = async() =>{
        const response = await axios.get(`${POLY_SERVER}/portfolio/${pk}/`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}});
        console.log(response.data);
        setDetail({
            title: response.data.title,
            content: response.data.content,
            date: response.data.date,
            image: response.data.image,
            file: response.data.file
        });
        if(response.data.file!==null){
            let splitName = response.data.file.file.split('/');
            setFilename(splitName[splitName.length-1]);
        }
        if(response.data.image!==null){
            let splitName = response.data.image.image.split('/');
            setImagename(splitName[splitName.length-1]);
        }
    };

    //게시글 삭제하기=============================================================================
    const handleDelete =()=>{
        axios.delete(`${POLY_SERVER}/portfolio/${pk}`, 
        { headers : { Authorization: `Token ${localStorage.getItem('token')}`}})
        .then(response => {
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

    //파일다운로드
    const downloadFile =async(url,name)=>{
        await axios({
            url: url, // 파일 다운로드 요청 URL
            method: 'GET', // 혹은 'POST'
            responseType: 'blob', // 응답 데이터 타입 정의
        }).then(function(response) {
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = name;
			document.body.appendChild(a);
			a.click();
			setTimeout(_ => {
				window.URL.revokeObjectURL(url);
			}, 60000);
			a.remove();
        }).catch(function(error) {
            console.log(error);
        });
    }


    //useEffect==================================================================================
    useEffect(()=>{ 
        getDetail();
    }, []);

    return(
        <Background>
            <Container>
                        <Form position="relative" top="80px" padding="20px" background="#fff">
                            <SubpageName>마이페이지 / 포트폴리오</SubpageName>
                            <Date>등록일: {detail.date}</Date>
                            <Title>{detail.title}</Title>
                            <div className="e_content">
                                <h3>내용</h3>
                                <div>
                                    {detail.content.split('\n').map((t,index)=>{
                                        return (
                                            <span key={index}>{t}<br/></span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <h3>
                                    이미지 &nbsp;&nbsp;
                                </h3>
                                {detail.image !== null ? 
                                <>
                                <DownloadButton  type="button" onClick={()=>{downloadFile(`${detail.image.image}`,`${imagename}`)}}>다운로드</DownloadButton>
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
                                {detail.file !== null ? 
                                <>
                                    <span>{filename}</span>&nbsp;&nbsp;
                                    <DownloadButton type="button" onClick={()=>{downloadFile(`${detail.file.file}`,`${filename}`)}}>다운로드</DownloadButton>
                                </>
                                : 
                                    "등록된 파일 없음"
                                }
                            </div>
                            <BtnBox>
                                <BackButton onClick={()=>{navigate(`/mypage/portfolio/`)}}>목록으로</BackButton>
                                <Button just onClick={()=>{navigate(`/mypage/portfolio/edit/${pk}`)}} text="수정" width="60px" height="35px" margin="0 5px 0 0"/>
                                <Button href="/mypage/home" onClick={handleDelete} text="삭제" width="60px" height="35px"/>
                            </BtnBox>
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
        height: auto;
        min-height: 300px;
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

const SubpageName = styled.span`
    margin: 0;
    color: #818181;
    font-size: small;
`;

const Title = styled.h2`
    display: inline-block;
    width: 100%;
    margin: 0;
    margin-top: 5px;
`;

const Date = styled.span`
    font-size: small;
    color: #818181;
    float: right;
`;

const DownloadButton = styled.button`
    border: 0;
    color: #526acc;
    cursor: pointer;
`;

const BackButton = styled.button`
    border: 1px solid #818181;
    color: #818181;
    background-color: #fff;
    border-radius: 5px;
    padding: 8px;
    margin-right: 5px;
    box-sizing: border-box;
    height: 35px;
    width: 75px;
`;

const BtnBox = styled.div`
    text-align: center;
    float: right;
    position: relative;
    bottom: 30px;
`;

export default PortfolioDetail;