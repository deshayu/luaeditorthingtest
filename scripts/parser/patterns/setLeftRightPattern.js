// patterns/setLeftRightPattern.js
export function parse(code) {
    const setLeftRightPattern = /setLeftRight\(([^,]+), ([^,]+), ([^,]+), ([^,]+)\)/;
    const match = code.match(setLeftRightPattern);

    if (match) {
        return {
            leftRight: {
                anchorLeft: match[1].trim() === 'true',  // Convert to boolean
                anchorRight: match[2].trim() === 'true', // Convert to boolean
                min: parseFloat(match[3]),
                max: parseFloat(match[4]),
            },
        };
    }
    return null; // Return null if no match is found
}