/// <reference types="react" />
import React from 'react';

interface TextFieldControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: string;
    errors: any;
    variant?: 'standard' | 'outlined' | 'filled' | undefined;
    fullWidth?: boolean;
    margin?: 'none' | 'dense' | 'normal' | undefined;
    size?: 'small' | 'medium' | undefined;
}
declare const TextFieldController: React.FC<TextFieldControllerProps>;

declare type Option = {
    value: string;
    label: string;
};
declare type Options = Array<Option>;
interface SelectControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: any;
    options: Options;
    errors: any;
    disabled?: boolean;
    multiple?: boolean;
    variant?: 'standard' | 'outlined' | 'filled' | undefined;
    margin?: 'none' | 'dense' | 'normal' | undefined;
    size?: 'small' | 'medium' | undefined;
    fullWidth?: boolean;
}
declare const SelectController: ({ name, label, options, defaultValue, control, errors, multiple, variant, margin, fullWidth, size }: SelectControllerProps) => JSX.Element;

interface SwitchControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: boolean;
    errors: any;
}
declare const SwitchController: React.FC<SwitchControllerProps>;

interface RadioGroupControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: string | number;
    options: Array<{
        value: string | number;
        label: string;
    }>;
    errors: any;
}
declare const RadioGroupController: React.FC<RadioGroupControllerProps>;

interface CheckboxControllerProps {
    name: string;
    label: string;
    control: any;
    errors: any;
}
declare const CheckboxController: React.FC<CheckboxControllerProps>;

export { CheckboxController, CheckboxControllerProps, RadioGroupController, RadioGroupControllerProps, SelectController, SelectControllerProps, SwitchController, SwitchControllerProps, TextFieldController, TextFieldControllerProps };
