export function clearFields() {
	chrome.storage.sync.remove("STYLE");
	chrome.storage.sync.remove("SIZE");
	chrome.storage.sync.remove("TYPE");
	chrome.storage.sync.remove("RESPONSE");
	chrome.storage.sync.remove("CONTEXT");
	chrome.storage.sync.remove("PROMPT");
	console.log("fields cleared");
}

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

export function getLastResponse(): Promise<string> {
	return new Promise((resolve) => {
		let response = "";
		chrome.storage.sync.get(["RESPONSE"], (res) => {
			response = res["RESPONSE"];
			response ? resolve(response) : resolve("");
		});
	});
}
export function setLastResponse(response: string) {
	chrome.storage.sync.set({ RESPONSE: response }, () => {
		console.log("Last response set successfully");
	});
}


export function getContextField(): Promise<string> {
	return new Promise((resolve) => {
		let context = "";
		chrome.storage.sync.get(["CONTEXT"], (res) => {
			context = res["CONTEXT"];
			context ? resolve(context) : resolve("");
		});
	});
}

export function setContextField(context: string) {
	chrome.storage.sync.set({ CONTEXT: context }, () => {
		console.log("CONTEXT key set successfully");
	});
}

export function getPromptField(): Promise<string> {
	return new Promise((resolve) => {
		let prompt = "";
		chrome.storage.sync.get(["PROMPT"], (res) => {
			prompt = res["PROMPT"];
			prompt ? resolve(prompt) : resolve("");
		});
	});
}

export function setPromptField(prompt: string) {
	chrome.storage.sync.set({ PROMPT: prompt }, () => {
		console.log("PROMPT key set successfully");
	});
}