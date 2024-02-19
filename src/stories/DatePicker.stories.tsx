import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { DatePickerControllerProps } from '../fields';
import DatePickerController from '../components/InputController/DatePickerController/DatePickerController';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { date, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

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

const schema = object().shape({
    datePicker: date()
        .nullable()
        .transform((v) => (v instanceof Date && !isNaN(v as any) ? v : null))
});

const Template: StoryFn<DatePickerControllerProps> = (args) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <DatePickerController {...args} control={control} />
                <button>submit</button>
            </form>
        </LocalizationProvider>
    );
};

export const DatePicker = Template.bind({});

DatePicker.args = {
    name: 'datePicker',
    label: 'Text Field Controller',
    format: 'YYYY-MM-DD',
    parser: (date) => moment(date)
};
