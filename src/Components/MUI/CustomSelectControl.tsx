import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { HTMLInputTypeAttribute, useRef } from "react";
import { SelectPropType } from "../Hooks/useForm";
import classes from "./FormControl.module.css";

const CustomSelectControl = (props: { field: SelectPropType }) => {
	const { field } = props;
	return (
		<FormControl className={classes.formControl}>
			<InputLabel id={field.id}>{field.properties.label}</InputLabel>
			<Select
				id={field.id}
				value={field.properties.value}
				label={field.properties.label}
				onChange={field.properties.onChange}
				onClick={field.properties.onBlur}
				onClose={(e) => {}}
				fullWidth
				sx={{ textAlign: "start" }}
			>
				{field.properties.options.map((item, index) => (
					<MenuItem value={item.value} key={index}>
						{item.display}
					</MenuItem>
				))}
			</Select>
			{field.validities.isInvalid && (
				<FormHelperText
					id="component-error-text"
					sx={{
						color: "salmon",
					}}
				>
					{field.validities.message}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomSelectControl;
