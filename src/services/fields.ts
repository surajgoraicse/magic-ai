export function getStyleField(): Promise<string> {
	return new Promise((resolve) => {
		let style = "";
		chrome.storage.sync.get(["STYLE"], (res) => {
			style = res["STYLE"];
			style ? resolve(style) : resolve("");
		});
	});
}
export function setStyleField(style: string) {
	chrome.storage.sync.set({ STYLE: style }, () => {
		console.log("STYLE key set successfully");
	});
}

export function getSizeField(): Promise<string> {
	return new Promise((resolve) => {
		let size = "";
		chrome.storage.sync.get(["SIZE"], (res) => {
			size = res["SIZE"];
			size ? resolve(size) : resolve("");
		});
	});
}
export function setSizeField(size: string) {
	chrome.storage.sync.set({ SIZE: size }, () => {
		console.log("SIZE key set successfully");
	});
}

export function getTypeField(): Promise<string> {
	return new Promise((resolve) => {
		let type = "";
		chrome.storage.sync.get(["TYPE"], (res) => {
			type = res["TYPE"];
			type ? resolve(type) : resolve("");
		});
	});
}
export function setTypeField(type: string) {
	chrome.storage.sync.set({ TYPE: type }, () => {
		console.log("TYPE key set successfully");
	});
}
