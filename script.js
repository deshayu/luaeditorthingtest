document.addEventListener('DOMContentLoaded', function () {
    // Initialize Ace Editor
    const editor = ace.edit('aceEditor');
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/lua');
    editor.setValue('', -1); // Start with an empty editor

    // Disable the print margin
    editor.setShowPrintMargin(false); // Add this line

    // Add guidelines and pixel numbers
    addGuidelines();

    // Resize canvas on window resize
    window.addEventListener('resize', resizeCanvas);

    // Initial resize
    resizeCanvas();

    // Divider functionality
    const divider = document.querySelector('.divider');
    const editorPanel = document.querySelector('.editor-panel');
    const displayPanel = document.querySelector('.display-panel');
    let isDragging = false;

    divider.addEventListener('mousedown', function (e) {
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        const containerWidth = document.querySelector('.split-container').offsetWidth;
        const editorWidth = (e.clientX / containerWidth) * 100;

        editorPanel.style.flex = `1 1 ${editorWidth}%`;
        displayPanel.style.flex = `1 1 ${100 - editorWidth}%`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Fullscreen toggle functionality
    const toggleFullscreenEditor = document.getElementById('toggleFullscreenEditor');
    const toggleFullscreenDisplay = document.getElementById('toggleFullscreenDisplay');

    toggleFullscreenEditor.addEventListener('click', function () {
        editorPanel.classList.toggle('fullscreen');
        displayPanel.classList.toggle('hidden');
    });
    
    toggleFullscreenDisplay.addEventListener('click', function () {
        displayPanel.classList.toggle('fullscreen');
        editorPanel.classList.toggle('hidden');
    });
});

// Function to add guidelines and pixel numbers
function addGuidelines() {
    const displayPanel = document.querySelector('.display-panel');
    const guidelines = document.createElement('div');
    guidelines.className = 'guidelines';

    // Add center guidelines
    const verticalLine = document.createElement('div');
    verticalLine.className = 'center-line vertical';
    guidelines.appendChild(verticalLine);

    const horizontalLine = document.createElement('div');
    horizontalLine.className = 'center-line horizontal';
    guidelines.appendChild(horizontalLine);

    // Add pixel numbers
    const pixelNumbersTop = document.createElement('div');
    pixelNumbersTop.className = 'pixel-numbers top';
    pixelNumbersTop.textContent = '0px';
    guidelines.appendChild(pixelNumbersTop);

    const pixelNumbersBottom = document.createElement('div');
    pixelNumbersBottom.className = 'pixel-numbers bottom';
    pixelNumbersBottom.textContent = '1080px';
    guidelines.appendChild(pixelNumbersBottom);

    const pixelNumbersLeft = document.createElement('div');
    pixelNumbersLeft.className = 'pixel-numbers left';
    pixelNumbersLeft.textContent = '0px';
    guidelines.appendChild(pixelNumbersLeft);

    const pixelNumbersRight = document.createElement('div');
    pixelNumbersRight.className = 'pixel-numbers right';
    pixelNumbersRight.textContent = '1920px';
    guidelines.appendChild(pixelNumbersRight);

    // Append guidelines to the display panel
    displayPanel.appendChild(guidelines);
}

// Function to resize the canvas
function resizeCanvas() {
    const canvas = document.getElementById('hudCanvas');
    const displayPanel = document.querySelector('.display-panel');

    // Get the dimensions of the display panel
    const width = displayPanel.clientWidth - 40; // Account for padding
    const height = displayPanel.clientHeight - 40; // Account for padding

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Optional: Redraw HUD elements here if needed
}