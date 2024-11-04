const circles = document.querySelectorAll('.circle');

function mixColors(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const mixedColor = {
        r: Math.floor((rgb1.r + rgb2.r) / 2),
        g: Math.floor((rgb1.g + rgb2.g) / 2),
        b: Math.floor((rgb1.b + rgb2.b) / 2)
    };
    return rgbToHex(mixedColor.r, mixedColor.g, mixedColor.b);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function checkCollision(circle1, circle2) {
    const rect1 = circle1.getBoundingClientRect();
    const rect2 = circle2.getBoundingClientRect();
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

function animate() {
    circles.forEach((circle1) => {
        circles.forEach((circle2) => {
            if (circle1 !== circle2 && checkCollision(circle1, circle2)) {
                circle1.style.transform = 'scale(1.2)';
                circle2.style.transform = 'scale(1.2)';
                const color1 = window.getComputedStyle(circle1).backgroundColor;
                const color2 = window.getComputedStyle(circle2).backgroundColor;
                const mixedColor = mixColors(color1, color2);
                circle1.style.backgroundColor = mixedColor;
                circle2.style.backgroundColor = mixedColor;
            } else {
                circle1.style.transform = 'scale(1)';
                circle2.style.transform = 'scale(1)';
            }
        });
    });
    requestAnimationFrame(animate);
}

animate();
