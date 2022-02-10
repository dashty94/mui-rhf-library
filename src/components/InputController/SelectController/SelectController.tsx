import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { InputLabel, MenuItem, Chip, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectControllerProps, Option } from '../../../fields/index';

const ChipsWrapper = styled('div')(
    () => `
    display: flex;
    flex-wrap: wrap;
`
);

export const SelectController = ({
    name,
    control,
    defaultValue,
    options,
    errors,
    onChange,
    ...rest
}: SelectControllerProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={rest?.multiple ? defaultValue?.map((dv: Option) => dv.value) || [] : defaultValue || ''}
            render={({ field }) => (
                <FormControl
                    error={Object.prototype.hasOwnProperty.call(errors, name) ? true : false}
                    fullWidth={rest.fullWidth}
                >
                    <InputLabel id={name}>{rest.label}</InputLabel>

                    <Select
                        labelId={name}
                        style={{ width: '100%' }}
                        multiple={rest?.multiple}
                        input={<OutlinedInput label={rest.label} />}
                        {...(rest?.multiple && {
                            renderValue: (selected: any) => (
                                <ChipsWrapper>
                                    {selected.map((value: any, i: number) => (
                                        <Chip key={i} label={value?.label || value} />
                                    ))}
                                </ChipsWrapper>
                            )
                        })}
                        {...rest}
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
