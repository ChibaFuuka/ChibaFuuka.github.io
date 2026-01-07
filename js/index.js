    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.style.display =
            menuToggle.classList.contains('active') ? 'flex' : 'none';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.style.display = 'none';
            menuToggle.classList.remove('active');
        });
    });
