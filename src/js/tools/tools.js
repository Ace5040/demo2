function hashId(string) {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}


function degToRad(deg) {
    return (deg * Math.PI) / 180;
}



function hasChangesInArray(oldValue, newValue) {

    if (!oldValue) {
        return newValue.length > 0;
    }

    if (newValue.length !== oldValue.length) {
        return true;
    }

    let result = false;

    for (let i = 0; i < newValue.length; i++) {
        const oldLineValue = oldValue[i];
        const newLineValue = newValue[i];

        if (hasChanges(oldLineValue, newLineValue)) {
            result = true;
            break;
        }
    }

    return result;
}

export { hashId, degToRad,hasChangesInArray };
