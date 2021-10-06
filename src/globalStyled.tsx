import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; 
  font-family: Roboto;
}

h1 {
  text-align: center;
}

a { 
  text-decoration: none;
}
`;

export default Global;
