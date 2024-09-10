import { Control } from 'react-hook-form';
import { TextFieldProps, SelectProps, SelectChangeEvent, AutocompleteProps } from '@mui/material';
import React from 'react';
import { DatePickerProps } from '@mui/x-date-pickers';

// Common input field props
export type MuiRhfFieldProps = {
    control: Control<any>;
    name: string;
    helperText?: React.ReactNode;
};

// Option
export type Option = {
    value: string;
    label: string;
};

// TextField
export type TextFieldControllerProps = Omit<MuiRhfFieldProps, 'helperText'> &
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
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
};

// RadioGroup
export type RadioGroupControllerProps = MuiRhfFieldProps & {
    label?: string;
    defaultValue: string | number;
    options: Array<Option>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
};

// Checkbox
export type CheckboxControllerProps = MuiRhfFieldProps & {
    label: string;
    defaultValue?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
};

// Autocomplete
export type AutocompleteControllerProps = Omit<MuiRhfFieldProps, 'helperText'> &
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

        onChange?: (event: SelectChangeEvent, e: React.SyntheticEvent<Element, Event>) => void;
        customOptionLabel?: (option: any) => any;
    };

export type CustomComponentControllerProps = MuiRhfFieldProps & {
    CustomComponent: React.FC<any>;
};

// DatePicker
export type DatePickerControllerProps = MuiRhfFieldProps &
    DatePickerProps<any> & {
        parser: (value: any) => any;
    };
