import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePickerControllerProps } from '../../../fields';

export const DatePickerController: React.FC<DatePickerControllerProps> = ({
    name,
    control,
    parser,
    onChange,
    ...rest
}) => {
    const { defaultValue, ...restProps } = rest;
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({
                field: { ref, value, onChange: controllerOnChange, ...restField },
                fieldState: { invalid, error }
            }) => {
                return (
                    <DatePicker
                        {...restField}
                        label={rest?.label}
                        inputRef={ref}
                        slotProps={{
                            textField: {
                                error: invalid,
                                helperText: error?.message || rest.helperText,
                                fullWidth: true
                            }
                        }}
                        {...restProps}
                        onChange={(...args) => {
                            controllerOnChange?.(...args);
                            onChange?.(...args);
                        }}
                        value={value ? parser(value) : null}
                    />
                );
            }}
        />
    );
};

export default DatePickerController;
