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
            delay,
            animation,
            just,
            outside,
            onClick,
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

    if(just){ //외부로 빠져나가는 버튼
        return(
            <StyledButton 
            just
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
                {text}
        </StyledButton>
        )}

        if(outside){ //외부로 빠져나가는 버튼
            return(
                <StyledButton 
                outside
                width={width} 
                height={height} 
                margin={margin} 
                padding={padding} 
                fontsize={fontsize}
                position={position}
                top={top} left={left} bottom={bottom} right={right}
                onClick={onClick}
                onSubmit={onSubmit}>
                    <A href={href}>{text}</A> 
            </StyledButton>
            )}

    return( //기본 버튼
        <StyledButton 
            width={width} 
            height={height} 
            margin={margin} 
            padding={padding} 
            fontsize={fontsize}
            position={position}
            top={top} left={left} bottom={bottom} right={right}
            onClick={onClick}
            onSubmit={onSubmit}>
                <StyledLink to={href}>{text}</StyledLink>
        </StyledButton>
    )
}

Button.defaultProps = {
    height:"45px",
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
    background: #54d498;
    border: 0;
    border-radius: 5px;
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    padding: ${(props)=>props.padding};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    letter-spacing: 1px;
    cursor: pointer;
    color: #fff;
    transition: all 0.3s;
`;

const AnimationButton = styled.button`
    font-size: ${(props)=>props.fontsize};
    background: #54d498;
    border: 0;
    border-radius: 5px;
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    padding: ${(props)=>props.padding};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    letter-spacing: 1px;
    cursor: pointer;
    color: #fff;
    animation: ${boxAnimation} 0.6s ease-in-out both;
    animation-delay: ${(props)=>props.delay};
    transition: all 0.3s;

`;

const A = styled.a`
    text-decoration: none;
    color: #fff;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: #fff;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: #fff;
    }
`; 


export default Button;