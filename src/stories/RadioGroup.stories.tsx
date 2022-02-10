import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RadioGroupController } from '../components/InputController/RadioGroupController/RadioGroupController';
import { useForm } from 'react-hook-form';
import { RadioGroupControllerProps } from '../fields';

const meta: Meta = {
    title: 'RadioGroup Controller',
    component: RadioGroupController,
    argTypes: {
        children: {
            control: {
                type: 'text'
            }
        }
    },
    parameters: {
        controls: { expanded: true }
    }
};

export default meta;

const Template: Story<RadioGroupControllerProps> = (args) => {
    const {
        control,
        formState: { errors }
    } = useForm();

    return <RadioGroupController {...args} control={control} errors={errors} />;
};

export const FormGroup = Template.bind({});

FormGroup.args = {
    name: 'formGroup',
    defaultValue: '',
    label: 'RadioGroup Controller',
    options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
    ]
};
