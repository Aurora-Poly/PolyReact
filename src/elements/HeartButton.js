import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io";
import HeartImg from "../assets/heart.png";
import EmptyHeartImg from "../assets/heartFill.png";

const HeartButton = ({ like, onClick }) => {
    return (
        <Heart src={like?HeartImg:EmptyHeartImg} onClick={onClick} />
    );
};


const Heart = styled.img`
    // css
`;

export default HeartButton;