import React from 'react';

import CardBox from './ui/CardBox'

import {timestampHangul} from '../utils/timestamp'

import DietIcon from '../icons/Diet'
import {Check, Cross, Exclaimination} from '../icons/Applied'

import styled from 'styled-components';

const appliedBadges = {
	"-2": {msg: "회원전용", icon: <Exclaimination/>, color: "#1773CE"},
	"-1": {msg: "로딩 중", icon: <div className="spinner bw-3 icon"/>, color: "#378E99"},
	"0": {msg: "미신청", icon: <Cross/>, color: "#CC191F"},
	"1": {msg: "신청됨", icon: <Check/>, color: "#39AB39"},
	"2": {msg: "알수없음", icon: <Exclaimination/>, color: "#1773CE"},
}

const DietCard = ({diet, applied}) => {
	if (diet.dietList.length <= 1) {
		applied = "-2"
	}

	const {msg, icon, color} = appliedBadges[applied]

	return <CardBox>
		<Header>
			<h2>
				<DietIcon className="icon"/>
				<Highlighted>{diet.when}</Highlighted>
				급식
			</h2>
			<Timestamp>{timestampHangul(diet.Date)}</Timestamp>
		</Header>
		<List>
			{diet.dietList.length > 1 ? diet.dietList.map((value) => {
				return (
					<li key={value}>{value}</li>
				)
			}) : <li>급식이 없어요.</li>}
		</List>
		<Badge color={color}>
			{icon}
			<span>
					{msg}
			</span>
		</Badge>
	</CardBox>
};

const Header = styled.div`
display: flex;
justify-content: space-between;
`

const Highlighted = styled.span`
color: var(--highlight-color);
margin-right: .25rem;
font-weight: 500;
`

const Timestamp = styled.span`
display: inline-block;
padding-top: .37rem;
font-weight: 500;
`

const List = styled.ul`
list-style-type: square;
line-height: 1.8em;
font-size: 1.1em;

margin-top: .5rem;
`

const Badge = styled.div`
padding: 0.1em .5em;
font-weight: 700;
font-size: 1em;

float: right;
border-radius: 3rem;

background-color: ${props => props.color};

span {
    line-height: 1em;
    height: 1em;
}
`

export default DietCard
