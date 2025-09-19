import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validateApiKey } from "@/services/api";
import { toast } from "sonner";

const FormSchema = z.object({
	apiKey: z.string(),
});

export function ApiPageForm({
	onSaveKey,
}: {
	onSaveKey: (key: string | null) => void;
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			apiKey: "",
		},
	});

	async function handleApiSubmit(data: z.infer<typeof FormSchema>) {
		console.log("api submitted");
		try {
			if (data.apiKey && (await validateApiKey(data.apiKey))) {
				chrome.storage.sync.set({ API: data.apiKey }, () => {
					console.log("Api key set successfully");
				});

				toast.success("API Key Saved 😋");
				onSaveKey(data.apiKey);
				return;
			}
			onSaveKey(null);

			toast.error("Invalid API Key");

			console.error(`❌ API key validation failed: Invalid API Key`);
			return;
		} catch (error) {
			toast.error("Failed to Save API KEY");

			console.error(`Error handleApiSubmit : ${error}`);
			onSaveKey(null);
		}
	}

	return (
		<div className="min-w-[300px] min-h-[300px] flex items-center justify-center ">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleApiSubmit)}
					className="w-2/3 space-y-6"
				>
					<FormField
						control={form.control}
						name="apiKey"
						render={({ field }) => (
							<FormItem>
								<FormLabel>API KEY</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter API Key"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Enter your gemini api key
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
