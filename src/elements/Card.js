import styled from "styled-components";
import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io";
import { BsTextLeft } from "react-icons/bs";
import {MdUpdate} from "react-icons/md"
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {POLY_SERVER} from '../API.js';
import Heart from "../elements/Heart";


function Card(props){
    const navigate = useNavigate();
    const { 
        pk,
        is_scrap, 
        no_img, 
        is_etc, 
        title, 
        desc, 
        desc2,
        company,
        period,
        date, 
        status, 
        personnel, 
        src, 
        width, 
        height, 
        cheight, 
        margin, 
        textalign, 
        fontsize, 
        titlesize, 
        _onClick, 
        like,
        alreadylike
    } = props;

    //스크랩 기능(등록,해제 원클릭)==========================================================================
    const handleLike =async(like)=> {
        await axios.post(`${POLY_SERVER}/activity/like/${like}/`,{},
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
            setScrap(!scrap);

        }).catch(function(error) {
            console.log(error);
            const error_code = error.response.status;
            if(error_code == 401){
                navigate('/user/login');
            } 
        });
    }

    const [scrap, setScrap] = useState(false);
    const [isLike, setIsLike] = useState(false);
    function changeState(like){
        handleLike(like);
    }

    useEffect(()=>{

    },[]);


    //스크랩 카드(원형)=======================================================
    if(is_scrap){
        return(
            <CardFrame width={width} height={height} margin={margin} pk={pk}>
                <Image src={src} cheight={"60%"}></Image>
                <Content style={{height:"40%"}}>
                    <P fontsize={fontsize} className="scrap_company">
                        {company.length> 15 ? `${company.slice(0,15)}..`: company}
                    </P>
                    { scrap ? 
                    <SpanIcon onClick={()=>{changeState(like)}}>
                        {/* 스크랩 했을때 */}
                        <IoIosHeart size="22px" color="dd5851" style={{cursor:"pointer"}}/> 
                    </SpanIcon>
                    : 
                    <SpanIcon onClick={()=>{changeState(like)}}>
                        {/* 스크랩 풀었을때 */}
                        <IoIosHeartEmpty size="22px" style={{cursor:"pointer"}}/>
                    </SpanIcon>
                    }

                    <StyledLink to={`/activity/${pk}`}>
                        <Title titlesize={titlesize} className="scrap_title">
                                {title.length> 26 ? `${title.slice(0,26)}`: title}
                        </Title>
                    </StyledLink>
                    <span className="apply_period">
                        <MdUpdate size="13px" style={{marginRight:"5px"}}/>
                        {period}
                    </span>
                </Content>
            </CardFrame>
        );
    }

    // //스크랩 카드(수정)=======================================================
    // if(is_scrap){
    //     return(
    //         <CardFrame width={width} height={height} margin={margin} pk={pk}>
    //             <Image src={src} cheight={"60%"}></Image>
    //             <Content style={{height:"40%"}}>
    //                 <P fontsize={fontsize} className="scrap_company">
    //                     {company.length> 15 ? `${company.slice(0,15)}..`: company}
    //                 </P>
    //                 <Heart like={isLike} onClick={()=>{changeState(like_user)}}/>
    //                 <StyledLink to={`/activity/${pk}`}>
    //                     <Title titlesize={titlesize} className="scrap_title">
    //                             {title.length> 26 ? `${title.slice(0,26)}`: title}
    //                     </Title>
    //                 </StyledLink>
    //                 <span className="apply_period">
    //                     <MdUpdate size="13px" style={{marginRight:"5px"}}/>
    //                     {period}
    //                 </span>
    //             </Content>
    //         </CardFrame>
    //     );
    // }
    //스크랩 카드=======================================================
    if(alreadylike){
        return(
            <CardFrame width={width} height={height} margin={margin} pk={pk}>
                <Image src={src} cheight={"60%"}></Image>
                <Content style={{height:"40%"}}>
                    <P fontsize={fontsize} className="scrap_company">
                        {company.length> 15 ? `${company.slice(0,15)}..`: company}
                    </P>
                    { scrap ? 
                    <SpanIcon onClick={()=>{changeState(like)}}>
                        <IoIosHeartEmpty size="22px" style={{cursor:"pointer"}}/>
                    </SpanIcon>
                    : 
                    <SpanIcon onClick={()=>{changeState(like)}}>
                        <IoIosHeart size="22px" color="dd5851" style={{cursor:"pointer"}}/> 
                    </SpanIcon>
                    }

                    <StyledLink to={`/activity/${pk}`}>
                        <Title titlesize={titlesize} className="scrap_title">
                                {title.length> 26 ? `${title.slice(0,26)}`: title}
                        </Title>
                    </StyledLink>
                    <span className="apply_period">
                        <MdUpdate size="13px" style={{marginRight:"5px"}}/>
                        {period}
                    </span>
                </Content>
            </CardFrame>
        );
    }

    //이력서 카드=======================================================
    if(no_img){
        return(
            <CardFrame width={width} height={height} margin={margin}>
                <Content style={{height:"93%"}}>
                    <BsTextLeft size="24px"/>
                    <StyledLink to={`/mypage/resume/${pk}`}>
                        <Title titlesize={titlesize} onClick={_onClick}>
                            {/* {title.length> 17 ? `${title.slice(0,17)}`: title} */}
                            {title}
                        </Title>
                    </StyledLink>
                    <Date>{date}</Date>
                    <P fontsize={fontsize}>
                        {desc.length> 125 ? `${desc.slice(0,125)} ...`: desc}
                    </P>
                </Content>
            </CardFrame>
        );
    }

    //동아리,봉사활동 카드=======================================================
    if(is_etc){
        return(
            <CardFrame width={width} height={height} margin={margin}>
                <ClubContent>
                    <Title titlesize={titlesize}>
                        {title.length> 20 ? `${title.slice(0,20)}`: title}
                    </Title>
                    <P fontsize={fontsize} style={{marginTop:"5px"}}>
                        {desc> 12 ? `${desc.slice(0,12)} ...`: desc}
                    </P>
                    <P2 fontsize={fontsize}>
                        {desc2.length> 30 ? `${desc2.slice(0,30)} ...`: desc2}
                    </P2>
                </ClubContent>
                    <InfoBox>
                        <Info>
                            <Span>등록일</Span>
                            <P>{date}</P>
                        </Info>
                        <Info>
                            <Span>모집인원</Span>
                            <P>{personnel}</P>
                        </Info>
                        <Info>
                            <Span>상태</Span>
                            <P>{status}</P>
                        </Info>
                    </InfoBox>
            </CardFrame>
        );
    }



    // 일반 카드(마이페이지)=======================================================
    return(
        <CardFrame width={width} height={height} margin={margin} textalign={textalign} pk={pk}>
            <Image src={src} cheight={cheight}></Image>
            <Content>
                <StyledLink to={`/mypage/portfolio/${pk}`}>
                    <Title titlesize={titlesize} onClick={_onClick}>
                        {/* {title.length> 17 ? `${title.slice(0,17)}`: title} */}
                        {title}
                    </Title>
                </StyledLink>
                <Date>{date}</Date>
                <P fontsize={fontsize}>
                    {desc.length> 33 ? `${desc.slice(0,33)} ...`: desc}
                </P>
            </Content>
        </CardFrame>
    );
}

