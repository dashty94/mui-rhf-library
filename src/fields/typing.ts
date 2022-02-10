import { Control } from 'react-hook-form';
import { TextFieldProps, SelectProps, SelectChangeEvent, AutocompleteProps } from '@mui/material';

// Common input field props
export type MuiRhfFieldProps = {
    control: Control;
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
    defaultValue: boolean;
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
};

// Autocomplete
export type AutocompleteControllerProps = MuiRhfFieldProps &
    AutocompleteProps<Object, boolean, boolean, boolean> & {
        defaultValue: any;
        options: Array<Option>;
        disabled?: boolean;
        multiple?: boolean;

        textFieldProps: TextFieldProps;

        loading?: boolean;
        renderOption?: (option: Option | any) => React.ReactNode;
        disableClearable?: boolean;
        // onChange?: (event: SelectChangeEvent) => void;
        size?: 'small' | 'medium' | undefined;
        noOptionsText?: string;
    };
