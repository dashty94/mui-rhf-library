import { type Grid2Props, type GridProps, type TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers';
import React from 'react';
import { Control } from 'react-hook-form';
import {
    AutocompleteControllerProps,
    AutocompleteProps,
    CheckboxControllerProps,
    CheckboxProps,
    CustomComponentControllerProps,
    DatePickerControllerProps,
    RadioGroupControllerProps,
    RadioGroupProps,
    SelectControllerProps,
    SelectProps,
    SwitchControllerProps,
    SwitchProps,
    TextFieldControllerProps
} from '../fields';

type FieldTextFieldProps = {
    fieldType: 'textField';
    props?: MuiTextFieldProps;
};

type FieldSelectProps = {
    fieldType: 'select';
    props: SelectProps;
};

type FieldAutocompleteProps = {
    fieldType: 'autocomplete';
    textFieldProps?: MuiTextFieldProps;
    props?: AutocompleteProps;
};

type FieldCheckboxProps = {
    fieldType: 'checkbox';
    props?: CheckboxProps;
};

type FieldRadioGroupProps = {
    fieldType: 'radioGroup';
    props: RadioGroupProps;
};

type FieldSwitchProps = {
    fieldType: 'switch';
    props: SwitchProps;
};

type FieldDatePickerFieldProps<T> = DatePickerProps<any> & {
    fieldType: 'datePicker';
    parser: (value: string) => T;
};

type FieldCustomComponentProps = {
    fieldType: 'custom';
    CustomComponent: React.FC<any>;
    props?: any;
};

export type FieldProps<T = any> = {
    hidden?: boolean;
    name: string;
    label?: string;
    gridProps?: GridProps | Grid2Props;
} & (
    | FieldTextFieldProps
    | FieldSelectProps
    | FieldAutocompleteProps
    | FieldCheckboxProps
    | FieldRadioGroupProps
    | FieldSwitchProps
    | FieldDatePickerFieldProps<T>
    | FieldCustomComponentProps
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
