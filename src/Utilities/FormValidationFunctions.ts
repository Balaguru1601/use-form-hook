export type ValidationFunctionType = (value: string | number) => {
	validity: boolean;
	message: string;
};

export const validatePassword: ValidationFunctionType = (password) => {
	if (typeof password === "string") {
		const regExp =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		password = password.trim();
		if (password.length < 8)
			return {
				validity: false,
				message: "Should contain atleast 8 characters",
			};
		else if (!regExp.test(password))
			return {
				validity: false,
				message: "Should contain a number and special character",
			};
		return {
			validity: true,
			message: "Looks good!",
		};
	}
	return {
		validity: false,
		message: "Only string values allowed",
	};
};

export const validateUserName: ValidationFunctionType = (value) => {
	if (typeof value === "string") {
		const regExp = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
		const validity = regExp.test(value.trim());
		if (value.trim() === "")
			return {
				validity: false,
				message: "Field is required",
			};
		else if (!validity)
			return {
				validity: false,
				message: "Should contain characters followed by numbers",
			};
		return {
			validity: true,
			message: "Looks good!",
		};
	}
	return {
		validity: false,
		message: "Only string values allowed",
	};
};

export const validateName: ValidationFunctionType = (value) => {
	if (typeof value === "string") {
		const regexp = /^[a-zA-Z]*$/;
		if (!value.trim() && regexp.test(value))
			return {
				validity: value.trim() !== "",
				message: "Name can contain characters only!",
			};
		return {
			validity: value.trim() !== "",
			message: "Looks good!",
		};
	}
	return {
		validity: false,
		message: "Only string values allowed",
	};
};

export const validateText: ValidationFunctionType = (value) => {
	if (typeof value === "string") {
		if (!value.trim())
			return {
				validity: value.trim() !== "",
				message: "Field is required",
			};
		return {
			validity: value.trim() !== "",
			message: "Looks good!",
		};
	}
	return {
		validity: false,
		message: "Only string values allowed",
	};
};

export const validateEmail: ValidationFunctionType = (email) => {
	if (typeof email === "string") {
		const regExp =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		email = email.trim();
		const validity = regExp.test(email);
		if (validity)
			return {
				validity,
				message: "Looks good!",
			};
		return {
			validity,
			message: "Valid email required!",
		};
	}
	return {
		validity: false,
		message: "Only string values allowed",
	};
};

export const validateYesNo: ValidationFunctionType = (value) => {
	if (typeof value === "string") {
		if (value)
			return {
				validity: true,
				message: "Looks good!",
			};
		return {
			validity: false,
			message: "Valid date required!",
		};
	}
	return {
		validity: false,
		message: "Only string values allowed",
	};
};
