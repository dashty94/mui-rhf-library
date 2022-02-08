import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    TextFieldController,
    TextFieldControllerProps
} from '../components/InputController/TextFieldController/TextFieldController';
import { useForm } from 'react-hook-form';

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
    const {
        control,
        formState: { errors }
    } = useForm();

    return <TextFieldController {...args} control={control} errors={errors} />;
};

export const TextField = Template.bind({});

TextField.args = {
    name: 'textfield',
    defaultValue: '',
    variant: 'outlined',
    label: 'Text Field Controller'
};
