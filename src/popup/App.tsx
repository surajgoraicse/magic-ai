import { ApiPageForm } from "@/components/ApiPageForm";
import Popup from "@/components/popup-ui";
import { getApiKey } from "@/services/api";
import { useEffect, useState } from "react";

function App() {
	const [apiKey, setApiKey] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// run this only if apikey is not set
		// there is a case when the api is add for first time then set is set it apikey so no need to check in that case
		setLoading(true);
		async function fetchKey() {
			try {
				const key = await getApiKey();
				setApiKey(key);
			} catch (error) {
				console.log(
					"error while fetching key from chrome storage",
					error
				);
			} finally {
				setLoading(false);
			}
		}
		fetchKey();
	}, []);

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	}

	return apiKey ? <Popup /> : <ApiPageForm onSaveKey={setApiKey} />;
}

export default App;
