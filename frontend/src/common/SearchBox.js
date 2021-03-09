import React, { useState } from 'react';
import JoblyApi from "../helper/api";

function SearchBox({ type, setFunction }) {
	const [ formData, setFormData ] = useState("")

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const results = await JoblyApi.filterQueries(type, formData);
		setFunction(results.data);
		setFormData("")
	};

	return (
		<form onSubmit={handleSubmit} className="SearchBox">
			<input name="search" 
				value={formData} 
				onChange={(evt => setFormData(evt.target.value))}
			/>
			<button>Submit</button>
		</form>
	);
}

export default SearchBox;
