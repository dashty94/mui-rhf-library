import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    AutocompleteController,
    AutocompleteControllerProps
} from '../components/InputController/AutocompleteController/AutocompleteController';
import { useForm } from 'react-hook-form';

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
    label: 'Autocomplete Controller',
    defaultValue: '',
    options: [
        { label: 'Option One', value: 'option-one' },
        { label: 'Option Two', value: 'option-two' }
    ],
    variant: 'outlined'
};

export const SelectMultiple = Template.bind({});

SelectMultiple.args = {
    name: 'autocompleteMultiple',
    label: 'Autocomplete Multiple Controller',
    defaultValue: [],
    options: [
        { label: 'Option One', value: 'option-one' },
        { label: 'Option Two', value: 'option-two' }
    ],
    variant: 'outlined',
    multiple: true
};
