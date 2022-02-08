import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export interface TextFieldControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: string;
    errors: any;
    variant?: 'standard' | 'outlined' | 'filled' | undefined;
    fullWidth?: boolean;
    margin?: 'none' | 'dense' | 'normal' | undefined;
    size?: 'small' | 'medium' | undefined;
}

export const TextFieldController: React.FC<TextFieldControllerProps> = ({
    name,
    control,
    label,
    defaultValue,
    errors,
    fullWidth = true,
    variant = 'outlined',
    margin = 'dense',
    size
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field }) => (
                <TextField
                    fullWidth={fullWidth}
                    variant={variant}
                    label={label}
                    error={Object.prototype.hasOwnProperty.call(errors, name) ? true : false}
                    helperText={errors[name]?.message}
                    margin={margin}
                    size={size}
                    {...field}
                />
            )}
        />
    );
};
