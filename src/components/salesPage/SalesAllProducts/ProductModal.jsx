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

	console.log(product);

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
			<div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs z-50">
				<div className="bg-white w-[900px] rounded-xl shadow-2xl relative transform transition-all">
					<div className="p-6">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold text-gray-800">
								Product Details
							</h2>
							<button
								onClick={onClose}
								className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
							>
								<MdClear size={24} className="text-gray-500" />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 gap-4">
								<div className="bg-gray-50 p-4 rounded-lg">
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										Product Name
									</label>
									<input
										type="text"
										value={product.name}
										readOnly
										className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="bg-gray-50 p-4 rounded-lg">
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Product Name
										</label>
										<input
											type="text"
											value={product.name}
											readOnly
											className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
										/>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg">
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Product Name
										</label>
										<input
											type="text"
											value={product.name}
											readOnly
											className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="bg-gray-50 p-4 rounded-lg">
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Soni
										</label>
										<input
											type="number"
											value={quantity}
											onChange={handleQuantityChange}
											min="1"
											className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
										/>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg">
										<label className="block text-sm font-medium text-gray-700 mb-1.5">
											Narxi
										</label>
										<input
											type="number"
											value={quantity}
											onChange={handleQuantityChange}
											min="1"
											className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
										/>
									</div>
								</div>

								<div className="bg-gray-50 p-4 rounded-lg">
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										Price ($)
									</label>
									<input
										type="text"
										value={product.price_in_currency}
										readOnly
										className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
									/>
								</div>
							</div>

							<div className="flex justify-end pt-4">
								<button
									type="submit"
									className="px-6 py-2.5 bg-green-600 text-white text-base font-medium rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{showErrorModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100]">
					<div className="bg-white w-[400px] rounded-xl shadow-2xl relative">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold text-gray-800">
									Error
								</h2>
								<button
									onClick={() => setShowErrorModal(false)}
									className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
								>
									<MdClear
										size={24}
										className="text-gray-500"
									/>
								</button>
							</div>
							<p className="text-red-500 text-sm mb-4">
								You have entered a quantity greater than the
								available stock.
							</p>
							<div className="flex justify-end">
								<button
									onClick={() => setShowErrorModal(false)}
									className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ProductModal;
