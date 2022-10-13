import styled from "styled-components";
import { RiSettings4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Category from "../../elements/Category";

//portfolioManage 페이지의 프로필을 담는 컴포넌트
function Profile(){
    return(
        <ProfileArea>
            <ProfileContainer>
                <ProfileImage src={require("../../components/img/blank-profile.png")}></ProfileImage>
                <Userbox>
                    <span style={{fontSize:"20px", fontWeight: "600"}}>
                        {localStorage.getItem('username')}
                    </span>
                    <Link to={`/mypage/${localStorage.getItem('username')}`}>
                        <SpanIcon>
                            <RiSettings4Fill size="20px"/>
                        </SpanIcon>
                        </Link>
                    </Userbox>

                    <p>이메일</p>
                    <p><span>대학교/전공</span></p>
            </ProfileContainer>
            <Category title="관심분야" c1="프로그래밍" c2="디자인" c3="창업"/>
        </ProfileArea>
    )
}

const ProfileArea = styled.div`
    float: left;
    width: 22%;
    height: 100%;
    text-align: center;
    color: #fff;
    background: rgb(113,136,208);
    background: linear-gradient(152deg,
            rgba(113,136,208,0.6643032212885154) 0%,
            rgba(255,80,24,0.3029586834733894) 100%);
`;

const ProfileContainer = styled.div`
    margin-top: 80px;
`;

const ProfileImage = styled.div`
    border-radius: 100%;
    border: 2px solid #fff;
    width: 160px;
    height: 160px;
    margin: 0 auto 20px auto;

    background-image: url("${(props)=>props.src}");
    background-size: cover;
    background-position: center;
`;
const Userbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;
const SpanIcon = styled.span`
    margin-top: 5px;
    margin-left: 10px;
`;

export default Profile;