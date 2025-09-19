import SelectForm from "@/components/MyForm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function App() {
	const [response, setResponse] = useState("");

	return (
		<div className="min-w-md flex flex-col items-center p-3  max-h-[600px]  ">
			<h1 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
				Magic AI
			</h1>
			<SelectForm />
			{response && <Textarea className="w-[90%]   mt-5" />}
			<Button
				onClick={() => {
					setResponse("value");
				}}
			>
				click
			</Button>
		</div>
	);
}

export default App;
