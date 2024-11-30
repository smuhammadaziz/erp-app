import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdMarkChatRead } from "react-icons/md";
import SectionContainer from "./SectionContainer";

const MessageNotifications = () => {
	const [notifications, setNotifications] = useState([
		{
			id: 1,
			sender: "John Doe",
			preview: "Hey, are we still meeting today?",
			time: "2m",
			read: false,
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
		},
		{
			id: 2,
			sender: "Alice Smith",
			preview: "Project report is ready for review.",
			time: "15m",
			read: false,
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
		},
		{
			id: 3,
			sender: "Marketing Team",
			preview: "Weekly update attached.",
			time: "1h",
			read: true,
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marketing",
		},
	]);

	const handleDeleteNotification = (id) => {
		setNotifications(notifications.filter((notif) => notif.id !== id));
	};

	const handleMarkAsRead = (id) => {
		setNotifications(
			notifications.map((notif) =>
				notif.id === id ? { ...notif, read: true } : notif,
			),
		);
	};

	return (
		<SectionContainer title="Notifications">
			<div className="mx-auto py-4 space-y-4">
				{notifications.map((notification) => (
					<div
						key={notification.id}
						className={`
				w-full bg-white rounded-xl shadow-md p-4 flex items-center space-x-4
				border transition-all duration-300 ease-in-out
				${
					!notification.read
						? "border-blue-100 hover:border-blue-200 bg-blue-50/30"
						: "border-gray-100 hover:border-gray-200"
				}
			`}
					>
						<img
							src={notification.avatar}
							alt={notification.sender}
							className="w-12 h-12 rounded-full object-cover"
						/>

						<div className="flex-grow">
							<div className="flex justify-between items-center mb-1">
								<h3
									className={`
					font-semibold text-sm 
					${!notification.read ? "text-gray-900" : "text-gray-600"}
				`}
								>
									{notification.sender}
								</h3>
								<span className="text-xs text-gray-400">
									{notification.time}
								</span>
							</div>
							<p className="text-xs text-gray-500 truncate">
								{notification.preview}
							</p>
						</div>

						<div className="flex space-x-2">
							{!notification.read && (
								<button
									onClick={() =>
										handleMarkAsRead(notification.id)
									}
									className="text-green-500 hover:bg-green-50 p-2 rounded-full transition-colors"
								>
									<MdMarkChatRead className="w-5 h-5" />
								</button>
							)}
							<button
								onClick={() =>
									handleDeleteNotification(notification.id)
								}
								className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
							>
								<IoTrashOutline className="w-5 h-5" />
							</button>
						</div>
					</div>
				))}

				{notifications.length === 0 && (
					<div className="text-center py-8 text-gray-400 bg-white rounded-xl shadow-md">
						<FaRegComment className="mx-auto w-12 h-12 text-gray-300 mb-4" />
						<p>No notifications</p>
					</div>
				)}
			</div>
		</SectionContainer>
	);
};

export default MessageNotifications;
