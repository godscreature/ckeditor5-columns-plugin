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

export default class ColumnsPlugin extends Plugin {
    init() {
        const editor = this.editor;

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
                editor.execute("insertColumns", {count, columnClass});
            });

            return dropdownView;
        });
    }
}
