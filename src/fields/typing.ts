import { Control } from 'react-hook-form';
import {
    type TextFieldProps as MuiTextFieldProps,
    type SelectProps as MuiSelectProps,
    type SwitchProps as MuiSwitchProps,
    type FormControlProps as MuiFormControlProps,
    SelectChangeEvent,
    type AutocompleteProps as MuiAutocompleteProps,
    type CheckboxProps as MuiCheckboxProps
} from '@mui/material';
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
export type TextFieldProps = MuiTextFieldProps & {
    type?: React.HTMLInputTypeAttribute | undefined;
};
export type TextFieldControllerProps = Omit<MuiRhfFieldProps, 'helperText'> & TextFieldProps;

// Select
export type SelectProps = MuiSelectProps & {
    defaultValue?: any;
    options: { disabled?: boolean; [key: string]: any }[];
    optionValue?: string;
    optionLabel?: string;
    loading?: boolean;
    customOptionLabel?: (option: any) => any;
};
export type SelectControllerProps = MuiRhfFieldProps & SelectProps;

// Switch
export type SwitchProps = Omit<MuiSwitchProps, 'defaultValue'> & {
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    helperText?: React.ReactNode;
};
export type SwitchControllerProps = MuiRhfFieldProps & SwitchProps;

// RadioGroup
export type RadioGroupProps = MuiFormControlProps & {
    label?: string;
    defaultValue: string | number;
    options: Array<Option>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
    helperText?: React.ReactNode;
};
export type RadioGroupControllerProps = MuiRhfFieldProps & RadioGroupProps;

// Checkbox
export type CheckboxProps = MuiCheckboxProps & {
    label?: string;
    defaultValue?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    helperText?: React.ReactNode;
};
export type CheckboxControllerProps = MuiRhfFieldProps & CheckboxProps;

// Autocomplete
export type AutocompleteProps = Omit<MuiAutocompleteProps<Object, boolean, boolean, boolean, 'div'>, 'renderInput'> & {
    textFieldProps: TextFieldProps; // Props that's only applied to the TextField component
    optionValue?: string;
    optionLabel?: string;
    onChange?: (event: SelectChangeEvent, e: React.SyntheticEvent<Element, Event>) => void;
    customOptionLabel?: (option: any) => any;
};
export type AutocompleteControllerProps = Omit<MuiRhfFieldProps, 'helperText'> & AutocompleteProps;

// CustomComponent
export type CustomComponentControllerProps = MuiRhfFieldProps & {
    CustomComponent: React.FC<any>;
};

// DatePicker
export type DatePickerControllerProps = MuiRhfFieldProps &
    DatePickerProps<any> & {
        parser: (value: any) => any;
    };
