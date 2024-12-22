const tabsContainer = document.getElementById("tabs-container");
const addTabButton = document.getElementById("add-tab");
const iframeContainer = document.querySelector("iframe");

let tabs = [];
let activeTabIndex = 0;

function createTab(url = "server.html") {
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.textContent = "Tab " + (tabs.length + 1);
    
    const closeButton = document.createElement("span");
    closeButton.className = "close-tab-button";
    closeButton.textContent = "✖";
    closeButton.onclick = (e) => {
        e.stopPropagation();
        closeTab(tabs.indexOf(tab));
    };

    tab.appendChild(closeButton);
    tab.onclick = () => switchTab(tabs.indexOf(tab));
    tabsContainer.insertBefore(tab, addTabButton);
    tabs.push(tab);
    loadTab(url);
    switchTab(tabs.length - 1);
}

function switchTab(index) {
    if (activeTabIndex !== index) {
        tabs[activeTabIndex].classList.remove("active");
        activeTabIndex = index;
        tabs[activeTabIndex].classList.add("active");
        loadTab(`server.html`); // 現在のタブにURLをロード
    }
}

function loadTab(url) {
    iframeContainer.src = url;
}

function closeTab(index) {
    if (tabs.length > 1) {
        tabs[index].remove();
        tabs.splice(index, 1);
        if (activeTabIndex >= index) {
            activeTabIndex = Math.max(0, activeTabIndex - 1);
        }
        if (tabs.length > 0) {
            switchTab(activeTabIndex);
        } else {
            loadTab("server.html");
        }
    }
}

addTabButton.onclick = () => createTab();

// 初期タブの作成
createTab();
