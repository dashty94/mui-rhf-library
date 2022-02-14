import React from 'react';
import { Controller } from 'react-hook-form';
// material ui
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';

import { CheckboxControllerProps } from '../../../fields';

export const CheckboxController: React.FC<CheckboxControllerProps> = ({
    control,
    name,
    label,
    defaultValue = false,
    errors,
    onChange,
    ...rest
}) => {
    return (
        <FormControl required error={errors.hasOwnProperty(name)} component="fieldset">
            <FormGroup>
                <FormControlLabel
                    label={label}
                    control={
                        <Controller
                            defaultValue={defaultValue}
                            name={name}
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Checkbox
                                        checked={field.value}
                                        {...field}
                                        {...rest}
                                        onChange={(e) => {
                                            onChange && onChange(e);
                                            field.onChange(e.target.checked);
                                        }}
                                    />
                                );
                            }}
                        />
                    }
                />
            </FormGroup>
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
};
