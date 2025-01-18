const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	ipcRenderer: {
		send: (channel, data) => {
			const validChannels = ["open-sales-window"];
			if (validChannels.includes(channel)) {
				ipcRenderer.send(channel, data);
			}
		},
	},
});
