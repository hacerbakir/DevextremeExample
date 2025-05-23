import '../global';
import 'devextreme/ui/text_box';

$(() => {
    $('#textBoxTitle').dxTextBox({
        label: 'Name',
        inputAttr: {'aria-label': 'Name'},
        labelMode:"static",
        stylingMode:"outlined",
        placeholder: 'Name',
        width: '30%',
        height: '50',
    }).dxTextBox('instance');
});