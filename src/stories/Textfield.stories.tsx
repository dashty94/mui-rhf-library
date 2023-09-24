import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TextFieldController } from '../components/InputController/TextFieldController/TextFieldController';
import { useForm } from 'react-hook-form';
import { TextFieldControllerProps } from '../fields';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const schema = object().shape({
    textfield: string().min(10).max(20).required()
});

const Template: StoryFn<TextFieldControllerProps> = (args: TextFieldControllerProps) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <form onSubmit={handleSubmit(() => {})}>
            <TextFieldController {...args} control={control} />
            <button>submit</button>
        </form>
    );
};

export const TextField = Template.bind({});

TextField.args = {
    name: 'textfield',
    defaultValue: '',
    variant: 'outlined',
    label: 'Text Field Controller'
};
