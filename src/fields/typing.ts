import { Control } from 'react-hook-form';
import { TextFieldProps, SelectProps, SelectChangeEvent, AutocompleteProps } from '@mui/material';

// Common input field props
export type MuiRhfFieldProps = {
    control: Control<any>;
    name: string;
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
        type: React.HTMLInputTypeAttribute | undefined;
    };

// Select
export type SelectControllerProps = MuiRhfFieldProps &
    SelectProps & {
        defaultValue?: any;
        options: { disabled?: boolean; [key: string]: any }[];
        onChange?: (event: SelectChangeEvent) => void;
        optionValue?: string;
        optionLabel?: string;
        loading?: boolean;
        customOptionLabel?: (option: any) => any;
    };

// Switch
export type SwitchControllerProps = MuiRhfFieldProps & {
    label: string;
    defaultValue?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// RadioGroup
export type RadioGroupControllerProps = MuiRhfFieldProps & {
    label?: string;
    defaultValue: string | number;
    options: Array<Option>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        options: { [key: string]: any }[];
        multiple?: boolean;

        textFieldProps: TextFieldProps; // Props that's only applied to the TextField component

        loading?: boolean;
        renderOption?: (option: Option | any) => React.ReactNode;
        disableClearable?: boolean;
        // onChange?: (event: SelectChangeEvent) => void;

        optionValue?: string;
        optionLabel?: string;

        onChange?: (event: SelectChangeEvent) => void;
        customOptionLabel?: (option: any) => any;
    };
