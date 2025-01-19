import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import nodeUrl from "../../../links";

function ProductModal({ product, onClose }) {
	const [quantity, setQuantity] = useState(1);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const ksb_id = localStorage.getItem("ksbIdNumber");
	const sales_id = localStorage.getItem("sales_id");
	const device_id = localStorage.getItem("device_id");
	const priceTypeKey = localStorage.getItem("priceTypeKey");

	const handleQuantityChange = (e) => {
		setQuantity(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (quantity > product.stock) {
			setShowErrorModal(true);
			return;
		}

		let productPriceType = 0;

		const matchedPrice = product.price.find(
			(item) => item.type === priceTypeKey,
		);

		if (matchedPrice) {
			productPriceType = matchedPrice.sale;
		} else {
			productPriceType = 0;
		}

		const data = {
			device_id: device_id,
			product_id: product.product_id,
			product_name: product.name,
			count: "1",
			price: productPriceType,
			total_price: productPriceType,
			product_info: [product],
		};

		try {
			const response = await fetch(
				`${nodeUrl}/api/create/sales/${ksb_id}/${sales_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				},
			);

			if (response.ok) {
				const result = await response.json();
				onClose();
			} else {
				console.error("Failed to submit data to the API");
			}
		} catch (error) {
			console.error("Error submitting the sell data:", error);
		}
	};

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
				<div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
					<button
						onClick={onClose}
						className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
					>
						<MdClear size={24} />
					</button>
					<h2 className="text-xl font-bold mb-4">Product Details</h2>
					<form onSubmit={handleSubmit}>
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
								value={quantity}
								onChange={handleQuantityChange}
								min="1"
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

			{showErrorModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-99">
					<div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
						<button
							onClick={() => setShowErrorModal(false)}
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
						>
							<MdClear size={24} />
						</button>
						<h2 className="text-xl font-bold mb-4">Error</h2>
						<p className="text-red-500 text-sm mb-4">
							You have entered a quantity greater than the
							available stock.
						</p>
						<div className="flex justify-end">
							<button
								onClick={() => setShowErrorModal(false)}
								className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ProductModal;
