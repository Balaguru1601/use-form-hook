import { useState } from "react";
import "./App.css";
import {
	validateEmail,
	validatePassword,
	validateText,
	validateUserName,
} from "./Utilities/FormValidationFunctions";
import useFrom, { UseFormReturnType } from "./Hooks/useForm";
import CustomFormControl from "./Components/MUI/CustomFormControl";
import axios from "axios";
import { Typography } from "@mui/material";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function App() {
	const [response, setResponse] = useState<string>();

	const f = useFrom([
		{
			descriptors: {
				name: "username",
				label: "Enter username",
				type: "text",
				required: true,
				icon: "AccountCircle",
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
				icon: "Email",
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
	]);

	const formSubmitHandler = async (f: UseFormReturnType) => {
		// do the action for form submit
		const response = await axios.post(serverUrl, f.getValues());
		console.log(response.data);
		setResponse("Data sent successfully!");
		f.resetForm();
		return;
	};

	return (
		<div className="App">
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
		</div>
	);
}

export default App;
