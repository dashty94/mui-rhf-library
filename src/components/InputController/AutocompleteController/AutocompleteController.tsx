import React from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, SelectChangeEvent } from '@mui/material';
import { Options, Option } from '../SelectController/SelectController';

export interface AutocompleteControllerProps {
    name: string;
    label: string;
    control: any;
    defaultValue: any;
    options: Options;
    errors: any;
    disabled?: boolean;
    multiple?: boolean;
    variant?: 'standard' | 'outlined' | 'filled' | undefined;
    loading?: boolean;
    renderOption?: (option: Option | any) => React.ReactNode;
    onChange?: (event: SelectChangeEvent) => void;
    disableClearable?: boolean;
    size?: 'small' | 'medium' | undefined;
    fullWidth?: boolean;
    noOptionsText?: string;
}

export const AutocompleteController = ({
    control,
    name,
    label,
    variant,
    defaultValue,
    errors,
    options,
    loading,
    multiple,
    onChange,
    disableClearable,
    disabled,
    size = 'small',
    fullWidth = true,
    noOptionsText
}: AutocompleteControllerProps) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange: fieldOnChange, value: fieldValue, ...rest } }) => {
                return (
                    <Autocomplete
                        defaultValue={multiple ? defaultValue?.map((dv: Option) => dv.value) || [] : defaultValue || ''}
                        value={multiple ? fieldValue || [] : fieldValue || null}
                        options={options || []}
                        autoHighlight
                        getOptionLabel={(option) => {
                            const found = options.find((o) => o.value == option);
                            const label = option?.label || (found && found?.label) || option || '';
                            return label.toString();
                        }}
                        disableCloseOnSelect={multiple}
                        isOptionEqualToValue={(option, value) => {
                            return option?.value === value;
                        }}
                        disableClearable={disableClearable}
                        disabled={disabled}
                        {...(noOptionsText && {
                            noOptionsText: noOptionsText
                        })}
                        multiple={multiple}
                        size={size}
                        className="MuiFormControl-marginDense"
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    label={label}
                                    variant={variant}
                                    fullWidth={fullWidth}
                                    error={Object.prototype.hasOwnProperty.call(errors, name) ? true : false}
                                    helperText={errors[name]?.message}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'disabled'
                                    }}
                                />
                            );
                        }}
                        onChange={(event, newValue) => {
                            onChange && onChange(newValue);
                            fieldOnChange(
                                multiple
                                    ? newValue.map((v: any) => v?.value || v)
                                    : newValue && Object.prototype.hasOwnProperty.call(newValue, 'value')
                                    ? newValue?.value
                                    : ''
                            );
                        }}
                        {...rest}
                    />
                );
            }}
        />
    );
};

export default AutocompleteController;
