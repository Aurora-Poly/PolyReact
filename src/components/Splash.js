import styled, {keyframes} from "styled-components";
import Button from "../elements/Button";
import {GiNotebook,GiDiploma,GiSpyglass} from "react-icons/gi"
import Grid from "../elements/Grid";

function Splash(){
    let info = [
        {title:"서비스명1", explain: "설명1"},
        {title:"서비스명2", explain: "설명2"},
        {title:"서비스명3", explain: "설명3"},
    ]

    return(
        <>
        <MainContainer>
            <TextContainer>
                <h1>대외활동부터 포트폴리오까지 스펙관리를 한번에</h1>
                <h2>나만의 작업공간을 만들어 편리하게 관리하세요.</h2>
            </TextContainer>
            <Button animation
                width="180px" 
                height="45px" 
                text="Join" 
                href="/user/login" 
                fontsize="18px"
                delay="0.5s"
                />
        </MainContainer>
        <ServiceContainer>
            <h1>서비스</h1>
            <h3>폴리가 제공하는 서비스를 소개합니다.</h3>
            <Grid col="3" row="1fr" width="60%" margin="30px auto">
                <Service>
                    <GiNotebook size="50px" style={{marginBottom:"10px"}}/>
                    <h3>e-포트폴리오 관리</h3>
                    <p>스펙관리를 위한 공간을 제공합니다.</p>
                </Service>
                <Service>
                    <GiSpyglass size="50px" style={{marginBottom:"10px"}}/>
                    <h3>다양한 활동 검색</h3>
                    <p>대외활동,공모전,동아리,봉사활동을 한 곳에서 찾을 수 있습니다.</p>
                </Service>
                <Service>
                    <GiDiploma size="50px" style={{marginBottom:"10px"}}/>
                    <h3>맞춤 활동 추천</h3>
                    <p>개인의 관심분야와 작업물을 기반으로 적절한 활동을 추천해드립니다.</p>
                </Service>
            </Grid>
        </ServiceContainer>
        <Footer>
            
        </Footer>
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

const MainContainer = styled.div`
    width: 100%;
    height: 500px;
    background-blend-mode: multiply;
    background: url('/img/meetings.jpg') no-repeat center center/cover, rgba(0, 0, 0, 0.7);
    text-align: center;
    
    >button{
        position: relative;
        top: 195px;
    }
`;

const Service = styled.div`
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
    padding: 20px;
    width: 300px;
    height: 200px;
    border: 1px solid #adb5bd;
    border-radius: 5px;
    margin: 0 auto;
`;

const TextContainer = styled.div`
    width:  100%;
    min-width: 540px;
    text-align: center;
    margin: 0 auto;
    position:relative;
    top: 35%;
    animation: ${boxAnimation} 0.6s ease-in-out both ;
    animation-delay: 0.4s;
    color: #e6e6e6;

    > h1:first-child{
        margin: 0;
        margin-bottom: 5px;
        font-size: 40px;
    }
    >h2{
        font-weight: 500;
        margin: 0;
    }
`;

const ServiceContainer = styled.div`
    height: 80vh;
    text-align: center;
    color: #111111;
    position: relative;
    top: 100px;

    h1{
        font-size: 36px;
        margin: 40px 0 20px 0;
    }
    h3{
        margin: 0;
        font-weight: 500;
    }
`;

const Footer = styled.div`

`;
export default Splash;