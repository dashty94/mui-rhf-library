import React from 'react';
import { Controller } from 'react-hook-form';

// material ui
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { RadioGroupControllerProps } from '../../../fields';

export const RadioGroupController: React.FC<RadioGroupControllerProps> = ({
    name,
    label,
    defaultValue,
    errors,
    control,
    options
}) => {
    return (
        <FormControl component="fieldset" error={errors.hasOwnProperty(name)}>
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue || ''}
                render={({ field }) => (
                    <RadioGroup style={{ flexDirection: 'row' }} {...field}>
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                )}
            />
            {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
        </FormControl>
    );
};

export default RadioGroupController;
