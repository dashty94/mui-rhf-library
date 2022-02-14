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

const {
    control,
    formState: { errors }
} = useForm();

function App() {
    return (
        <>
            <TextFieldController
                control={control}
                errors={errors}
                name="name"
                defaultValue=""
                label="TextField Controller"
            />
        
        	<SelectController 
                name="select"
                label="Select Controller"
                control={control}
                errors={errors}
                options: [
        			{ label: 'Option One', value: 'option-one' },
        			{ label: 'Option Two', value: 'option-two' }
    			]
                variant="outlined"
            />
        </>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```



# Documentation

#### TextField Controller

Props of Material UI TextField are also available.

| Prop         | Type   | Default | Definition                                                   |
| ------------ | ------ | ------- | ------------------------------------------------------------ |
| name*        | string |         | The name of the input                                        |
| control*     | any    |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue | any    |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| errors*      | any    |         | The React Hook Form object to retrieve errors                |

#### Select Controller

Props of Material UI Select are also available.

| Prop         | Type                                 | Default | Definition                                                   |
| ------------ | ------------------------------------ | ------- | ------------------------------------------------------------ |
| name*        | string                               |         | The name of the input                                        |
| control*     | any                                  |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue | any                                  |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| errors*      | any                                  |         | The React Hook Form object to retrieve errors                |
| options      | `Options`                            |         | The option items that is available to the component.         |
| onChange     | `(event: SelectChangeEvent) => void` |         | Callback fired when a menu item is selected.                 |

#### Autocomplete Controller

Props of Material UI Autocomplete are also available.

| Prop             | Type                                             | Default | Definition                                                   |
| ---------------- | ------------------------------------------------ | ------- | ------------------------------------------------------------ |
| name*            | string                                           |         | The name of the input                                        |
| control*         | any                                              |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue*    | any                                              |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| errors*          | any                                              |         | The React Hook Form object to retrieve errors                |
| options          | `Options`                                        |         | The option items that is available to the component.         |
| multiple         | boolean                                          |         | If `true`,  menu will support multiple selections.           |
| onChange         | `(event: SelectChangeEvent) => void`             |         | Callback fired when a menu item is selected.                 |
| loading          | boolean                                          |         | If `true` the component will be in the loading state.        |
| disableClearable | boolean                                          |         |                                                              |
| textFieldProps | `TextFieldProps` | | The props that will be passed to TextField component in the `renderInput` of `AutoComplete`. |

#### RadioGroup Controller

| Prop         | Type             | Default | Definition                                                   |
| ------------ | ---------------- | ------- | ------------------------------------------------------------ |
| name*        | string           |         | The name of the input                                        |
| label        | string           |         | The label content                                            |
| control*     | any              |         | The React Hook Form object to register components into React Hook Form. |
| defaultValue | string \| number |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| errors*      | any              |         | The React Hook Form object to retrieve errors                |
| options      | `Options`        |         | The option items that is available to the component.         |

#### Checkbox Controller

| Prop         | Type                                                 | Default | Definition                                                   |
| ------------ | ---------------------------------------------------- | ------- | ------------------------------------------------------------ |
| name*        | string                                               |         | The name of the input                                        |
| label*       | string                                               |         | The label content                                            |
| control*     | any                                                  |         | The React Hook Form object to register components into React Hook Form. |
| errors*      | any                                                  |         | The React Hook Form object to retrieve errors                |
| onChange     | (event: React.ChangeEvent<HTMLInputElement>) => void |         | A custom method that gets triggered when the value of the checkbox is changed |
| defaultValue | boolean                                              |         | The default value of the input that would be injected into React Hook Form Controller and the component |

#### Switch Controller

| Prop         | Type                                                 | Default | Definition                                                   |
| ------------ | ---------------------------------------------------- | ------- | ------------------------------------------------------------ |
| name*        | string                                               |         | The name of the input                                        |
| label*       | string                                               |         | The label content                                            |
| control*     | any                                                  |         | The React Hook Form object to register components into React Hook Form. |
| errors*      | any                                                  |         | The React Hook Form object to retrieve errors                |
| defaultValue | boolean                                              |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| onChange     | (event: React.ChangeEvent<HTMLInputElement>) => void |         | A custom method that gets triggered when the value of the switch is changed |

## 

## Changelog

Please read the [changelog](https://github.com/dashty94/mui-rhf-library/releases) for details of what has changed.
