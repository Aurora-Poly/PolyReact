import styled, {keyframes} from "styled-components";
import axios from 'axios';
import {useState,useEffect} from "react";
import {POLY_SERVER} from "../API.js";


function Recommend(){
    const [recommends,setRecommends] = useState([]);
    const [isRecommeded,setIsRecommeded] = useState(false);
    const getRecommends =()=>{
        axios.get(`${POLY_SERVER}/recommend/`,
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
            setRecommends(response.data);
            if(response.data == []){
                setIsRecommeded(false);
            }else{
                setIsRecommeded(true);
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    useEffect(()=>{
        getRecommends();
    },[]);

    return(
       <>
        <Expl>
            <h1>{localStorage.getItem('name')} 이진하 님!<br/> 이런 활동은 어떠세요?</h1>
            <p style={{fontSize:"18px"}}>회원님의 정보와 관심분야를 통해 다양한 활동을 추천해드려요</p>
        </Expl>

    {isRecommeded === false ?
        <h4>
            활동추천을 받으려면 활동들을 스크랩 해야합니다.
        </h4>
        :
        <CardBox>
            {Array.from(recommends).map((r,index) => (
                <CardFrame key={index}>
                    {r.title}
                    {r.image_url}
                    {r.apply_period}
                    {r.field}
                    {r.jukwan}
                    {r.target}
                    {r.views}
                </CardFrame>
            ))}
        </CardBox>
    }   
       </>
    );
}

const boxAnimation = keyframes`
    0%{
        transform: translateY(50px);
        opacity: 0;
    }
    100%{
        transform: translateY(0);
        opacity: 1;
    }
`;

const Expl = styled.div`
    display: inline-block;
    position: relative;
    top: 50px;
    left: 275px;
    margin-bottom: 20px;
    color: #2e4057;
    animation: ${boxAnimation} 1s ease-in-out both ;
`;

const CardBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const CardFrame = styled.div`
    width: 300px;
    height: 400px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 10px;
    background-color: #777;
`;




export default Recommend;