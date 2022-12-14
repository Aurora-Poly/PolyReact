import styled from "styled-components";
import HeartImg from "../assets/heart-filled.svg";
import EmptyHeartImg from "../assets/heart-outlined.svg";

const Heart = ({ like, onClick }) => {
    return (
        <HeartFrame src={like?HeartImg:EmptyHeartImg} onClick={onClick} />
    );
};

const HeartFrame = styled.img`
    // css
    width: 30px;
    height: 30px;
`;

export default Heart;