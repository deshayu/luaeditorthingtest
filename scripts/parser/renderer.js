export function renderCodLuaCode(parsedData, canvasId = 'hud-canvas') {
    const { leftRight, topBottom, scale = 1 } = parsedData; // Default scale to 1 if not provided

    let canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas with ID "${canvasId}" not found.`);
        return;
    }

    let ctx = canvas.getContext('2d');

    // Get the canvas dimensions
    const width = canvas.width;
    const height = canvas.height;

    // Calculate container dimensions with scaling applied
    let containerWidth = (leftRight.max - leftRight.min) * scale;
    let containerHeight = (topBottom.max - topBottom.min) * scale;

    // Calculate center of the element based on the defined bounds
    const centerX = (leftRight.min + leftRight.max) / 2;
    const centerY = (topBottom.min + topBottom.max) / 2;

    // Default xPosition calculation (for centering if no anchors are set)
    let xPosition = (width / 2) + (centerX * scale) - (containerWidth / 2);
    
    // Adjust xPosition based on left-right anchors
    if (leftRight.anchorLeft && leftRight.anchorRight) {
        // If both anchors are true, fill the entire width of the screen
        xPosition = 0;  // Start from the left edge
        containerWidth = width;  // Make the container span the full width of the canvas
    } else if (leftRight.anchorLeft) {
        // If only the left anchor is true, align to the left
        xPosition = leftRight.min * scale;
    } else if (leftRight.anchorRight) {
        // If only the right anchor is true, align to the right
        xPosition = width - (leftRight.max * scale);
    }

    // Default yPosition calculation (for centering if no anchors are set)
    let yPosition = (height / 2) + (centerY * scale) - (containerHeight / 2);
    
    // Adjust yPosition based on top-bottom anchors
    if (topBottom.anchorTop && topBottom.anchorBottom) {
        // If both top and bottom anchors are true, fill the entire height of the screen
        yPosition = 0;  // Start from the top edge
        containerHeight = height;  // Make the container span the full height of the canvas
    } else if (topBottom.anchorTop) {
        // If only the top anchor is true, align to the top
        yPosition = topBottom.min * scale;
    } else if (topBottom.anchorBottom) {
        // If only the bottom anchor is true, align to the bottom
        yPosition = height - (topBottom.max * scale);
    }

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, width, height);

    // Draw the visual representation of the CoD Lua UI container (e.g., a rectangle)
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';  // Semi-transparent green box
    ctx.fillRect(xPosition, yPosition, containerWidth, containerHeight);

    // Optional: Add borders to visualize the container bounds
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(xPosition, yPosition, containerWidth, containerHeight);

    // Optional: Add text or other visual elements to represent properties
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(`Position: (${xPosition}, ${yPosition})`, 10, 30);
    ctx.fillText(`Size: ${containerWidth}x${containerHeight}`, 10, 60);
}