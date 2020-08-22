import React from 'react';

const DietCard = ({diet, applied}) => {
	return (
		<article className={`card-box shadow-3 bg-gray-lightest hover-shift-t-3 ease-300`}>
			<div className={"flex justify-between"}>
				<h2 className={"card-title font-s-core px-2"}>🍽 <span className={"red"}>{diet.when}</span> 급식</h2>
				<div className={"diet-badge inline-block bg-blue-lightest blue px-2 br-round"}>
					<time>{diet.year}년 {diet.month}월 {diet.day}일</time>
				</div>
			</div>
			<ul className={"diet-list mt-2 ml-6 fw-6"}>
				{diet.dietList.map((value) => {
					return (
						<li key={value}>{value}</li>
					)
				})}
			</ul>
			<div className={"flex justify-between"}>
				{applied
					? <div className={"diet-apply inline-block bg-green-lightest green px-2 br-round"}>
						<svg className={"icon check-icon"} xmlns="http://www.w3.org/2000/svg" height="417pt"
							 viewBox="0 -46 417.81333 417" width="417pt">
							<path
								d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/>
						</svg>
						<span>
						신청됨
						</span>
					</div>
					: <div className={"diet-apply inline-block bg-red-lightest red px-2 br-round"}>
						❗<span>
						미신청
						</span>
					</div>}
				<button
					className={"card-button-more button bg-blue-lightest blue border-blue focus-blue mt-3 pl-3 pr-3"}>다른
					급식도 확인하실래요?
				</button>
			</div>
		</article>
	)
};

export default DietCard
