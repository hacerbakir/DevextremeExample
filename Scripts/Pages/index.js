import '../global';
import 'devextreme/ui/text_box';
import 'devextreme/ui/button';
import 'devextreme/ui/validator';
import 'devextreme/ui/validation_group';

$(() => {
    const validationGroup = 'login';
    
    $('#textBoxEmail').dxTextBox({
        label: 'Email',
        inputAttr: { 'aria-label': 'Email' },
        labelMode: "static",
        stylingMode: "outlined",
        placeholder: 'Email',
        width: '100%',
        height: 50,
        
    }).dxValidator({
        validationGroup: validationGroup,
        validationRules: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Email is invalid' },
        ]
    }).dxTextBox('instance');    
   
    $('#textBoxPassword').dxTextBox({
        label: 'Password',
        mode: 'password',
        labelMode: "static",
        inputAttr: {'aria-label': 'Password'},
        stylingMode: "outlined",
        placeholder: 'Password',
        width: '100%',
        height: 50,
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: 'eyeopen',
                stylingMode: 'text',
                onClick() {
                    const textBoxPasswordId = $('#textBoxPassword');
                    textBoxPasswordId.option('mode', textBoxPasswordId.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
        onValueChanged: (value) => {
            $('#textBoxConfirmPassword').dxTextBox('instance').option('value', value.value);
        },
    }).dxValidator({
        validationGroup: validationGroup,
        validationRules: [
            { type: 'required', message: 'Password is required' }
        ]
    }).dxTextBox('instance');

    $('#textBoxConfirmPassword').dxTextBox({
        label: 'Confirm Password',
        mode: 'password',
        inputAttr: {'aria-label': 'Confirm Password'},
        labelMode: "static",
        stylingMode: "outlined",
        placeholder: 'Confirm Password',
        width: '100%',
        height: 50,
    }).dxValidator({
        validationGroup: validationGroup,
        validationRules: [
            { type: 'required', message: 'Confirm Password is required' },
        ]
    }).dxTextBox('instance');

    $('#buttonLogin').dxButton({
        label: 'Login',
        type: 'default',
        stylingMode: 'contained',
        width: '100%',
        height: 50,
        validationGroup: validationGroup,
        useSubmitBehavior: false,
        onClick: (e) => {
            const loginValidate = e.validationGroup.validate();
            console.log('test', loginValidate);
            if (loginValidate.isValid) {
                alert('is valid');
            }else {
                alert('Please fix validation');
            }
        }
    })
    
});