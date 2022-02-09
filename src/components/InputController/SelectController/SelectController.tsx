import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { InputLabel, MenuItem, Chip, OutlinedInput, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';

export type Option = {
    value: string;
    label: string;
};

export type Options = Array<Option>;

export interface SelectControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: any;
    options: Options;
    errors: any;
    disabled?: boolean;
    multiple?: boolean;
    variant?: 'standard' | 'outlined' | 'filled' | undefined;
    margin?: 'none' | 'dense' | 'normal' | undefined;
    size?: 'small' | 'medium' | undefined;
    fullWidth?: boolean;
    onChange?: (event: SelectChangeEvent) => void;
}

const ChipsWrapper = styled('div')(
    () => `
    display: flex;
    flex-wrap: wrap;
`
);

export const SelectController = ({
    name,
    label,
    options,
    defaultValue,
    control,
    errors,
    multiple,
    variant,
    margin = 'dense',
    fullWidth = true,
    size,
    onChange
}: SelectControllerProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={multiple ? defaultValue?.map((dv: Option) => dv.value) || [] : defaultValue || ''}
            render={({ field }) => (
                <FormControl
                    variant={variant}
                    margin={margin}
                    fullWidth={fullWidth}
                    size={size}
                    error={Object.prototype.hasOwnProperty.call(errors, name) ? true : false}
                >
                    <InputLabel id={name}>{label}</InputLabel>

                    <Select
                        labelId={name}
                        id={label}
                        style={{ width: '100%' }}
                        multiple={multiple}
                        input={<OutlinedInput label={label} />}
                        {...(multiple && {
                            renderValue: (selected: any) => (
                                <ChipsWrapper>
                                    {selected.map((value: any, i: number) => (
                                        <Chip key={i} label={value?.label || value} />
                                    ))}
                                </ChipsWrapper>
                            )
                        })}
                        {...field}
                        onChange={(event) => {
                            onChange && onChange(event);
                            field.onChange(event);
                        }}
                    >
                        {options?.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.value}>
                                    {option.label || option}
                                </MenuItem>
                            );
                        })}
                    </Select>

                    <FormHelperText>{errors[name]?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};
