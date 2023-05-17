import React from "react";
import { useState } from "react";
import {
	validateEmail,
	validatePassword,
	validateText,
	validateUserName,
} from "../../Utilities/FormValidationFunctions";
import useFrom, { UseFormReturnType } from "../Hooks/useForm";
import CustomFormControl from "./CustomForm";
import axios from "axios";
import { Typography } from "@mui/material";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const MUIForm = () => {
	const [response, setResponse] = useState<string>();

	const f = useFrom([
		{
			descriptors: {
				name: "username",
				label: "Enter username",
				type: "text",
				required: true,
			},
			validationFunction: validateUserName,
		},
		{
			descriptors: {
				name: "passsword",
				label: "Enter password",
				type: "password",
				required: true,
			},
			validationFunction: validatePassword,
		},
		{
			descriptors: {
				name: "email",
				label: "Enter email",
				type: "text",
				required: true,
			},
			validationFunction: validateEmail,
		},
		{
			descriptors: {
				name: "optional",
				label: "Optional Field",
				type: "text",
				required: false,
			},
			validationFunction: validateText,
		},
		{
			descriptors: {
				name: "select",
				label: "Something...",
				type: "select",
				required: true,
				options: [
					{
						display: "value 1",
						value: "1",
					},
					{
						display: "value 2",
						value: "2",
					},
					{
						display: "value 3",
						value: "3",
					},
					{
						display: "value 4",
						value: "4",
					},
					{
						display: "value 5",
						value: "5",
					},
				],
			},
			validationFunction: validateText,
		},
	]);

	const formSubmitHandler = async (f: UseFormReturnType) => {
		// do the action for form submit
		// const response = await axios.post(serverUrl, f.getValues());
		// console.log(response.data);
		setResponse("Data sent successfully!");
		setTimeout(() => setResponse(""), 2000);
		f.resetForm();
		return;
	};

	return (
		<>
			{response && (
				<Typography
					variant="body2"
					color="error"
					bgcolor={"whitesmoke"}
					my={2}
				>
					{response}
				</Typography>
			)}
			<CustomFormControl fields={f} submitHandler={formSubmitHandler} />
		</>
	);
};

export default MUIForm;
