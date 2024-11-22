

let parentElementCount = 0

document.addEventListener('click',(e) => {
    parentElementCount = 0

    let targetElement = {
        targetElement: {
            attributes: getElementAttributes(e.target.attributes),
            ...getElementDetails(e.target),
            parentElement: getNestedParents(e.target.parentElement),
            childrens: getChildAttributes(e.target),
            siblings: getSiblingAttributes(e.target),
        },

    }

    // Get the size of the targetElement in MB
    console.log('TARGET_ELEMENT',targetElement);

    console.log('Size of targetElement:',getObjectSizeInMB(targetElement),'KB');
    console.log('Size of the DOM:',getObjectSizeInMB(document.documentElement.outerHTML),'KB');
},true);



function getNestedParents(element) {
    if (!element || parentElementCount == 5) return null;

    ++parentElementCount

    return {
        attributes: getElementAttributes(element.attributes),
        ...getElementDetails(element),
        parentElement: getNestedParents(element.parentElement), // Recursively call for the parent
    };
}

// Function to calculate the size of an object in MB
function getObjectSizeInMB(obj) {
    const jsonString = JSON.stringify(obj); // Convert object to JSON string
    const byteSize = new TextEncoder().encode(jsonString).length; // Get the byte size
    return byteSize / (1024); // Convert byte size to MB
}

// Existing functions remain unchanged
function getElementAttributes(attributes) {
    if (!attributes) {
        return {};
    }
    return [...attributes].reduce((acc,attribute) => {
        if (attribute && attribute.name) {
            acc[attribute.name] = attribute.value;
        }
        return acc;
    },{});
}

function getSiblingAttributes(element) {
    const parentElement = element.parentElement;

    if (!parentElement || parentElement.children.length === 0) {
        return {
            precedingSiblings: [],
            followingSiblings: [],
        };
    }

    const siblings = Array.from(parentElement.children);
    const targetIndex = siblings.indexOf(element);
    let precedingSiblingsAttributes = [];
    let succeedingSiblingsAttributes = [];

    if (targetIndex > 0) {
        const precedingSiblings = siblings
            .slice(0,targetIndex)
            .filter((sibling) => sibling.nodeType === 1);

        precedingSiblingsAttributes = precedingSiblings.map((sibling,index) => ({
            ...getElementDetails(sibling),
            index: index + 1,
            attributes: getElementAttributes(sibling.attributes),
        }));
    }

    if (targetIndex < siblings.length - 1) {
        const succeedingSiblings = siblings
            .slice(targetIndex + 1)
            .filter((sibling) => sibling.nodeType === 1);

        succeedingSiblingsAttributes = succeedingSiblings.map((sibling,index) => ({
            ...getElementDetails(sibling),
            index: index + targetIndex + 1,
            attributes: getElementAttributes(sibling.attributes),
        }));
    }

    return {
        precedingSiblings: precedingSiblingsAttributes,
        followingSiblings: succeedingSiblingsAttributes,
    };
}

function getElementDetails(element) {
    return {
        tag_name: element?.localName,
        value: element?.value,
        inputType: element?.type,
        inner_text: element?.innerText,
    };
}

function getChildAttributes(element) {
    const childNodes = element.childNodes;
    const childAttributes = [];

    // Check if childNodes is defined and iterable
    if (childNodes && childNodes.length) {
        for (let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];

            if (childNode.nodeType === 1) {
                const attributes = getElementAttributes(childNode.attributes);
                const elementData = getElementDetails(childNode);
                childAttributes.push({
                    ...elementData,
                    index: i + 1,
                    attributes: attributes,
                });
            }
        }
    }

    return childAttributes;
}
