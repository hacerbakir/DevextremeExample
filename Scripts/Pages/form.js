import '../global';
import 'devextreme/ui/text_box';
import 'devextreme/ui/select_box';
import {DataSource} from "devextreme/common/data";

$(() => {
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
        inputAttr: {'aria-label': 'Phone Number'},
        labelMode: "static",
        stylingMode: "outlined",
        width: '30%',
        height: '50',
    }).dxTextBox('instance');

    fetch("https://countriesnow.space/api/v0.1/countries/positions")
        .then(response => response.json())
        .then(data => {
            const countries = data.data;
            $('#country').dxSelectBox({
                dataSource: countries,
                valueExpr: 'long',
                displayExpr: 'name',
                width: '30%',
                height: '50',
                label: 'Country',
                inputAttr: {'aria-label': 'Country'},
                labelMode: "static",
                stylingMode: "outlined",
                placeholder: null,
            })


        })

    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({country: "Turkey"})
    })
        .then(res => res.json())
        .then(data => {
            const cities = data.data.map(item => ({'name' : item}));
            
            $('#city').dxSelectBox({
                dataSource: cities,
                valueExpr: 'name',
                displayExpr: 'name',
                width: '30%',
                height: '50',
                label: 'City',
                inputAttr: {'aria-label': 'City'},
                labelMode: "static",
                stylingMode: "outlined",
                placeholder: null,
            })
        });

})