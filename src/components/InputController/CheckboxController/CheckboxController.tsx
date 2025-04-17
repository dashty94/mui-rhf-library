import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';

import { CheckboxControllerProps } from '../../../fields';

export const CheckboxController: React.FC<CheckboxControllerProps> = ({
    control,
    name,
    defaultValue,
    onChange,
    onBlur,
    ...rest
}) => {
    return (
        <Controller
            defaultValue={defaultValue || false}
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <FormControl required error={fieldState?.invalid} component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                label={rest.label}
                                control={
                                    <Checkbox
                                        checked={field.value}
                                        {...field}
                                        {...rest}
                                        onChange={(e, checked) => {
                                            onChange?.(e, checked);
                                            field.onChange(e.target.checked);
                                        }}
                                        onBlur={(...args) => {
                                            onBlur?.(...args);
                                            field.onBlur();
                                        }}
                                    />
                                }
                            />
                        </FormGroup>
                        <FormHelperText>{fieldState?.error?.message || rest.helperText}</FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
};
