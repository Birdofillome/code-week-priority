function getHeaderHTML(){
    const menuHTML = getMenuHTML();

    return `
    <header>
        <div class="container">
            <div class="wrapper">
                <div class="Logo"></div>
                ${menuHTML}
            </div>
        </div>
    </header>
    `;
}

function getMenuHTML() {
    const menuItems = [
    { label: "I nostri prodotti", href:"https://www.apple.com/us-edu/store" },
    { label: "Cerca con Google", href: "https://google.it" },
    ];

    return `
    <nav class="nav">
        <ul class="list">
            ${menuItems.map((item) => getMenuItemHTML(item)).join("")}
        </ul>
    </nav>
    `;
}

function getMenuItemHTML(options = {}) {
    const { label, href = "#" } = options;

    return `
    <li class="item">
        <a href="${href}">${label}</a>
    </li>
    `;
}

export { getHeaderHTML };