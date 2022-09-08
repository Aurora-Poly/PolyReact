import styled, { keyframes } from "styled-components";
import Button from "../elements/Button";

function Found404() {
    return(
        <Div>
            <H1>404</H1>
            <H2>요청하신 페이지를 찾을 수 없습니다.</H2>
            <p>방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 해당 페이지를 찾을 수 없습니다.</p>
            <p>입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.</p>

            <Button 
                width="220px" 
                text="메인으로 돌아가기" 
                href="/"/>
        </Div>
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

const Div = styled.div`
    display: block;
    width: 700px;
    text-align: center;
    position:absolute;
    top: 50%; 
    left: 50%;
    margin-left: -350px;
    margin-top: -180px;
    animation: ${boxAnimation} 1s ease-in-out both ;
    color: #2e4057;
`;

const H1 = styled.h1`
    font-size: 100px;
    margin: 0;
`;

const H2 = styled.h2`
    margin: 0;
`;

export default Found404;