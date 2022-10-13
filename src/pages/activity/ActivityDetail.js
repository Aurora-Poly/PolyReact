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
        apply_period: '',
        apply_url: '',
        image_url: '',
    });

    const { title,office,target,jukwan,juchae,apply_period,apply_url,image_url,prize_1st,prize } = data;

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
        <Container>
            <Image src={image_url}></Image> 
            <h2>{title}</h2>
            <InfoBox>
                <div>
                    <h3>주최기관</h3>
                    <Info>{juchae}</Info>
                </div>
                <div>
                    <h3>주관기관</h3>
                    <Info>{jukwan}</Info>
                </div>
                <div>
                    <h3>모집대상</h3>
                    <Info>{target}</Info>
                </div>
                <div>
                    <h3>접수기간</h3>
                    <Info>{apply_period}</Info>
                </div>
                <div>
                    <h3>수상</h3>
                    <Info>{prize},{prize_1st}</Info>    
                </div>
                <div>
                    <h3>홈페이지</h3>
                    <Info>{apply_url}</Info>
                </div> 
            </InfoBox>
            <Button
                outside
                width="200px"
                position="relative"
                left="650px"
                top="20px"
                text="홈페이지에서 지원하기" 
                href={`${apply_url}`}
            />
                 {/* <Category title="카테고리"/> */}

                 
                     {/* <H>{title}</H>
                     <span onClick={changeState} style={{cursor:"pointer"}}>
                         { scrap ? <IoIosHeart size="24" color="red"/> : <IoIosHeartEmpty size="24"/> }
                     </span> */}
                 

        </Container>

    );
}




const Container = styled.div`
   height: 100vh;

   h2{
    text-align: center;
   }
`;

const Image = styled.div`
    background-image: url("${(props)=>props.src}");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 400px;
    height: 300px;
    margin: 0 auto;
`;

const InfoBox = styled.div`
    color: #2e4057;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-row-gap: 20px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;
    border-top: 1px solid #e6e6e6;
    width: 700px;
    border: 1px solid #e6e6e6;

    h3{
        margin: 0;
        margin-bottom:5px;
    }

`;

const Info = styled.div`
    /* margin-top: 10px; */
`;

export default ActivityDetail;