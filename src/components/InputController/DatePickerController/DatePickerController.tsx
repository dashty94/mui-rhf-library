import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePickerControllerProps } from '../../../fields';
import { DatePicker } from '@mui/x-date-pickers';

export const DatePickerController: React.FC<DatePickerControllerProps> = ({ name, control, parser, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={rest?.defaultValue || ''}
            render={({ field: { onChange, ref, value, ...restField }, fieldState: { invalid, error } }) => (
                <DatePicker
                    {...restField}
                    onChange={onChange}
                    label={rest?.label}
                    inputRef={ref}
                    slotProps={{
                        textField: {
                            error: invalid,
                            helperText: error?.message,
                            fullWidth: true
                        }
                    }}
                    {...rest}
                    value={value ? parser(value) : parser('')}
                />
            )}
        />
    );
};

export default DatePickerController;
