// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "CAPTURE_SCREENSHOT") {
//         const tabId = sender.tab.id;

//         // Attach debugger to the tab
//         chrome.debugger.attach({ tabId: tabId }, '1.3', () => {
//             chrome.debugger.sendCommand({ tabId: tabId }, 'Page.captureScreenshot', {}, (response) => {
//                 if (chrome.runtime.lastError) {
//                     console.error("Error capturing screenshot:", chrome.runtime.lastError.message);
//                     sendResponse({ success: false, error: chrome.runtime.lastError.message });
//                 } else {
//                     // Capture was successful, send the screenshot back to the content script
//                     chrome.tabs.sendMessage(tabId, {
//                         type: "RECEIVE_SCREENSHOT",
//                         screenshot: response.data // Base64 image data
//                     });
//                     sendResponse({ success: true });
//                 }
//                 // Detach debugger after the command is sent
//                 chrome.debugger.detach({ tabId: tabId });
//             });
//         });

//         return true; // Keep the message channel open for sendResponse
//     }
// });
