// Inject the page context script into the page
const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected.js');
script.onload = function () {
    this.remove(); // Clean up after injection
};
(document.head || document.documentElement).appendChild(script);

document.addEventListener('click',(event) => {
    const clickedElement = event.target;

    // Traverse up the DOM tree to check each ancestor
    let current = clickedElement;
    while (current) {
        // Send a request to the injected script to check if the current element has a click listener
        window.postMessage({
            type: 'checkClickListener',
            element: current
        },'*');

        // Listen for the result from the injected script
        window.addEventListener('message',function (responseEvent) {
            if (responseEvent.data && responseEvent.data.type === 'elementHasClickListener') {
                const hasListener = responseEvent.data.hasListener;
                const element = responseEvent.data.element;

                if (hasListener) {
                    console.log('Element with listener:',element);
                } else {
                    console.log('No listener on:',element);
                }
            }
        });

        // Move up to the parent element
        current = current.parentElement;
    }
},true); // Capture phase to catch the event before it's handled by the element itself
