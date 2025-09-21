import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { date, object } from 'yup';
import DatePickerController from '../components/InputController/DatePickerController/DatePickerController';
import { DatePickerControllerProps } from '../fields';

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
    const { control, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const handleOnChange = (value: any) => {
        console.log({
            watch: watch('datePicker'),
            onChange: value
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <DatePickerController {...args} onChange={handleOnChange} control={control} />
                <button>submit</button>
            </form>
        </LocalizationProvider>
    );
};

export const DatePicker = Template.bind({});

DatePicker.args = {
    name: 'datePicker',
    label: 'Date Picker Controller',
    format: 'YYYY-MM-DD',
    parser: (date) => moment(date)
};
