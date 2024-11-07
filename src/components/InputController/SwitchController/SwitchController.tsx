import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { SwitchControllerProps } from '../../../fields/index';

export const SwitchController: React.FC<SwitchControllerProps> = ({
    control,
    name,
    label,
    defaultChecked,
    onChange,
    onBlur,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultChecked}
            render={({ field, fieldState }) => {
                return (
                    <FormControl required error={fieldState?.invalid} component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                style={{ width: '100%' }}
                                control={
                                    <Switch
                                        checked={field?.value}
                                        {...field}
                                        {...rest}
                                        onChange={(event, checked) => {
                                            field.onChange(Boolean(event.target.checked));
                                            onChange && onChange(event, checked);
                                        }}
                                        onBlur={(...args) => {
                                            field?.onBlur?.();
                                            onBlur?.(...args);
                                        }}
                                    />
                                }
                                label={label}
                            />
                        </FormGroup>
                        <FormHelperText>{fieldState?.error?.message || rest?.helperText}</FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
};
