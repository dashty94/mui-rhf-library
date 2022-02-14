import { Control } from 'react-hook-form';
import { TextFieldProps, SelectProps, SelectChangeEvent, AutocompleteProps } from '@mui/material';

// Common input field props
export type MuiRhfFieldProps = {
    control: Control<any>;
    name: string;
    errors: any;
};

// Option
export type Option = {
    value: string;
    label: string;
};

// TextField
export type TextFieldControllerProps = MuiRhfFieldProps &
    TextFieldProps & {
        defaultValue?: any;
    };

// Select
export type SelectControllerProps = MuiRhfFieldProps &
    SelectProps & {
        defaultValue?: any;
        options: Array<Option>;
        onChange?: (event: SelectChangeEvent) => void;
    };

// Switch
export type SwitchControllerProps = MuiRhfFieldProps & {
    label: string;
    defaultValue?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// RadioGroup
export type RadioGroupControllerProps = MuiRhfFieldProps & {
    label: string;
    defaultValue: string | number;
    options: Array<Option>;
};

// Checkbox
export type CheckboxControllerProps = MuiRhfFieldProps & {
    label: string;
    defaultValue?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Autocomplete
export type AutocompleteControllerProps = MuiRhfFieldProps &
    AutocompleteProps<Object, boolean, boolean, boolean> & {
        defaultValue: any;
        options: Array<Option>;
        multiple?: boolean;

        textFieldProps: TextFieldProps; // Props that's only applied to the TextField component

        loading?: boolean;
        renderOption?: (option: Option | any) => React.ReactNode;
        disableClearable?: boolean;
        // onChange?: (event: SelectChangeEvent) => void;
    };
