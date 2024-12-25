import React from "react";

const ProductModal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[555] flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200 flex justify-between items-center">
					<h2 className="text-xl font-semibold">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
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
