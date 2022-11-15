import { POLY_SERVER } from "../API.js";
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from "styled-components";
import Card from "../elements/Card";

function Preview(){
    const [posts, setPosts] = useState([]);
    const getPosts = async ()=> {
        const response = await axios.get(`${POLY_SERVER}/portfolio/`,
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
        );
        setPosts(response.data.results);
    }

    const p = posts.map((post,index) =>(
        <Card key={index}
        width="33%" 
        height="250px"
        pk={post.pk}
        title={post.title}
        titlesize="16px"
        date={post.date}
        desc={post.content}
        src={post.image==null||""? "/img/no_image_50px.png" : post.image.image}/>
    )).slice(0,3);

    useEffect(()=>{
        getPosts();
    },[])

    return(
        <PreviewContainer>
            <h2>최근 등록한 포트폴리오입니다</h2>
            <p>더 많은 작품으로 포트폴리오를 채워보세요.</p>
            { posts.length ? 
                <PreviewContent>
                    {p}
                </PreviewContent>
            :
                <CannotPreview>
                    <p>아직 작성된 글이 없습니다.</p>
                </CannotPreview>
            }
        </PreviewContainer>
    )
}

const PreviewContainer = styled.div`
    h2{margin: 0; color: #363636; }
    p{ color: #818181;}
`;

const PreviewContent = styled.div`
    display: flex;
    column-gap: 20px;
`;

const CannotPreview = styled.div`
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

export default Preview;