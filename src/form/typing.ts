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
    DatePickerControllerProps,
    CustomComponentControllerProps
} from '../fields';

type DatePickerFieldProps<T> = {
    fieldType: 'datePicker';
    parser: (value: string) => T;
};

export type FieldProps<T = any> =
    | (DatePickerFieldProps<T> & {
          name: string;
          label?: string;
          props?: any;
          gridProps?: Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
          textFieldProps?: TextFieldProps;
          CustomComponent?: React.FC<any>;
      })
    | {
          fieldType: 'textField' | 'select' | 'autocomplete' | 'checkbox' | 'radioGroup' | 'switch' | 'custom';
          name: string;
          label?: string;
          props?: any;
          gridProps?: Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
          textFieldProps?: TextFieldProps;
          CustomComponent?: React.FC<any>;
      };

export interface FormFieldsProps {
    fields: FieldProps[];
    control: Control<any>;
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
