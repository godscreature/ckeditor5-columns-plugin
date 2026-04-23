import { Command } from "@ckeditor/ckeditor5-core";

export default class InsertColumnsCommand extends Command {
    execute({count, columnClass, containerClass, rowClass}) {
        const editor = this.editor;
        const model = editor.model;

        model.change(writer => {
            const figure = writer.createElement(
                "columnsFigure",
                {
                    class: ["ck-columns-figure"]
                }
            );

            const container = writer.createElement(
                "columnsContainer",
                {
                    class: ["ck-columns-container", containerClass].join(" "),
                }
            );
            writer.append(container, figure);

            const row = writer.createElement(
                "rowContainer",
                {
                    class: ["ck-columns-row", rowClass].join(" ")
                }
            );
            writer.append(row, container);

            const colClasses = {
                1: "ck-col-12",
                2: "ck-col-6",
                3: "ck-col-4",
                4: "ck-col-3",
                6: "ck-col-2",
                12: "ck-col-1"
            };

            for (let i = 0; i < count; i++) {
                const column = writer.createElement(
                    "columnContainer",
                    {
                        class: [colClasses[count], columnClass].join(" ")
                    }
                );
                writer.append(column, row);

                const paragraph = writer.createElement("paragraph");
                writer.insertText(`Col ${i + 1} content area`, paragraph);
                writer.append(paragraph, column);
            }

            model.insertContent(figure);
        });
    }
}
