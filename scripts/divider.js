document.addEventListener('DOMContentLoaded', () => {
    const divider = document.getElementById('divider');
    const editorPanel = document.querySelector('.editor-panel');
    const minWidth = 200; // Minimum width of the editor panel
    const maxWidth = window.innerWidth - 300; // Maximum width (considering the HUD panel)

    let isResizing = false;

    // Start resizing on mouse down
    divider.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.userSelect = 'none'; // Disable text selection during drag
        document.body.style.cursor = 'ew-resize'; // Change cursor to resize

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopResizing);
    });

    // Handle resizing
    const onMouseMove = (e) => {
        if (!isResizing) return;

        const newWidth = e.clientX;
        if (newWidth > minWidth && newWidth < maxWidth) {
            editorPanel.style.width = `${newWidth}px`;
        }
    };

    // Stop resizing
    const stopResizing = () => {
        isResizing = false;
        document.body.style.cursor = 'default'; // Reset cursor
        document.body.style.userSelect = ''; // Enable text selection
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopResizing);
    };
});