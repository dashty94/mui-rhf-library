import React from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { AutocompleteControllerProps } from '../../../fields/index';
import get from 'lodash.get';

export const AutocompleteController = ({
    control,
    name,
    defaultValue,
    options,
    textFieldProps,
    multiple,
    optionValue = 'value',
    optionLabel = 'label',
    ...rest
}: AutocompleteControllerProps) => {
    return (
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
                                    get(o, optionValue, '') === option[optionValue]
                            ) as any;
                            const label =
                                get(option, optionLabel, '') || (found && get(found, optionLabel, '')) || option || '';
                            return label?.toString();
                        }}
                        renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: any): React.ReactNode => {
                            return (
                                <li {...props} key={props.id}>
                                    {get(option, optionLabel, '')}
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
                            // onChange && onChange(newValue);
                            fieldOnChange(
                                multiple
                                    ? newValue?.map((v: any) => get(v, optionValue, '') || v)
                                    : get(newValue, optionValue, '')
                            );
                        }}
                        {...restField}
                    />
                );
            }}
        />
    );
};
