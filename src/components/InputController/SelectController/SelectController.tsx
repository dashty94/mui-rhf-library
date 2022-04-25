import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {
    InputLabel,
    MenuItem,
    Chip,
    OutlinedInput,
    LinearProgress as MuiLinearProgress,
    TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectControllerProps, Option } from '../../../fields/index';
import get from 'lodash.get';

const ChipsWrapper = styled('div')(
    () => `
    display: flex;
    flex-wrap: wrap;
`
);

const LinearProgress = styled(MuiLinearProgress)(
    () => `
    position: absolute;
    left: 1%;
    right: 1%;
    top: 90%;
`
);

export const SelectController = ({
    name,
    control,
    defaultValue,
    options,
    onChange,
    optionValue = 'value',
    optionLabel = 'label',
    loading = false,
    customOptionLabel,
    ...rest
}: SelectControllerProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={
                rest?.multiple ? defaultValue?.map((dv: Option) => get(dv, optionValue, '')) || [] : defaultValue || ''
            }
            render={({ field, fieldState }) => (
                <FormControl error={fieldState?.invalid} fullWidth={rest.fullWidth} size={rest.size}>
                    {!loading ? <InputLabel id={name}>{rest.label}</InputLabel> : <LinearProgress />}

                    {!loading ? (
                        <Select
                            labelId={name}
                            style={{ width: '100%' }}
                            multiple={rest?.multiple}
                            input={<OutlinedInput label={rest.label} />}
                            {...(rest?.multiple && {
                                renderValue: (selected: any) => (
                                    <ChipsWrapper>
                                        {selected.map((value: any, i: number) => (
                                            <Chip
                                                key={i}
                                                label={get(
                                                    options.find((o: any) => get(o, optionValue) === value),
                                                    optionLabel
                                                )}
                                            />
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
                                    <MenuItem key={index} value={get(option, optionValue, '')}>
                                        {customOptionLabel
                                            ? customOptionLabel(option)
                                            : get(option, optionLabel, '') || option}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    ) : (
                        <TextField variant={rest?.variant} label={rest.label} disabled size={rest.size} />
                    )}

                    <FormHelperText>{fieldState?.error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};
