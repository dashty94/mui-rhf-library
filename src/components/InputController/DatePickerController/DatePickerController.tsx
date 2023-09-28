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
            render={({ field: { ref, value, ...restField }, fieldState: { invalid, error } }) => (
                <DatePicker
                    {...restField}
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
                    value={value ? parser(value) : undefined}
                />
            )}
        />
    );
};

export default DatePickerController;
