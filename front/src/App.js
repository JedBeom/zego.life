import React from 'react';

import './App.css';
import DietCard from './components/DietCard';
import LoadingCard from './components/LoadingCard'

import axios from 'axios'
import whatMeal from './utils/whatMeal'
import timestamp from './utils/timestamp'

const {useState, useEffect} = React;

function App() {
	let server = "http://" + window.location.hostname + ":" + window.location.port;
	const [diet, setDiet] = useState({when: "웬?", dietList: [], isLoading: true});
	const [applied, setApplied] = useState(false);
	useEffect(() => {
		const fetchDiet = async () => {
			let date = new Date();
			const resp = await axios.get(server + "/api/v1/diets/" + timestamp(date));
			let d = resp.data[whatMeal()];
			d.year = d.Timestamp.slice(0, 4);
			d.month = d.Timestamp.slice(5, 7);
			d.day = d.Timestamp.slice(8, 10);
			d.dietList = d.Content.split("\n");
			if (d.Type === 1) {
				d.when = "아침"
			} else if (d.Type === 2) {
				d.when = "점심"
			} else if (d.Type === 3) {
				d.when = "저녁"
			}
			d.isLoading = false;
			setDiet(d)
		};

		const fetchD2U = async () => {
			let date = new Date();
			let userID = "hihihi";
			let dietID = timestamp(date) + "-" + (whatMeal() + 1);
			const resp = await axios.get(server + "/api/v1/users/" + userID + "/diet2user/" + dietID);
			setApplied(resp.data.Applied)
		};

		fetchDiet();
		fetchD2U()
	}, []);

	return (
		<div className={`site black`}>
			<header>
				<a href="/"><h1
					className={`site-title text-center underline-double underline-yellow mt-8 ls-tightest pattern-triangles-xl bg-black mint text-pattern`}>ZEGO.LIFE</h1>
				</a>
			</header>
			<blockquote className={"first-quote mt-6 orange-dark"} hidden>슬기로운 제고생활</blockquote>
			<nav>
				<ul className={"flex justify-between gray"}>
					<li><a href="/diets">급식</a></li>
					<li>/</li>
					<li><a href="/events">일정</a></li>
					<li>/</li>
					<li><a href="/login">로그인</a></li>
				</ul>
			</nav>

			{diet.isLoading
				? <LoadingCard/>
				: <DietCard diet={diet} applied={applied}/>}
		</div>
	);
}

export default App;
