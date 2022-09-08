import styled from "styled-components";

function Footer() {
    return(
        <StyledFooter>
            <h3>POLI</h3>
            <ul>
                <li>address: 서울특별시 삼양로 144길 33(쌍문동,덕성여자대학교)|덕성여자대학교</li>
                <li>help: dspoli@duksung.ac.kr</li>
                <li>Copyrightⓒ teamAurora. All right reserved</li>
            </ul>
        </StyledFooter>
    );
}

const StyledFooter= styled.footer`
    width: 100%;
    height: 100px;
    color: #fff;
    background-color: #000;
    position: fixed;
    bottom: 0; 
    left: 0;
`;

export default Footer;