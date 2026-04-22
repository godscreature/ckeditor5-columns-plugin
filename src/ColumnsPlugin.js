import {
    addListToDropdown,
    Collection,
    createDropdown,
    IconTableLayout,
    Plugin
} from "ckeditor5";

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
                icon: IconTableLayout,
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
