import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {POLY_SERVER} from '../API.js';
import {MdUpdate} from "react-icons/md"
import Heart from "../elements/Heart";
import styled from "styled-components";


function LikeCard(props){
    const { 
        pk,
        title, 
        company,
        period,
        width, 
        height,
        src,
        cheight,  
        onClick, 
        like //boolean
    } = props;

    return(
        <CardFrame width={width} height={height} pk={pk}>
                <Image src={src} cheight={cheight}></Image>
                <Content>
                    <p className="scrap_company">
                        {company.length> 15 ? `${company.slice(0,15)}..`: company}
                    </p>
                    <Heart like={like} onClick={onClick}/>
                    <StyledLink to={`/activity/${pk}`}>
                        <h4>
                            {title.length> 26 ? `${title.slice(0,26)}`: title}
                        </h4>
                    </StyledLink>
                    <span className="apply_period">
                        <MdUpdate size="13px" style={{marginRight:"5px"}}/>
                        {period}
                    </span>
                </Content>
        </CardFrame>
    )
}

LikeCard.defaultProps = {
    cheight: "60%",
    width:"100%",
    height:"276px"
}

const CardFrame = styled.div`
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    transition: all 0.3s;

    &:hover{
       box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    }
`;

const Image = styled.div`
    width: 100%;
    height: ${(props)=>props.cheight};
    background-image: url("${(props)=>props.src}");
    background-size: cover;
    background-position: center;
`;

const Content = styled.div`
    height: 40%;
    box-sizing: border-box;
    padding: 10px;

    .scrap_company{ display: inline; }
    .scrap_title{ height: 55%; }
    .apply_period{
        color: #adb5bd;
        font-size: 13px;
        margin-bottom: auto;
    }
`;

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`; 

export default LikeCard;