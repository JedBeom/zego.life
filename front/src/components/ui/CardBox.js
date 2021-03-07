import styled from "styled-components";
import DefaultBox from "./DefaultBox";

export default styled(DefaultBox)`
padding: 1em;
border-radius: 8px;
h2 {
    font-weight: 500;
    padding-left: .5rem !important;
    padding-right: .5rem !important;
}

p {
    font-size: 1rem;
    margin-left: 0.5rem;
}

a, select, input {
    color: var(--card-box-text-color);
    border-color: var(--card-box-text-color);
}

optgroup {
    color: black;
}

::after {
    content: "";
    clear: both;
    display: table;
}
`