import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
${reset}

html {
    height: 100%;
    scroll-behavior: smooth;
}

* {
    font-family: "Spoqa Han Sans Neo", sans-serif;
}
`
export default GlobalStyles
