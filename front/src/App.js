import styled from "styled-components";
import GlobalStyles from "ui/GlobalStyles"
import Page from "ui/Page"

function App() {
  return <>
    <GlobalStyles/>
    <Site>
      <Page title="홈">
        <h1>안녕하세요</h1>
      </Page>
    </Site>
  </>
}

const Site = styled.div`
`

export default App;
