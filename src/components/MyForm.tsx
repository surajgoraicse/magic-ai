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
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";

type SelectType = {
	label: string;
	name: string;
};

const StyleSchema = z.enum(["COOL", "FORMAL", "INFORMAL", "MOTIVATIONAL"]);
const SizeSchema = z.enum(["SHORT", "MEDIUM", "LONG"]);
const FormSchema = z.object({
	style: StyleSchema,
	size: SizeSchema,
	prompt: z.string().max(100, "Keep the prompt under 100 characters"),
});

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

export default function SelectForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			style: "COOL",
			size: "SHORT",
			prompt: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}
	function handleReset() {
		console.log("reset");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-[80%] space-y-6 flex flex-col"
			>
				<div className="flex gap-5">
					<FormField
						control={form.control}
						name="style"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Style</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
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
								<FormLabel>Style</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Style" />
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
				</div>
				<FormField
					control={form.control}
					name="prompt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prompt</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Write Custom Prompt Here"
									className="resize-none max-h-[150px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* submit and reset button */}
				<div className="flex gap-5">
					<Button className="font-bold text-black" type="submit">
						Submit
					</Button>
					<Button
						className="font-bold text-white"
						variant={"destructive"}
						onClick={handleReset}
					>
						Reset
					</Button>
				</div>
			</form>
		</Form>
	);
}
