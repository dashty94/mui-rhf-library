import React from 'react';
import { TextFieldController } from '../InputController/TextFieldController/TextFieldController';
import { SelectController } from '../InputController/SelectController/SelectController';
import { AutocompleteController } from '../InputController/AutocompleteController/AutocompleteController';
import { CheckboxController } from '../InputController/CheckboxController/CheckboxController';
import { RadioGroupController } from '../InputController/RadioGroupController/RadioGroupController';
import { SwitchController } from '../InputController/SwitchController/SwitchController';
import { Grid } from '@mui/material';

import { FormFieldsProps, MuiRhfFieldComponentMap } from '../../form/typing';

const MuiFieldComponentMapper: MuiRhfFieldComponentMap = {
    textField: TextFieldController,
    select: SelectController,
    autocomplete: AutocompleteController,
    checkbox: CheckboxController,
    radioGroup: RadioGroupController,
    switch: SwitchController
};

export const FormFields: React.FC<FormFieldsProps> = ({ fields, control, errors }) => {
    return (
        <>
            {fields.map(({ fieldType, props, name, label, gridProps }, index) => {
                const MuiRhfField =
                    MuiFieldComponentMapper[fieldType as keyof MuiRhfFieldComponentMap] || TextFieldController;

                return (
                    <Grid item xs={12} {...gridProps} key={index}>
                        <MuiRhfField {...props} name={name} label={label} control={control} errors={errors} />
                    </Grid>
                );
            })}
        </>
    );
};
