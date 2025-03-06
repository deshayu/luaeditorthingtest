// Store the ACE editor instance globally
let editor;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Ace Editor for the given editor div
    const initializeEditor = (editorDiv) => {
        editor = ace.edit(editorDiv); // Store the editor instance globally
        editor.setTheme('ace/theme/monokai');
        editor.session.setMode('ace/mode/lua');
        editor.setShowPrintMargin(false);
        editor.session.setUseSoftTabs(true);
        editor.session.setTabSize(4);
        editor.session.setUseWrapMode(true);
    };

    // Find the editor container (the div with id 'editor')
    const editorDiv = document.getElementById('editor');
    if (editorDiv) {
        // Initialize the Ace editor directly inside this div
        initializeEditor(editorDiv);
    }
});
