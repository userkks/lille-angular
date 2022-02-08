// returns the error message if the field have error, other wise return false
export function checkIfErrorInputField(formDefinition, fieldName) {
    if (formDefinition.controls[fieldName].errors && formDefinition.controls[fieldName].touched) {
        return formDefinition.controls[fieldName].errors;
    } else {
        return false;
    }
}