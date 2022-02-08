import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    SelectController,
    SelectControllerProps
} from '../components/InputController/SelectController/SelectController';
import { useForm } from 'react-hook-form';

const meta: Meta = {
    title: 'Select Controller',
    component: SelectController,
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
    const {
        control,
        formState: { errors }
    } = useForm();

    return <SelectController {...args} control={control} errors={errors} />;
};

export const Select = Template.bind({});

Select.args = {
    name: 'select',
    label: 'Select Controller',
    defaultValue: '',
    options: [
        { label: 'Option One', value: 'option-one' },
        { label: 'Option Two', value: 'option-two' }
    ],
    variant: 'outlined'
};

export const SelectMultiple = Template.bind({});

SelectMultiple.args = {
    name: 'selectMultiple',
    label: 'Select Multiple Controller',
    defaultValue: [],
    options: [
        { label: 'Option One', value: 'option-one' },
        { label: 'Option Two', value: 'option-two' }
    ],
    variant: 'outlined',
    multiple: true
};
