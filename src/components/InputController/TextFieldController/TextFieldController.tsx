import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material';

export type TextFieldControllerProps = TextFieldProps & {
    name: string;
    control: any;
    errors: any;
    defaultValue?: any;
};

export const TextFieldController: React.FC<TextFieldControllerProps> = ({
    name,
    control,
    errors,
    defaultValue,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field }) => (
                <TextField
                    fullWidth={rest.fullWidth}
                    error={Object.prototype.hasOwnProperty.call(errors, name) ? true : false}
                    helperText={errors[name]?.message}
                    {...rest}
                    {...field}
                />
            )}
        />
    );
};
