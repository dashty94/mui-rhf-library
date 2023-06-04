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
            render={({ field, fieldState }) => (
                <DatePicker
                    {...field}
                    label={rest?.label}
                    slotProps={{
                        textField: {
                            error: fieldState?.invalid,
                            helperText: fieldState?.error?.message,
                            fullWidth: true
                        }
                    }}
                    {...rest}
                    {...field}
                    value={field.value ? parser(field.value) : ''}
                />
            )}
        />
    );
};

export default DatePickerController;
