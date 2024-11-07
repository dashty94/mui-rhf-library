import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { RadioGroupControllerProps } from '../../../fields';

export const RadioGroupController: React.FC<RadioGroupControllerProps> = ({
    name,
    label,
    defaultValue,
    control,
    options,
    onChange,
    onBlur,
    ...rest
}) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState }) => (
                <FormControl error={fieldState?.invalid} component="fieldset" {...rest}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <RadioGroup
                        style={{ flexDirection: 'row' }}
                        {...field}
                        onChange={(event, value) => {
                            onChange?.(event, value);
                            field.onChange(event);
                        }}
                        onBlur={(...args) => {
                            field?.onBlur?.();
                            onBlur?.(...args);
                        }}
                    >
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                    <FormHelperText>{fieldState?.error?.message || rest.helperText}</FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default RadioGroupController;
