document.addEventListener('DOMContentLoaded', function () {
    // Fullscreen toggle functionality
    const toggleFullscreenEditor = document.getElementById('toggleFullscreenEditor');
    const toggleFullscreenDisplay = document.getElementById('toggleFullscreenDisplay');

    toggleFullscreenEditor.addEventListener('click', function () {
        const editorPanel = document.querySelector('.editor-panel');
        const displayPanel = document.querySelector('.display-panel');

        editorPanel.classList.toggle('fullscreen');
        displayPanel.classList.toggle('hidden');
        
        // Resize canvas when going fullscreen
        resizeCanvas();
    });

    toggleFullscreenDisplay.addEventListener('click', function () {
        const editorPanel = document.querySelector('.editor-panel');
        const displayPanel = document.querySelector('.display-panel');

        displayPanel.classList.toggle('fullscreen');
        editorPanel.classList.toggle('hidden');

        // Resize canvas when going fullscreen
        resizeCanvas();
    });
});

// Function to handle resizing when going fullscreen
const resizeCanvas = () => {
    const canvas = document.getElementById('hudCanvas');
    const editorPanel = document.querySelector('.editor-panel');
    const displayPanel = document.querySelector('.display-panel');

    // If the editor is in fullscreen, adjust the canvas
    if (editorPanel.classList.contains('fullscreen') || displayPanel.classList.contains('fullscreen')) {
        if (canvas) {
            // Resize canvas to fit the full screen
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    } else {
        // Otherwise, resize it to normal mode (keeping it like you had it)
        const displayCanvas = document.getElementById('hudCanvas');
        const displayPanel = document.querySelector('.display-panel');
        if (!displayCanvas || !displayPanel) return;

        displayCanvas.width = displayPanel.clientWidth - 40;  // Padding removed
        displayCanvas.height = displayPanel.clientHeight - 40; // Padding removed
    }
};

// Initial resize call to set the canvas size on load
resizeCanvas();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    resizeCanvas();
});
