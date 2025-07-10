import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { TextFieldControllerProps } from '../../../fields/index';

export const TextFieldController: React.FC<TextFieldControllerProps> = ({
    name,
    control,
    defaultValue,
    type = 'text',
    onChange,
    onBlur,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field: { ref, ...restField }, fieldState }) => {
                return (
                    <TextField
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
                        inputRef={ref}
                        {...restField}
                        onChange={(...args) => {
                            restField?.onChange?.(...args);
                            onChange?.(...args);
                        }}
                        onBlur={(...args) => {
                            restField?.onBlur?.();
                            onBlur?.(...args);
                        }}
                        disabled={restField.disabled ?? rest.disabled}
                    />
                );
            }}
        />
    );
};
