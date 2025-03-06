// patterns/setTopBottomPattern.js
export function parse(code) {
    const setTopBottomPattern = /setTopBottom\(([^,]+), ([^,]+), ([^,]+), ([^,]+)\)/;
    const match = code.match(setTopBottomPattern);

    if (match) {
        return {
            topBottom: {
                anchorTop: match[1].trim() === 'true',    // Convert to boolean
                anchorBottom: match[2].trim() === 'true', // Convert to boolean
                min: parseFloat(match[3]),
                max: parseFloat(match[4]),
            },
        };
    }
    return null; // Return null if no match is found
}