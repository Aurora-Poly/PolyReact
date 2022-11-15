import { POLY_SERVER } from "../API.js"; 
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from "styled-components";
import Card from "../elements/Card";

function Recommend(){
    const [recommends,setRecommends] = useState([]);
    const getRecommends =()=>{
        axios.get(`${POLY_SERVER}/recommend/`,
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
            setRecommends(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    };

    useEffect(()=>{
        getRecommends();
    },[]);

    return(
        <RecommendContainer>
            <h2>이런 활동들은 어떠세요?</h2>
            <p>{localStorage.getItem('username')}님이 최근 스크랩한 활동들을 기반으로 추천해드릴게요.</p>
            {recommends.length ? 
                <RecommendContent>
                    {Array.from(recommends).map((r,index) => (
                        <Card key={index}
                                        is_scrap
                                        pk={r.id}
                                        width="33%" 
                                        height="276px"
                                        title={r.title}
                                        company={r.jukwan}
                                        period={r.apply_period}
                                        src={r.image_url}
                                        like={r.id}/>
                    ))}
                </RecommendContent>
            :
            <CannotRecommend>
                <p>스크랩한 활동이 없어 활동을 추천할 수 없습니다.</p>
            </CannotRecommend>
            }
        </RecommendContainer>
    )
}

const RecommendContainer = styled.div`
    margin-bottom: 30px;

    h2{
        margin: 0;
        color: #363636;
    }
    p{ color: #818181;}

`;

const RecommendContent = styled.div`
    display: flex;
    column-gap: 20px;
    width: 100%;
`;

const CannotRecommend = styled.div`
    height: 130px;
    background-color: #f1f3f5;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 15px;

    p{
        font-size: small;
        margin: 0;
    }
`;


export default Recommend;