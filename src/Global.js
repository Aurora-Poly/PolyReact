import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
        font-family: 'NanumGothic';
        src: url('/fonts/NanumGothic.ttf');
  }
  @font-face {
        font-family: 'NanumGothicBold';
        src: url('/fonts/NanumGothicBold.ttf');
  }

  body{
    font-family: 'NanumGothic';
    color: #363636;
    letter-spacing: 2;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;