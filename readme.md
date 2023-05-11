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

[Example - Codesandbox-link]( https://codesandbox.io/p/github/Balaguru1601/use-form-hook/master?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clhjfsedw000c356mfid98193%2522%257D%252C%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clhjftdon00dk356mkir33s7r%2522%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clhjfsedw000c356mfid98193%2522%253A%257B%2522id%2522%253A%2522clhjfsedw000c356mfid98193%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.tsx%2522%252C%2522id%2522%253A%2522clhjft5py00ah356mf7knxmjq%2522%252C%2522mode%2522%253A%2522temporary%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clhjft5py00ah356mf7knxmjq%2522%257D%252C%2522clhjftdon00dk356mkir33s7r%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clhjfsedw000b356messptrif%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clhjftdon00dk356mkir33s7r%2522%252C%2522activeTabId%2522%253A%2522clhjfsedw000b356messptrif%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)
