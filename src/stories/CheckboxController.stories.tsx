import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CheckboxController } from '../components/InputController/CheckboxController/CheckboxController';
import { useForm } from 'react-hook-form';
import { CheckboxControllerProps } from '../fields';

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

const Template: StoryFn<CheckboxControllerProps> = (args) => {
    const { control } = useForm();

    return <CheckboxController {...args} control={control} />;
};

export const Checkbox = Template.bind({});

Checkbox.args = {
    name: 'checkbox',
    label: 'Checkbox Controller'
};
