import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TextFieldController } from '../components/InputController/TextFieldController/TextFieldController';
import { useForm } from 'react-hook-form';
import { SwitchControllerProps } from '../fields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SwitchController } from '../components/InputController/SwitchController/SwitchController';

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

const Template: Story<SwitchControllerProps> = (args) => {
    const schema = yup.object().shape({
        textfield: yup.boolean().required()
    });

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    console.log({ errors });

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <SwitchController name="textfield" label="textfield" control={control} errors={errors} />

            <button type="submit">Submit</button>
        </form>
    );
};

export const TextField = Template.bind({});
