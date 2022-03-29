import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormFields } from '../components/form/FormFields';
import { FormFieldsProps } from '../form/typing';
import { Grid } from '@mui/material';

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
        multiple: yup.array().min(1).of(yup.string().required()),
        single: yup.string().required(),
        checkbox: yup.string().required(),
        name: yup.object().shape({
            ckb: yup.string().required()
        })
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const fields = [
        {
            name: 'multiple',
            label: 'multiple',
            fieldType: 'autocomplete',
            props: {
                defaultValue: [],
                options: [
                    { label: 'one', value: 'one' },
                    { label: 'two', value: 'two' }
                ],
                multiple: true,
                loading: false
            },
            gridProps: { xs: 12 },
            textFieldProps: { label: 'First Name', fullWidth: true }
        },
        {
            name: 'single',
            label: 'single',
            fieldType: 'select',
            props: {
                options: [
                    { label: 'one', value: 'one' },
                    { label: 'two', value: 'two' }
                ],
                fullWidth: true,
                loading: false
            },
            gridProps: { xs: 12 }
        },
        {
            name: 'name.ckb',
            label: 'name',
            props: {
                fullWidth: true
            },
            fieldType: 'textField',
            gridProps: { xs: 12 }
        },
        {
            name: 'checkbox',
            label: 'checkbox',
            fieldType: 'checkbox',
            gridProps: { xs: 12 }
        },
        {
            name: 'switch',
            label: 'switch',
            fieldType: 'switch',
            gridProps: { xs: 12 }
        }
    ];

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2}>
                <FormFields fields={fields} control={control} />
            </Grid>

            <button type="submit">Submit</button>
        </form>
    );
};

export const Form = Template.bind({});
