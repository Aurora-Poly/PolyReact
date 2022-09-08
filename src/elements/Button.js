import styled, {keyframes} from "styled-components";
import { Link } from "react-router-dom";


function Button(props){
    const { width, 
            height, 
            margin, 
            padding,
            fontsize,
            position,
            top,left,bottom,right,
            text, 
            href,
            borderRadius,
            onClick,
            delay,
            animation,
            onSubmit
        } = props;

    if(animation){ //외부로 빠져나가는 버튼
        return(
            <AnimationButton 
                width={width} 
                height={height} 
                margin={margin} 
                padding={padding} 
                fontsize={fontsize}
                position={position}
                top={top} left={left} bottom={bottom} right={right}
                borderRadius={borderRadius}
                delay={delay}
                onClick={onClick}
                onSubmit={onSubmit}>
                    <A href={href}>{text}</A>
            </AnimationButton>
        )
    }

    return( //기본 버튼
        <StyledButton 
            width={width} 
            height={height} 
            margin={margin} 
            padding={padding} 
            fontsize={fontsize}
            position={position}
            top={top} left={left} bottom={bottom} right={right}
            borderRadius={borderRadius}
            onClick={onClick}
            onSubmit={onSubmit}>
                <StyledLink to={href}>{text}</StyledLink>
        </StyledButton>
    )
}

Button.defaultProps = {
    height:"50px",
    fontsize: "14px",
};

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

const StyledButton = styled.button`
    font-size: ${(props)=>props.fontsize};
    background: rgb(113,136,208);
    background: linear-gradient(118deg, rgba(113,136,208,1) 0%, rgba(135,118,176,1) 100%);
    border: 1px solid #9BA6CA;
    border-radius: ${(props)=>props.borderRadius};
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    padding: ${(props)=>props.padding};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    letter-spacing: 2px;
`;

const AnimationButton = styled.button`
    font-size: ${(props)=>props.fontsize};
    background: rgb(113,136,208);
    background: linear-gradient(118deg, rgba(113,136,208,1) 0%, rgba(135,118,176,1) 100%);
    border: 1px solid #9BA6CA;
    border-radius: ${(props)=>props.borderRadius};
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    padding: ${(props)=>props.padding};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    letter-spacing: 2px;
    animation: ${boxAnimation} 0.6s ease-in-out both;
    animation-delay: ${(props)=>props.delay};
`;

const A = styled.a`
    color: #fff;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`; 


export default Button;