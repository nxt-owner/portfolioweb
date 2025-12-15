/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== PARALLAX ===============*/
let parallax = new Rellax('.parallax');

/*=============== GSAP ANIMATION ===============*/
gsap.from('.home__village', 1.2, { opacity: 0, y: 100, delay: .1 })
gsap.from('.home__christmas-tree', 1.2, { opacity: 0, y: 100, delay: .4 })
gsap.from('.home__pine', 1.2, { opacity: 0, y: 150, delay: .3 })
gsap.from('.home__mountain-2', 1.2, { opacity: 0, x: 150, delay: .5 })
gsap.from('.home__mountain-3', 1.2, { opacity: 0, x: -150, delay: .6 })
gsap.from('.home__mountain-1', 1.2, { opacity: 0, y: 250, delay: .7 })
gsap.from('.home__moon', 1.2, { opacity: 0, y: 200, delay: .8 })
gsap.from('.home__trineo', 1.2, { opacity: 0, x: -200, delay: .8 })
gsap.from('.home__title', 1.2, { opacity: 0, y: -60, delay: 1 })

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
})


/*share*/
const params = new URLSearchParams(window.location.search);

const name = params.get("name") || "Santa";
const msg =
    params.get("msg") ||
    "May your season be calm, bright, and full of quiet joy.";

document.getElementById("fromName").textContent = decodeURIComponent(name);
document.getElementById("message").textContent = decodeURIComponent(msg);

const shareBtn = document.getElementById("shareBtn");
const modal = document.getElementById("shareModal");
const cancelBtn = document.getElementById("cancelShare");
const sendBtn = document.getElementById("sendShare");
const copyBtn = document.getElementById("copyLink");

shareBtn.onclick = (e) => {
    e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
};

cancelBtn.onclick = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
};

sendBtn.onclick = async () => {
    const name = document.getElementById("shareName").value || "Santa";
    const message = document.getElementById("shareMessage").value ||
        "Wishing you a Merry Christmas and a Happy New Year!";

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?name=${encodeURIComponent(name)}&msg=${encodeURIComponent(message)}`;

    try {
        // Call TinyURL API
        const response = await fetch(`https://api.tinyurl.com/create?url=${encodeURIComponent(shareUrl)}&domain=tiny.one`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "yCZt9vcNqiYTYInfrBlKCXyxy9qmxb0YZjjV4XXyYaMh4RBvNyNinp1ZRk4a"
            },
            body: JSON.stringify({ url: shareUrl })
        });

        const data = await response.json();
        const shortUrl = data.data.tiny_url || shareUrl;

        // WhatsApp share
        const whatsappText = `🎄 Merry Christmas!\n\nOpen your card:\n${shortUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, "_blank");

    } catch (err) {
        console.error(err);
        // fallback to original link
        window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank");
    }

    modal.classList.remove("active");
    document.body.style.overflow = "";
};

copyBtn.onclick = async () => {
    const name =
        document.getElementById("shareName").value || "Santa";
    const message =
        document.getElementById("shareMessage").value ||
        "Wishing you a Merry Christmas and a Happy New Year!";

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?name=${encodeURIComponent(name)}&msg=${encodeURIComponent(message)}`;

    try {
        // Shorten the URL using TinyURL API
        const response = await fetch(`https://api.tinyurl.com/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer yCZt9vcNqiYTYInfrBlKCXyxy9qmxb0YZjjV4XXyYaMh4RBvNyNinp1ZRk4a"
            },
            body: JSON.stringify({
                url: shareUrl,
                domain: "tiny.one" // optional: short domain
            })
        });

        const data = await response.json();
        const shortUrl = data.data?.tiny_url || shareUrl; // fallback to full URL

        // Copy the short link to clipboard
        await navigator.clipboard.writeText(shortUrl);

        copyBtn.textContent = "Copied 🎄";
        setTimeout(() => (copyBtn.textContent = "Copy Link"), 1500);
    } catch (err) {
        console.error(err);
        alert("Copy failed. Please try again.");
    }
};




sr.reveal(`.about__data, .celebrate__img`, { origin: 'right' })
sr.reveal(`.about__img, .celebrate__data`, { origin: 'left' })
sr.reveal(`.send__card`, { interval: 100 })
sr.reveal(`.footer`)