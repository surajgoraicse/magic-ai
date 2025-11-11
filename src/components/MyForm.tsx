"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	clearFields,
	getContextField,
	getPromptField,
	getSizeField,
	getStyleField,
	getTypeField,
	setContextField,
	setPromptField,
	setSizeField,
	setStyleField,
	setTypeField,
} from "@/services/fields";
import { useEffect } from "react";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";

type SelectType = {
	label: string;
	name: string;
};

const StyleSchema = z.enum(["COOL", "FORMAL", "INFORMAL", "MOTIVATIONAL"]);
const SizeSchema = z.enum(["SHORT", "MEDIUM", "LONG"]);
const TypeSchema = z.enum(["COMMENT", "REPLY"]);
const styleItem: SelectType[] = [
	{ label: "Cool", name: "COOL" },
	{ label: "Formal", name: "FORMAL" },
	{ label: "Informal", name: "INFORMAL" },
	{ label: "Motivational", name: "MOTIVATIONAL" },
];

const sizeItems: SelectType[] = [
	{ label: "Short", name: "SHORT" },
	{ label: "Medium", name: "MEDIUM" },
	{ label: "Long", name: "LONG" },
];

const typeItems: SelectType[] = [
	{ label: "Comment", name: "COMMENT" },
	{ label: "Reply", name: "REPLY" },
];

export const FormSchema = z.object({
	style: StyleSchema,
	size: SizeSchema,
	type: TypeSchema,
	prompt: z
		.string()
		.max(100, "Keep the prompt under 100 characters")
		.optional(),
	context: z.string().min(10, "Keep the context over 10 characters"),
});

export default function SelectForm({
	onSubmitForm,
	loading,
	setLoading,
}: {
	onSubmitForm: (data: z.infer<typeof FormSchema>) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
}) {
	useEffect(() => {
		async function getFields() {
			console.log("getting fields");
			const style = StyleSchema.safeParse(await getStyleField());
			if (style.success) {
				form.setValue("style", style.data);
			}

			const size = SizeSchema.safeParse(await getSizeField());
			if (size.success) {
				form.setValue("size", size.data);
			}

			const type = TypeSchema.safeParse(await getTypeField());
			if (type.success) {
				form.setValue("type", type.data);
			}

			getContextField().then((context) => {
				if (context) {
					form.setValue("context", context);
				}
			});

			getPromptField().then((prompt) => {
				if (prompt) {
					form.setValue("prompt", prompt);
				}
			});
		}
		getFields();
	}, []);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			style: "COOL",
			size: "SHORT",
			type: "REPLY",
			prompt: "",
			context: "",
		},
	});

	function handleReset() {
		console.log("reset");
		form.reset({
			style: "COOL",
			size: "SHORT",
			type: "REPLY",
			prompt: "",
			context: "",
		});
		form.clearErrors();
		clearFields();
		setLoading(false);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(() => {
					onSubmitForm(form.getValues());
					setContextField(form.getValues().context);
					setPromptField(form.getValues().prompt || "");
				})}
				className="w-[80%] space-y-3 flex flex-col"
			>
				<div className="flex gap-5">
					<FormField
						control={form.control}
						name="style"
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Style</FormLabel> */}
								<Select
									onValueChange={(newValue) => {
										field.onChange(newValue);
										setStyleField(newValue);
									}}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Style" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{styleItem.map((item) => (
											<SelectItem value={item.name}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="size"
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Size</FormLabel> */}
								<Select
									onValueChange={(newValue) => {
										field.onChange(newValue);
										setSizeField(newValue);
									}}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Size" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{sizeItems.map((item) => (
											<SelectItem value={item.name}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Type</FormLabel> */}
								<Select
									onValueChange={(newValue) => {
										field.onChange(newValue);
										setTypeField(newValue);
									}}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{typeItems.map((item) => (
											<SelectItem value={item.name}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="context"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Context</FormLabel> */}
							<FormControl>
								<Textarea
									placeholder="Write Context Here..."
									className=" max-h-[60px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="prompt"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Custom Prompt</FormLabel> */}
							<FormControl>
								<Textarea
									placeholder="Write Custom Prompt Here..."
									className=" max-h-[60px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* submit and reset button */}
				<div className="flex gap-5">
					<Button
						variant={"outline"}
						disabled={loading}
						className="font-bold "
						type="submit"
					>
						{loading ? (
							<>
								<Spinner /> Processing...
							</>
						) : (
							"✨Generate"
						)}
					</Button>
					<Button
						className="font-bold "
						variant={"outline"}
						onClick={handleReset}
					>
						Reset
					</Button>
				</div>
			</form>
		</Form>
	);
}
