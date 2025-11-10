import { getData } from "@/actions/getData";
import SelectForm, { FormSchema } from "@/components/MyForm";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type z from "zod";
import { ModeToggle } from "./mode-toggle";
const Popup = () => {
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
		setResponse("");
		setLoading(true);
		const res = await getData(data);
		setLoading(false);
		setResponse(res || "Something went wrong");
	};
	return (
		<div className="min-w-lg flex flex-col items-center p-3  max-h-[600px]  ">
			<div className="relative flex items-center justify-center w-full">
				<h1 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
					Magic AI
				</h1>
				<span className="absolute right-0">
					<ModeToggle />
				</span>
			</div>
			<SelectForm onSubmitForm={handleSubmit} loading={loading} />
			{response && (
				<Textarea
					value={response}
					onChange={(e) => setResponse(e.target.value)}
					className="w-[90%]   my-5"
				/>
			)}
		</div>
	);
};

export default Popup;
