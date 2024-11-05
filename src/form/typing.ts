import { type Grid2Props, type GridProps, type TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers';
import React from 'react';
import { Control } from 'react-hook-form';
import {
    AutocompleteControllerProps,
    CheckboxControllerProps,
    CustomComponentControllerProps,
    DatePickerControllerProps,
    RadioGroupControllerProps,
    SelectControllerProps,
    SwitchControllerProps,
    TextFieldControllerProps
} from '../fields';

type Option = {
    value: string;
    label: string;
    [key: string]: any;
};

type TextFieldProps = {
    fieldType: 'textField';
};

type SelectProps = {
    fieldType: 'select';
    options: Option[];
    textFieldProps?: MuiTextFieldProps;
};

type AutocompleteProps = {
    fieldType: 'autocomplete';
    options: Option[];
    textFieldProps?: MuiTextFieldProps;
    multiple?: boolean;
    disableClearable?: boolean;
    optionValue?: string;
    optionLabel?: string;
};

type CheckboxProps = {
    fieldType: 'checkbox';
};

type RadioGroupProps = {
    fieldType: 'radioGroup';
    options: Option[];
};

type SwitchProps = {
    fieldType: 'switch';
};

type DatePickerFieldProps<T> = DatePickerProps<any> & {
    fieldType: 'datePicker';
    parser: (value: string) => T;
};

type CustomComponentProps = {
    fieldType: 'custom';
    CustomComponent: React.FC<any>;
};

export type FieldProps<T = any> = {
    hidden?: boolean;
    name: string;
    label?: string;
    props?: any;
    gridProps?: GridProps | Grid2Props;
} & (
    | TextFieldProps
    | SelectProps
    | AutocompleteProps
    | CheckboxProps
    | RadioGroupProps
    | SwitchProps
    | DatePickerFieldProps<T>
    | CustomComponentProps
);

export interface FormFieldsProps {
    fields: FieldProps[];
    control: Control<any>;
    shouldUseDeprecatedGrid?: boolean;
}

export type MuiRhfFieldComponentMap = {
    textField: React.FC<TextFieldControllerProps>;
    select: React.FC<SelectControllerProps>;
    checkbox: React.FC<CheckboxControllerProps>;
    autocomplete: React.FC<AutocompleteControllerProps>;
    radioGroup: React.FC<RadioGroupControllerProps>;
    switch: React.FC<SwitchControllerProps>;
    datePicker: React.FC<DatePickerControllerProps>;
    custom: React.FC<CustomComponentControllerProps>;
};
