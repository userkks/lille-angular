// returns the error message if the field have error, other wise return false
export function checkIfErrorInputField(formDefinition, fieldName) {
    if (formDefinition.controls[fieldName].errors && formDefinition.controls[fieldName].touched) {
        return formDefinition.controls[fieldName].errors;
    } else {
        return false;
    }
}

export function commonGridFormatter(value) {
    if (Array.isArray(value))
        return value.join(", ");
    else if (typeof value === 'object') return JSON.stringify(value);
    return value;
}