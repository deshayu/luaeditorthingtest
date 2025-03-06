// tabs.js
const TabsModule = (() => {
    const tabsContainer = document.getElementById('tabs-container');
    const editorContainer = document.getElementById('editor-container');
    const newTabBtn = document.getElementById('new-tab-btn');
    let currentTabId = null;
    const tabs = {}; // Stores all open tabs and their editors

    // Callback function to initialize the editor (will be set by editor.js)
    let initializeEditorCallback = null;

    // Create a new tab
    const createNewTab = () => {
        const tabId = `tab-${Date.now()}`;
        const tabButton = createTabButton(tabId);
        const editorDiv = createEditorDiv(tabId);

        // Store the tab data
        tabs[tabId] = { tabButton, editorDiv };

        // Append tab button and activate the new tab
        tabsContainer.appendChild(tabButton);
        switchToTab(tabId);

        // Initialize the editor for the new tab (if callback is set)
        if (initializeEditorCallback) {
            const editor = initializeEditorCallback(editorDiv);
            tabs[tabId].editor = editor; // Store the editor in the tab object
        }

        return { tabId, editorDiv };
    };

    // Create a tab button
    const createTabButton = (tabId) => {
        const tabButton = document.createElement('button');
        tabButton.textContent = `Tab ${Object.keys(tabs).length + 1}`;
        tabButton.classList.add('tab');
        tabButton.dataset.tabId = tabId;

        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.classList.add('close-tab');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent tab switch when closing
            closeTab(tabId);
        });

        tabButton.appendChild(closeBtn);
        tabButton.addEventListener('click', () => switchToTab(tabId));

        // Show close button on hover or active state
        tabButton.addEventListener('mouseenter', () => closeBtn.style.display = 'inline');
        tabButton.addEventListener('mouseleave', () => {
            if (currentTabId !== tabId) closeBtn.style.display = 'none';
        });

        return tabButton;
    };

    // Create an editor div
    const createEditorDiv = (tabId) => {
        const editorDiv = document.createElement('div');
        editorDiv.classList.add('editor-instance');
        editorContainer.appendChild(editorDiv);
        return editorDiv;
    };

    // Switch to a specific tab
    const switchToTab = (tabId) => {
        if (currentTabId === tabId) return;

        // Hide all editors and show the selected one
        Object.values(tabs).forEach(tab => {
            tab.editorDiv.style.display = 'none';
            // Ensure the close button is hidden for inactive tabs
            tab.tabButton.querySelector('.close-tab').style.display = 'none';
        });
        tabs[tabId].editorDiv.style.display = 'block';

        // Update active tab state
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        tabs[tabId].tabButton.classList.add('active');

        // Show close button for the active tab
        tabs[tabId].tabButton.querySelector('.close-tab').style.display = 'inline';

        currentTabId = tabId;
    };

    // Close a tab
    const closeTab = (tabId) => {
        if (!tabs[tabId]) return;

        // Remove tab button and editor
        tabs[tabId].tabButton.remove();
        tabs[tabId].editorDiv.remove();
        if (tabs[tabId].editor) {
            tabs[tabId].editor.destroy(); // Destroy the Ace Editor instance
        }
        delete tabs[tabId];

        // Switch to another tab if available, else create a new tab
        const remainingTabs = Object.keys(tabs);
        if (remainingTabs.length > 0) {
            switchToTab(remainingTabs[0]);
        } else {
            createNewTab();
        }
    };

    // Set the callback for initializing the editor
    const setInitializeEditorCallback = (callback) => {
        initializeEditorCallback = callback;
    };

    // Initialize the module
    const init = () => {
        newTabBtn.addEventListener('click', createNewTab);
        window.addEventListener('beforeunload', () => {
            Object.values(tabs).forEach(tab => {
                if (tab.editor) tab.editor.destroy(); // Destroy Ace Editor if it exists
            });
        });

        // Ensure at least one tab exists
        createNewTab();
    };

    // Expose public methods
    return {
        init,
        createNewTab,
        switchToTab,
        closeTab,
        setInitializeEditorCallback,
        getCurrentTabId: () => currentTabId,
        getTab: (tabId) => tabs[tabId],
    };
})();

// Initialize the Tabs Module when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    TabsModule.init();
});