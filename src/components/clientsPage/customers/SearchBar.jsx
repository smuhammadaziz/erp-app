import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange }) => (
	<div className="relative flex-grow">
		<input
			type="text"
			placeholder="Search customers..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		/>
		<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
	</div>
);

export default SearchBar;
