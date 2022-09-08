import styled from "styled-components";
import Button from "./Button";

function Rcard(props){
    const { title,
            agency,
            desc, 
            src, 
            background } = props;

    return(
        <Card background={background}>
            <Image src={src}></Image>
            <CardContent>
                <Title>
                    {title.length> 21 ? `${title.slice(0,21)}..`: title}
                </Title>
                <P style={{color:"#483D8B"}}>
                    {agency}
                </P>
                <P>
                    {desc.length> 90 ? `${desc.slice(0,90)}..`: desc}
                </P>
            </CardContent>
            <Button
                width="150px" 
                height="40px" 
                fontsize="14px"
                position="relative"
                top="-95px"
                left="290px"
                text="자세히보기" 
                href="/"/>
        </Card>
    );
}

const Card = styled.div`
    width: 480px;
    height: 350px;
    margin: 50px 3px 0px 3px;
    color: #fff;
    background-color: ${(props)=>props.background};
`;

const CardContent = styled.div`
    display: block;
    float: right;
    position: relative;
    top: -350px;
    margin-right: 22px;
    width: 180px;
    height: 240px;
`;

const Title = styled.h3`
    display: block;
    width: 100%;
    height: 50px;
    margin: 0 0 10px 0;
`;

const P = styled.p`
margin: 0 0 10px 0;
`;

const Image = styled.div`
    margin-top: 26px;
    margin-left: 26px;
    background-image: url("${(props)=>props.src}");
    background-size: cover;
    background-position: center;
    width: 226px;
    height: 350px;
    border: 1px solid #9BA6CA;
`;

export default Rcard;