import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export interface SwitchControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: boolean;
    errors: any;
}

export const SwitchController: React.FC<SwitchControllerProps> = ({ control, name, label, errors, defaultValue }) => {
    const [isChecked, setIsChecked] = useState(defaultValue);

    return (
        <FormControl required error={errors.hasOwnProperty(name)} component="fieldset">
            <FormGroup>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue || false}
                    render={({ field }) => {
                        return (
                            <FormControlLabel
                                style={{ width: '100%' }}
                                control={
                                    <Switch
                                        checked={isChecked}
                                        {...field}
                                        onChange={(event) => {
                                            setIsChecked(event.target.checked);
                                            field.onChange(event.target.checked);
                                        }}
                                    />
                                }
                                label={label}
                            />
                        );
                    }}
                />
            </FormGroup>
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
};
