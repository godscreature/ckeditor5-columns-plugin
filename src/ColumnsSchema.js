export function registerColumnsSchema(editor) {
    editor.model.schema.register("columnsFigure", {
        allowIn: "$root",
        isBlock: true,
        isObject: true,
        allowContentOf: "columnsContainer",
        allowAttributes: ["class"]
    });

    editor.model.schema.register("columnsContainer", {
        allowIn: "columnsFigure",
        isBlock: true,
        allowContentOf: "rowContainer",
        allowAttributes: ["class"]
    });

    editor.model.schema.register("rowContainer", {
        allowIn: "columnsContainer",
        isBlock: true,
        allowContentOf: "columnContainer",
        allowAttributes: ["class"]
    });

    editor.model.schema.register("columnContainer", {
        allowIn: "rowContainer",
        isBlock: true,
        allowContentOf: "$block",
        allowAttributes: ["class"]
    });

    editor.model.schema.extend("paragraph", {allowIn: "columnContainer"});
    editor.model.schema.extend("imageInline", {allowIn: "columnContainer"});
    editor.model.schema.extend("imageBlock", {allowIn: "columnContainer"});
}
