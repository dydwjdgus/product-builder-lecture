const gridContainer = document.getElementById('grid-container');
const colorPalette = document.getElementById('color-palette');
const eraserBtn = document.getElementById('eraser');
const resetBtn = document.getElementById('reset');
const downloadBtn = document.getElementById('download');
const themeToggle = document.getElementById('theme-toggle');

const gridSize = 20;
let selectedColor = '#000000';

// Theme Management
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Create Grid
function createGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridContainer.appendChild(cell);
    }
}
createGrid();

// Color Selection
colorPalette.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-box')) {
        selectedColor = e.target.style.backgroundColor;
        document.querySelectorAll('.color-box').forEach(box => {
            box.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }
});

// Drawing Logic
let isDrawing = false;

gridContainer.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('grid-cell')) {
        isDrawing = true;
        e.target.style.backgroundColor = selectedColor;
    }
});

gridContainer.addEventListener('mouseover', (e) => {
    if (isDrawing && e.target.classList.contains('grid-cell')) {
        e.target.style.backgroundColor = selectedColor;
    }
});

window.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Eraser
eraserBtn.addEventListener('click', () => {
    selectedColor = 'transparent'; 
    document.querySelectorAll('.color-box').forEach(box => {
        box.classList.remove('selected');
    });
});

// Reset
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the board?')) {
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.style.backgroundColor = '';
        });
    }
});

// Download as PNG
downloadBtn.addEventListener('click', () => {
    const originalBorder = gridContainer.style.border;
    gridContainer.style.border = 'none'; // Optional: remove border for clean export
    
    html2canvas(gridContainer, {
        backgroundColor: null, // Transparent background if cells are empty
        scale: 2 // Higher quality
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        gridContainer.style.border = originalBorder;
    });
});
