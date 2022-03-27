import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TextFieldController } from '../components/InputController/TextFieldController/TextFieldController';
import { useForm } from 'react-hook-form';
import { TextFieldControllerProps } from '../fields';

const meta: Meta = {
    title: 'TextField Controller',
    component: TextFieldController,
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

const Template: Story<TextFieldControllerProps> = (args) => {
    const { control } = useForm();

    return <TextFieldController {...args} control={control} />;
};

export const TextField = Template.bind({});

TextField.args = {
    name: 'textfield',
    defaultValue: '',
    variant: 'outlined',
    label: 'Text Field Controller'
};
