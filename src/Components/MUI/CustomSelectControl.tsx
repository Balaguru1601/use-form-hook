import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
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
				fullWidth
			>
				{field.properties.options.map((item, index) => (
					<MenuItem value={item.value} key={index}>
						{item.display}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default CustomSelectControl;
