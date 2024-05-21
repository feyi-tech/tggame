document.addEventListener('DOMContentLoaded', () => {
    const mineGround = document.getElementById('mine-ground');
    const earnedCoins = document.getElementById('earned-coins');
    const images = ['/images/minner-2.png', '/images/minner-3.png', '/images/minner-4.png', '/images/minner.png'];
    let currentImageIndex = 0;
    let tapping = false;
    let allowMultiTap = true
    let freq = 100

    mineGround.addEventListener('click', (event) => {
        if(!allowMultiTap && tapping) return
        tapping = true;
        animateMiner(event.clientX, event.clientY);
        setTimeout(() => {
            tapping = false;
        }, freq * images.length);
    });

    function animateMiner(x, y) {
        let imageIndex = 0;
        const interval = setInterval(() => {
            mineGround.src = images[imageIndex];
            imageIndex = (imageIndex + 1) % images.length;
            if (imageIndex === 0) {
                clearInterval(interval);
            }
        }, freq);

        // Show +2 animation
        const floatingText = document.createElement('div');
        floatingText.classList.add('floating-text');
        floatingText.innerText = '+2';
        document.body.appendChild(floatingText);
        floatingText.style.left = `${x}px`;
        floatingText.style.top = `${y}px`;

        // Animate the +2 text towards earned-coins element
        const earnedCoinsRect = earnedCoins.getBoundingClientRect();
        const floatingTextRect = floatingText.getBoundingClientRect();
        const deltaX = earnedCoinsRect.left + (earnedCoinsRect.width / 2) - (floatingTextRect.left + (floatingTextRect.width / 2));
        const deltaY = earnedCoinsRect.top - floatingTextRect.top;

        floatingText.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${deltaX}px, ${deltaY}px)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        // Update the coins count after the animation
        setTimeout(() => {
            floatingText.remove();
            let coins = parseInt(earnedCoins.innerText, 10);
            coins += 2;
            earnedCoins.innerText = coins;
        }, 1000);
    }
});