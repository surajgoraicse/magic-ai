export async function validateApiKey(apiKey: string): Promise<boolean> {
	const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
	try {
		const response = await fetch(url);
		if (response.ok) {
			console.log("✅ Gemini API key is valid!");
			return true;
		} else {
			const errorData = await response.json();
			console.error(
				`❌ API key validation failed: ${response.status} - ${errorData.error.message}`
			);
			return false;
		}
	} catch (error) {
		console.error(
			"❌ An unexpected error occurred during API key validation.",
			error
		);
		return false;
	}
}

export async function getApiKey() :Promise<string> {
	return new Promise((resolve, reject) => {
		let ApiKey = "";
		console.log("getting api key...");

		chrome.storage.sync.get(["API"], (res) => {
			ApiKey = res["API"];
			if (!ApiKey) {
				console.log("not found");
				console.log(res.KEY);
				console.log(res);
				reject("");
			} else {
				resolve(ApiKey);
				console.log(ApiKey);
			}
		});
	});
}
