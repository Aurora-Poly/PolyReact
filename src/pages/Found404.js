import styled, { keyframes } from "styled-components";
import Button from "../elements/Button";

function Found404() {
    return(
        <Div>
            <h1 className="common">404</h1>
            <h2 className="common">요청하신 페이지를 찾을 수 없습니다.</h2>
            <p>방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 해당 페이지를 찾을 수 없습니다.</p>
            <p>입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.</p>

            <Button 
                animation
                width="220px" 
                height="50px" 
                text="메인으로 돌아가기" 
                href="/" 
                borderRadius="50px" 
                fontsize="14px"
                delay="0.5s"
            />
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

    .common { margin: 0 }
    > h1 { font-size: 100px; }
`;


export default Found404;