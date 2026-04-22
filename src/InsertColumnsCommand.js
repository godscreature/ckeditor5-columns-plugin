import { Command } from "ckeditor5";

export default class InsertColumnsCommand extends Command {
    execute(options = {}) {
        const editor = this.editor;
        const model = editor.model;
        const columnsCount = options.count || 2;
        const columnClass = options.columnClass || "";

        model.change(writer => {
            const figure = writer.createElement(
                "columnsFigure",
                {
                    class: "columns"
                }
            );

            const container = writer.createElement(
                "columnsContainer",
                {
                    class: "columns columns-container",
                }
            );
            writer.append(container, figure);

            const row = writer.createElement(
                "rowContainer",
                {
                    class: "row-bs"
                }
            );
            writer.append(row, container);

            for (let i = 0; i < columnsCount; i++) {
                const column = writer.createElement("columnContainer", {class: columnClass});
                writer.append(column, row);

                const paragraph = writer.createElement("paragraph");
                writer.insertText(`Col ${i + 1} content area`, paragraph);
                writer.append(paragraph, column);
            }

            model.insertContent(figure);
        });
    }
}
