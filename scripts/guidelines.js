document.addEventListener('DOMContentLoaded', function () {
    // Add guidelines and pixel numbers
    addGuidelines();
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
