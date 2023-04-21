import { useState } from "react";
import "./App.css";
import { validateText } from "./Utilities/FormValidationFunctions";
import useFrom, { UseFormReturnType } from "./Hooks/useForm";
import CustomFormControl from "./Components/MUI/CustomFormControl";

function App() {
	const [count, setCount] = useState(0);

	const f = useFrom([
		{
			descriptors: {
				name: "test",
				label: "test",
				type: "text",
				required: true,
				icon: "AccountCircle",
			},
			validationFunction: validateText,
		},
		{
			descriptors: {
				name: "passsword",
				label: "test2",
				type: "password",
				required: true,
			},
			validationFunction: validateText,
		},
		{
			descriptors: {
				name: "test3",
				label: "test3",
				type: "text",
				required: false,
				icon: "Email",
			},
			validationFunction: validateText,
		},
		{
			descriptors: {
				name: "test4",
				label: "test4",
				type: "text",
				required: true,
			},
			validationFunction: validateText,
		},
	]);

	const formSubmitHandler = (f: UseFormReturnType) => {
		// do the action for form submit
		console.log(f);
	};

	return (
		<div className="App">
			<CustomFormControl fields={f} submitHandler={formSubmitHandler} />
		</div>
	);
}

export default App;
