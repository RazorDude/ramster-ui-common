/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const getNested = (parent, field) => {
    if ((typeof parent !== 'object') || (typeof field !== 'string')) {
        return null;
    }
    /** @type {?} */
    let fieldData = field.split('.');
    /** @type {?} */
    let currentElement = parent;
    for (let i in fieldData) {
        /** @type {?} */
        let innerElement = fieldData[i];
        if (currentElement === null) {
            return currentElement;
        }
        if ((typeof currentElement === 'undefined') || (typeof currentElement[innerElement] === 'undefined')) {
            return currentElement;
        }
        currentElement = currentElement[innerElement];
    }
    return currentElement;
};
/** @type {?} */
export const setNested = (parent, field, value) => {
    /** @type {?} */
    const fieldNames = field.split('.');
    if (!fieldNames.length) {
        return false;
    }
    /** @type {?} */
    let currentParent = parent;
    /** @type {?} */
    let loopEnd = fieldNames.length - 1;
    for (let i = 0; i < loopEnd; i++) {
        /** @type {?} */
        const fieldName = fieldNames[i];
        if (typeof currentParent[fieldName] === 'undefined') {
            return false;
        }
        currentParent = currentParent[fieldName];
    }
    currentParent[fieldNames[loopEnd]] = value;
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJlbHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJ1dGlscy90b29sYmVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sT0FBTyxTQUFTLEdBQUcsQ0FBQyxNQUFXLEVBQUUsS0FBYSxFQUFPLEVBQUU7SUFDNUQsSUFBSSxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLEVBQUU7UUFDL0QsT0FBTyxJQUFJLENBQUE7S0FDWDs7UUFDRSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1FBQy9CLGNBQWMsR0FBRyxNQUFNO0lBQ3hCLEtBQUssSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFOztZQUNwQixZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDNUIsT0FBTyxjQUFjLENBQUE7U0FDckI7UUFDRCxJQUFJLENBQUMsT0FBTyxjQUFjLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxXQUFXLENBQUMsRUFBRTtZQUNyRyxPQUFPLGNBQWMsQ0FBQTtTQUNyQjtRQUNELGNBQWMsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUE7S0FDN0M7SUFDRCxPQUFPLGNBQWMsQ0FBQTtBQUN0QixDQUFDOztBQUVELE1BQU0sT0FBTyxTQUFTLEdBQUcsQ0FBQyxNQUFXLEVBQUUsS0FBYSxFQUFFLEtBQVUsRUFBVyxFQUFFOztVQUN0RSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUE7S0FDWjs7UUFDRyxhQUFhLEdBQUcsTUFBTTs7UUFDekIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFOztjQUMzQixTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUNwRCxPQUFPLEtBQUssQ0FBQTtTQUNaO1FBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUN4QztJQUNELGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7SUFDMUMsT0FBTyxJQUFJLENBQUE7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueSA9PiB7XHJcblx0aWYgKCh0eXBlb2YgcGFyZW50ICE9PSAnb2JqZWN0JykgfHwgKHR5cGVvZiBmaWVsZCAhPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0bGV0IGZpZWxkRGF0YSA9IGZpZWxkLnNwbGl0KCcuJyksXHJcblx0XHRjdXJyZW50RWxlbWVudCA9IHBhcmVudFxyXG5cdGZvciAobGV0IGkgaW4gZmllbGREYXRhKSB7XHJcblx0XHRsZXQgaW5uZXJFbGVtZW50ID0gZmllbGREYXRhW2ldXHJcblx0XHRpZiAoY3VycmVudEVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBjdXJyZW50RWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh0eXBlb2YgY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50XSA9PT0gJ3VuZGVmaW5lZCcpKSB7XHJcblx0XHRcdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudFtpbm5lckVsZW1lbnRdXHJcblx0fVxyXG5cdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcblx0Y29uc3QgZmllbGROYW1lcyA9IGZpZWxkLnNwbGl0KCcuJylcclxuXHRpZiAoIWZpZWxkTmFtZXMubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblx0bGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQsXHJcblx0XHRsb29wRW5kID0gZmllbGROYW1lcy5sZW5ndGggLSAxXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsb29wRW5kOyBpKyspIHtcclxuXHRcdGNvbnN0IGZpZWxkTmFtZSA9IGZpZWxkTmFtZXNbaV1cclxuXHRcdGlmICh0eXBlb2YgY3VycmVudFBhcmVudFtmaWVsZE5hbWVdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV1cclxuXHR9XHJcblx0Y3VycmVudFBhcmVudFtmaWVsZE5hbWVzW2xvb3BFbmRdXSA9IHZhbHVlXHJcblx0cmV0dXJuIHRydWVcclxufVxyXG4iXX0=