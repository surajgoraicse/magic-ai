import { getData } from "@/actions/getData";
import SelectForm, { FormSchema } from "@/components/MyForm";
import { Textarea } from "@/components/ui/textarea";
import { getLastResponse, setLastResponse } from "@/services/fields";
import { useEffect, useState } from "react";
import type z from "zod";
import { ModeToggle } from "./mode-toggle";
const Popup = () => {
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchLastResponse = async () => {
			const lastRes = await getLastResponse();
			if (lastRes) {
				setResponse(lastRes);
			} else {
				setResponse("");
			}
		};
		fetchLastResponse();
	}, []);

	const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			setResponse("");
			setLoading(true);
			const res = await getData(data);
			setLoading(false);
			if (res) {
				setResponse(res);
				setLastResponse(res);
			} else {
				setResponse("Something went wrong");
				setLastResponse("");
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
			setResponse("Something went wrong");
			setLastResponse("");
		}
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
			<SelectForm
				onSubmitForm={handleSubmit}
				loading={loading}
				setLoading={setLoading}
			/>
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
