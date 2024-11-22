document.addEventListener('click',function (event) {
    // Get the mouse click coordinates
    const x = event.clientX;
    const y = event.clientY;


    console.log(`X: ${x} Y:${y}`,

    )
    // Get the clicked element
    const clickedElement = event.target; // Use event.target directly
    console.log('Clicked Element:',clickedElement);

    const referenceRect = clickedElement.getBoundingClientRect();
    console.log("Reference root",referenceRect)

    // Function to check if two rectangles are approximately aligned
    function isElementOnSameLine(element,tolerance = 2) {
        const rect = element.getBoundingClientRect();
        console.log("PARENT_ELEMENT",element,rect)

        return (
            true
            // false
            // Math.abs(rect.top - referenceRect.top) <= tolerance &&
            // Math.abs(rect.bottom - referenceRect.bottom) <= tolerance
        );
    }

    // Get the bounding rectangle of the clicked element


    // Collect all parent elements approximately aligned on the same line
    const alignedParents = [];
    let parentElement = clickedElement.parentElement;

    while (parentElement) {
        if (isElementOnSameLine(parentElement)) {
            alignedParents.push(parentElement);
        }
        parentElement = parentElement.parentElement;
    }

    console.log('Aligned Parent Elements:',alignedParents);

});
