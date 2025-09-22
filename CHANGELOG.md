# mui-rhf-library

## 3.0.0

### Major Changes

#### Breaking Changes - MUI v7 Upgrade

This release contains breaking changes due to the upgrade from MUI v6 to v7. Users must update their projects accordingly.

##### Dependency Updates Required

-   `@mui/material`: ^6.5.0 → ^7.3.2
-   `@mui/system`: ^6.5.0 → ^7.3.2
-   `@mui/x-date-pickers`: ^7.29.4 → ^8.11.3

##### Grid Component Changes

-   MUI v7 restructured the Grid components:
    -   The previous `Grid` component is now `GridLegacy`
    -   The previous `Grid2` component is now the new `Grid`
-   The library now uses the new `Grid` by default (previously `Grid2`)
-   Added `shouldUseDeprecatedGrid` prop for backward compatibility with `GridLegacy`

##### Grid Props API Changes

If you're passing custom `gridProps` to form fields, you need to update the syntax:

**Before (MUI v6):**

```javascript
gridProps: { xs: 12, sm: 6, md: 4 }
```

**After (MUI v7):**

```javascript
// For responsive sizing
gridProps: { size: { xs: 12, sm: 6, md: 4 } }

// For single size across all breakpoints
gridProps: { size: 6 }
```

##### Migration Path

1. Update your MUI dependencies to v7
2. Update any custom `gridProps` to use the new `size` prop syntax
3. If you need temporary backward compatibility, use `shouldUseDeprecatedGrid={true}` on `FormFields`

Contributors: [@Revan99](https://github.com/Revan99)

## 2.1.0

### Patch Changes

-   Upgrade Storybook to v9 and update related configuration
-   Update development dependencies and tooling

    Contributors: [@Revan99](https://github.com/Revan99)

## 2.0.2

### Patch Changes

-   Fix CheckboxController label prop

## 2.0.1

### Patch Changes

-   integrate textFieldProps directly into TextField and of AutocompleteController

## 2.0.0

### Major Changes

-   Upgrade to Material UI v6
-   Update storybook
-   Update props and types
-   Update dependencies

Contributors: [@HediMuhamad](https://github.com/HediMuhamad)

## 1.5.10

### Patch Changes

-   Add an onChange callback to DatePickerController. by [@HediMuhamad](https://github.com/HediMuhamad) in [#23](https://github.com/dashty94/mui-rhf-library/pull/23)

## 1.5.8

### Patch Changes

-   Fix updating the Switch controller component value triggered by a side effect. [#21](https://github.com/dashty94/mui-rhf-library/pull/21)

## 1.5.7

### Patch Changes

-   Fix and allow pass custom onBlur event to input controllers

## 1.5.5

### Patch Changes

-   Update dependencies
-   Fix a bug where `disabled` attribute of some field is replaced by React Hook Form's undefined attribute value

## 1.5.3

### Minor Changes

-   Upgrade dependencies
-   Export DatePickerController
-   Accept custom `helperText` to display under the fields
-   Fix DatePicker date values

## 1.4.4

### Patch Changes

-   Fix DatePicker value that would return an empty string, instead now returns `new Date('')`

## 1.4.3

### Patch Changes

-   Form fields now accept a `hidden` attribute to hide showing the field in the form.

## 1.4.1

### Patch Changes

-   Fix DatePickerFieldProps type to extend DatePickerProps

## 1.4.0

### Minor Changes

-   Add the support for new field type `datePicker` and MUI's DatePicker component
-   `fieldType` does not accept `string` anymore. If you want to render a custom component, set the `fieldType` as `custom`.

## 1.3.0

### Minor Changes

-   Update dependencies

## 1.2.1

### Minor Changes

-   Add support for `custom` fieldType on `FormFields` and render `CustomComponent`

## 1.1.8

### Patch Changes

-   Fix the key of formFields to be the name of the field + index to identify the changed inputs

## 1.1.6

### Patch Changes

-   `SelectController`'s options can be disabled with an additional `disabled` prop on the option
-   Pass the rest of props provided to the `AutocompleteController`

## 1.1.5

### Patch Changes

-   Add optional `onChange` prop to `RadioGroupController`

## 1.1.3

### Patch Changes

-   Fix the `size` prop of the SelectController

## 1.1.2

### Minor Changes

-   `AutocompleteController` and `SelectController` accept `customOptionLabel` prop to customize the returned option label

## 1.0.13

### Patch Changes

-   Removed extra `required` attribute on RadioGroupController
-   Add `onChange` callback prop to AutocompleteController fired when a menu item is selected.

## 1.0.11

### Patch Changes

-   Fix the default value of the CheckboxController

## 1.0.10

### Patch Changes

-   Add `loading` prop and progress indicator to autocomplete and select inputs

## 1.0.8

### Patch Changes

-   Remove using `errors` object from React-hook-form to show input errors and use the default `fieldState` so you do not have to pass an extra parameter.

## 1.0.7

### Patch Changes

-   Define `renderOptions` on `AutocompleteController` and defined custom keys to avoid duplicate keys.

## 1.0.6

### Patch Changes

-   `AutocompleteController` and `SelectController` accept `optionLabel` and `optionValue` optionally to dynamically set options's text label and value

## 1.0.0

### Major Changes

-   Initial release
