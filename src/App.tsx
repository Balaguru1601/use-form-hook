import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { validateText } from "./Utilities/FormValidationFunctions";
import useFrom, { UseFormReturnType } from "./Hooks/useForm";
import CustomFormControl from "./Components/CustomFormControl";

function App() {
	const [count, setCount] = useState(0);

	const f = useFrom([
		{
			descriptors: {
				name: "test",
				label: "test",
				type: "text",
				required: true,
			},
			validationFunction: validateText,
		},
		{
			descriptors: {
				name: "test2",
				label: "test2",
				type: "text",
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
		console.log(f.fields);
	};

	return (
		<div className="App">
			<CustomFormControl fields={f} submitHandler={formSubmitHandler} />
		</div>
	);
}

export default App;
