import { Plugin } from "@ckeditor/ckeditor5-core";
import { Collection } from "@ckeditor/ckeditor5-utils";
import { addListToDropdown, createDropdown } from "@ckeditor/ckeditor5-ui";

import "./columns.css";

import { registerColumnsSchema } from "./ColumnsSchema";
import {registerColumnsConversion} from "./ColumnsConversion";
import InsertColumnsCommand from "./InsertColumnsCommand";

export default class Columns extends Plugin {
    init() {
        const editor = this.editor;

        const containerClass = editor.config.get("columns.containerClass") || "";
        const rowClass = editor.config.get("columns.rowClass") || "";
        const columnOptions = editor.config.get("columns.options") || [
            { label: "1 columns", count: 1, columnClass: "" },
            { label: "2 columns", count: 2, columnClass: "" },
            { label: "3 columns", count: 3, columnClass: "" },
            { label: "4 columns", count: 4, columnClass: "" },
            { label: "6 columns", count: 6, columnClass: "" },
            { label: "12 columns", count: 12, columnClass: "" }
        ];

        registerColumnsSchema(editor);
        registerColumnsConversion(editor);

        editor.commands.add( "insertColumns", new InsertColumnsCommand(editor));

        editor.ui.componentFactory.add("insertColumns", locale => {
            const dropdownView = createDropdown(locale);

            dropdownView.buttonView.set({
                label: "Insert Columns",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M1.5 4.121C1.5 2.95 2.426 2 3.568 2h12.864c1.142 0 2.068.95 2.068 2.121V16.38c0 1.171-.926 2.121-2.068 2.121H3.568c-1.142 0-2.068-.95-2.068-2.121zm2.068-.707a.7.7 0 0 0-.69.707V6.38h14.244V4.12a.7.7 0 0 0-.69-.707zm13.554 4.38h-4.968v3.939h4.968zm0 5.353h-4.968v3.939h4.278c.381 0 .69-.317.69-.707zm-6.347 3.939V7.794H2.878v8.585c0 .39.309.707.69.707z"/></svg>',
                tooltip: true
            });

            const itemDefinitions = new Collection();
            for (const item of columnOptions) {
                itemDefinitions.add({
                    type: "button",
                    model: {
                        label: item.label,
                        withText: true,
                        commandParam: item
                    }
                });
            }

            addListToDropdown(dropdownView, itemDefinitions);

            dropdownView.on("execute", evt => {
                const { count, columnClass } = evt.source.commandParam;
                editor.execute("insertColumns", {
                    count,
                    columnClass,
                    containerClass,
                    rowClass
                });
            });

            return dropdownView;
        });
    }
}
