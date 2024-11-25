import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

function SearchBar({
	searchQuery,
	setSearchQuery,
	searchInputRef,
	setIsSelectionEnabled,
	setSelectedRow,
}) {
	const deleteAll = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/delete/all",
				{
					method: "DELETE",
				},
			);

			if (response.ok) {
				// Handle successful deletion
				alert("Hamma mahsulotlar o'chirldi");
				// Additional logic if needed, e.g., clearing UI
			} else {
				// Handle errors
				const errorData = await response.json();
				alert(`Xatolik: ${errorData.message}`);
			}
		} catch (error) {
			// Handle network or other unexpected errors
			console.error("Error deleting all items:", error);
			alert("An error occurred while deleting.");
		}
	};

	return (
		<div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
			<div className="relative w-[50vw] mr-5">
				<input
					ref={searchInputRef}
					type="text"
					placeholder="Search products..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full px-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
				/>
				<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
				{searchQuery && (
					<button
						onClick={() => {
							setSearchQuery("");
							setIsSelectionEnabled(false);
							setSelectedRow(null);
						}}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
					>
						<MdClear size={16} />
					</button>
				)}
			</div>

			<div>
				<button
					className="bg-red-600 text-white p-2 rounded-lg"
					onClick={deleteAll}
				>
					<FaTrash size={15} />
				</button>
			</div>
		</div>
	);
}

export default SearchBar;
