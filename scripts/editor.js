// Store the ACE editor instance globally
let editor;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Ace Editor for a given editor div
    const initializeEditor = (editorDiv) => {
        editor = ace.edit(editorDiv); // Store the editor instance globally
        editor.setTheme('ace/theme/monokai');
        editor.session.setMode('ace/mode/lua');
        editor.setShowPrintMargin(false);
        editor.session.setUseSoftTabs(true);
        editor.session.setTabSize(4);
        editor.session.setUseWrapMode(true);
    };

    // Set the callback for initializing the editor in TabsModule
    TabsModule.setInitializeEditorCallback(initializeEditor);

    // Ensure the first tab has an editor
    const firstTab = TabsModule.getTab(TabsModule.getCurrentTabId());
    if (firstTab) {
        firstTab.editor = initializeEditor(firstTab.editorDiv);
    }
});
