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
import { UseFormReturnType } from "../Hooks/useForm";
import { useState } from "react";

const CustomFormControl = (props: {
	fields: UseFormReturnType;
	submitHandler: (f: UseFormReturnType) => void;
	// IconBtnProps?: FC<IconButtonProps>;
	// type?: HTMLInputTypeAttribute;
}) => {
	const { fields, submitHandler } = props;

	const formFields = [];
	const [error, setError] = useState<string>();

	for (const f in fields.fields) {
		const icon:
			| keyof typeof import("e:/React course/use-form-hook/node_modules/@mui/icons-material/index")
			| null = fields.fields[f].properties.icon || null;
		const InputIcon = icon ? Icon[icon] : null;
		const field = fields.fields[f];
		formFields.push(
			<FormControl
				className={classes.formControl}
				error={field.validities.isInvalid}
				color={field.validities.isValid ? "success" : "primary"}
				key={field.id}
			>
				<InputLabel htmlFor={field.id}>
					{field.properties.label}
				</InputLabel>
				<OutlinedInput
					sx={{ marginRight: "1rem", width: "100%" }}
					{...field.properties}
					id={field.id}
					endAdornment={
						icon && (
							<InputAdornment position="end">
								<IconButton>
									{InputIcon && <InputIcon />}
								</IconButton>
							</InputAdornment>
						)
					}
					type={field.properties.type}
				/>
				{field.validities.isInvalid && (
					<FormHelperText id="component-error-text">
						{field.validities.message}
					</FormHelperText>
				)}
			</FormControl>
		);
	}

	const formSubmitHandler = () => {
		if (!fields.checkValidity()) {
			fields.raiseError();
			setError(fields.errorMessage || "please fill details");
		} else {
			submitHandler(fields);
		}
	};

	return (
		<Container sx={{ p: 4, backgroundColor: "white" }}>
			{...formFields}
			{error && <Typography color={"salmon"}>{error}</Typography>}
			<Button onClick={formSubmitHandler}>Submit</Button>
		</Container>
	);
};

export default CustomFormControl;
