import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { TextFieldControllerProps } from '../../../fields/index';

export const TextFieldController: React.FC<TextFieldControllerProps> = ({
    name,
    control,
    defaultValue,
    type,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState }) => (
                <TextField
                    fullWidth={rest.fullWidth}
                    error={fieldState?.invalid}
                    helperText={fieldState?.error?.message}
                    type={type}
                    InputLabelProps={
                        type === 'date' || type === 'month'
                            ? {
                                  shrink: true
                              }
                            : {}
                    }
                    {...rest}
                    {...field}
                />
            )}
        />
    );
};
