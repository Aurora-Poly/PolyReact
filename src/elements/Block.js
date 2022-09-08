import styled from "styled-components";

function Block(props) {
    const {
        text,
        color,
        background,
        border
    } = props;
    return(
        <Li background={background} border={border} color={color}>
            {text}
        </Li>
    )
}

Block.defaultProps={
    background: "transparent",
    border: "#fff",
    color: "#fff"
}

const Li = styled.li`
    list-style-type: none;
    font-size: 12px;
    padding: 4px 8px;
    margin-right: 4px;
    color: ${(props)=>props.color};
    border: 1px solid ${(props)=>props.border};
    border-radius: 20px;
    background-color: ${(props)=>props.background};
    transition: all 0.3s;

    &:hover{
        color: #fff;
        background-color: rgba(135,118,176,1);
        border: 1px solid #fff;

        //클릭시 메인컬러로 그라데이션을 주는 건 어떤지?
        /* background-color: linear-gradient(128deg, rgba(113,136,208,1) 0%, rgba(135,118,176,1) 100%); */
    }
`;

export default Block;