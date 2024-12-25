import React, { useState, useRef, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import ProductModal from "./ProductModal";
import ProductViewDetails from "./ProductViewDetails";

const LoadingSpinner = () => (
	<div className="flex items-center justify-center py-4">
		<div className="flex flex-col items-center space-y-2">
			<div className="text-purple-600 text-4xl animate-spin">
				<FiLoader />
			</div>
			<p className="text-gray-500">Loading more products...</p>
		</div>
	</div>
);

const ProductTable = ({ products, isLoading, hasMore, onLoadMore }) => {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const observer = useRef();
	const lastProductRef = useRef();

	const columns = ["name", "type", "symbol", "сurrency", "article", "box"];

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		};

		const handleObserver = async (entries) => {
			const [target] = entries;
			if (target.isIntersecting && hasMore && !isLoadingMore) {
				setIsLoadingMore(true);
				await onLoadMore();
				setIsLoadingMore(false);
			}
		};

		observer.current = new IntersectionObserver(handleObserver, options);

		if (lastProductRef.current) {
			observer.current.observe(lastProductRef.current);
		}

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [hasMore, isLoadingMore, onLoadMore]);

	const handleRowDoubleClick = (product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	if (isLoading && products.length === 0) {
		return (
			<div className="flex-grow flex items-center justify-center">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="flex-grow overflow-auto relative">
			<table className="w-full">
				<thead className="bg-gray-50 sticky top-0 z-10">
					<tr>
						<th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							#
						</th>
						{columns.map((column, index) => (
							<th
								key={column}
								className={`px-4 py-3 ${
									index === 0 ? "text-left" : "text-center"
								} text-xs font-medium text-gray-500 uppercase tracking-wider`}
							>
								{column.charAt(0).toUpperCase() +
									column.slice(1)}
							</th>
						))}
						<th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{products.map((product, index) => (
						<tr
							key={product.product_id}
							ref={
								index === products.length - 1
									? lastProductRef
									: null
							}
							className="hover:bg-gray-50 transition-colors duration-200 active:bg-slate-200 cursor-pointer"
							onDoubleClick={() => handleRowDoubleClick(product)}
						>
							<td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">
								{index + 1}
							</td>
							{columns.map((column, colIndex) => (
								<td
									key={column}
									className={`px-4 py-3 whitespace-nowrap text-sm text-gray-600 ${
										colIndex === 0
											? "text-left"
											: "text-center"
									}`}
								>
									{product[column] !== undefined
										? String(product[column])
										: "N/A"}
								</td>
							))}
							<td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
								<div className="flex justify-center space-x-4">
									<button
										onClick={() =>
											handleRowDoubleClick(product)
										}
										className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors rounded px-3 py-1 flex items-center space-x-2"
										title="View Product"
									>
										<FaEye />
										<span>View</span>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{isLoadingMore && hasMore && <LoadingSpinner />}

			<ProductModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title="Product Details"
			>
				<ProductViewDetails product={selectedProduct} />
			</ProductModal>
		</div>
	);
};

export default ProductTable;
