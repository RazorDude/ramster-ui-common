/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const getNested = (/**
 * @param {?} parent
 * @param {?} field
 * @param {?=} options
 * @return {?}
 */
(parent, field, options) => {
    if ((typeof parent !== 'object') || (parent === null) || (typeof field !== 'string') || !field.length) {
        return undefined;
    }
    const { arrayItemsShouldBeUnique } = (options || ((/** @type {?} */ ({}))));
    /** @type {?} */
    let fieldData = field.split('.');
    /** @type {?} */
    let fieldDataLength = fieldData.length;
    /** @type {?} */
    let currentElement = parent;
    for (let i = 0; i < fieldDataLength; i++) {
        if ((typeof currentElement === 'undefined') || (currentElement === null)) {
            return undefined;
        }
        /** @type {?} */
        let innerElementName = fieldData[i]
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        ;
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        if (innerElementName.charAt(0) === '$') {
            /** @type {?} */
            let closingBracketFound = false;
            /** @type {?} */
            let closingBracketIndex = i + 1;
            while (closingBracketIndex < fieldDataLength) {
                /** @type {?} */
                const element = fieldData[closingBracketIndex]
                // false alarm - there's another $ opening before the current one closed - so the current one must be just a variable name, not a bracket
                ;
                // false alarm - there's another $ opening before the current one closed - so the current one must be just a variable name, not a bracket
                if (element.charAt(0) === '$') {
                    break;
                }
                // found it !
                if (element.charAt(element.length - 1) === '$') {
                    closingBracketFound = true;
                    break;
                }
                closingBracketIndex++;
            }
            if (closingBracketFound) {
                for (let j = i + 1; j <= closingBracketIndex; j++) {
                    innerElementName += `.${fieldData[j]}`;
                }
                i = closingBracketIndex;
            }
        }
        /** @type {?} */
        let nextElement = currentElement[innerElementName];
        if (typeof nextElement === 'undefined') {
            return undefined;
        }
        // if the next element is an array, prepare to return an array of the inner items
        if (nextElement instanceof Array) {
            // if this is the last item, just return the array
            if (i === (fieldDataLength - 1)) {
                return nextElement;
            }
            // if the next item is not an index, recursively call self for each item of the array
            if (isNaN(parseInt(fieldData[i + 1], 10))) {
                currentElement = [];
                /** @type {?} */
                let innerPath = '';
                for (let j = i + 1; j < fieldDataLength; j++) {
                    innerPath += `${fieldData[j]}${j < (fieldDataLength - 1) ? '.' : ''}`;
                }
                nextElement.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => {
                    /** @type {?} */
                    let innerValue = getNested(item, innerPath);
                    if (typeof innerValue !== 'undefined') {
                        // if the innerValue is an array too, merge it with the currentElement - this way we can have nested arrays without indexes
                        if (innerValue instanceof Array) {
                            innerValue.forEach((/**
                             * @param {?} innerValueItem
                             * @return {?}
                             */
                            (innerValueItem) => {
                                if (!arrayItemsShouldBeUnique || (arrayItemsShouldBeUnique && (currentElement.indexOf(innerValueItem) === -1))) {
                                    currentElement.push(innerValueItem);
                                }
                            }));
                            return;
                        }
                        if (!arrayItemsShouldBeUnique || (arrayItemsShouldBeUnique && (currentElement.indexOf(innerValue) === -1))) {
                            currentElement.push(innerValue);
                        }
                    }
                }));
                return currentElement;
            }
        }
        currentElement = nextElement;
    }
    return currentElement;
});
/** @type {?} */
export const setNested = (/**
 * @param {?} parent
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
(parent, field, value) => {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJlbHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJ1dGlscy90b29sYmVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sT0FBTyxTQUFTOzs7Ozs7QUFBRyxDQUN4QixNQUFXLEVBQ1gsS0FBYSxFQUNiLE9BQThDLEVBQ3hDLEVBQUU7SUFDUixJQUFJLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDdEcsT0FBTyxTQUFTLENBQUE7S0FDaEI7VUFDSyxFQUFDLHdCQUF3QixFQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxtQkFBQSxFQUFFLEVBQU8sQ0FBQyxDQUFDOztRQUN2RCxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1FBQy9CLGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTTs7UUFDbEMsY0FBYyxHQUFHLE1BQU07SUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsT0FBTyxjQUFjLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDekUsT0FBTyxTQUFTLENBQUE7U0FDaEI7O1lBQ0csZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuQyx1RkFBdUY7O1FBQXZGLHVGQUF1RjtRQUN2RixJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7O2dCQUNuQyxtQkFBbUIsR0FBRyxLQUFLOztnQkFDOUIsbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFD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Y0FBYyxHQUFHLFdBQVcsQ0FBQTtLQUM1QjtJQUNELE9BQU8sY0FBYyxDQUFBO0FBQ3RCLENBQUMsQ0FBQTs7QUFFRCxNQUFNLE9BQU8sU0FBUzs7Ozs7O0FBQUcsQ0FBQyxNQUFXLEVBQUUsS0FBYSxFQUFFLEtBQVUsRUFBVyxFQUFFOztVQUN0RSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUE7S0FDWjs7UUFDRyxhQUFhLEdBQUcsTUFBTTs7UUFDekIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFOztjQUMzQixTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUNwRCxPQUFPLEtBQUssQ0FBQTtTQUNaO1FBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUN4QztJQUNELGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7SUFDMUMsT0FBTyxJQUFJLENBQUE7QUFDWixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0TmVzdGVkID0gKFxyXG5cdHBhcmVudDogYW55LFxyXG5cdGZpZWxkOiBzdHJpbmcsXHJcblx0b3B0aW9ucz86IHthcnJheUl0ZW1zU2hvdWxkQmVVbmlxdWU/OiBib29sZWFufVxyXG4pOiBhbnkgPT4ge1xyXG5cdGlmICgodHlwZW9mIHBhcmVudCAhPT0gJ29iamVjdCcpIHx8IChwYXJlbnQgPT09IG51bGwpIHx8ICh0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSB8fCAhZmllbGQubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG5cdGNvbnN0IHthcnJheUl0ZW1zU2hvdWxkQmVVbmlxdWV9ID0gKG9wdGlvbnMgfHwgKHt9IGFzIGFueSkpXHJcblx0bGV0IGZpZWxkRGF0YSA9IGZpZWxkLnNwbGl0KCcuJyksXHJcblx0XHRmaWVsZERhdGFMZW5ndGggPSBmaWVsZERhdGEubGVuZ3RoLFxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBwYXJlbnRcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkRGF0YUxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAoKHR5cGVvZiBjdXJyZW50RWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHx8IChjdXJyZW50RWxlbWVudCA9PT0gbnVsbCkpIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdFx0fVxyXG5cdFx0bGV0IGlubmVyRWxlbWVudE5hbWUgPSBmaWVsZERhdGFbaV1cclxuXHRcdC8vIGxvZ2ljIGZvciBoYW5kbGluZyBzZXF1ZWxpemUtc3R5bGUgJGZvby5iYXIkIC0gc2hvdWxkIGJlIHRyZWF0ZWQgYXMgYSBzaW5nbGUgZWxlbWVudFxyXG5cdFx0aWYgKGlubmVyRWxlbWVudE5hbWUuY2hhckF0KDApID09PSAnJCcpIHtcclxuXHRcdFx0bGV0IGNsb3NpbmdCcmFja2V0Rm91bmQgPSBmYWxzZSxcclxuXHRcdFx0XHRjbG9zaW5nQnJhY2tldEluZGV4ID0gaSArIDFcclxuXHRcdFx0d2hpbGUgKGNsb3NpbmdCcmFja2V0SW5kZXggPCBmaWVsZERhdGFMZW5ndGgpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZmllbGREYXRhW2Nsb3NpbmdCcmFja2V0SW5kZXhdXHJcblx0XHRcdFx0Ly8gZmFsc2UgYWxhcm0gLSB0aGVyZSdzIGFub3RoZXIgJCBvcGVuaW5nIGJlZm9yZSB0aGUgY3VycmVudCBvbmUgY2xvc2VkIC0gc28gdGhlIGN1cnJlbnQgb25lIG11c3QgYmUganVzdCBhIHZhcmlhYmxlIG5hbWUsIG5vdCBhIGJyYWNrZXRcclxuXHRcdFx0XHRpZiAoZWxlbWVudC5jaGFyQXQoMCkgPT09ICckJykge1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gZm91bmQgaXQgIVxyXG5cdFx0XHRcdGlmIChlbGVtZW50LmNoYXJBdChlbGVtZW50Lmxlbmd0aCAtIDEpID09PSAnJCcpIHtcclxuXHRcdFx0XHRcdGNsb3NpbmdCcmFja2V0Rm91bmQgPSB0cnVlXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjbG9zaW5nQnJhY2tldEluZGV4KytcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY2xvc2luZ0JyYWNrZXRGb3VuZCkge1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSBpICsgMTsgaiA8PSBjbG9zaW5nQnJhY2tldEluZGV4OyBqKyspIHtcclxuXHRcdFx0XHRcdGlubmVyRWxlbWVudE5hbWUgKz0gYC4ke2ZpZWxkRGF0YVtqXX1gXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGkgPSBjbG9zaW5nQnJhY2tldEluZGV4XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCBuZXh0RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudE5hbWVdXHJcblx0XHRpZiAodHlwZW9mIG5leHRFbGVtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0XHR9XHJcblx0XHQvLyBpZiB0aGUgbmV4dCBlbGVtZW50IGlzIGFuIGFycmF5LCBwcmVwYXJlIHRvIHJldHVybiBhbiBhcnJheSBvZiB0aGUgaW5uZXIgaXRlbXNcclxuXHRcdGlmIChuZXh0RWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgaXRlbSwganVzdCByZXR1cm4gdGhlIGFycmF5XHJcblx0XHRcdGlmIChpID09PSAoZmllbGREYXRhTGVuZ3RoIC0gMSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV4dEVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBpZiB0aGUgbmV4dCBpdGVtIGlzIG5vdCBhbiBpbmRleCwgcmVjdXJzaXZlbHkgY2FsbCBzZWxmIGZvciBlYWNoIGl0ZW0gb2YgdGhlIGFycmF5XHJcblx0XHRcdGlmIChpc05hTihwYXJzZUludChmaWVsZERhdGFbaSArIDFdLCAxMCkpKSB7XHJcblx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBbXVxyXG5cdFx0XHRcdGxldCBpbm5lclBhdGggPSAnJ1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSBpICsgMTsgaiA8IGZpZWxkRGF0YUxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRpbm5lclBhdGggKz0gYCR7ZmllbGREYXRhW2pdfSR7aiA8IChmaWVsZERhdGFMZW5ndGggLSAxKSA/ICcuJyA6ICcnfWBcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmV4dEVsZW1lbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IGlubmVyVmFsdWUgPSBnZXROZXN0ZWQoaXRlbSwgaW5uZXJQYXRoKVxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpbm5lclZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHQvLyBpZiB0aGUgaW5uZXJWYWx1ZSBpcyBhbiBhcnJheSB0b28sIG1lcmdlIGl0IHdpdGggdGhlIGN1cnJlbnRFbGVtZW50IC0gdGhpcyB3YXkgd2UgY2FuIGhhdmUgbmVzdGVkIGFycmF5cyB3aXRob3V0IGluZGV4ZXNcclxuXHRcdFx0XHRcdFx0aWYgKGlubmVyVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdFx0XHRcdGlubmVyVmFsdWUuZm9yRWFjaCgoaW5uZXJWYWx1ZUl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICghYXJyYXlJdGVtc1Nob3VsZEJlVW5pcXVlIHx8IChhcnJheUl0ZW1zU2hvdWxkQmVVbmlxdWUgJiYgKGN1cnJlbnRFbGVtZW50LmluZGV4T2YoaW5uZXJWYWx1ZUl0ZW0pID09PSAtMSkpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRFbGVtZW50LnB1c2goaW5uZXJWYWx1ZUl0ZW0pXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAoIWFycmF5SXRlbXNTaG91bGRCZVVuaXF1ZSB8fCAoYXJyYXlJdGVtc1Nob3VsZEJlVW5pcXVlICYmIChjdXJyZW50RWxlbWVudC5pbmRleE9mKGlubmVyVmFsdWUpID09PSAtMSkpKSB7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudEVsZW1lbnQucHVzaChpbm5lclZhbHVlKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudFxyXG5cdH1cclxuXHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG5cdGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZC5zcGxpdCgnLicpXHJcblx0aWYgKCFmaWVsZE5hbWVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50LFxyXG5cdFx0bG9vcEVuZCA9IGZpZWxkTmFtZXMubGVuZ3RoIC0gMVxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcEVuZDsgaSsrKSB7XHJcblx0XHRjb25zdCBmaWVsZE5hbWUgPSBmaWVsZE5hbWVzW2ldXHJcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudFtmaWVsZE5hbWVdXHJcblx0fVxyXG5cdGN1cnJlbnRQYXJlbnRbZmllbGROYW1lc1tsb29wRW5kXV0gPSB2YWx1ZVxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuIl19