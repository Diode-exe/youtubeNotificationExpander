function toggleExpander() {
    let checked = document.getElementById("enableExpander").checked;
    browser.storage.local.set({ enableExpander: checked });
}

export function shouldEnableExpander() {
    if (browser.storage.local.get("enableExpander")) {
        document.getElementById("enableExpander").checked = true;
        return true;
    }
    return false;
}

document.getElementById("enableExpander").addEventListener("change", toggleExpander);

// Initialize the checkbox state based on stored value
browser.storage.local.get("enableExpander").then((result) => {
    document.getElementById("enableExpander").checked = result.enableExpander || false;
});