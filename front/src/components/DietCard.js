import React from 'react';

// applied
// -1, default: 로그인안됨
// 0: 미신청
// 1: 신청됨
// 2: 모름

const DietCard = ({diet, applied}) => {
	let badgeMsg = ""
	let badgeIcon = ""
	let badgeColor = ""
	if (diet.dietList.length <= 1) {
		applied = "-2"
	}
	switch (applied) {
		case "-2":
			break
		case "0":
			badgeMsg = "미신청"
			badgeIcon = <svg className="icon" viewBox="0 0 365.696 365.696" width="365.696pt"
							 xmlns="http://www.w3.org/2000/svg">
				<path
					d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/>
			</svg>
			badgeColor = "red"
			break
		case "1":
			badgeMsg = "신청됨"
			badgeIcon = <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="417pt"
							 viewBox="0 -46 417.81333 417" width="417pt">
				<path
					d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/>
			</svg>
			badgeColor = "green"
			break
		case "2":
			badgeMsg = "알수없음"
			badgeIcon = <svg className="icon" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
				<g>
					<circle cx="256" cy="452" r="60"/>
					<path
						d="m256 0c-86.019 0-156 69.981-156 156v15h120v-15c0-19.851 16.149-36 36-36s36 16.149 36 36c0 10.578-4.643 20.59-12.74 27.471l-83.26 70.787v107.742h120v-52.258l40.976-34.837c34.968-29.714 55.024-73.052 55.024-118.905 0-86.019-69.981-156-156-156z"/>
				</g>
			</svg>
			badgeColor = "blue"
			break
		default:
			if (localStorage.getItem("token") != null) {
				badgeMsg = "로딩 중"
				badgeIcon = <div className="spinner bw-3 icon"/>
				badgeColor = "teal"
				break
			}
			badgeIcon = <svg className="icon" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
				<g>
					<circle cx="256" cy="452" r="60"/>
					<path
						d="m256 0c-86.019 0-156 69.981-156 156v15h120v-15c0-19.851 16.149-36 36-36s36 16.149 36 36c0 10.578-4.643 20.59-12.74 27.471l-83.26 70.787v107.742h120v-52.258l40.976-34.837c34.968-29.714 55.024-73.052 55.024-118.905 0-86.019-69.981-156-156-156z"/>
				</g>
			</svg>
			badgeMsg = "로그인 후 확인가능"
			badgeColor = "blue"

	}

	return (
		<article className={`card-box shadow-3`}>
			<div className={"flex justify-between"}>
				<h2 className={"card-title"}>
					<svg className="icon mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg"
						 viewBox="0 0 512 512">
						<g>
							<g>
								<path
									d="M498.682,435.326L297.917,234.56L63.357,0H45.026l-3.743,9.511c-9.879,25.104-14.1,50.78-12.205,74.249    c2.16,26.752,12.323,49.913,29.392,66.982L241.58,333.852l24.152-24.152l169.285,189.293c16.84,16.84,45.825,17.84,63.665,0    C516.236,481.439,516.236,452.879,498.682,435.326z"/>
							</g>
						</g>
						<g>
							<g>
								<path
									d="M156.728,291.442L13.317,434.853c-17.552,17.552-17.552,46.113,0,63.665c16.674,16.674,45.519,18.146,63.665,0    l143.412-143.412L156.728,291.442z"/>
							</g>
						</g>
						<g>
							<g>
								<path
									d="M490.253,85.249l-81.351,81.35l-21.223-21.222l81.351-81.351l-21.222-21.222l-81.35,81.35l-21.222-21.222l81.351-81.35    L405.366,0.361L299.256,106.471c-12.981,12.981-20.732,30.217-21.828,48.535c-0.277,4.641-1.329,9.206-3.074,13.548l68.929,68.929    c4.342-1.747,8.908-2.798,13.548-3.075c18.318-1.093,35.554-8.846,48.535-21.827l106.11-106.109L490.253,85.249z"/>
							</g>
						</g>
					</svg>
					<span className={"diet-when"}>{diet.when}</span>
					급식
				</h2>
				<div className={"diet-badge inline-block px-2 br-round"}>
					<time>{diet.year}년 {diet.month}월 {diet.day}일</time>
				</div>
			</div>
			<ul className={"diet-list mt-2 ml-6 fw-6"}>
				{diet.dietList.length > 1 ? diet.dietList.map((value) => {
					return (
						<li key={value}>{value}</li>
					)
				}) : <li>급식이 없어요.</li>}
			</ul>
			<div className={`diet-apply float-right px-2 br-round ${badgeColor}-lightest bg-${badgeColor}-dark`}>
				{badgeIcon}
				<span>
						{badgeMsg}
				</span>
			</div>
		</article>
	)
};

export default DietCard
