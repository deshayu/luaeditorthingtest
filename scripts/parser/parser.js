// parser.js
document.addEventListener('DOMContentLoaded', async () => {
    // Dynamically import the renderer module
    const { renderCodLuaCode } = await import('./renderer.js');

    // Example Lua Code to be parsed
    const luaCode = `
        local ZmNotifBGBContainerFactory = CoD.ZmNotifBGB_ContainerFactory.new(self, controller)
        ZmNotifBGBContainerFactory:setLeftRight(true, true, -234, 234)
        ZmNotifBGBContainerFactory:setTopBottom(false, false, -9, 371)
        ZmNotifBGBContainerFactory:setScale(2)
    `;

    // Parse the Lua code
    const parsedData = await parseLuaCode(luaCode);

    // Send the parsed data to the renderer
    renderCodLuaCode(parsedData);
});

// Function to parse Lua code
async function parseLuaCode(code) {
    // Import the list of pattern modules
    const { patternModules } = await import('./parserModules.js');

    // Dynamically import and apply all pattern modules
    const parsedData = {};
    for (const modulePath of patternModules) {
        const { parse } = await import(modulePath);
        const result = parse(code);
        if (result) {
            Object.assign(parsedData, result);
        }
    }

    return parsedData;
}