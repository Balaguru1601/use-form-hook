# Use form hook

### Built in React.js using Vite

This is an application demonstrating the use of a custom react hook for forms.
The hook currently supports MUI form elemet. The accepted format for a form field is given in CustomFormControl component.
The hook is written in Typescript and currently supports all type of text, number and date input types.
The parameters to be passed are a list of fields each consisting of a parameter of the following type :

```ts
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
}
```

The validation function provides must be of the followiing type :

```ts
type ValidationFunctionType = (value: string | number) => {
	validity: boolean;
	message: string;
};
```

The form component can be found in CustomFormControl.jsx

To run the app, in the project directory run

```sh
    npm install
    npm run dev
```

The development server will be available at http://localhost:5173/
