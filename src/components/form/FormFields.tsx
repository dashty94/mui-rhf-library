import React from 'react';
import { TextFieldController } from '../InputController/TextFieldController/TextFieldController';
import { SelectController } from '../InputController/SelectController/SelectController';
import { AutocompleteController } from '../InputController/AutocompleteController/AutocompleteController';
import { CheckboxController } from '../InputController/CheckboxController/CheckboxController';
import { RadioGroupController } from '../InputController/RadioGroupController/RadioGroupController';
import { SwitchController } from '../InputController/SwitchController/SwitchController';
import { CustomComponentController } from '../InputController/CustomComponentController/CustomComponentController';
import DatePickerController from '../InputController/DatePickerController/DatePickerController';

import { Grid, Grid2, type Grid2Props, type GridProps } from '@mui/material';

import { FormFieldsProps, MuiRhfFieldComponentMap } from '../../form/typing';

const MuiFieldComponentMapper: MuiRhfFieldComponentMap = {
    textField: TextFieldController,
    select: SelectController,
    autocomplete: AutocompleteController,
    checkbox: CheckboxController,
    radioGroup: RadioGroupController,
    switch: SwitchController,
    datePicker: DatePickerController,
    custom: CustomComponentController
};

export const FormFields: React.FC<FormFieldsProps> = ({ fields, control, shouldUseDeprecatedGrid = false }) => {
    const GridItem: React.FC<GridProps | Grid2Props> = shouldUseDeprecatedGrid ? Grid : Grid2;

    return (
        <>
            {fields
                ?.filter(({ hidden }) => !hidden)
                .map(({ fieldType, name, label, gridProps, ...rest }, index) => {
                    const MuiRhfField = (MuiFieldComponentMapper[fieldType as keyof MuiRhfFieldComponentMap] ||
                        TextFieldController) as any;

                    return (
                        <GridItem item xs={12} size={12} {...gridProps} key={name + index}>
                            <MuiRhfField {...rest} name={name} label={label} control={control} />
                        </GridItem>
                    );
                })}
        </>
    );
};
