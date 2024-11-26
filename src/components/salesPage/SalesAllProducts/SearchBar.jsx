import React, { useRef, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

function SearchBar({
	searchQuery,
	setSearchQuery,
	setIsSelectionEnabled,
	setSelectedRow,
}) {
	const searchInputRef = useRef(null);
	const [lastChangeTime, setLastChangeTime] = useState(0);
	const [isQrInput, setIsQrInput] = useState(false);
	const typingSpeedThreshold = 50;

	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}

		const handleClick = (e) => {
			const shouldSkipFocus = e.target.closest("[data-no-autofocus]");
			const isModalClick = e.target.closest(
				'[role="dialog"], .modal, [data-modal]',
			);
			const isInteractive = e.target.matches(
				'input, select, textarea, button, a, [role="button"], [contenteditable="true"]',
			);

			if (
				!shouldSkipFocus &&
				!isModalClick &&
				!isInteractive &&
				document.activeElement !== searchInputRef.current
			) {
				searchInputRef.current?.focus();
			}
		};

		const handleKeyDown = (e) => {
			if (e.key === "Tab") {
				const activeModal = document.querySelector(
					'[role="dialog"]:focus-within, .modal:focus-within, [data-modal]:focus-within',
				);
				if (!activeModal) {
					e.preventDefault();
					searchInputRef.current?.focus();
				}
			}
		};

		document.addEventListener("click", handleClick);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("keydown", handleKeyDown);
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

	const deleteAll = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/delete/all",
				{
					method: "DELETE",
				},
			);
			if (response.ok) {
				alert("Hamma mahsulotlar o'chirldi");
				searchInputRef.current?.focus();
			} else {
				const errorData = await response.json();
				alert(`Xatolik: ${errorData.message}`);
				searchInputRef.current?.focus();
			}
		} catch (error) {
			console.error("Error deleting all items:", error);
			alert("An error occurred while deleting.");
			searchInputRef.current?.focus();
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

	return (
		<div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
			<div className="relative w-[50vw] mr-5">
				<input
					ref={searchInputRef}
					type="text"
					placeholder="Scan QR code or search products..."
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
