document.addEventListener('DOMContentLoaded', async () => {
    const { renderCodLuaCode } = await import('../renderer/renderer.js');
    const { patternModules } = await import('./parserModules.js');

    // Ensure we are using the already initialized ACE editor
    const luaCode = editor.getValue(); // Get the Lua code from the editor

    // Function to handle parsing and rendering when code changes
    const handleEditorChange = async () => {
        const luaCode = editor.getValue(); // Get the Lua code from the editor
        const parsedData = await parseLuaCode(luaCode);
        renderCodLuaCode(parsedData); // Render the parsed code
    };

    // Listen for changes in the editor
    editor.on('change', handleEditorChange);

    // Initial parsing and rendering with the default code
    handleEditorChange();

    // Function to parse Lua code
    async function parseLuaCode(code) {
        const parsedData = { elements: [] };

        // Iterate over each pattern module to parse the Lua code
        for (const modulePath of patternModules) {
            const { parse } = await import(modulePath);
            const result = parse(code);
            if (result?.elements) {
                parsedData.elements.push(...result.elements);
            }
        }

        return parsedData;
    }
});
