import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AutocompleteController } from '../components/InputController/AutocompleteController/AutocompleteController';
import { useForm } from 'react-hook-form';
import { AutocompleteControllerProps } from '../fields';

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
    const {
        control,
        formState: { errors }
    } = useForm();

    return <AutocompleteController {...args} control={control} errors={errors} />;
};

export const Autocomplete = Template.bind({});

Autocomplete.args = {
    name: 'Autocomplete',
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
