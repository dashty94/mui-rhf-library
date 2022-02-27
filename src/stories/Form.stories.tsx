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
            name: 'firstName',
            label: 'firstName',
            fieldType: 'autocomplete',
            props: { options: [] },
            gridProps: { xs: 12 },
            textFieldProps: { label: 'First Name', variant: 'filled', fullWidth: true }
        }
    ];

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container>
                <FormFields fields={fields} control={control} errors={errors} />
            </Grid>

            <button type="submit">Submit</button>
        </form>
    );
};

export const Form = Template.bind({});
