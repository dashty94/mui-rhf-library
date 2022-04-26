import React from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, LinearProgress as MuiLinearProgress, FormControl } from '@mui/material';
import { AutocompleteControllerProps } from '../../../fields/index';
import get from 'lodash.get';
import { styled } from '@mui/material/styles';

const LinearProgress = styled(MuiLinearProgress)(
    () => `
    position: absolute;
    left: 1%;
    right: 1%;
    top: 90%;
`
);

export const AutocompleteController = ({
    control,
    name,
    defaultValue,
    options,
    textFieldProps,
    multiple,
    optionValue = 'value',
    optionLabel = 'label',
    loading = false,
    onChange,
    customOptionLabel,
    ...rest
}: AutocompleteControllerProps) => {
    return loading ? (
        <FormControl fullWidth={textFieldProps?.fullWidth}>
            <LinearProgress />
            <TextField variant={textFieldProps?.variant} label={textFieldProps?.label} disabled />
        </FormControl>
    ) : (
        <Controller
            control={control}
            name={name}
            defaultValue={multiple ? defaultValue || [] : defaultValue || null}
            render={({ field: { onChange: fieldOnChange, ...restField }, fieldState }) => {
                return (
                    <Autocomplete
                        options={options || []}
                        autoHighlight
                        getOptionLabel={(option: any) => {
                            const found = options?.find(
                                (o: any) =>
                                    get(o, optionValue, '') === option ||
                                    get(o, optionValue, '') === get(option, optionLabel, '')
                            ) as any;
                            const label =
                                get(option, optionLabel, '') || (found && get(found, optionLabel, '')) || option || '';
                            return customOptionLabel ? customOptionLabel(found || option || '') : label?.toString();
                        }}
                        renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: any): React.ReactNode => {
                            return (
                                <li {...props} key={props.id}>
                                    {customOptionLabel
                                        ? customOptionLabel(option)
                                        : get(option, optionLabel, '') || option}
                                </li>
                            );
                        }}
                        disableCloseOnSelect={multiple}
                        isOptionEqualToValue={(option: any, value: any) => {
                            return typeof value === 'string'
                                ? get(option, optionValue, '') === value
                                : get(option, optionValue, '') === get(value, optionValue, '');
                        }}
                        disableClearable={rest.disableClearable}
                        disabled={rest.disabled}
                        {...(rest.noOptionsText && {
                            noOptionsText: rest.noOptionsText
                        })}
                        multiple={multiple}
                        size={rest.size}
                        className="MuiFormControl-marginDense"
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    label={textFieldProps?.label}
                                    variant={textFieldProps?.variant}
                                    fullWidth={textFieldProps?.fullWidth}
                                    error={fieldState?.invalid}
                                    helperText={fieldState?.error?.message}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off'
                                    }}
                                />
                            );
                        }}
                        onChange={(_, newValue: any) => {
                            onChange && onChange(newValue);
                            fieldOnChange(
                                multiple
                                    ? newValue?.map((v: any) => get(v, optionValue, null) || v)
                                    : get(newValue, optionValue, null)
                            );
                        }}
                        {...restField}
                        {...rest}
                    />
                );
            }}
        />
    );
};
