function toggleExpander() {
    let checked = document.getElementById("enableExpander").checked;
    browser.storage.local.set({ enableExpander: checked });
    console.log("[YTBell] Expander toggled:", checked);
}

export function shouldEnableExpander() {
    if (browser.storage.local.get("enableExpander")) {
        document.getElementById("enableExpander").checked = true;
        console.log("[YTBell] Expander should be enabled.");
        return true;
    }
    console.log("[YTBell] Expander should not be enabled.");
    return false;
}

document.getElementById("enableExpander").addEventListener("change", toggleExpander);

// Initialize the checkbox state based on stored value
browser.storage.local.get("enableExpander").then((result) => {
    document.getElementById("enableExpander").checked = result.enableExpander || false;
});