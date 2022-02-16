import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormFields, FormFieldsProps } from '../components/form/FormFields';

const meta: Meta = {
    title: 'Form',
    component: FormFields,
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

const Template: Story<FormFieldsProps> = (args) => {
    const schema = yup.object().shape({
        firstName: yup.string().required()
    });

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const fields = [
        {
            fieldType: 'select',
            name: 'firstName',
            label: 'firstName',
            control: control,
            errors: errors,
            props: { fullWidth: true }
        }
    ];

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormFields fields={fields} control={control} errors={errors} />

            <button type="submit">Submit</button>
        </form>
    );
};

export const Form = Template.bind({});
