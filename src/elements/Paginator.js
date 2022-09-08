import styled from "styled-components";
import React, {useState, useEffect} from 'react';

function Paginator(props) {
    const {count} = props;
    const [pagenum, setPagenum] = useState([]);
    const handlePage = (page) => {
        if(count/2){ //나머지가 ~보다 작으면..
            setPagenum((count/10)+1);
        }else{ //나머지가 ~보다 작으면..
            setPagenum(count/10);
        }
      };


    return(
        <Pcontainer>
            
        </Pcontainer>
    )
}

const Pcontainer = styled.div`
    background-color: yellow;
`;

export default Paginator;