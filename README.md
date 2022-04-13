<!-- markdownlint-disable-next-line -->

<h1 align="center">mui-rhf-library</h1>

<div align="center">
A set of configured Material UI form inputs configured with React Hook Form and Yup.
</div>

## Installation

mui-rhf-library is available as an [npm package](https://www.npmjs.com/package/mui-rhf-library).

```sh
// with npm
npm install mui-rhf-library

// with yarn
yarn add mui-rhf-library
```

## Usage

Here is a quick example to get you started:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { TextFieldController, SelectController } from 'mui-rhf-library';
import { useForm } from 'react-hook-form';


function App() {
    const {
        control,
	} = useForm();

    return (
        <>
            <TextFieldController
                control={control}
                name="name"
                defaultValue=""
                label="TextField Controller"
            />

        	<SelectController
                name="select"
                label="Select Controller"
                control={control}
                options: [
        			{ label: 'Option One', value: 'option-one', example: {name: 'example-one'} },
        			{ label: 'Option Two', value: 'option-two', example: {name: 'example-two'} }
    			]
                optionValue: 'example.name',
                optionLabel: 'example.name',
                variant="outlined"
            />
        </>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Generate form fields:

```jsx
import React from 'react';
import { FormFields } from 'mui-rhf-library';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function App() {
     const {
         handleSubmit
         control,
     } = useForm();

  	const fields = [
        {
            fieldType: 'textField', // 'textField' | 'select' | 'autocomplete' | 'checkbox' | 'radioGroup' | 'switch'
            name: 'firstName',
            label: 'firstName',
            control: control,
            props: { fullWidth: true }, // Props of the field
            gridProps: {xs: 12} // Props of the Grid: "xs" | "sm" | "md" | "ld" | "xl"
        }
    ];

	const handleFormSubmit = (data) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormFields fields={fields} control={control} />
            <button type="submit">Submit</button>
        </form>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

# Documentation

#### TextField Controller

Props of Material UI TextField are also available.

| Prop         | Type      | Default | Definition                                                   |
| ------------ | --------- | ------- | ------------------------------------------------------------ |
| name\*       | string    |         | The name of the input                                        |
| control\*    | `Control` |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue | any       |         | The default value of the input that would be injected into React Hook Form Controller and the component |

#### Select Controller

Props of Material UI Select are also available.

| Prop              | Type                                 | Default | Definition                                                   |
| ----------------- | ------------------------------------ | ------- | ------------------------------------------------------------ |
| name\*            | string                               |         | The name of the input                                        |
| control\*         | `Control`                            |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue      | any                                  |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| options           | `{}[]`                               |         | The option items that is available to the component.         |
| optionValue       | string                               | 'value' | Set property of options's value                              |
| optionLabel       | string                               | 'label' | Set property of items’s text label                           |
| onChange          | `(event: SelectChangeEvent) => void` |         | Callback fired when a menu item is selected.                 |
| loading           | boolean                              | false   | Displays linear progress bar                                 |
| customOptionLabel | `(option: any) => string`            |         | Display custom option label                                  |

#### Autocomplete Controller

Props of Material UI Autocomplete are also available.

| Prop              | Type                                 | Default | Definition                                                   |
| ----------------- | ------------------------------------ | ------- | ------------------------------------------------------------ |
| name\*            | string                               |         | The name of the input                                        |
| control\*         | `Control`                            |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue\*    | any                                  |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| options           | `{}[]`                               |         | The option items that is available to the component.         |
| optionValue       | string                               | 'value' | Set property of options's value                              |
| optionLabel       | string                               | 'label' | Set property of items’s text label                           |
| multiple          | boolean                              |         | If `true`, menu will support multiple selections.            |
| onChange          | `(event: SelectChangeEvent) => void` |         | Callback fired when a menu item is selected.                 |
| disableClearable  | boolean                              |         |                                                              |
| textFieldProps    | `TextFieldProps`                     |         | The props that will be passed to TextField component in the `renderInput` of `AutoComplete`. |
| loading           | boolean                              | false   | Displays linear progress bar                                 |
| customOptionLabel | `(option: any) => string`            |         | Display custom option label                                  |

#### RadioGroup Controller

| Prop         | Type             | Default | Definition                                                   |
| ------------ | ---------------- | ------- | ------------------------------------------------------------ |
| name\*       | string           |         | The name of the input                                        |
| label        | string           |         | The label content                                            |
| control\*    | `Control`        |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue | string \| number |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| options      | `Options`        |         | The option items that is available to the component.         |

#### Checkbox Controller

| Prop         | Type                                                 | Default | Definition                                                   |
| ------------ | ---------------------------------------------------- | ------- | ------------------------------------------------------------ |
| name\*       | string                                               |         | The name of the input                                        |
| label\*      | string                                               |         | The label content                                            |
| control\*    | `Control`                                            |         | The React Hook Form object to register components into React Hook Form. |
| onChange     | (event: React.ChangeEvent<HTMLInputElement>) => void |         | A custom method that gets triggered when the value of the checkbox is changed |
| defaultValue | boolean                                              |         | The default value of the input that would be injected into React Hook Form Controller and the component |

#### Switch Controller

| Prop         | Type                                                 | Default | Definition                                                   |
| ------------ | ---------------------------------------------------- | ------- | ------------------------------------------------------------ |
| name\*       | string                                               |         | The name of the input                                        |
| label\*      | string                                               |         | The label content                                            |
| control\*    | `Control`                                            |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue | boolean                                              |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| onChange     | (event: React.ChangeEvent<HTMLInputElement>) => void |         | A custom method that gets triggered when the value of the switch is changed |

#### FormFields

| Prop      | Type                  | Default   | Definition                                                   |
| --------- | --------------------- | --------- | ------------------------------------------------------------ |
| fields\*  | array of `FieldProps` |           | The name of the input                                        |
| control\* |                       | `Control` | The React Hook Form object to register components into React Hook Form. |

## Changelog

Please read the [changelog](https://github.com/dashty94/mui-rhf-library/releases) for details of what has changed.
