import axios from 'axios';
import { POLY_SERVER } from "../API.js"; 
import styled from "styled-components";
import Recommend from "./Recommend";
import Preview from "./Preview";

//portfolioManage페이지의 home탭(추천리스트, 최근 게시물)
function Home(){
    return(
        <div>
            <Recommend/>
            <Preview/>
        </div>
    )
}

export default Home;