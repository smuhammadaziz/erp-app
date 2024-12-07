import { FC, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
	FaServer,
	FaNetworkWired,
	FaDatabase,
	FaShieldAlt,
} from "react-icons/fa";
import moment from "moment";
import "moment/locale/uz";

moment.locale('uz');

interface EnterpriseInfoModalProps {
	isOpen: boolean;
	onClose: () => void;
	info: {
		ip: string;
		port: string;
		info_base: string;
		its: string;
	} | null;
}

export const EnterpriseInfoModal: FC<EnterpriseInfoModalProps> = ({
	isOpen,
	onClose,
	info,
}) => {
	if (!isOpen || !info) return null;

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	const infoItems = [
		{ icon: FaServer, label: "IP Манзил", value: info.ip },
		{ icon: FaNetworkWired, label: "Порт", value: info.port },
		{ icon: FaDatabase, label: "Маълумотлар базаси", value: info.info_base },
		{
			icon: FaShieldAlt,
			label: "ИТС",
			value: `${moment(info.its).format("LL")}, ${moment(info.its).diff(moment(), 'days')} кун қолди`,
		},
	];

	return (
		<>
			<div
				className="fixed inset-0"
				style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
			/>
			<div
				ref={modalRef}
				className="absolute top-8 right-20 w-72 bg-slate-100 rounded-lg shadow-xl transform transition-all duration-200 scale-100 z-[9999]"
				style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
			>
				<div className="p-3">
					<div className="flex justify-between items-center mb-2">
						<h2 className="text-sm font-semibold text-slate-800">
							Корхона маълумотлари
						</h2>
						<button
							onClick={onClose}
							className="text-slate-500 hover:text-slate-700 transition-colors"
						>
							<IoCloseOutline className="w-4 h-4" />
						</button>
					</div>

					<div className="space-y-2">
						{infoItems.map(({ icon: Icon, label, value }) => (
							<div
								key={label}
								className="flex items-center p-2 bg-white rounded-md hover:bg-slate-50 transition-colors"
							>
								<Icon className="w-4 h-4 text-blue-500" />
								<div className="ml-3">
									<p className="text-xs font-medium text-slate-500">
										{label}
									</p>
									<p className="text-sm font-semibold text-slate-900">
										{value}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
