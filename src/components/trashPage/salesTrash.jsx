import React, { useState, useEffect } from "react";

function SalesTrashComponent() {
	// Sample data for demonstration
	const [trashData, setTrashData] = useState([
		{
			id: "tr-001",
			status: "Cancelled",
			client_name: "John Doe",
			total_price: "1,250.00",
			seller: "Alex Martinez",
			deleted_at: "2025-04-02 15:32:45",
			errorMessage: "Payment verification failed",
		},
		{
			id: "tr-002",
			status: "Deleted",
			client_name:
				"Sarah Johnson with a very long name that should be truncated",
			total_price: "875.50",
			seller: "Maria Garcia",
			deleted_at: "2025-04-03 09:17:22",
			errorMessage: "",
		},
	]);

	// Function to handle deletion
	const handleDelete = (id) => {
		// Here you would implement actual deletion logic
		setTrashData(trashData.filter((item) => item.id !== id));
	};

	// Format date to be more readable
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString();
	};

	return (
		<div className="h-[80vh]">
			<div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
				{/* Header */}
				<div className="p-6 border-b">
					<h2 className="text-2xl font-semibold text-gray-800">
						Sales Trash
					</h2>
					<p className="text-gray-500 mt-1">
						Deleted or cancelled sales records
					</p>
				</div>

				{/* Table container with scrolling */}
				<div className="flex-1 overflow-auto p-6">
					<table className="w-full table-fixed divide-y divide-gray-200">
						<thead className="bg-gray-50 sticky top-0">
							<tr>
								<th className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="w-48 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Client
								</th>
								<th className="w-32 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Total Price
								</th>
								<th className="w-40 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Seller
								</th>
								<th className="w-44 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Deleted At
								</th>
								<th className="w-64 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Error
								</th>
								<th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{trashData.map((item) => (
								<tr key={item.id} className="hover:bg-gray-50">
									<td className="px-3 py-4 whitespace-nowrap">
										<span
											className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
												item.status === "Cancelled"
													? "bg-yellow-100 text-yellow-800"
													: item.status === "Deleted"
													? "bg-red-100 text-red-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{item.status}
										</span>
									</td>
									<td className="px-3 py-4">
										<div
											className="text-sm text-gray-900 truncate"
											title={item.client_name}
										>
											{item.client_name}
										</div>
									</td>
									<td className="px-3 py-4">
										<div
											className="text-sm font-medium text-gray-900 truncate"
											title={`$${item.total_price}`}
										>
											${item.total_price}
										</div>
									</td>
									<td className="px-3 py-4">
										<div
											className="text-sm text-gray-500 truncate"
											title={item.seller}
										>
											{item.seller}
										</div>
									</td>
									<td className="px-3 py-4">
										<div
											className="text-sm text-gray-500 truncate"
											title={formatDate(item.deleted_at)}
										>
											{formatDate(item.deleted_at)}
										</div>
									</td>
									<td className="px-3 py-4">
										<div
											className="text-sm truncate"
											title={item.errorMessage || "-"}
										>
											{item.errorMessage ? (
												<span className="text-red-600">
													{item.errorMessage}
												</span>
											) : (
												<span>-</span>
											)}
										</div>
									</td>
									<td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
										<button
											onClick={() =>
												handleDelete(item.id)
											}
											className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
											aria-label="Delete item"
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												></path>
											</svg>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Empty state */}
				{trashData.length === 0 && (
					<div className="flex-1 flex items-center justify-center p-6">
						<div className="text-center">
							<svg
								className="mx-auto h-12 w-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1"
									d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
								></path>
							</svg>
							<h3 className="mt-2 text-sm font-medium text-gray-900">
								No deleted sales
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								No items in the trash at the moment
							</p>
						</div>
					</div>
				)}

				{/* Footer with stats */}
				<div className="border-t px-6 py-4 bg-gray-50">
					<div className="text-sm text-gray-500">
						Showing {trashData.length} deleted items
					</div>
				</div>
			</div>
		</div>
	);
}

export default SalesTrashComponent;
