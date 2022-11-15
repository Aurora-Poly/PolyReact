import Table from "../components/Table";
import styled from "styled-components";

function Volunteer(){
    return(
        <Background>
            <div>
                <H2>봉사활동</H2>
                <Table/>
            </div>
        </Background>
    )
}

const Background = styled.div`
    width: 100%;
    height: 950px;
    background-blend-mode: multiply;
    background: url('/img/blur_room1.jpg') no-repeat center center/cover, rgba(0,0,0,0.1);

    div{
        width: 1000px;
        margin: 0 auto;
        position: relative;
        top: 40px;
    }
`;

const H2 = styled.h2`
    position: relative; 
    top: 20px;
    color: #363636;
    margin: 0;
`;


export default Volunteer;