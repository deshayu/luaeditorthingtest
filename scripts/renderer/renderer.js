export function renderCodLuaCode(parsedData, canvasId = 'hud-canvas')
{
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    const invertIfNeeded = (value, anchor) => (!anchor && value < 0 ? Math.abs(value) : value);

    const calculatePositionAndSize = (min, max, anchorMin, anchorMax, scale, dimension) => {
        const adjustedMin = invertIfNeeded(min, anchorMin) * scale;
        const adjustedMax = invertIfNeeded(max, anchorMax) * scale;

        let position, size;
        if (anchorMin && anchorMax) {
            position = adjustedMin;
            size = dimension - adjustedMin - adjustedMax;
        } else if (anchorMin) {
            position = adjustedMin;
            size = adjustedMax - adjustedMin;
        } else if (anchorMax) {
            position = dimension - adjustedMax;
            size = adjustedMax - adjustedMin;
        } else {
            position = adjustedMin;
            size = adjustedMax - adjustedMin;
        }

        return { position, size };
    };

    const renderElement = ({ leftRight, topBottom, scale = 1 }) => {
        if (!leftRight || !topBottom) return;

        const { position: xPosition, size: containerWidth } = calculatePositionAndSize(
            leftRight.min,
            leftRight.max,
            leftRight.anchorLeft,
            leftRight.anchorRight,
            scale,
            width
        );

        const { position: yPosition, size: containerHeight } = calculatePositionAndSize(
            topBottom.min,
            topBottom.max,
            topBottom.anchorTop,
            topBottom.anchorBottom,
            scale,
            height
        );

        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillRect(xPosition, yPosition, containerWidth, containerHeight);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(xPosition, yPosition, containerWidth, containerHeight);
    };

    const elementsToRender = parsedData.elements.reduce((acc, element) => {
        const existingElement = acc.find(el => el.objectName === element.objectName) || { objectName: element.objectName };
        if (element.leftRight) existingElement.leftRight = element.leftRight;
        if (element.topBottom) existingElement.topBottom = element.topBottom;
        if (element.scale) existingElement.scale = element.scale;
        if (!acc.includes(existingElement)) acc.push(existingElement);
        return acc;
    }, []);

    if (elementsToRender.length === 0) return;

    elementsToRender.forEach(renderElement);
}