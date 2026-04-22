# CKEditor 5 Columns Plugin

## Description
A custom plugin for CKEditor 5 that adds support for multi‑column layout blocks inspired by Bootstrap grid.  
The plugin provides a flexible structure with `<figure>` → `<div class="columns-container">` → `<div class="row-bs">` → `<div class="col-bs-md-*">`, inside which you can edit paragraphs and insert images.

## Features
- Schema with elements: `columnsFigure`, `columnsContainer`, `rowContainer`, `columnContainer`
- Upcast/downcast conversions for persisting structure in the database
- Editable zones inside columns (`toWidgetEditable`)
- Support for paragraphs and images inside columns
- UI dropdown for quick column creation (2, 3, 4, 6, 12)
- Full integration with the `insertColumns` command
- Configurable container class, row class, and column options

## Installation
```bash
npm install ckeditor5-columns-plugin
```

## Configuration
You can customize the plugin through the columns config object:
- `containerClass` — CSS class for the outer container
- `rowClass` — CSS class for the row wrapper
- `options` — array of objects defining available column layouts

Each option has:
- `label` — text shown in the dropdown
- `count` — number of columns
- `columnClass` — CSS class applied to each column

## Usage
```js
import ColumnsPlugin from 'ckeditor5-columns-plugin';

ClassicEditor.create(document.querySelector('#editor'), {
    plugins: [ ColumnsPlugin, ... ],
    toolbar: [ 'insertColumns', ... ],
    columns: {
        containerClass: "columns-container",
        rowClass: "row-bs",
        options: [
            { label: "2 columns", count: 2, columnClass: "col-bs-md-6" },
            { label: "3 columns", count: 3, columnClass: "col-bs-md-4" },
            { label: "4 columns", count: 4, columnClass: "col-bs-md-3" },
            { label: "6 columns", count: 6, columnClass: "col-bs-md-2" },
            { label: "12 columns", count: 12, columnClass: "col-bs-md-1" }
        ]
    }
})
.then(editor => {
    console.log('Editor ready', editor);
});
```

## Example HTML Output
```html
<figure class="columns">
    <div class="columns-container">
        <div class="ck-row">
            <div class="col-bs-md-6">
                <p>Column 1</p>
            </div>
            <div class="col-bs-md-6">
                <p>Column 2</p>
            </div>
        </div>
    </div>
</figure>
```
