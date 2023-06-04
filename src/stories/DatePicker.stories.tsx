import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { DatePickerControllerProps } from '../fields';
import DatePickerController from '../components/InputController/DatePickerController/DatePickerController';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const meta: Meta = {
    title: 'DatePicker Controller',
    component: DatePickerController,
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

const Template: Story<DatePickerControllerProps> = (args) => {
    const { control } = useForm();

    return (
        <LocalizationProvider dateAdapter={AdapterMoment as any}>
            <DatePickerController {...args} control={control} />
        </LocalizationProvider>
    );
};

export const DatePicker = Template.bind({});

DatePicker.args = {
    name: 'datePicker',
    defaultValue: '',
    label: 'Text Field Controller'
};
