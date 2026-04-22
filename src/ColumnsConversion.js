import {toWidget, toWidgetEditable} from "ckeditor5";

export function registerColumnsConversion(editor) {
    // Upcast
    editor.conversion.for("upcast").elementToElement({
        view: {name: "figure", classes: "ck-columns-figure"},
        model: (viewElement, { writer }) =>
            writer.createElement("columnsFigure", {
                class: viewElement.getAttribute("class")
            })
    });

    editor.conversion.for("upcast").elementToElement({
        view: {name: "div", classes: "ck-columns-container"},
        model: (viewElement, { writer }) =>
            writer.createElement("columnsContainer", {
                class: viewElement.getAttribute("class")
            })
    });

    editor.conversion.for("upcast").elementToElement({
        view: {name: "div", classes: "ck-columns-row"},
        model: (viewElement, { writer }) =>
            writer.createElement("rowContainer", {
                class: viewElement.getAttribute("class")
            })
    });

    editor.conversion.for("upcast").elementToElement({
        view: {
            name: "div",
            classes: [/^ck-col-\d+$/]

        },
        model: (viewElement, { writer }) =>
            writer.createElement("columnContainer", {
                class: viewElement.getAttribute("class")
            })
    });

    // Downcast helper
    const downcastWithClass = (name, tag) => ({
        model: name,
        view: (modelElement, { writer }) =>
            writer.createContainerElement(tag, {
                class: modelElement.getAttribute("class")
            })
    });

    // Data downcast (dataDowncast), and Data + Editing downcast (downcast)
    editor.conversion.for("dataDowncast").elementToElement(downcastWithClass("columnsFigure", "figure"));
    editor.conversion.for("downcast").elementToElement(downcastWithClass("columnsContainer", "div"));
    editor.conversion.for("downcast").elementToElement(downcastWithClass("rowContainer", "div"));
    editor.conversion.for("dataDowncast").elementToElement(downcastWithClass("columnContainer", "div"));

    // Editing downcast
    editor.conversion.for("editingDowncast").elementToElement({
        model: "columnsFigure",
        view: (modelElement, { writer }) => {
            const figure = writer.createContainerElement("figure", {
                class: modelElement.getAttribute("class")
            });

            return toWidget(figure, writer, { label: "columns figure", hasSelectionHandle: true });
        }
    });

    editor.conversion.for("editingDowncast").elementToElement({
        model: "columnContainer",
        view: (modelElement, { writer }) => {
            const div = writer.createEditableElement("div", {
                class: modelElement.getAttribute("class")
            });
            return toWidgetEditable(div, writer);
        }
    });
}
