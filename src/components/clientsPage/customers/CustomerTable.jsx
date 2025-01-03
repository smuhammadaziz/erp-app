import React from "react";
import CustomerRow from "./CustomerRow";

const CustomerTable = ({ customers, onView, onDelete }) => (
	<div className="overflow-x-auto h-[65vh]">
		<table className="w-full">
			<thead className="bg-gray-50 sticky top-0 z-10">
				<tr>
					<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
						No
					</th>
					<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
						Name
					</th>
					<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
						Phone
					</th>
					<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
						Actions
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{customers.map((customer, index) => (
					<CustomerRow
						key={customer.id}
						customer={customer}
						onView={onView}
						onDelete={onDelete}
						index={index + 1}
					/>
				))}
			</tbody>
		</table>
	</div>
);

export default CustomerTable;
