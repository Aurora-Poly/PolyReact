import Table from "../components/Table";
import styled from "styled-components";

function Volunteer(){
    return(
        <>
            <H2>봉사활동</H2>

            <Table/>
        </>
    )
}

const H2 = styled.h2`
    display: inline-block;
    position: relative; 
    top: 15px; 
    left: 270px;
    color: #363636;
`;


export default Volunteer;