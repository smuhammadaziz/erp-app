import React, { useEffect } from "react";

const ProductModal = ({ isOpen, onClose, title, children }) => {
	// Close the modal when clicking outside of the modal
	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		};

		// Add event listener on mount
		if (isOpen) {
			document.body.addEventListener("click", handleOutsideClick);
		}

		// Cleanup event listener on unmount or if modal closes
		return () => {
			document.body.removeEventListener("click", handleOutsideClick);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[555] flex items-center justify-center bg-black bg-opacity-50"
			onClick={onClose} // This will close the modal when clicking outside
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
			>
				<div className="p-6 flex justify-between items-center border-b border-gray-300">
					<h2 className="text-3xl font-semibold text-gray-800">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 transition-colors"
					>
						✕
					</button>
				</div>
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};

export default ProductModal;
