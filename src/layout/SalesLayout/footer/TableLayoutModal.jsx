import React from "react";
import Modal from "./Modal";

const TableLayoutModal = ({
	isOpen,
	onClose,
	onSave,
	tempSettings,
	setTempSettings,
}) => (
	<Modal
		isOpen={isOpen}
		onClose={onClose}
		title="Table Layout Settings"
		onSave={onSave}
	>
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Density
				</label>
				<select
					className="w-full p-2 border rounded-md bg-white"
					value={tempSettings.table.density}
					onChange={(e) =>
						setTempSettings((prev) => ({
							...prev,
							table: {
								...prev.table,
								density: e.target.value,
							},
						}))
					}
				>
					<option value="comfortable">Comfortable</option>
					<option value="compact">Compact</option>
					<option value="spacious">Spacious</option>
				</select>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Font Size
				</label>
				<select
					className="w-full p-2 border rounded-md bg-white"
					value={tempSettings.table.fontSize}
					onChange={(e) =>
						setTempSettings((prev) => ({
							...prev,
							table: {
								...prev.table,
								fontSize: e.target.value,
							},
						}))
					}
				>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
			</div>
			<div className="space-y-2">
				<label className="flex items-center space-x-2 cursor-pointer">
					<input
						type="checkbox"
						checked={tempSettings.table.showGridLines}
						onChange={(e) =>
							setTempSettings((prev) => ({
								...prev,
								table: {
									...prev.table,
									showGridLines: e.target.checked,
								},
							}))
						}
						className="rounded border-gray-300"
					/>
					<span className="text-sm text-gray-700">
						Show grid lines
					</span>
				</label>
				<label className="flex items-center space-x-2 cursor-pointer">
					<input
						type="checkbox"
						checked={tempSettings.table.enableStripedRows}
						onChange={(e) =>
							setTempSettings((prev) => ({
								...prev,
								table: {
									...prev.table,
									enableStripedRows: e.target.checked,
								},
							}))
						}
						className="rounded border-gray-300"
					/>
					<span className="text-sm text-gray-700">
						Enable striped rows
					</span>
				</label>
			</div>
		</div>
	</Modal>
);

export default TableLayoutModal;

