import styled, {keyframes} from "styled-components";
import Button from "../elements/Button";

function Splash(){
    const hstyle = { margin: "0", fontSize:"40px" };
    const pstyle = { margin: "10px 0", display:"block", fontSize: "20px" };

    return(
        <>
            <DivBox>
                <h1 style={hstyle}>대외활동부터 포트폴리오까지 스펙관리를 한번에</h1>
                <p style={pstyle}>나만의 작업공간을 만들어 편리하게 관리하세요.</p>
            </DivBox>
            <Button animation
                    width="150px" height="50px" 
                    text="Join" href="/user/login" 
                    position="relative" left="46%" top="240px" 
                    // position="relative" left="25%" top="350px" 
                    borderRadius="50px" 
                    fontsize="18px"
                    delay="0.5s"
                    />

            <SplashImage>

            </SplashImage>
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
const DivBox = styled.div`
    display: block;
    text-align: center;
    position:absolute;
    top: 32%;
    left: 40%;
    /* top: 38%; 
    left: 28%; */
    margin-left: -250px;
    margin-top: -90px;
    animation: ${boxAnimation} 0.6s ease-in-out both ;
    animation-delay: 0.4s;
    color: #2e4057;
`;

const SplashImage = styled.div`
    background: url("img/222.png");
    position: relative;
    /* animation: ${boxAnimation} 0.6s ease-in-out both; */
    left: 600px;
    bottom: -300px;
    background-size: cover;
    width: 800px;
    height: 500px;

    /* left: 850px;
    bottom: -200px;
    background-size: cover;
    width: 850px;
    height: 600px; */
`;

export default Splash;