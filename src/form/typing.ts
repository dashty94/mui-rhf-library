import { GridProps, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control } from 'react-hook-form';
import {
    AutocompleteControllerProps,
    CheckboxControllerProps,
    RadioGroupControllerProps,
    SelectControllerProps,
    SwitchControllerProps,
    TextFieldControllerProps,
    CustomComponentControllerProps
} from '../fields';

export type FieldProps = {
    fieldType: 'textField' | 'select' | 'autocomplete' | 'checkbox' | 'radioGroup' | 'switch' | string;
    name: string;
    label?: string;
    props?: any;
    gridProps?: Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
    textFieldProps?: TextFieldProps;
};

export interface FormFieldsProps {
    fields: Array<FieldProps>;
    control: Control<any>;
}

export type MuiRhfFieldComponentMap = {
    textField: React.FC<TextFieldControllerProps>;
    select: React.FC<SelectControllerProps>;
    checkbox: React.FC<CheckboxControllerProps>;
    autocomplete: React.FC<AutocompleteControllerProps>;
    radioGroup: React.FC<RadioGroupControllerProps>;
    switch: React.FC<SwitchControllerProps>;
    custom: React.FC<CustomComponentControllerProps>;
};
