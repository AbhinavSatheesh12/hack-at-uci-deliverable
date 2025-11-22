import "./App.css";
import {useEffect, useState} from "react";
import {DisplayQuote} from "./DisplayQuote.jsx";

function App() {
	const [quotes, setQs] = useState([]);
	const [maxAge, setMaxAge] = useState("all");

	const getQuotes = async () => {
		try {
			const result = await fetch(`/api/quote?max_age=${maxAge}`);
			const jsonData = await result.json();
			setQs(jsonData);
		}
		catch (error) {
			console.error("Error: ", error);
		}
	};

	useEffect(() => {void getQuotes();}, [maxAge]);
	const handleSubmission = async (e) => {
		e.preventDefault();
		const dataForm = new FormData(e.target);

		try {
			const result = await fetch("/api/quote", {
				method: "POST",
				body: dataForm,
			});
			if (result.ok) {
				const quoteToAdd = await result.json();
				setQs([...quotes, quoteToAdd]);
				e.target.reset();
			}
		}
		catch (error) {
			console.error("Error: ", error);
		}
	};

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>
			<div className="form-submission">
				<h2>Submit a quote</h2>
				<form onSubmit={handleSubmission}>
					<label htmlFor="input-name">Name</label>
					<input type="text" name="name" id="input-name" required />
					<label htmlFor="input-message">Quote</label>
					<input type="text" name="message" id="input-message" required />
					<button type="submit">Submit</button>
				</form>
			</div>
			<div className="list-quotes">
				<h2>Previous Quotes</h2>

				<div className="filter">
					<label htmlFor="age-select">Filter by age: </label>
					<select
						id="age-select"
						value={maxAge}
						onChange={(e) => setMaxAge(e.target.value)}
					>
						<option value="all">All</option>
						<option value="year">Last Year</option>
						<option value="month">Last Month</option>
						<option value="week">Last Week</option>
					</select>
				</div>

				<div className="quote-container">
					{quotes.map((quote, index) => (
						<DisplayQuote key={quote.time || index} quote={quote} />
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
