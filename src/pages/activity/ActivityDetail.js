import axios from "axios";
import styled from "styled-components";
import Button from "../../elements/Button";
import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io"
import Category from "../../elements/Category";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from "../../elements/Grid";

function ActivityDetail(){
    const {pk} = useParams();
    const [data, setData] = useState({
        title: '',
        target: [],
        prize_1st: '',
        prize: '',
        office: '',
        juchae: '',
        jukwan: '',
        field: '',
        apply_period: '',
        apply_url: '',
        image_url: '',
    });

    const { title,office,target,jukwan,juchae,apply_period,apply_url,image_url,prize_1st,prize,field } = data;

    const fields = ['','기획/아이디어','광고/마케팅','학술','사진/영상/UCC','디자인','문학/시나리오','건축/건설/인테리어','브랜드/네이밍','예체능','대외활동','취업/창업','IT/SW/게임','기타'];
    const targets = ['','누구나','일반인','대학생','대학원생','청소년','어린이','기타'];
    const prizes = ['','5000만원이상','3000만원-5000만원','1000만원-3000만원','1000만원이하','기타',];
    const offices = ['','중앙정부/기관','공기업','대기업','신문/방송/언론','외국계기업','지방자치단체','학교/재단/협회','중소/벤처기업','학회/비영리단체','해외','기타'];


    const getDetail = async()=>{
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/activity/${pk}/`);
            console.log(response.data);
            setData({
                title: response.data.title,
                office: response.data.office,
                target: response.data.target,
                prize_1st: response.data.prize_1st,
                prize: response.data.prize,
                juchae: response.data.juchae,
                jukwan: response.data.jukwan,
                field: response.data.field,
                apply_period: response.data.apply_period,
                apply_url: response.data.apply_url,
                image_url: response.data.image_url
            });
    }

    const [scrap, setScrap] = useState(false);
    function changeState(){
        setScrap(!scrap);
    }

    useEffect(()=>{
        getDetail();
    },[])
    
    return(
        <Background>
            <Container>
                <Image src={image_url}></Image> 
                <InfoContainer>
                    <Title>
                        <h2>{title}</h2>
                        {/* <IoIosHeartEmpty size="30" className="icon"/> */}
                    </Title>
                    <InfoBox>
                        <div>
                            <h3>주최기관</h3>
                            <div>{juchae}</div>
                        </div>
                        <div>
                            <h3>주관기관</h3>
                            <div>{jukwan}</div>
                        </div>
                        <div>
                            <h3>기업형태</h3>
                            <div>{offices[office]}</div>
                        </div>
                        <div>
                            <h3>모집분야</h3>
                            <div>
                                {Array.from(field).map((f,index) => (
                                    <span key={index}>{fields[f]}&nbsp;</span>
                                ))}
                            </div>
                        </div> 
                        <div>
                            <h3>모집대상</h3>
                            <div>
                                {target.map((r,index) => (
                                    <span key={index}>{targets[r]}&nbsp;</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3>접수기간</h3>
                            <div>{apply_period}</div>
                        </div>
                        <div>
                            <h3>수상</h3>
                            <div>{prizes[prize]},{prize_1st}</div>    
                        </div>
                        <div>
                            <h3>홈페이지</h3>
                            <Info>{apply_url}</Info>
                        </div> 
                    </InfoBox>
                    <Button
                        outside
                        width="100%"
                        position="relative"
                        left="0px"
                        top="20px"
                        text="홈페이지에서 지원하기" 
                        href={`${apply_url}`}
                    />
                </InfoContainer>
                    {/* <Category title="카테고리"/> */}

                    
                        {/* <H>{title}</H>
                        <span onClick={changeState} style={{cursor:"pointer"}}>
                            { scrap ? <IoIosHeart size="24" color="red"/> : <IoIosHeartEmpty size="24"/> }
                        </span> */}
                    

            </Container>
        </Background>

    );
}


const Background = styled.div`
    background-blend-mode: multiply;
    background: url('/img/blur_buildings.jpg') no-repeat center center/cover, rgba(0,0,0,0.2);
    height: 120vh;
`;


const Container = styled.div`
    width: 1060px;
    height: 600px;
    color: #363636;
    display: flex;
    column-gap: 40px;
    position: relative;
    top: 30vh;
    margin: 0 auto;

   >div:nth-child(3){
    display: flex;
    width: 800px;
    height: 50px;
    margin: 10px auto;
        
        h2{
            margin: 0;
            display: inline-block;
            width: 90%;
        }
   }

`;

const InfoContainer = styled.div`
    background-color: #fff;
    width: 70%;
    height: 420px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
`;

const Image = styled.div`
    background-image: url("${(props)=>props.src}");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #e6e6e6; 
    width: 300px;
    height: 380px;
    margin: 0 auto;
    position: relative;
    top: 30px;
    left: 30px;
    overflow: hidden;
`;

const Title = styled.div`
    width: 100%;
    
    >h2{
        display: inline-block;
        width: 95%;
    }

    .icon{
        float: right;
        position: relative;
        top: 20px;
        cursor: pointer;
    }

`;

const InfoBox = styled.div`
    color: #363636;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-row-gap: 20px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;
    border-top: 1px solid #e6e6e6;
    width: 700px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;

    h3{
        margin: 0;
        margin-bottom:5px;
    }

`;

const Info = styled.div`
    width: 100%;
    padding:0 5px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`;

export default ActivityDetail;