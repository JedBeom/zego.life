import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'

function Router() {
    // eslint-disable-next-line
    return <Page title="다음에 만나요!">
        <p>담벼락은 잠시 정비의 시간을 갖도록 하겠습니다!</p>
    </Page>
    /*

return <Wrapper>
    <Switch>
        <Route path="/feed" exact component={Main}/>
        <Route path="/feed/about" component={About}/>
        <Route path="/feed/post" component={PostThread}/>
        <Route path="/feed/:id" component={ThreadPage}/>
        <Route component={NotFound}/>
    </Switch>
</Wrapper>
*/
}

const Wrapper = styled.div`
& .page {
    font-family: "KyoboHand", var(--font-family) !important;
    font-weight: normal;
}
`

export default Router;
