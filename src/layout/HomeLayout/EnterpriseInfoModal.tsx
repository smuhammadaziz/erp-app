import { FC, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
	FaServer,
	FaNetworkWired,
	FaDatabase,
	FaShieldAlt,
	FaExclamationTriangle,
} from "react-icons/fa";
import moment from "moment";
import "moment/locale/uz";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

moment.locale("uz");

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

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

export const EnterpriseInfoModal: FC<EnterpriseInfoModalProps> = ({
	isOpen,
	onClose,
	info,
}) => {
	if (!isOpen) return null;
	const [language, setLanguage] = useLang();

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

	if (!info) {
		return (
			<>
				<div
					className="fixed inset-0"
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				/>
				<div
					ref={modalRef}
					className="absolute top-8 right-20 w-72 bg-slate-100 rounded-lg shadow-xl transform transition-all duration-200 scale-100 z-[9999]"
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				>
					<div className="p-4">
						<div className="flex flex-col items-center text-center">
							<FaExclamationTriangle className="w-8 h-8 text-amber-500 mb-2" />
							<h2 className="text-sm font-semibold text-slate-800 mb-1">
								Хатолик юз берди
							</h2>
							<p className="text-xs text-slate-600">
								Маълумотларни юклашда хатолик юз берди. Илтимос,
								қайта уриниб кўринг
							</p>
							<button
								onClick={onClose}
								className="mt-3 px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-xs font-medium transition-colors"
							>
								Ёпиш
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}

	const infoItems = [
		{ icon: FaServer, label: "Ип Адрес", value: info.ip },
		{ icon: FaNetworkWired, label: "Порт", value: info.port },
		{
			icon: FaDatabase,
			label: "Датабаза",
			value: info.info_base,
		},
		{
			icon: FaShieldAlt,
			label: "ИТС",
			value: `${moment(info.its).format("LL")}`,
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
				className="absolute top-8 right-20 w-72 bg-slate-100 rounded-lg shadow-xl transform transition-all duration-200 scale-100 z-[9999] border border-slate-200"
				style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
			>
				<div className="p-3">
					<div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-200">
						<h2 className="text-sm font-semibold text-slate-800">
							{content[language as string].enterpriseInfo.infos}
						</h2>
						<button
							onClick={onClose}
							className="text-slate-500 hover:text-slate-700 transition-colors p-1 hover:bg-slate-200 rounded-full"
						>
							<IoCloseOutline className="w-4 h-4" />
						</button>
					</div>

					<div className="space-y-2">
						{infoItems.map(({ icon: Icon, label, value }) => (
							<div
								key={label}
								className="flex items-center p-2.5 bg-white rounded-md hover:bg-slate-50 transition-colors border border-slate-200"
							>
								<div className="flex-shrink-0">
									<Icon className="w-4 h-4 text-blue-500" />
								</div>
								<div className="ml-3 min-w-0">
									<p className="text-xs font-medium text-slate-500 mb-0.5">
										{label}
									</p>
									<p className="text-sm font-semibold text-slate-900 truncate">
										{value}
									</p>
								</div>
							</div>
						))}
					</div>
					<hr className="my-3 text-slate-500" />

					<div className="mt-2">
						<NavLink
							to="/intro"
							className="bg-red-500 flex text-center items-center text-white py-2 px-3 block text-center w-full rounded-md hover:bg-red-600"
						>
							<FaSignOutAlt className="mr-2" />
							<span>
								{
									content[language as string].enterpriseInfo
										.signout
								}
							</span>
						</NavLink>
					</div>
				</div>
			</div>
		</>
	);
};
