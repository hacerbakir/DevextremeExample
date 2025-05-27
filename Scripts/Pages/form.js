import '../global';
import 'devextreme/ui/text_box';
import 'devextreme/ui/select_box';
import CustomStore from 'devextreme/data/custom_store';
import {fetchCountries} from "../Helpers/fetch-country";
import {fetchCity} from "../Helpers/fetch-city";

$(() => {

    let countries = [];
    let selectedCountry = null;
    let citiesSelectBox;

    $('#name').dxTextBox({
        label: 'Name',
        inputAttr: {'aria-label': 'Name'},
        labelMode: "static",
        stylingMode: "outlined",
        width: '30%',
        height: '50',
    }).dxTextBox('instance');

    $('#lastname').dxTextBox({
        label: 'Lastname',
        inputAttr: {'aria-label': 'Lastname'},
        labelMode: "static",
        stylingMode: "outlined",
        width: '30%',
        height: '50',
    }).dxTextBox('instance');

    $('#email').dxTextBox({
        label: 'Email',
        inputAttr: {'aria-label': 'Email'},
        labelMode: "static",
        stylingMode: "outlined",
        width: '30%',
        height: '50',
        // mask: {
        //     H:'(\w|[.\-])+@(\w|[\-]+.)*(\w|[\-]){2,63}.[a-zA-Z]{2,4}',
        //     F: function (char) {
        //         return char === char.toUpperCase();
        //     }
        // }
    }).dxTextBox('instance');

    $('#phone').dxTextBox({
        label: 'Phone Number',
        inputAttr: { 'aria-label': 'Phone Number' },
        labelMode: "static",
        stylingMode: "outlined",
        width: '30%',
        height: '50',
        mask: '+\\9\\0 (500) 000-0000',
        maskRules: { X: /[02-9]/ },
    });
    
    $('#country').dxSelectBox({
        dataSource: new CustomStore({
            key: 'iso2',
            load: async () => {
                countries = await fetchCountries();
                return countries;
            }
        }),
        valueExpr: 'iso2',
        displayExpr: 'name',
        width: '30%',
        height: '50',
        label: 'Country',
        inputAttr: {'aria-label': 'Country'},
        labelMode: "static",
        stylingMode: "outlined",
        placeholder: null,
        onValueChanged: (selection) => {
            console.log("SELECTİON : ",selection);
            selectedCountry = countries.find(country => country.iso2 === selection.value)
            console.log('Country : ', selectedCountry);
            citiesSelectBox.option('value', null);
            citiesSelectBox.getDataSource().load();
        }
    }).dxSelectBox('instance');

   $('#city').dxSelectBox({
        dataSource: new CustomStore({
            key: 'name',
            load: async () => {

                return await fetchCity(selectedCountry.name);
            }
        }),
        onInitialized(e) {
            citiesSelectBox= e.component;
        },
        valueExpr: 'name',
        displayExpr: 'name',
        width: '30%',
        height: '50',
        label: 'City',
        inputAttr: {'aria-label': 'City'},
        labelMode: "static",
        stylingMode: "outlined",
        placeholder: null,
    }).dxSelectBox('instance');
})