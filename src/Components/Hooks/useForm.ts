import { HTMLInputTypeAttribute, useId, useState } from "react";
import {
	ValidationFunctionType,
	validateText,
} from "../../Utilities/FormValidationFunctions";
import { SelectChangeEvent } from "@mui/material";

export interface InputParameterType {
	kind: "inbuilt";
	descriptors: {
		type: HTMLInputTypeAttribute;
		name: string;
		label: string;
		initialValue?: string;
		required: boolean;
	};
	validationFunction?: ValidationFunctionType;
	updationFunction?: (value: string | number) => void;
}

export interface option {
	display: string | number;
	value: string | number;
	type?: string;
}

export interface SelectPropType {
	readonly kind: "select";
	readonly id: string;
	readonly properties: {
		readonly name: string;
		readonly type: "select";
		value: string;
		readonly label: string;
		readonly onChange: (event: SelectChangeEvent<string>) => void;
		readonly onBlur: () => void;
		readonly required: boolean;
		readonly options: option[];
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
export interface InputPropType {
	readonly kind: "inbuilt";
	readonly id: string;
	readonly properties: {
		readonly name: string;
		readonly type: HTMLInputTypeAttribute;
		value: string;
		readonly label: string;
		readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
		readonly onBlur: () => void;
		readonly required: boolean;
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

export interface SelectParameterType {
	kind: "select";
	descriptors: {
		type: "select";
		name: string;
		label: string;
		initialValue?: string;
		options: option[];
		required: boolean;
	};
	validationFunction?: ValidationFunctionType;
	updationFunction?: (value: string | number) => void;
}

type ParameterType = InputParameterType | SelectParameterType;

export interface getValueType {
	[name: string]: string | number | boolean;
}

export interface InputFieldType {
	[fieldName: string]: InputPropType;
}

export interface SelectFieldType {
	[fieldName: string]: SelectPropType;
}

export interface UseFormReturnType {
	fields: InputFieldType | SelectFieldType;
	checkValidity: () => boolean;
	raiseError: () => void;
	errorMessage?: string;
	resetForm: () => void;
	getValues: () => getValueType | void;
}

const useInput = (Field: ParameterType): SelectFieldType | InputFieldType => {
	const id = useId();

	if (Field.kind === "select") {
		const {
			descriptors,
			updationFunction,
			validationFunction = validateText,
		} = Field;
		const [enteredValue, setEnteredValue] = useState(
			descriptors.initialValue || ""
		);
		const [inpWasTouched, setInpwasTouched] = useState(false);

		const optionsList: {
			display: string | number;
			value: string | number;
			type?: string;
		}[] = [];
		if (descriptors.initialValue) {
			optionsList.push({
				type: "default",
				value: descriptors.initialValue,
				display: descriptors.initialValue,
			});
		}
		if (descriptors.options.length) {
			optionsList.push(...descriptors.options);
		}

		const updationFn = (event: SelectChangeEvent<string>) => {
			setEnteredValue(event.target.value as string);
			updationFunction && updationFunction(event.target.value);
		};

		const { validity: valueIsValid, message } =
			validationFunction(enteredValue);

		const valueIsInvalid = descriptors.required
			? inpWasTouched && !valueIsValid
			: enteredValue.length > 0 && !valueIsValid;

		const inputBlurHandler = () => {
			setInpwasTouched((prevState) => true);
		};

		const resetInput = () => {
			setEnteredValue((prevState) => "");
			setInpwasTouched((prevState) => false);
		};

		const setInitialValue = (val: string) => {
			setEnteredValue(val);
		};

		const raiseError = () => {
			setEnteredValue((prev) => "");
			setInpwasTouched((prev) => true);
		};

		return {
			field: {
				kind: "select",
				id,
				properties: {
					name: descriptors.name,
					type: descriptors.type,
					value: enteredValue,
					label: descriptors.label,
					onChange: updationFn,
					onBlur: inputBlurHandler,
					required: descriptors.required,
					options: optionsList,
				},
				validities: {
					isInvalid: valueIsInvalid,
					isValid: valueIsValid,
					reset: resetInput,
					message: message,
					raiseError,
					setInitialValue,
				},
			},
		};
	}
	const {
		descriptors,
		validationFunction = validateText,
		updationFunction,
	} = Field;
	const [enteredValue, setEnteredValue] = useState(
		descriptors.initialValue || ""
	);
	const [inpWasTouched, setInpwasTouched] = useState(false);

	const updationFn = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredValue(event.target.value as string);
	};

	const { validity: valueIsValid, message } =
		validationFunction(enteredValue);

	const valueIsInvalid = descriptors.required
		? inpWasTouched && !valueIsValid
		: enteredValue.length > 0 && !valueIsValid;
	const inputBlurHandler = () => {
		setInpwasTouched((prevState) => true);
	};

	const resetInput = () => {
		setEnteredValue((prevState) => "");
		setInpwasTouched((prevState) => false);
	};

	const setInitialValue = (val: string) => {
		setEnteredValue(val);
	};

	const raiseError = () => {
		setEnteredValue((prev) => "");
		setInpwasTouched((prev) => true);
	};
	return {
		field: {
			kind: "inbuilt",
			id,
			properties: {
				name: descriptors.name,
				type: descriptors.type,
				value: enteredValue,
				label: descriptors.label,
				onChange: updationFn,
				onBlur: inputBlurHandler,
				required: descriptors.required,
			},
			validities: {
				isInvalid: valueIsInvalid,
				isValid: valueIsValid,
				reset: resetInput,
				message: message,
				raiseError,
				setInitialValue,
			},
		},
	};
};
/**
 * The useFormHook
 *
 * @param descriptors.name : The name of input field
 * @param descriptors.label : The label of input field
 * @param descriptors.required : The boolean value - true if value is required
 * @param descriptors.type : The type of input field
 * @param descriptors.initial : Optional : The initial value of input field
 * @param ValidationFunction : The validation function for input field
 * @param updationFunction : Optional : The optional updation function
 * @returns {UseFormReturnType} FormObject : An object consisting of all the fields, checkValidty function, raiseError function and optional errorMessage
 *
 * @author Balaguru S - https://github.com/Balaguru1601
 */
const useFrom = (
	FieldList: {
		descriptors: {
			type: HTMLInputTypeAttribute | "select";
			name: string;
			label: string;
			initialValue?: string;
			required: boolean;
			options?: option[];
		};
		validationFunction: ValidationFunctionType;
		updationFunction?: (value: string | number) => void;
	}[]
): UseFormReturnType => {
	const allFields: InputFieldType | SelectFieldType = {};

	const formFieldsArray: (SelectPropType | InputPropType)[] = [];

	const [error, setError] = useState<string>();

	for (const field of FieldList) {
		if (field.descriptors.type === "select" && field.descriptors.options) {
			const returnedField = useInput({
				kind: "select",
				...field,
				descriptors: {
					...field.descriptors,
					type: "select",
					options: field.descriptors.options,
				},
			}).field;
			allFields[field.descriptors.name] = returnedField;
			formFieldsArray.push(returnedField);
		} else {
			const returnedField = useInput({
				kind: "inbuilt",
				...field,
			}).field;
			allFields[field.descriptors.name] = returnedField;
			formFieldsArray.push(returnedField);
		}
	}
	/**
	 * The function to check form validity
	 * @returns validity : boolean
	 */
	const checkFormValidity = () =>
		formFieldsArray.every((field) =>
			field.properties.required
				? !field.validities.isInvalid && field.validities.isValid
				: true
		);
	/**
	 * The function to raise error for invalid inputs
	 * @description the function is run to check for invalid inputs and raise error based on the validation function passed
	 */
	const raiseFormError = () => {
		for (const field of formFieldsArray) {
			if (field.properties.required && field.validities.isInvalid)
				field.validities.raiseError;
		}
		if (checkFormValidity() === false) {
			setError("Please fill all required fields!");
		}
	};

	const getFormValues = () => {
		const FormValuesObject: getValueType = {};
		for (const f of formFieldsArray) {
			FormValuesObject[f.properties.name] = f.properties.value;
		}
		return FormValuesObject;
	};

	const formObject: UseFormReturnType = {
		fields: allFields,
		checkValidity: checkFormValidity,
		raiseError: raiseFormError,
		errorMessage: error,
		resetForm: () => {
			for (const f of formFieldsArray) f.validities.reset();
			setError("");
		},
		getValues: getFormValues,
	};

	return formObject;
};

export default useFrom;
