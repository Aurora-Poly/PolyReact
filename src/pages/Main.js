import Button from "../elements/Button";
import Card from "../elements/Card";
import styled, {keyframes} from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../elements/Grid";
import { Link } from "react-router-dom";

function Main(){
    const [posts, setPosts] = useState([]);
    const getPosts = async ()=> {
        const response = await axios.get('http://127.0.0.1:8000/portfolio/',
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
        );
        console.log(response.data);
        setPosts(response.data.results);
    }

    // const p = posts.map(post =>(
    //     <Card key={post.id}
    //     width="280px" 
    //     height="420px"
    //     title={post.title}
    //     titlesize="20px"
    //     date={post.date}
    //     desc={post.content}
    //     src={post.image}/>
    // )).slice(0,3);

    useEffect(()=>{
        getPosts();
    },[])

    return(
        <>
            <Expl>
                <h1 style={{fontSize:"36px"}}>{localStorage.getItem('username')}님의<br/> 더 많은 작품으로<br/> 포트폴리오를 채워보세요.</h1>
            </Expl>
            <Button animation
                    width="240px"
                    height="50px"
                    fontsize="15px"
                    borderRadius="50px"
                    text="마이페이지로 이동" 
                    href="/mypage"
                    position="relative"
                    left="-175px"
                    top="240px"
                    delay="0.4s"
                    />

            <Grid 
                col="3" 
                row="1fr"
                rowgap="20px" 
                colgap="10px"
                width="700px" 
                margin="15px" 
                position="relative" 
                top="-60px" 
                left="800px"
                overflow="hidden"
            >   
            {posts.map(post =>(
                    <Card key={post.pk}
                    pk={post.pk}
                    width="280px" 
                    height="350px"
                    titlesize="18px"
                    title={post.title}
                    date={post.date}
                    desc={post.content}
                    src={post.image==null||""? "/img/blank-profile.png" : post.image.image}/>
            ))}
            {/* {p} */}
            </Grid>

            <Scrolltrigger>
                <Link to="/recommend">스크롤</Link>
            </Scrolltrigger>
        </>
    )
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
    top: 180px;
    left: 250px;
    color: #2e4057; //#45404f;
    animation: ${boxAnimation} 1s ease-in-out both ;
`;


const Scrolltrigger = styled.div`
    text-align: center;
    font-size: 20px;
    margin-top: 100px;
`;

export default Main;