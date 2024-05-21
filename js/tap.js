document.addEventListener('DOMContentLoaded', () => {
    const mineGround = document.getElementById('mine-ground');
    const earnedCoins = document.getElementById('earned-coins');
    const totalEl = document.getElementById('total');
    const remainderEl = document.getElementById('remainder');
    const pgEl = document.getElementById('progress');

    //const images = ['/images/minner-2.png', '/images/minner-3.png', '/images/minner-4.png', '/images/minner.png'];
    const images = ['/images/minner1.png', '/images/minner2.png', '/images/minner1.png'];
    let currentImageIndex = 0;
    let tapping = false;
    const allowMultiTap = true;
    const freq = 100;

    const total = 2500
    const fillSize = 4
    const coinPerTap = 2
    totalEl.innerText = total
    remainderEl.innerText = total
    pgEl.style.width = `${100}%`

    // Preload images
    var totalLoaded = 0
    const preloadedImages = [];

    const checkLoadFinish = () => {
        totalLoaded++
        if(totalLoaded == images.length) {
            document.getElementById('loading-screen').style.display = "none"
            document.getElementById('app').style.display = "flex"
        }
    }
    const checkLoadError = (e, src, i) => {
        const img = new Image();
        img.onload = checkLoadFinish
        img.onerror = (e, src) => {
            checkLoadError(e, src, i)
        }
        img.src = src;
        preloadedImages[i] = img;
    }

    var i = 0
    images.forEach((src) => {
        const img = new Image();
        img.onload = checkLoadFinish
        img.onerror = (e, src, i) => {
            checkLoadError(e, src, i)
        }
        img.src = src;
        preloadedImages.push(img);
    });

    mineGround.addEventListener('click', (event) => {
        if (!allowMultiTap && tapping) return;
        tapping = true;
        animateMiner(event.clientX, event.clientY);
        setTimeout(() => {
            tapping = false;
        }, freq * images.length);
    });

    function animateMiner(x, y) {
        let imageIndex = 0;
        const interval = setInterval(() => {
            mineGround.src = preloadedImages[imageIndex].src;
            imageIndex = (imageIndex + 1) % preloadedImages.length;
            if (imageIndex === 0) {
                clearInterval(interval);
            }
        }, freq);

        let remainder = parseInt(remainderEl.innerText, 10);
        if(remainder == 0) return

        // Show +2 animation
        const floatingText = document.createElement('div');
        floatingText.classList.add('floating-text');
        floatingText.innerText = `+${coinPerTap}`;
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
            coins += coinPerTap;
            earnedCoins.innerText = coins;

            let remainder = parseInt(remainderEl.innerText, 10);
            remainder -= 1;
            if(remainder >= 0) {
                remainderEl.innerText = remainder;

                pgEl.style.width = `${Math.round((remainder * 100) / total)}%`
            }

        }, 1000);
    }

    const fill = () => {
        setTimeout(() => {
            let remainder = parseInt(remainderEl.innerText, 10);
            if(remainder + fillSize <= total) {
                remainder += fillSize;
                remainderEl.innerText = remainder;
            }
            fill()
        }, 1000)
    }

    fill()
});