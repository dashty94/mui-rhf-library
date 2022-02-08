import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    CheckboxController,
    CheckboxControllerProps
} from '../components/InputController/CheckboxController/CheckboxController';
import { useForm } from 'react-hook-form';

const meta: Meta = {
    title: 'Checkbox Controller',
    component: CheckboxController,
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

const Template: Story<CheckboxControllerProps> = (args) => {
    const {
        control,
        formState: { errors }
    } = useForm();

    return <CheckboxController {...args} control={control} errors={errors} />;
};

export const Checkbox = Template.bind({});

Checkbox.args = {
    name: 'checkbox',
    label: 'Checkbox Controller'
};
