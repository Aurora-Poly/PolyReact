import styled, {keyframes} from "styled-components";
import Button from "../elements/Button";

function Splash(){
    const insertedToken = localStorage.getItem('token');

    return(
        <Root>
        <WelcomeContainer>
            <TextContainer>
                <div>
                    <h3>대외활동 탐색부터 포트폴리오까지 스펙관리를 한번에</h3>
                    <p>나만의 작업공간을 만들어 편리하게 관리하세요.</p>
                </div>
            </TextContainer>
            <div className="btnBox">
                <Button animation
                    width="180px" 
                    height="45px" 
                    text="Join" 
                    href={insertedToken? "/mypage" : "/user/login"}
                    fontsize="18px"
                    delay="0.5s"
                    />
            </div>
        </WelcomeContainer>
        <IntroContainer>
            <h2>대학생들을 위한 포트폴리오 관리 & 대외활동 추천 서비스, 폴리</h2>
            <p>폴리는 사용자님의 스펙관리에 필요한 다양한 정보들을 제공하고 추천해드립니다. 활동탐색과 기록을 한 곳에서 해결하세요.</p>
        </IntroContainer>
        <ServiceContainer>
            <FlexContainer>
                <Service>
                    <div>
                        <h3>e-포트폴리오 관리</h3>
                        <p>작업물을 어디에 보관하시나요?<br/> 폴리는 작업 결과물을 저장할 수 있는 공간을 제공합니다. 여기저기 흩어져 있는 포트폴리오를 모아서 관리하세요.</p>
                    </div>
                    <Button
                    width="200px" 
                    height="40px" 
                    text="포트폴리오 관리하기" 
                    href={insertedToken? "/mypage/home" : "/user/login"}  
                    fontsize="14px"
                    />
                </Service>
                <Service>
                    <div>
                        <h3>다양한 활동 검색</h3>
                        <p>폴리에서 다양한 대외활동,공모전,동아리,<br/> 봉사활동을 찾고 원하는 정보를 탐색하세요.</p>
                    </div>
                    <Button
                    width="180px" 
                    height="40px" 
                    text="활동 검색하기" 
                    href="/activity"
                    fontsize="14px"
                    />
                </Service>
                <Service>
                    <div>
                        <h3>맞춤 활동 추천</h3>
                        <p>어떤 활동을 해야할지 모르겠다구요? <br/> 걱정마세요. 폴리가 개인의 관심분야와 작업물을 기반으로 적절한 활동을 추천해드립니다.</p>
                    </div>
                        <Button
                        width="180px" 
                        height="40px" 
                        text="활동 추천받기" 
                        href={insertedToken? "/mypage/home" : "/user/login"} 
                        fontsize="14px"
                        />
                </Service>
            </FlexContainer>
        </ServiceContainer>
        <Footer>
            <h2>POLY</h2>
            <ul>
                <li><b>Contact Us</b>&nbsp;&nbsp; aurora_poly@gmail.com</li>
                <li><b>Github</b>&nbsp;&nbsp; https://github.com/Aurora-Poly/DRF_new</li>
                <li><b>Address</b>&nbsp;&nbsp; 서울특별시 도봉구 쌍문1동 삼양로144길 33</li>
                <p>© 2022. aurora-poly. All Rights Reserved</p>
            </ul>
        </Footer>
        </Root>
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

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

const WelcomeContainer = styled.div`
    width: 100%;
    height: 550px;
    min-width: 600px;
    background-blend-mode: multiply;
    background: url('/img/meetings.jpg') no-repeat center center/cover, rgba(0, 0, 0, 0.4);

    .btnBox{
        width: 100%;
        text-align: center;
        position: relative;
        top: 200px;
    }

    @media (max-width: 900px) {
        &{
            text-align: center;
        }
    }
`;

const TextContainer = styled.div`
    width:  100%;
    min-width: 540px;
    margin: 0 auto;
    text-align: center;

    div{
        display: inline-block;
        animation: ${boxAnimation} 0.6s ease-in-out both ;
        animation-delay: 0.4s;
        color: #e6e6e6;
        position: relative;
        top: 200px;
     }

     div h3:first-child{
         margin: 0;
         margin-bottom: 5px;
         font-size: 35px;
         line-height: 45px;
    }
    div p{ font-size: 18px}
`;

const IntroContainer = styled.div`
margin-top: 50px;
    width: 100%;
    /* height: 400px; */
    text-align: center;
`;

const ServiceContainer = styled.div`
    width: 100%;
    text-align: center;
    position: relative;
    top: -20px;

    .explain{
        display: block;
        width: 280px;
        text-align: left;
        position: relative;
        left: 150px;
    }

    h2{
        font-size: 30px;
        margin: 40px 0 20px 0;
    }
    h4{
        margin: 0;
        font-weight: 400;
        color: #363636;
    }
`;

const FlexContainer = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(3, auto);
    column-gap: 16px;
    position: relative;
    top: 30px;
    margin-bottom: 80px;
`;

const Service = styled.div`
    width: 400px;
    height: 350px;
    box-sizing: border-box;
    padding: 40px;
    border-radius: 5px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

    div{
        height: 80%;
    }

    div h3{
        color: #363636;
        margin-top: 0;
    }

    div p{
        color: #818181;
        line-height: 25px;
    }
`;


const Footer = styled.div`
    bottom: 0;

    background-color: #777;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;

    ul li{
        line-height: 25px;
    }
`;
export default Splash;