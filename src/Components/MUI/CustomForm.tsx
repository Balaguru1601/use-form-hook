import * as Icon from "@mui/icons-material";
import classes from "./FormControl.module.css";
import {
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormControl,
	FormHelperText,
	IconButtonProps,
	Container,
	Button,
	Typography,
} from "@mui/material";
import {
	InputFieldType,
	InputPropType,
	SelectPropType,
	UseFormReturnType,
} from "../Hooks/useForm";
import { useState } from "react";
import CustomSelectControl from "./CustomSelectControl";
import CustomFormControl from "./CustomFormControl";

const CustomForm = (props: {
	fields: UseFormReturnType;
	submitHandler: (f: UseFormReturnType) => void;
	// IconBtnProps?: FC<IconButtonProps>;
	// type?: HTMLInputTypeAttribute;
}) => {
	const { fields, submitHandler } = props;

	const formFields: React.ReactElement[] = [];

	for (const f in fields.fields) {
		const field = fields.fields[f];
		if (field.kind === "select") {
			formFields.push(<CustomSelectControl field={field} />);
		} else formFields.push(<CustomFormControl field={field} />);
	}

	const formSubmitHandler = () => {
		if (!fields.checkValidity()) {
			fields.raiseError();
		} else {
			console.log(fields.getValues());
			submitHandler(fields);
		}
	};

	return (
		<Container
			sx={{
				p: 4,
				backgroundColor: "white",
				minWidth: 350,
				borderRadius: 2,
			}}
		>
			{...formFields}

			<Typography color={"salmon"}>{fields.errorMessage}</Typography>

			<Button onClick={formSubmitHandler}>Submit</Button>
			<Button onClick={fields.resetForm}>Reset</Button>
		</Container>
	);
};

export default CustomForm;
