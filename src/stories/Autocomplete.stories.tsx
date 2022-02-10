import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AutocompleteController } from '../components/InputController/AutocompleteController/AutocompleteController';
import { useForm } from 'react-hook-form';
import { AutocompleteControllerProps } from '../fields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const meta: Meta = {
    title: 'Autocomplete Controller',
    component: AutocompleteController,
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

const Template: Story<AutocompleteControllerProps> = (args) => {
    const schema = yup.object().shape({
        autocomplete: yup.string().required()
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
            <AutocompleteController {...args} name="autocomplete" control={control} errors={errors} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Autocomplete = Template.bind({});

Autocomplete.args = {
    name: 'autocomplete',
    textFieldProps: {
        label: 'Autocomplete Controller',
        fullWidth: true,
        variant: 'outlined'
    },
    defaultValue: '',
    options: [
        { label: 'Option One', value: 'option-one' },
        { label: 'Option Two', value: 'option-two' }
    ]
};

export const AutocompleteMultiple = Template.bind({});

AutocompleteMultiple.args = {
    name: 'autocompleteMultiple',
    textFieldProps: {
        label: 'Autocomplete Multiple Controller',
        fullWidth: true
    },
    defaultValue: [],
    options: [
        { label: 'Option One', value: 'option-one' },
        { label: 'Option Two', value: 'option-two' }
    ],
    multiple: true
};
