import { type Grid2Props, type GridProps, TextFieldProps } from '@mui/material';
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

type DatePickerFieldProps<T> = DatePickerProps<any> & {
    fieldType: 'datePicker';
    parser: (value: string) => T;
    hidden?: boolean;
};

export type FieldProps<T = any> =
    | (DatePickerFieldProps<T> & {
          name: string;
          label?: string;
          props?: any;
          gridProps?: GridProps | Grid2Props;
          textFieldProps?: TextFieldProps;
          CustomComponent?: React.FC<any>;
      })
    | {
          hidden?: boolean;
          fieldType: 'textField' | 'select' | 'autocomplete' | 'checkbox' | 'radioGroup' | 'switch' | 'custom';
          name: string;
          label?: string;
          props?: any;
          gridProps?: GridProps | Grid2Props;
          textFieldProps?: TextFieldProps;
          CustomComponent?: React.FC<any>;
      };

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
