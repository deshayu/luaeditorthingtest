export function parse(code) {
    const regex = /([a-zA-Z0-9_]+):setTopBottom\((true|false), (true|false), (-?\d+), (-?\d+)\)/g;
    let match;
    const elements = [];

    while ((match = regex.exec(code)) !== null) {
        const [, objectName, anchorTop, anchorBottom, min, max] = match;

        elements.push({
            objectName,
            topBottom: {
                anchorTop: anchorTop === "true",
                anchorBottom: anchorBottom === "true",
                min: parseInt(min, 10),
                max: parseInt(max, 10),
            },
        });
    }

    return elements.length > 0 ? { elements } : null;
}