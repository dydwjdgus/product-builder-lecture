const gridContainer = document.getElementById('grid-container');
const colorPalette = document.getElementById('color-palette');
const eraserBtn = document.getElementById('eraser');
const resetBtn = document.getElementById('reset');
const downloadBtn = document.getElementById('download');

const gridSize = 20;
let selectedColor = '#000000'; // Default color is black

// Create Grid
for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    gridContainer.appendChild(cell);
}

// Color Selection
colorPalette.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-box')) {
        selectedColor = e.target.style.backgroundColor;
        // Remove selected class from all color boxes
        document.querySelectorAll('.color-box').forEach(box => {
            box.classList.remove('selected');
        });
        // Add selected class to the clicked color box
        e.target.classList.add('selected');
    }
});

// Drawing
gridContainer.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('grid-cell')) {
        e.target.style.backgroundColor = selectedColor;
    }
});

gridContainer.addEventListener('mouseover', (e) => {
    if (e.buttons === 1 && e.target.classList.contains('grid-cell')) { // Check if mouse is down
        e.target.style.backgroundColor = selectedColor;
    }
});


// Eraser
eraserBtn.addEventListener('click', () => {
    selectedColor = '#ffffff'; // Set color to white for erasing
    document.querySelectorAll('.color-box').forEach(box => {
        box.classList.remove('selected');
    });
});

// Reset
resetBtn.addEventListener('click', () => {
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.style.backgroundColor = '#ffffff';
    });
});

// Download
downloadBtn.addEventListener('click', () => {
    html2canvas(gridContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
