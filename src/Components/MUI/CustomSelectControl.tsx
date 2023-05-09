import { FormControl, Select } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
interface fieldType {
	readonly id: string;
	readonly properties: {
		readonly name: string;
		readonly type: HTMLInputTypeAttribute;
		value: string;
		readonly label: string;
		readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
		readonly onBlur: () => void;
		readonly required: boolean;
		readonly icon?: keyof typeof import("@mui/icons-material") | null;
		readonly options?: {
			display: string | number;
			value: string | number;
			type: string;
		}[];
	};
	readonly validities: {
		isInvalid: boolean;
		isValid: boolean;
		readonly reset: () => void;
		message: string;
		readonly raiseError: () => void;
		readonly setInitialValue: (val: string) => void;
	};
}
const CustomSelectControl = (props: { field: fieldType }) => {
	const { field } = props;
	return (
		<FormControl>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={field.properties.value}
				label="Age"
				onChange={field.properties.onChange}
			></Select>
		</FormControl>
	);
};

export default CustomSelectControl;
