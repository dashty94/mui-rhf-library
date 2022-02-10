import React from 'react';
import { Controller } from 'react-hook-form';
// material ui
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';

import { CheckboxControllerProps } from '../../../fields';

export const CheckboxController: React.FC<CheckboxControllerProps> = ({ control, name, label, errors }) => {
    return (
        <FormControl required error={errors.hasOwnProperty(name)} component="fieldset">
            <FormGroup>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        return <FormControlLabel control={<Checkbox {...field} />} label={label} />;
                    }}
                />
            </FormGroup>
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
};
