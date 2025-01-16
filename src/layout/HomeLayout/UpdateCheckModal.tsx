import { FC, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";

interface UpdateCheckModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type UpdateState = "checking" | "available" | "not-available";

export const UpdateCheckModal: FC<UpdateCheckModalProps> = ({
	isOpen,
	onClose,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [updateState, setUpdateState] = useState<UpdateState>("checking");
	const [progress, setProgress] = useState(0);

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

	useEffect(() => {
		if (isOpen) {
			setUpdateState("checking");
			setProgress(0);
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) {
						clearInterval(interval);
						return 100;
					}
					return prev + 2;
				});
			}, 100);

			setTimeout(() => {
				clearInterval(interval);
				setUpdateState(
					Math.random() > 0.5 ? "available" : "not-available",
				);
			}, 5000);

			return () => clearInterval(interval);
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const renderContent = () => {
		switch (updateState) {
			case "checking":
				return (
					<>
						<div className="mb-8 flex items-center justify-center z-[500]">
							<div className="relative">
								<BsArrowRepeat className="w-24 h-24 text-blue-500 animate-spin" />
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-lg font-semibold text-blue-500">
										{progress}%
									</span>
								</div>
							</div>
						</div>
						<div className="w-full max-w-md mb-8">
							<div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
								<div
									className="h-full bg-blue-500 rounded-full animate-progress"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
						<p className="text-slate-600 text-center text-lg mb-2">
							Проверка обновлений...
						</p>
						<p className="text-slate-400 text-center text-sm">
							Пожалуйста, подождите
						</p>
					</>
				);
			case "available":
				return (
					<>
						<div className="mb-8">
							<FaCheckCircle className="w-24 h-24 text-green-500 animate-scaleIn" />
						</div>
						<p className="text-slate-600 text-center text-xl font-medium mb-3">
							Доступна новая версия приложения!
						</p>
						<p className="text-slate-400 text-center text-base mb-8">
							Нажмите кнопку "Скачать" чтобы начать загрузку
						</p>
						<div className="flex gap-4">
							<button className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30 hover:shadow-blue-600/30 text-base">
								<FiDownload className="w-5 h-5 mr-2" />
								<span>Скачать</span>
							</button>
							<button className="flex items-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-base">
								<BiRefresh className="w-5 h-5 mr-2" />
								<span>Перезапустить</span>
							</button>
						</div>
					</>
				);
			case "not-available":
				return (
					<>
						<div className="mb-8">
							<FaCheckCircle className="w-24 h-24 text-blue-500 animate-scaleIn" />
						</div>
						<p className="text-slate-600 text-center text-xl font-medium mb-3">
							У вас установлена последняя версия!
						</p>
						<p className="text-slate-400 text-center text-base mb-8">
							Нет доступных обновлений
						</p>
						<button
							onClick={onClose}
							className="flex items-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-base"
						>
							<FaTimes className="w-5 h-5 mr-2" />
							<span>Закрыть</span>
						</button>
					</>
				);
		}
	};

	return (
		<>
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-[9998]" />
			<div
				className="fixed inset-0 flex items-center justify-center z-[10000]"
				style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
			>
				<div
					ref={modalRef}
					className="bg-white rounded-xl shadow-2xl w-[32rem] transform transition-all duration-300 scale-100 animate-fadeIn"
				>
					<div className="p-8">
						<div className="flex justify-between items-center mb-8">
							<h2 className="text-2xl font-semibold text-slate-800">
								Проверка обновлений
							</h2>
							<button
								onClick={onClose}
								className="text-slate-500 hover:text-slate-700 transition-colors p-2 hover:bg-slate-100 rounded-full"
							>
								<IoCloseOutline className="w-6 h-6" />
							</button>
						</div>

						<div className="flex flex-col items-center justify-center py-8">
							{renderContent()}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
