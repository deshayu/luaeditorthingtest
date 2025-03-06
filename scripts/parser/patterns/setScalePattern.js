// patterns/setScalePattern.js
export function parse(code) {
    const setScalePattern = /setScale\(([^)]+)\)/;
    const match = code.match(setScalePattern);

    if (match) {
        return {
            scale: parseFloat(match[1]),
        };
    }
    return null; // Return null if no match is found
}