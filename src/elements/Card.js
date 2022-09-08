import styled from "styled-components";
import { IoIosHeartEmpty,IoIosHeart, IoIosPeople } from "react-icons/io";
import { BsTextLeft } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";


function Card(props){
    const { pk, title, desc, desc2, date, status, personnel, src, width, height, cheight, margin, is_scrap, no_img, is_etc, textalign, fontsize, titlesize, _onClick } = props;
    const [scrap, setScrap] = useState(true);
    function changeState(){
        setScrap(!scrap);
    }

    // id=parseInt(id);

    // 스크랩버튼이 있는 카드(검색,활동조회)
    if(is_scrap){
        return(
            <CardFrame width={width} height={height} margin={margin} pk={pk}>
                <Image src={src} cheight={"70%"}></Image>
                <Content style={{height:"25%"}}>
                    <P fontsize={fontsize} style={{display:"inline"}}>
                        {desc.length> 10 ? `${desc.slice(0,10)}`: desc}
                    </P>
                    <SpanIcon onClick={changeState}>
                        { scrap ? 
                            <IoIosHeartEmpty size="22px" style={{cursor:"pointer"}}/> 
                            : 
                            <IoIosHeart size="22px" color="red" style={{cursor:"pointer"}}/> }
                    </SpanIcon>
                    <StyledLink to={`/activity/${pk}`}>
                        <Title titlesize={titlesize}>
                                {title.length> 22 ? `${title.slice(0,22)}`: title}
                        </Title>
                    </StyledLink>
                </Content>
            </CardFrame>
        );
    }
    // 이미지 없는 텍스트 카드
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

    //동아리,봉사활동 카드
    if(is_etc){
        return(
            <CardFrame width={width} height={height} margin={margin}>
                <Content style={{height:"85%"}}>
                    <Title titlesize={titlesize}>
                        {title.length> 20 ? `${title.slice(0,20)}`: title}
                    </Title>
                    <span onClick={changeState}>
                        { scrap ? 
                            <IoIosHeartEmpty size="22px" style={{display:"inline",position:"relative", top:"-20px", float: "right", cursor:"pointer"}}/> 
                            :
                            <IoIosHeart size="22px" color="red" style={{display:"inline",position:"relative", top:"-20px", float: "right"}}/> }
                    </span>
                    
                    <P fontsize={fontsize} style={{marginTop:"5px"}}>
                        {desc> 12 ? `${desc.slice(0,12)} ...`: desc}
                    </P>
                    <P2 fontsize={fontsize}>
                        {desc2.length> 65 ? `${desc2.slice(0,65)} ...`: desc2}
                    </P2>
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
                </Content>
            </CardFrame>
        );
    }



    // 일반 카드(마이페이지)
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
                    {desc}
                    {/* {desc.length> 26 ? `${desc.slice(0,26)} ...`: desc} */}
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
    src: "/img/blank-profile.png",
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
    border: 1px solid rgba(169,169,169,0.2);
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
    width: 90%;
    height: 45%;
    margin: 10px auto 0 auto;
`;

const Date = styled.p`
    color: rgb(169,169,169);
    margin: 10px 0;
    font-size: 14px;
`;

const Title = styled.h4`
    color: #343a40;
    margin: 0;
    font-size: ${(props)=>props.titlesize};
    cursor: pointer;
`;

const InfoBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    column-gap: 10px;
    padding-top: 5px;
    border-top: 1px solid rgba(169,169,169,0.8);
`;

const Info = styled.div`
    
`;

const P = styled.p`
    color: rgb(125,125,125);
    margin: 0;
    font-size: ${(props)=>props.fontsize};
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