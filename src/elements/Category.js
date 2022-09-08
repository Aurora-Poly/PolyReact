import styled from "styled-components";
import Block from "../elements/Block";

function Category({title}) {
    return(
        <CategoryArea>
            <Title>{title}</Title>
            <Ul>
                <Block text="프로그래밍"/>
                <Block text="예술"/>
                <Block text="창업"/>
            </Ul>
        </CategoryArea>
    )
}

const CategoryArea = styled.div`
    display: inline-block;
`;

const Title = styled.h2`
    margin: 0 0 10px 0;
`;

const Ul = styled.ul`
    padding-left: 0;
    display: flex;
    margin: 0;
    justify-content: center;
`;


export default Category;