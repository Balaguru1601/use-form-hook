import {
	FormControl,
	FormHelperText,
	IconButton,
	IconButtonProps,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { InputFieldType, InputPropType } from "../Hooks/useForm";
import * as Icon from "@mui/icons-material";
import classes from "./FormControl.module.css";
import { useState } from "react";

const CustomFormControl = (props: {
	field: InputPropType;
	icon?: keyof typeof import("@mui/icons-material/index") | null;
}) => {
	const { field } = props;
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	const icon: keyof typeof import("@mui/icons-material/index") | null =
		field.properties.type === "password"
			? showPassword
				? "VisibilityOff"
				: "Visibility"
			: props.icon || null;

	const InputIcon =
		(icon || field.properties.type === "password") && Icon[icon!];

	const IconBtnProps: IconButtonProps =
		field.properties.type === "password"
			? {
					onClick: handleClickShowPassword,
					onMouseDown: handleMouseDownPassword,
					disabled: field.properties.value.length === 0,
			  }
			: { disabled: true };

	return (
		<FormControl
			className={classes.formControl}
			error={field.validities.isInvalid}
			color={field.validities.isValid ? "success" : "primary"}
			key={field.id}
		>
			<InputLabel htmlFor={field.id}>{field.properties.label}</InputLabel>
			<OutlinedInput
				sx={{ marginRight: "1rem", width: "100%" }}
				{...field.properties}
				id={field.id}
				endAdornment={
					icon && (
						<InputAdornment position="end">
							<IconButton {...IconBtnProps}>
								{InputIcon && <InputIcon />}
							</IconButton>
						</InputAdornment>
					)
				}
				type={
					field.properties.type === "password"
						? showPassword
							? "text"
							: "password"
						: field.properties.type
				}
			/>
			{field.validities.isInvalid && (
				<FormHelperText id="component-error-text">
					{field.validities.message}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomFormControl;
