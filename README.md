<!-- markdownlint-disable-next-line -->

<h1 align="center">mui-rhf-library</h1>

<div align="center">
A set of configured Material UI form inputs configured with React Hook Form.
</div>

## Installation

mui-rhf-library is available as an [npm package](https://www.npmjs.com/package/mui-rhf-library).

```sh
// with npm
npm install mui-rhf-library

// with yarn
yarn add mui-rhf-library
```

## Demo

Check the storybook of the library: https://6256bd53e0b94a003aad40bd-cnmtmxtjgl.chromatic.com/

## Usage

Here is a quick example to get you started:

### Controllers

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { TextFieldController, SelectController } from 'mui-rhf-library';
import { useForm } from 'react-hook-form';

function App() {
    const { control } = useForm();

    return (
        <>
            <TextFieldController control={control} name="name" defaultValue="" label="TextField Controller" />

            <SelectController
                name="select"
                label="Select Controller"
                control={control}
                options={[
                    { label: 'Option One', value: 'option-one', example: { name: 'example-one' } },
                    { label: 'Option Two', value: 'option-two', example: { name: 'example-two' } }
                ]}
                optionValue="example.name"
                optionLabel="example.name"
                variant="outlined"
            />
        </>
    );
}

const container = document.querySelector('#app');
const root = createRoot(container);
root.render(<App />);
```

### Generate form fields

You can generate form fields using the `FormFields` component.

By default, the component renders form fields using Grid2, but if you decide to use Grid instead, set the `shouldUseDeprecatedGrid` prop to true.

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormFields } from 'mui-rhf-library';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import * as yup from 'yup';

function App() {
     const {
         handleSubmit
         control,
     } = useForm();

  	const fields = [
        {
            fieldType: 'textField', // 'textField' | 'select' | 'autocomplete' | 'checkbox' | 'radioGroup' | 'switch' | 'datePicker' |'custom'
            name: 'firstName',
            label: 'firstName',
            props: { fullWidth: true }, // Props of the field
            gridProps: { size: { xs: 6 } } // Props of the Grid (Container of the input field)
        }
    ];

	const handleFormSubmit = (data) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid2>
                <FormFields fields={fields} control={control} />
            </Grid2>
            <button type="submit">Submit</button>
        </form>
    );
}

const container = document.querySelector('#app');
const root = createRoot(container);
root.render(<App />);
```

# Documentation

### Form Generation

#### Form Fields

| Prop                    | Type      | Default | Definition                                                              |
| ----------------------- | --------- | ------- | ----------------------------------------------------------------------- |
| fields                  | `Field[]` |         | The fields to be generated                                              |
| control                 | `Control` |         | The React Hook Form object to register components into React Hook Form. |
| shouldUseDeprecatedGrid | boolean   | false   | The component should use Grid2 instead of Grid.                         |

**Field[]**: Array of fields to be generated, where each field is an object with the following properties:

-   `name`: The name of the field.
-   `label`: The label of the field.
-   `fieldType`: The type of the field (`textField`, `select`, `autocomplete`, `checkbox`, `radioGroup`, `switch`, `datePicker`, or `custom`).
-   `gridProps`: Props of the Grid (Container of the input field), for the available props, please check [Grid2](https://mui.com/material-ui/api/grid2/) or [Grid](https://mui.com/material-ui/api/grid/) (if you want to use deprecated Grid).
-   `props`: Props of the field, for the available props, checkout related [documentation](https://mui.com/material-ui/all-components/) depends on the `fieldType`.
-   `hidden`: If the field should be hidden.

### Controllers

#### TextField Controller

Props of Material UI TextField are also available.

| Prop         | Type      | Default | Definition                                                                                              |
| ------------ | --------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name\*       | string    |         | The name of the input                                                                                   |
| control\*    | `Control` |         | The React Hook Form object to register components into React Hook Form.                                 |
| defaultValue | any       |         | The default value of the input that would be injected into React Hook Form Controller and the component |

#### Select Controller

Props of Material UI Select are also available.

| Prop              | Type                                        | Default | Definition                                                                                              |
| ----------------- | ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name\*            | string                                      |         | The name of the input                                                                                   |
| control\*         | `Control`                                   |         | The React Hook Form object to register components into React Hook Form.                                 |
| defaultValue      | any                                         |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| options           | `{disabled?: boolean, [key:string]: any}[]` |         | The option items that is available to the component.                                                    |
| optionValue       | string                                      | 'value' | Set property of options's value                                                                         |
| optionLabel       | string                                      | 'label' | Set property of items’s text label                                                                      |
| onChange          | `(event: SelectChangeEvent) => void`        |         | Callback fired when a menu item is selected.                                                            |
| loading           | boolean                                     | false   | Displays linear progress bar                                                                            |
| customOptionLabel | `(option: any) => any`                      |         | Display custom option label                                                                             |
| helperText        | `ReactNode`                                 |         | Form helper text                                                                                        |

#### Autocomplete Controller

Props of Material UI Autocomplete are also available.

| Prop                    | Type                                 | Default | Definition                                                                                              |
| ----------------------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------- |
| name\*                  | string                               |         | The name of the input                                                                                   |
| control\*               | `Control`                            |         | The React Hook Form object to register components into React Hook Form.                                 |
| defaultValue\*          | any                                  |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| options                 | `{}[]`                               |         | The option items that is available to the component.                                                    |
| optionValue             | string                               | 'value' | Set property of options's value                                                                         |
| optionLabel             | string                               | 'label' | Set property of items’s text label                                                                      |
| multiple                | boolean                              |         | If `true`, menu will support multiple selections.                                                       |
| onChange                | `(event: SelectChangeEvent) => void` |         | Callback fired when a menu item is selected.                                                            |
| disableClearable        | boolean                              |         |                                                                                                         |
| textFieldProps          | `TextFieldProps`                     |         | The props that will be passed to TextField component in the `renderInput` of `AutoComplete`.            |
| loading                 | boolean                              | false   | Displays linear progress bar                                                                            |
| customOptionLabel       | `(option: any) => any`               |         | Display custom option label                                                                             |
| virtualizationThreshold | number                               | 100     | The limit of options to render before enabling virtualization.                                          |
| virtualizationProps     | `VirtualListBoxProps`                |         | The props that will be passed to `VirtualListBox` component, which is built on top of `react-window`.   |

#### RadioGroup Controller

| Prop         | Type                                                 | Default | Definition                                                                                              |
| ------------ | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name\*       | string                                               |         | The name of the input                                                                                   |
| label        | string                                               |         | The label content                                                                                       |
| control\*    | `Control`                                            |         | The React Hook Form object to register components into React Hook Form.                                 |
| defaultValue | string \| number                                     |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| options      | `Options`                                            |         | The option items that is available to the component.                                                    |
| onChange     | (event: React.ChangeEvent<HTMLInputElement>) => void |         | A custom method that gets triggered when the value of the input is changed                              |

#### Checkbox Controller

| Prop         | Type                                                 | Default | Definition                                                                                              |
| ------------ | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name\*       | string                                               |         | The name of the input                                                                                   |
| label\*      | string                                               |         | The label content                                                                                       |
| control\*    | `Control`                                            |         | The React Hook Form object to register components into React Hook Form.                                 |
| onChange     | (event: React.ChangeEvent<HTMLInputElement>) => void |         | A custom method that gets triggered when the value of the checkbox is changed                           |
| defaultValue | boolean                                              |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| helperText   | `ReactNode`                                          |         | Form helper text                                                                                        |

#### Switch Controller

| Prop         | Type                                                 | Default | Definition                                                                                              |
| ------------ | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name\*       | string                                               |         | The name of the input                                                                                   |
| label\*      | string                                               |         | The label content                                                                                       |
| control\*    | `Control`                                            |         | The React Hook Form object to register components into React Hook Form.                                 |
| defaultValue | boolean                                              |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| onChange     | (event: React.ChangeEvent<HTMLInputElement>) => void |         | A custom method that gets triggered when the value of the switch is changed                             |
| helperText   | `ReactNode`                                          |         | Form helper text                                                                                        |

#### DatePicker Controller

| Prop         | Type                                                                               | Default | Definition                                                                                              |
| ------------ | ---------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| name\*       | string                                                                             |         | The name of the input                                                                                   |
| label\*      | string                                                                             |         | The label content                                                                                       |
| control\*    | `Control`                                                                          |         | The React Hook Form object to register components into React Hook Form.                                 |
| defaultValue |                                                                                    |         | The default value of the input that would be injected into React Hook Form Controller and the component |
| onChange     | `((value: any, context: PickerChangeHandlerContext<DateValidationError>) => void)` |         | A custom method that gets triggered when the value changes                                              |
| helperText   | `ReactNode`                                                                        |         | Form helper text                                                                                        |

#### Custom Controller

| Prop            | Type          | Default | Definition                                                              |
| --------------- | ------------- | ------- | ----------------------------------------------------------------------- |
| name\*          | string        |         | The name of the input                                                   |
| control\*       | `Control`     |         | The React Hook Form object to register components into React Hook Form. |
| CustomComponent | React.FC<any> |         | A custom component that will be rendered.                               |

#### FormFields

| Prop      | Type                  | Default   | Definition                                                              |
| --------- | --------------------- | --------- | ----------------------------------------------------------------------- |
| fields\*  | array of `FieldProps` |           | The name of the input                                                   |
| control\* |                       | `Control` | The React Hook Form object to register components into React Hook Form. |

## Changelog

Please read the [changelog](https://github.com/dashty94/mui-rhf-library/releases) for details of what has changed.
