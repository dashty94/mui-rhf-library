import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TextFieldController } from '../components/InputController/TextFieldController/TextFieldController';
import { useForm } from 'react-hook-form';
import { CheckboxControllerProps } from '../fields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CheckboxController } from '../components/InputController/CheckboxController/CheckboxController';

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

const Template: Story<CheckboxControllerProps> = (args) => {
    const schema = yup.object().shape({
        textfield: yup.string()
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

            <CheckboxController name="test2" label="test2" control={control} errors={errors} defaultValue={true} />
            <CheckboxController name="test" label="test" control={control} errors={errors} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const TextField = Template.bind({});
