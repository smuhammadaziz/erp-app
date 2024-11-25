import React from "react";
import { MdClear } from "react-icons/md";

function ProductModal({ product, onClose }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				>
					<MdClear size={24} />
				</button>
				<h2 className="text-xl font-bold mb-4">Product Details</h2>
				<form>
					<div className="mb-4">
						<label className="block text-sm font-semibold mb-2">
							Product Name
						</label>
						<input
							type="text"
							value={product.product_name}
							readOnly
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-semibold mb-2">
							Quantity
						</label>
						<input
							type="number"
							defaultValue={1}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-semibold mb-2">
							Price ($)
						</label>
						<input
							type="text"
							value={product.price_in_currency}
							readOnly
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProductModal;
