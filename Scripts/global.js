import $ from 'jquery';
import 'devextreme/integration/jquery';
import './add-license';
import 'devextreme/ui/button';
import 'devextreme/ui/scroll_view';

const dataGridOptions = {
    showBorders: true,
    showColumnLines: true,
    showRowLines: true,
    rowAlternationEnabled: true,
    hoverStateEnabled: true,
    paging: {
        enabled: true,
        pageSize: 20,
    },
    pager: {
        visible: true,
        allowedPageSizes: [10, 20, 50, 100],
        showPageSizeSelector: true,
        showInfo: true,
        showNavigationButtons: true,
    },
    filterRow: {
        visible: true,
        applyFilter: 'auto',
    },
    columnChooser: {
        height: '340px',
        enabled: true,
        mode: 'dragAndDrop',
        position: {
            my: 'right top',
            at: 'right bottom',
            of: '.dx-datagrid-column-chooser-button',
        },
        search: {
            enabled: true,
            editorOptions: {
                placeholder: 'Search column'
            },
        },
        selection: {
            recursive: true,
            selectByClick: true,
            allowSelectAll: true,
        },
    },
    allowColumnReordering: true,
    allowColumnResizing: true,
    searchPanel: {
        visible: true,
        width: 240,
        placeholder: 'Search...',
    }
};

let editing = {
    allowUpdating: false,
    allowDeleting: false,
    allowAdding: false
}

$(() => {
    window.rToken = $('input[name="__RequestVerificationToken"]').val();

});

window.$ = $;
window.dataGridOptions = dataGridOptions;

