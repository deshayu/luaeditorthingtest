document.addEventListener('DOMContentLoaded', function () {
    const divider = document.getElementById('divider');
    const editorPanel = document.querySelector('.editor-panel');
    let isResizing = false;

    // Start resizing when the mouse is pressed down on the divider
    divider.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.userSelect = 'none'; // Disable text selection during drag
        document.body.style.cursor = 'ew-resize'; // Change cursor to resize

        // Track mouse movement
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopResizing);
    });

    // Function to handle resizing
    function onMouseMove(e) {
        if (isResizing) {
            // Get the width of the editor panel based on mouse position
            const newWidth = e.clientX;
            const minWidth = 200;  // Minimum width of the editor panel
            const maxWidth = window.innerWidth - 300; // Maximum width (considering the HUD panel)

            if (newWidth > minWidth && newWidth < maxWidth) {
                editorPanel.style.width = newWidth + 'px';
            }
        }
    }

    // Stop resizing when mouse is released
    function stopResizing() {
        isResizing = false;
        document.body.style.cursor = 'default'; // Reset cursor
        document.body.style.userSelect = ''; // Enable text selection
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopResizing);
    }
});
