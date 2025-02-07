import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { BiTime } from "react-icons/bi";
import SectionContainer from "./SectionContainer";

const STORAGE_KEY = "selectedTimeInMs";

const timeOptions = [
	{ label: "1 min", value: 1 },
	{ label: "2 min", value: 2 },
	{ label: "5 min", value: 5 },
	{ label: "10 min", value: 10 },
	{ label: "15 min", value: 15 },
	{ label: "30 min", value: 30 },
];

function SendSales() {
	const [selectedTime, setSelectedTime] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? parseInt(saved) : 60000;
	});

	useEffect(() => {
		if (!localStorage.getItem(STORAGE_KEY)) {
			localStorage.setItem(STORAGE_KEY, "60000");
		}
	}, []);

	const handleTimeSelect = (minutes) => {
		const milliseconds = minutes * 60 * 1000;
		setSelectedTime(milliseconds);
		localStorage.setItem(STORAGE_KEY, milliseconds.toString());
		toast.success(`Selected ${minutes} minute${minutes > 1 ? "s" : ""}`);
	};

	return (
		<SectionContainer title="send sales">
			<div className="flex flex-col space-y-4">
				<div className="text-sm text-gray-500 flex items-center gap-2">
					<BiTime className="w-4 h-4" />
					<span>Select time interval</span>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
					{timeOptions.map(({ label, value }) => (
						<button
							key={value}
							onClick={() => handleTimeSelect(value)}
							className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${
					selectedTime === value * 60 * 1000
						? "bg-blue-100 text-blue-700 border-2 border-blue-500"
						: "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
				}
              `}
						>
							{label}
						</button>
					))}
				</div>

				<p className="text-sm text-gray-600">
					Current interval: {selectedTime / (60 * 1000)} minutes
				</p>
			</div>

			<Toaster position="bottom-right" />
		</SectionContainer>
	);
}

export default SendSales;
