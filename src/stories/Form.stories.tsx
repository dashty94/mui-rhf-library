import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TextFieldController } from '../components/InputController/TextFieldController/TextFieldController';
import { useForm } from 'react-hook-form';
import { SelectControllerProps, TextFieldControllerProps } from '../fields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectController } from '../components/InputController/SelectController/SelectController';

const meta: Meta = {
    title: 'Form',
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

const Template: Story<SelectControllerProps> = (args) => {
    const schema = yup.object().shape({
        textfield: yup.string().required()
    });

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* <TextFieldController {...args} control={control} errors={errors} /> */}

            <SelectController {...args} control={control} errors={errors} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const TextField = Template.bind({});

TextField.args = {
    name: 'textfield',
    defaultValue: '',
    variant: 'outlined',
    label: 'Text Field Controller',
    options: [
        { label: 'Option One', value: 'option-one' },
        { label: 'Option Two', value: 'option-two' }
    ],
    fullWidth: true
};
