import React from 'react';
import { Control } from 'react-hook-form';
import { TextFieldController } from '../InputController/TextFieldController/TextFieldController';
import { SelectController } from '../InputController/SelectController/SelectController';
import { AutocompleteController } from '../InputController/AutocompleteController/AutocompleteController';
import { CheckboxController } from '../InputController/CheckboxController/CheckboxController';
import { RadioGroupController } from '../InputController/RadioGroupController/RadioGroupController';
import { SwitchController } from '../InputController/SwitchController/SwitchController';

type Field = {
    fieldType: 'textField' | 'select' | 'autocomplete' | 'checkbox' | 'radioGroup' | 'switch' | string;
    name: string;
    label?: string;
    props?: any;
};

export interface FormFieldsProps {
    fields: Array<Field>;
    control: Control;
    errors: any;
}

export const FormFields: React.FC<FormFieldsProps> = ({ fields, control, errors }) => {
    return (
        <>
            {fields.map((field, index) => {
                if (field.fieldType === 'textField') {
                    return (
                        <TextFieldController
                            key={index}
                            {...field.props}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    );
                } else if (field.fieldType === 'select') {
                    return (
                        <SelectController
                            key={index}
                            {...field.props}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    );
                } else if (field.fieldType === 'checkbox') {
                    return (
                        <CheckboxController
                            key={index}
                            {...field.props}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    );
                } else if (field.fieldType === 'switch') {
                    return (
                        <SwitchController
                            key={index}
                            {...field.props}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    );
                } else if (field.fieldType === 'radioGroup') {
                    return (
                        <RadioGroupController
                            key={index}
                            {...field.props}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    );
                } else if (field.fieldType === 'autocomplete') {
                    return (
                        <AutocompleteController
                            key={index}
                            {...field.props}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    );
                } else
                    return (
                        <TextFieldController
                            key={index}
                            {...field.props}
                            name={field.name}
                            label={field.label}
                            control={control}
                            errors={errors}
                        />
                    );
            })}
        </>
    );
};
