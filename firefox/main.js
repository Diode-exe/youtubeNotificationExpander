(function() {
    'use strict';

    // Content scripts run in an isolated world in extensions. Inject into page
    // context so patching window.fetch affects YouTube's own network calls.
    if (document.documentElement.dataset.ytNotificationBellInjected === '1') {
        return;
    }
    document.documentElement.dataset.ytNotificationBellInjected = '1';

    // Read the user's preference from extension storage and inject it into
    // the page as a simple global flag so `injected.js` can access it.
    browser.storage.local.get("enableExpander").then((result) => {
        const inline = document.createElement('script');
        inline.textContent = 'window.__ytNotificationBellEnableExpander = ' + (!!result.enableExpander) + ';';
        (document.head || document.documentElement).appendChild(inline);
        inline.remove();

        const script = document.createElement('script');
        script.src = browser.runtime.getURL('injected.js');
        script.onload = () => script.remove();
        (document.head || document.documentElement).appendChild(script);
    });
})();