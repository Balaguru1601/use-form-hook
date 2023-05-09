import { HTMLInputTypeAttribute, useId, useState } from "react";
import { ValidationFunctionType } from "../../Utilities/FormValidationFunctions";
import { SelectChangeEvent } from "@mui/material";

export interface ParameterType {
	descriptors: {
		type: HTMLInputTypeAttribute | "select";
		name: string;
		label: string;
		initialValue?: string;
		options?: {
			display: string | number;
			value: string | number;
			type: string;
		}[];
	};
	validationFunction: ValidationFunctionType;
	updationFunction?: (value: string | number) => void;
}

export interface getValueType {
	[name: string]: string | number | boolean;
}

export interface fieldType {
	[fieldName: string]: {
		readonly id: string;
		readonly properties: {
			readonly name: string;
			readonly type: HTMLInputTypeAttribute;
			value: string;
			readonly label: string;
			readonly onChange: (
				event:
					| React.ChangeEvent<HTMLInputElement>
					| SelectChangeEvent<string>
			) => void;
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
	};
}

export interface UseFormReturnType {
	fields: fieldType;
	checkValidity: () => boolean;
	raiseError: () => void;
	errorMessage?: string;
	resetForm: () => void;
	getValues: () => getValueType | void;
}

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
			icon?: keyof typeof import("@mui/icons-material");
			options?: {
				display: string | number;
				value: string | number;
				type: string;
			}[];
		};
		validationFunction: ValidationFunctionType;
		updationFunction?: (value: string | number) => void;
	}[]
): UseFormReturnType => {
	const allFields: fieldType = {};

	const formFieldsArray: {
		properties: {
			name: string;
			type: HTMLInputTypeAttribute;
			value: string;
			label: string;
			onChange: (
				event:
					| React.ChangeEvent<HTMLInputElement>
					| SelectChangeEvent<string>
			) => void;
			onBlur: () => void;
			required: boolean;
			options?: {
				display: string | number;
				value: string | number;
				type: string;
			}[];
		};
		validities: {
			isInvalid: boolean;
			isValid: boolean;
			reset: () => void;
			message: string;
			raiseError: () => void;
			setInitialValue: (val: string) => void;
		};
	}[] = [];

	const [error, setError] = useState<string>();
	const optionsList: {
		display: string | number;
		value: string | number;
		type: string;
	}[] = [];

	for (const field of FieldList) {
		const { descriptors, validationFunction, updationFunction } = field;
		const [enteredValue, setEnteredValue] = useState(
			descriptors.initialValue || ""
		);
		const [inpWasTouched, setInpwasTouched] = useState(false);
		const id = useId();
		if (descriptors.type === "select") {
			if (descriptors.initialValue) {
				optionsList.push({
					type: "default",
					value: descriptors.initialValue,
					display: descriptors.initialValue,
				});
			}
			if (descriptors.options?.length) {
				optionsList.push(...descriptors.options);
			}

			const updationFn = (
				event:
					| React.ChangeEvent<HTMLInputElement>
					| SelectChangeEvent<string>
			) => {
				setEnteredValue(event.target.value as string);
			};

			const valueIsValid = enteredValue.length > 0;

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
			const fieldName = descriptors.name;
			allFields[fieldName] = {
				id,
				properties: {
					name: descriptors.name,
					type: descriptors.type,
					value: enteredValue,
					label: descriptors.label,
					onChange: updationFn,
					onBlur: inputBlurHandler,
					required: descriptors.required,
					icon: descriptors.icon || null,
					options: optionsList,
				},
				validities: {
					isInvalid: valueIsInvalid,
					isValid: valueIsValid,
					reset: resetInput,
					message: "Looks good!",
					raiseError,
					setInitialValue,
				},
			};
			formFieldsArray.push({
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
					message: "Looks good!",
					raiseError,
					setInitialValue,
				},
			});
		} else {
			const { validity: valueIsValid, message } =
				validationFunction(enteredValue);

			const valueIsInvalid = descriptors.required
				? inpWasTouched && !valueIsValid
				: enteredValue.length > 0 && !valueIsValid;

			const updateValue = (
				event:
					| React.ChangeEvent<HTMLInputElement>
					| SelectChangeEvent<string>
			) => {
				if (updationFunction) updationFunction(event.target.value);
				setEnteredValue((prevState) => event.target.value);
			};

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

			const fieldName = descriptors.name;
			allFields[fieldName] = {
				id,
				properties: {
					name: descriptors.name,
					type: descriptors.type,
					value: enteredValue,
					label: descriptors.label,
					onChange: updateValue,
					onBlur: inputBlurHandler,
					required: descriptors.required,
					icon: descriptors.icon || null,
				},
				validities: {
					isInvalid: valueIsInvalid,
					isValid: valueIsValid,
					reset: resetInput,
					message: message,
					raiseError,
					setInitialValue,
				},
			};
			formFieldsArray.push({
				properties: {
					name: descriptors.name,
					type: descriptors.type,
					value: enteredValue,
					label: descriptors.label,
					onChange: updateValue,
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
			});
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
