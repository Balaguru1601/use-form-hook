import { HTMLInputTypeAttribute, useId, useState } from "react";
import { ValidationFunctionType } from "../Utilities/FormValidationFunctions";

export interface ParameterType {
	descriptors: {
		type: HTMLInputTypeAttribute;
		name: string;
		label: string;
		initialValue?: string;
	};
	validationFunction: ValidationFunctionType;
	updationFunction?: (value: string | number) => void;
}

export interface getValueType {
	[name: string]: string | number | boolean;
}

interface fieldType {
	[fieldName: string]: {
		readonly id: string;
		readonly properties: {
			readonly name: string;
			readonly type: HTMLInputTypeAttribute;
			value: string;
			readonly label: string;
			readonly onChange: (
				event: React.ChangeEvent<HTMLInputElement>
			) => void;
			readonly onBlur: () => void;
			readonly required: boolean;
			readonly icon?:
				| keyof typeof import("e:/React course/use-form-hook/node_modules/@mui/icons-material/index")
				| null;
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
			type: HTMLInputTypeAttribute;
			name: string;
			label: string;
			initialValue?: string;
			required: boolean;
			icon?: keyof typeof import("e:/React course/use-form-hook/node_modules/@mui/icons-material/index");
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
			onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
			onBlur: () => void;
			required: boolean;
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

	for (const field of FieldList) {
		const { descriptors, validationFunction, updationFunction } = field;
		const [enteredValue, setEnteredValue] = useState(
			descriptors.initialValue || ""
		);
		const [inpWasTouched, setInpwasTouched] = useState(false);
		const id = useId();

		const { validity: valueIsValid, message } =
			validationFunction(enteredValue);

		const valueIsInvalid = descriptors.required
			? inpWasTouched && !valueIsValid
			: enteredValue.length > 0 && !valueIsValid;

		const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
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
