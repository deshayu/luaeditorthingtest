export function parse(code) {
    const regex = /([a-zA-Z0-9_]+):setLeftRight\((true|false), (true|false), (-?\d+), (-?\d+)\)/g;
    let match;
    const elements = [];

    while ((match = regex.exec(code)) !== null) {
        const [, objectName, anchorLeft, anchorRight, min, max] = match;

        elements.push({
            objectName,
            leftRight: {
                anchorLeft: anchorLeft === "true",
                anchorRight: anchorRight === "true",
                min: parseInt(min, 10),
                max: parseInt(max, 10),
            },
        });
    }

    return elements.length > 0 ? { elements } : null;
}