Card.defaultProps ={
    cheight:"50%",
    no_img: false,
    is_scrap: false,
    fontsize: "14px",
    titlesize: "16px",
    desc2: " ",
    src: "/img/no_image_50px.png",
    _onClick: () => {}
};

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`; 

const CardFrame = styled.div`
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    text-align: ${(props)=>props.textalign};
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    transition: all 0.3s;

    &:hover{
       box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    }
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

const ClubContent = styled.div`
    height: 40%;
    box-sizing: border-box;
    padding: 15px;
    height: 60%;
    line-height: 20px;
    overflow: hidden;
`;

const Date = styled.p`
    color: rgb(169,169,169);
    margin: 10px 0;
    font-size: 14px;
`;

const Title = styled.h4`
    color: #363636;
    line-height: 22px;
    margin: 0;
    margin-top: 5px;
    font-size: ${(props)=>props.titlesize};
    cursor: pointer;
    
`;

const InfoBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    column-gap: 10px;
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #e6e6e6;
`;

const Info = styled.div`
    
`;

const P = styled.p`
    color: rgb(125,125,125);
    margin: 0;
    font-size: ${(props)=>props.fontsize};
    line-height: 18px;
`;
const P2 = styled.p`
    display: block;
    height: 52px;
    color: rgb(125,125,125);
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: ${(props)=>props.fontsize};
`;

const Span = styled.span`
    color: rgb(169,169,169);
    margin: 10px 0;
    font-size: 14px;
`;

const Image = styled.div`
    width: 100%;
    height: ${(props)=>props.cheight};
    background-image: url("${(props)=>props.src}");
    background-size: cover;
    background-position: center;
`;

const SpanIcon = styled.span`
    display: inline-block;
    margin: 0 0 0 10px;
    float: right;
`;

export default Card;