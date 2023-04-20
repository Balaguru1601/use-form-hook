import { HTMLInputTypeAttribute, useId, useState } from "react";
import { ValidationFunctionType } from "../Utilities/FormValidationFunctions";

type ParameterType = {
	descriptors: {
		type: HTMLInputTypeAttribute;
		name: string;
		label: string;
		initialValue?: string;
	};
	validationFunction: ValidationFunctionType;
	updationFunction?: (value: string | number) => void;
};

export type UseFormReturnType = {
	fields: {
		[fieldName: string]: {
			id: string;
			properties: {
				name: string;
				type: HTMLInputTypeAttribute;
				value: string;
				label: string;
				onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
				onBlur: () => void;
				required: boolean;
				icon?:
					| keyof typeof import("e:/React course/use-form-hook/node_modules/@mui/icons-material/index")
					| null;
			};
			validities: {
				isInvalid: boolean;
				isValid: boolean;
				reset: () => void;
				message: string;
				raiseError: () => void;
				setInitialValue: (val: string) => void;
			};
		};
	};
	checkValidity: () => boolean;
	raiseError: () => void;
	errorMessage?: string;
};

// export const useInput = (
// 	descriptors: {
// 		type: HTMLInputTypeAttribute;
// 		name: string;
// 		label: string;
// 		initialValue: string;
// 	},
// 	validationFunction: ValidationFunctionType,
// 	updationFunction: (value: string | number) => void
// ) => {
// 	const [enteredValue, setEnteredValue] = useState(
// 		descriptors.initialValue || ""
// 	);
// 	const [inpWasTouched, setInpwasTouched] = useState(false);

// 	// const { validity: valueIsValid, message } =
// 	// 	descriptors.type === "date" && descriptors.prevDate
// 	// 		? validationFunction(enteredValue, moment(descriptors.prevDate))
// 	// 		: validationFunction(enteredValue);

// 	const { validity: valueIsValid, message } =
// 		validationFunction(enteredValue);

// 	const valueIsInvalid = inpWasTouched && !valueIsValid;

// 	const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		if (updationFunction) updationFunction(event.target.value);
// 		setEnteredValue((prevState) => event.target.value);
// 	};

// 	const inputBlurHandler = () => {
// 		setInpwasTouched((prevState) => true);
// 	};

// 	const resetInput = () => {
// 		setEnteredValue((prevState) => "");
// 		setInpwasTouched((prevState) => false);
// 	};

// 	const setInitialValue = (val: string) => {
// 		setEnteredValue(val);
// 	};

// 	const raiseError = () => {
// 		setEnteredValue((prev) => "");
// 		setInpwasTouched((prev) => true);
// 	};

// 	return {
// 		properties: {
// 			name: descriptors.name,
// 			type: descriptors.type,
// 			id: descriptors.name,
// 			value: enteredValue,
// 			label: descriptors.label,
// 			onChange: updateValue,
// 			onBlur: inputBlurHandler,
// 		},
// 		validities: {
// 			isInvalid: valueIsInvalid,
// 			isValid: valueIsValid,
// 			reset: resetInput,
// 			message: message,
// 			raiseError,
// 			setInitialValue,
// 		},
// 	};
// };

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
 * @returns FormObject : An object consisting of all the fields, checkValidty function, raiseError function and optional errorMessage
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
	const formObject: UseFormReturnType = {
		fields: {},
		checkValidity: () => false,
		raiseError: () => {},
	};
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
	for (const field of FieldList) {
		const { descriptors, validationFunction, updationFunction } = field;
		const [enteredValue, setEnteredValue] = useState(
			descriptors.initialValue || ""
		);
		const [inpWasTouched, setInpwasTouched] = useState(false);
		const id = useId();

		const { validity: valueIsValid, message } =
			validationFunction(enteredValue);

		const valueIsInvalid = inpWasTouched && !valueIsValid;

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
		formObject.fields[fieldName] = {
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
		if (checkFormValidity() === false)
			formObject.errorMessage = "Please fill all required fields!";
	};
	formObject.checkValidity = checkFormValidity;
	formObject.raiseError = raiseFormError;
	return formObject;
};

export default useFrom;
