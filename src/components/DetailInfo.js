import styled from "styled-components";
import { useState } from "react";
import Button from "../elements/Button";
import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io"
import { BiLink } from "react-icons/bi";
import Category from "../elements/Category";

function DetailInfo(props){
    const {
        title,
        office,
        apply_target,
        apply_period,
        act_period, 
        field,
        personnel,
        img_url
        // company, 
        // tag,
        // apply_url,
        // detail,
    } = props;

    const [scrap, setScrap] = useState(false);
    function changeState(){
        setScrap(!scrap);
    }

    return(
        <div style={{color:"#2e4057"}}>
        <Header>
        <Title>{title}</Title>
        <SpanIcon><BiLink size="30px"/></SpanIcon>
        </Header>
        <Container>
            <Image src={img_url}></Image>
            <GridContainer>
                <H>상세정보</H>
                <span onClick={changeState} style={{cursor:"pointer"}}>
                    { scrap ? <IoIosHeart size="24" color="red"/> : <IoIosHeartEmpty size="24"/> }
                </span>
                <InfoBox>
                    {/* <Item>주최기관</Item>
                    <Info>{company}</Info>

                    <Item>공모분야</Item>
                    <Info>{field}</Info>

                    <Item>접수기간</Item>
                    <Info>{apply_period}</Info>

                    <Item>활동기간</Item>
                    <Info>{act_period}</Info>

                    <Item>모집인원</Item>
                    <Info>{personnel}</Info>

                    <Item>키워드</Item>
                    <Info>
                        {tag.length>25 ? `${tag.slice(0,25)}..`: tag}
                    </Info>

                    <Item>홈페이지</Item>
                    <Info>{apply_url}</Info> */}
                    <Item>주최기관</Item>
                    <Info>{office}</Info>

                    <Item>모집대상</Item>
                    <Info>{apply_target}</Info>

                    <Item>공모분야</Item>
                    <Info>{field}</Info>

                    <Item>접수기간</Item>
                    <Info>{apply_period}</Info>

                    <Item>활동기간</Item>
                    <Info>{act_period}</Info>

                    <Item>모집인원</Item>
                    <Info>{personnel}</Info>

                    <Item>키워드</Item>
                    <Info>
                        {/* {field.length>25 ? `${field.slice(0,25)}..`: field} */}
                        {field}
                    </Info>

                    <Item>홈페이지</Item>
                    <Info>주소없음</Info>
                    {/* <Info>{apply_url}</Info> */}
                </InfoBox>
                <Button
                    outside
                    width="200px"
                    position="relative"
                    top= "-60px"
                    left="510px"
                    text="홈페이지에서 지원하기" 
                    href="/"/>
            </GridContainer>
            <Category title="카테고리"/>
        </Container>
        <Description>
            {/* {detail.length> 500 ? `${detail.slice(0,500)}..`: detail} */}
                부연설명없음..
        </Description>
        </div>
    );
}

const Header = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 60px;
    padding-bottom: 10px;
`;

const Title = styled.h1`
    display: block;
    width: 1100px;
    border-bottom: 1px solid #2e4057;
    margin: 50px 10px 10px 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
`;

const SpanIcon = styled.span`
    display: inline;
    height: 30px;
    position: relative;
    left: -60px;
    top: 60px;
    cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const GridContainer = styled.div`
    margin: 0 20px;
    height: 300px;
`;

const H = styled.h2`
    display: inline-block;
    width: 650px;
    margin: 0 20px 10px 10px;
`;

const InfoBox = styled.div`
    padding: 10px;
    border-top: 1px solid #2e4057;
    border-bottom: 1px solid #2e4057;
    width: 700px;
    height: 220px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr;
    grid-template-rows: repeat(6, 1fr);
    row-gap: 10px;
`;

const Image = styled.div`
    background-image: url("${(props)=>props.src}");
    background-color: antiquewhite;
    background-size: cover;
    background-position: center;
    margin-top: 20px;
    width: 200px;
    height: 280px;
`;

const Item = styled.div`
    font-weight: 700;
`;

const Info = styled.div`
`;

const Description = styled.div`
    display: block;
    margin: 0 auto;
    width: 680px;
`;

export default DetailInfo;