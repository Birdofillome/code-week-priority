function getFooterHTML() {
    const menuHTML = getMenuHTML();

    return `<footer class="footer">
        <div class="container">
            <div class="wrapper">
                <div class="logo"></div>
                <nav class="nav">
                    ${menuHTML}
                </nav>
            </div>
        </div>
    </footer>`;
}

function getMenuHTML() {
    const menuItems = [
    {
        label: "Shop and Learn",
        children: [
        { label: "Store" },
        { label: "Mac" },
        { label: "ipad" },
        { label: "iPhone" },
        { label: "Watch" },
        { label: "Vision" },
        { label: "AirPods" },
        { label: "TV & Home" },
        { label: "AirTag" },
        { label: "Accessories" },
        { label: "Gift Cards" },
        ],
    },
    {
        label: "Apple Wallet",
        children: [
        { label: "Wallet" },
        { label: "Apple Card" },
        { label: "Apple Pay" },
        { label: "Apple Cash" },
        ],
    },
    ];

    return `
    <ul class="menu">
        ${menuItems.map((item) => getMenuItemHTML(item)).join("")}
    </ul>
    `;
}

function getMenuItemHTML(options) {
    const { label, href = "#", children = [] } = options;

    const subitemsHTML = children
    .map((item) => `<li class="item subitem">${item.label}</li>`)
    .join("");
    const subMenuHTML = "<ul>" + subitemsHTML + "</ul>";

    return `<li class="item">
    <a href="${href}">${label}</a>
    ${children.length > 0 ? subMenuHTML : ""}
    </li>`;
}

export { getFooterHTML };