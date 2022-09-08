import styled, {keyframes} from "styled-components";
import Rcard from "../elements/Rcard";


function Recommend(){
    const bgColor = [
        "rgba(225, 219, 240, 0.8)",
        "rgba(196, 191, 227, 0.8)",
        "rgba(155, 166, 202, 0.8)"
    ];

    return(
       <>
        <Expl>
            <h1>{localStorage.getItem('name')} 이진하 님!<br/> 이런 활동은 어떠세요?</h1>
            <p style={{fontSize:"18px"}}>회원님의 정보와 관심분야를 통해 다양한 활동을 추천해드려요</p>
        </Expl>

        <CardBox>
            <Rcard 
                title="카드 제목입니다. 높이 테스트를 위해서.." 
                agency="덕성여자대학교" 
                desc="거선의 이것이야말로 이상의 철환하였는가? 
                    보배를 이상의 뜨거운지라, 안고, 
                    모래뿐일 불어 눈이 이것이다. 
                    보배를 인생에 풀밭에 가치를 끓는 피다.
                    우리 목숨을 무엇이 낙원을 풀이 그들의 봄바람이다. 
                    천하를 넣는 꽃이 미인을 때문이다." 
                background={`${bgColor[0]}`}
                src={require("../components/img/poster.jpg")}/>
            <Rcard 
                title="카드 제목입니다." 
                agency="덕성여자대학교" 
                desc="청춘을 이상을 위하여, 얼마나 사람은 보라. 
                    열락의 찾아다녀도, 얼음이 곧 약동하다." 
                background={`${bgColor[1]}`}
                src={require("../components/img/poster.jpg")}/>
            <Rcard 
                title="카드 제목입니다." 
                agency="덕성여자대학교" 
                desc="청춘을 이상을 위하여, 얼마나 사람은 보라.
                    청춘을 이상을 위하여 테스트 테스트" 
                background={`${bgColor[2]}`}
                src={require("../components/img/poster.jpg")}/>
        </CardBox>
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


export default Recommend;