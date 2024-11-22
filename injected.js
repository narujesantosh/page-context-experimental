(function () {
    // Track elements with click listeners
    const elementsWithClickListeners = new WeakSet();

    // Override `addEventListener` to track click listeners
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type,listener,options) {
        // if (type === 'click') {
        elementsWithClickListeners.add(this);
        // }
        return originalAddEventListener.call(this,type,listener,options);
    };

    // Override `onclick` property to track inline click handlers
    Object.defineProperty(HTMLElement.prototype,'onclick',{
        set(handler) {
            if (handler) {
                elementsWithClickListeners.add(this);
            }
            Object.defineProperty(this,'__onclick',{
                value: handler,
                writable: true,
                configurable: true,
            });
        },
        get() {
            return this.__onclick || null;
        },
    });

    Object.defineProperty(HTMLElement.prototype,'onmousedown',{
        set(handler) {
            if (handler) {
                elementsWithClickListeners.add(this);
            }
            Object.defineProperty(this,'__onmousedown',{
                value: handler,
                writable: true,
                configurable: true,
            });
        },
        get() {
            return this.__onmousedown || null;
        },
    });

    document.addEventListener('click',(event) => {
        console.log('TARGET_ELEMENT',event.target)
        let current = event.target;


        while (current) {
            if (elementsWithClickListeners.has(current)) {
                console.log('Clicked element with listener:',current);
                break;
            }
            current = current.parentElement;
        }
    },true);


    // Listen for messages from the content script
    // window.addEventListener('message',function (event) {
    //     if (event.data && event.data.type === 'checkClickListener') {
    //         const element = event.data.element;

    //         // Check if the element has a click listener attached
    //         const hasListener = elementsWithClickListeners.has(element);

    //         // Respond with the result
    //         window.postMessage({
    //             type: 'elementHasClickListener',
    //             hasListener: hasListener,
    //             element: element
    //         },'*');
    //     }
    // });
})();
