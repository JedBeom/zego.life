import React from 'react'
import {NavLink} from 'react-router-dom'
import Page from '../../components/Page'

import {Item, ItemDescription, ItemTitle, Section} from '../../components/Section'

const Main = () => {
    return (
        <Page title="어드민" back>
            <Section>
                <Item>
                    <ItemTitle>사용자 관리 &amp; 피드백 수렴</ItemTitle>
                    <ItemDescription>사용자 목록을 확인할 수 있습니다.</ItemDescription>
                    <li><NavLink to="/admin/users-all">사용자 목록 &amp; 검색</NavLink></li>
                    <li><NavLink to="/admin/feedbacks">피드백 목록</NavLink></li>
                </Item>
                <Item>
                    <ItemTitle>캠페인</ItemTitle>
                    <ItemDescription>결제 여부를 확인하고 캠페인을 승인합니다.</ItemDescription>
                    <li><NavLink to="/admin/campaign-move">캠페인 승인</NavLink></li>
                </Item>
                <Item>
                    <ItemTitle>게시 관리</ItemTitle>
                    <ItemDescription>웹사이트에 게시되는 대상을 관리합니다.</ItemDescription>
                    <li><NavLink to="/admin/notice-new">새 공지사항</NavLink></li>
                    <li><NavLink to="/admin/dday-list">디데이 만들기</NavLink></li>
                </Item>
            </Section>
        </Page>
    )
}

export default Main