export function parse(code) {
    const regex = /([a-zA-Z0-9_]+):setScale\((\d+(\.\d+)?)\)/g;
    let match;
    const elements = [];

    while ((match = regex.exec(code)) !== null) {
        const [, objectName, scale] = match;

        elements.push({
            objectName,
            scale: parseFloat(scale),
        });
    }

    return elements.length > 0 ? { elements } : null;
}