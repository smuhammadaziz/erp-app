import React, { useRef, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import nodeUrl from "../../../links";

import { PiEmptyLight } from "react-icons/pi";

function SearchBar({
	searchQuery,
	setSearchQuery,
	setIsSelectionEnabled,
	setSelectedRow,
}) {
	const searchInputRef = useRef(null);
	const [lastChangeTime, setLastChangeTime] = useState(0);
	const [isQrInput, setIsQrInput] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const typingSpeedThreshold = 50;

	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}

		const handleClick = (e) => {
			const shouldSkipFocus = e.target.closest("[data-no-autofocus]");
			const isInteractive = e.target.matches(
				'input, select, textarea, button, a, [role="button"], [contenteditable="true"]',
			);

			if (
				!shouldSkipFocus &&
				!isInteractive &&
				document.activeElement !== searchInputRef.current
			) {
				searchInputRef.current?.focus();
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const handleSearchChange = (e) => {
		const newValue = e.target.value;
		const currentTime = Date.now();
		const timeDiff = currentTime - lastChangeTime;

		const isQrScan = timeDiff < typingSpeedThreshold && newValue.length > 3;

		setIsQrInput(isQrScan);
		setSearchQuery(newValue);
		setLastChangeTime(currentTime);

		if (isQrScan) {
			setTimeout(() => {
				if (searchInputRef.current) {
					searchInputRef.current.select();
				}
			}, 50);
		}
	};

	const clearSearch = () => {
		setSearchQuery("");
		setIsSelectionEnabled(false);
		setSelectedRow(null);
		setLastChangeTime(0);
		setIsQrInput(false);
		searchInputRef.current?.focus();
	};

	const handleFocus = () => {
		if (searchQuery && isQrInput) {
			setTimeout(() => {
				searchInputRef.current?.select();
			}, 50);
		}
	};

	const handlePaste = () => {
		setIsQrInput(true);
		setTimeout(() => {
			searchInputRef.current?.select();
		}, 50);
	};

	const deleteAllProducts = async () => {
		const salesId = localStorage.getItem("sales_id");
		if (!salesId) {
			alert("Sales ID not found in local storage!");
			return;
		}

		setIsDeleting(true);

		try {
			const response = await fetch(
				`${nodeUrl}/api/delete/sales/${salesId}`,
				{
					method: "DELETE",
				},
			);

			if (response.ok) {
				console.log("removed");
			} else {
				console.log("no item to remove");
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="flex items-center py-1 bg-gray-100 border-b border-gray-200">
			<div className="relative w-[50vw] mr-5">
				<input
					ref={searchInputRef}
					type="text"
					placeholder="поиск..."
					value={searchQuery}
					onChange={handleSearchChange}
					onFocus={handleFocus}
					onPaste={handlePaste}
					className="w-full px-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
				/>
				<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
				{searchQuery && (
					<button
						onClick={clearSearch}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
					>
						<MdClear size={16} />
					</button>
				)}
			</div>
			<div>
				<button
					className={`${
						isDeleting
							? "bg-gray-400 cursor-not-allowed"
							: "bg-red-600 hover:bg-red-700"
					} text-white p-2 rounded-lg transition duration-300`}
					onClick={deleteAllProducts}
					disabled={isDeleting}
				>
					<FaTrash size={15} />
				</button>
			</div>
		</div>
	);
}

export default SearchBar;
