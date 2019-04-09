/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const getNested = (parent, field) => {
    if ((typeof parent !== 'object') || (parent === null) || (typeof field !== 'string') || !field.length) {
        return undefined;
    }
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
                nextElement.forEach((item, iIndex) => {
                    /** @type {?} */
                    let innerValue = getNested(item, innerPath);
                    if (typeof innerValue !== 'undefined') {
                        // if the innerValue is an array too, merge it with the currentElement - this way we can have nested arrays without indexes
                        if (innerValue instanceof Array) {
                            currentElement = currentElement.concat(innerValue);
                            return;
                        }
                        currentElement.push(innerValue);
                    }
                });
                return currentElement;
            }
        }
        currentElement = nextElement;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJlbHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJ1dGlscy90b29sYmVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sT0FBTyxTQUFTLEdBQUcsQ0FBQyxNQUFXLEVBQUUsS0FBYSxFQUFPLEVBQUU7SUFDNUQsSUFBSSxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3RHLE9BQU8sU0FBUyxDQUFBO0tBQ2hCOztRQUNHLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7UUFDL0IsZUFBZSxHQUFHLFNBQVMsQ0FBQyxNQUFNOztRQUNsQyxjQUFjLEdBQUcsTUFBTTtJQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxPQUFPLGNBQWMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUN6RSxPQUFPLFNBQVMsQ0FBQTtTQUNoQjs7WUFDRyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25DLHVGQUF1Rjs7UUFBdkYsdUZBQXVGO1FBQ3ZGLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTs7Z0JBQ25DLG1CQUFtQixHQUFHLEtBQUs7O2dCQUM5QixtQkFBbUIsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUM1QixPQUFPLG1CQUFtQixHQUFHLGVBQWUsRUFBRTs7c0JBQ3ZDLE9BQU8sR0FBRyxTQUFTLENBQUMsbUJBQW1CLENBQUM7Z0JBQzlDLHlJQUF5STs7Z0JBQXpJ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RyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksT0FBTyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ3BELE9BQU8sS0FBSyxDQUFBO1NBQ1o7UUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0tBQ3hDO0lBQ0QsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtJQUMxQyxPQUFPLElBQUksQ0FBQTtBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nKTogYW55ID0+IHtcclxuXHRpZiAoKHR5cGVvZiBwYXJlbnQgIT09ICdvYmplY3QnKSB8fCAocGFyZW50ID09PSBudWxsKSB8fCAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykgfHwgIWZpZWxkLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdH1cclxuXHRsZXQgZmllbGREYXRhID0gZmllbGQuc3BsaXQoJy4nKSxcclxuXHRcdGZpZWxkRGF0YUxlbmd0aCA9IGZpZWxkRGF0YS5sZW5ndGgsXHJcblx0XHRjdXJyZW50RWxlbWVudCA9IHBhcmVudFxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGREYXRhTGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmICgodHlwZW9mIGN1cnJlbnRFbGVtZW50ID09PSAndW5kZWZpbmVkJykgfHwgKGN1cnJlbnRFbGVtZW50ID09PSBudWxsKSkge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0XHR9XHJcblx0XHRsZXQgaW5uZXJFbGVtZW50TmFtZSA9IGZpZWxkRGF0YVtpXVxyXG5cdFx0Ly8gbG9naWMgZm9yIGhhbmRsaW5nIHNlcXVlbGl6ZS1zdHlsZSAkZm9vLmJhciQgLSBzaG91bGQgYmUgdHJlYXRlZCBhcyBhIHNpbmdsZSBlbGVtZW50XHJcblx0XHRpZiAoaW5uZXJFbGVtZW50TmFtZS5jaGFyQXQoMCkgPT09ICckJykge1xyXG5cdFx0XHRsZXQgY2xvc2luZ0JyYWNrZXRGb3VuZCA9IGZhbHNlLFxyXG5cdFx0XHRcdGNsb3NpbmdCcmFja2V0SW5kZXggPSBpICsgMVxyXG5cdFx0XHR3aGlsZSAoY2xvc2luZ0JyYWNrZXRJbmRleCA8IGZpZWxkRGF0YUxlbmd0aCkge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBmaWVsZERhdGFbY2xvc2luZ0JyYWNrZXRJbmRleF1cclxuXHRcdFx0XHQvLyBmYWxzZSBhbGFybSAtIHRoZXJlJ3MgYW5vdGhlciAkIG9wZW5pbmcgYmVmb3JlIHRoZSBjdXJyZW50IG9uZSBjbG9zZWQgLSBzbyB0aGUgY3VycmVudCBvbmUgbXVzdCBiZSBqdXN0IGEgdmFyaWFibGUgbmFtZSwgbm90IGEgYnJhY2tldFxyXG5cdFx0XHRcdGlmIChlbGVtZW50LmNoYXJBdCgwKSA9PT0gJyQnKSB7XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBmb3VuZCBpdCAhXHJcblx0XHRcdFx0aWYgKGVsZW1lbnQuY2hhckF0KGVsZW1lbnQubGVuZ3RoIC0gMSkgPT09ICckJykge1xyXG5cdFx0XHRcdFx0Y2xvc2luZ0JyYWNrZXRGb3VuZCA9IHRydWVcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNsb3NpbmdCcmFja2V0SW5kZXgrK1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjbG9zaW5nQnJhY2tldEZvdW5kKSB7XHJcblx0XHRcdFx0Zm9yIChsZXQgaiA9IGkgKyAxOyBqIDw9IGNsb3NpbmdCcmFja2V0SW5kZXg7IGorKykge1xyXG5cdFx0XHRcdFx0aW5uZXJFbGVtZW50TmFtZSArPSBgLiR7ZmllbGREYXRhW2pdfWBcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aSA9IGNsb3NpbmdCcmFja2V0SW5kZXhcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bGV0IG5leHRFbGVtZW50ID0gY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50TmFtZV1cclxuXHRcdGlmICh0eXBlb2YgbmV4dEVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWRcclxuXHRcdH1cclxuXHRcdC8vIGlmIHRoZSBuZXh0IGVsZW1lbnQgaXMgYW4gYXJyYXksIHByZXBhcmUgdG8gcmV0dXJuIGFuIGFycmF5IG9mIHRoZSBpbm5lciBpdGVtc1xyXG5cdFx0aWYgKG5leHRFbGVtZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0Ly8gaWYgdGhpcyBpcyB0aGUgbGFzdCBpdGVtLCBqdXN0IHJldHVybiB0aGUgYXJyYXlcclxuXHRcdFx0aWYgKGkgPT09IChmaWVsZERhdGFMZW5ndGggLSAxKSkge1xyXG5cdFx0XHRcdHJldHVybiBuZXh0RWxlbWVudFxyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGlmIHRoZSBuZXh0IGl0ZW0gaXMgbm90IGFuIGluZGV4LCByZWN1cnNpdmVseSBjYWxsIHNlbGYgZm9yIGVhY2ggaXRlbSBvZiB0aGUgYXJyYXlcclxuXHRcdFx0aWYgKGlzTmFOKHBhcnNlSW50KGZpZWxkRGF0YVtpICsgMV0sIDEwKSkpIHtcclxuXHRcdFx0XHRjdXJyZW50RWxlbWVudCA9IFtdXHJcblx0XHRcdFx0bGV0IGlubmVyUGF0aCA9ICcnXHJcblx0XHRcdFx0Zm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgZmllbGREYXRhTGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdGlubmVyUGF0aCArPSBgJHtmaWVsZERhdGFbal19JHtqIDwgKGZpZWxkRGF0YUxlbmd0aCAtIDEpID8gJy4nIDogJyd9YFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRuZXh0RWxlbWVudC5mb3JFYWNoKChpdGVtLCBpSW5kZXgpID0+IHtcclxuXHRcdFx0XHRcdGxldCBpbm5lclZhbHVlID0gZ2V0TmVzdGVkKGl0ZW0sIGlubmVyUGF0aClcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgaW5uZXJWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0Ly8gaWYgdGhlIGlubmVyVmFsdWUgaXMgYW4gYXJyYXkgdG9vLCBtZXJnZSBpdCB3aXRoIHRoZSBjdXJyZW50RWxlbWVudCAtIHRoaXMgd2F5IHdlIGNhbiBoYXZlIG5lc3RlZCBhcnJheXMgd2l0aG91dCBpbmRleGVzXHJcblx0XHRcdFx0XHRcdGlmIChpbm5lclZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LmNvbmNhdChpbm5lclZhbHVlKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCBjdXJyZW50RWxlbWVudC5wdXNoKGlubmVyVmFsdWUpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudFxyXG5cdH1cclxuXHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG5cdGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZC5zcGxpdCgnLicpXHJcblx0aWYgKCFmaWVsZE5hbWVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50LFxyXG5cdFx0bG9vcEVuZCA9IGZpZWxkTmFtZXMubGVuZ3RoIC0gMVxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcEVuZDsgaSsrKSB7XHJcblx0XHRjb25zdCBmaWVsZE5hbWUgPSBmaWVsZE5hbWVzW2ldXHJcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudFtmaWVsZE5hbWVdXHJcblx0fVxyXG5cdGN1cnJlbnRQYXJlbnRbZmllbGROYW1lc1tsb29wRW5kXV0gPSB2YWx1ZVxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuIl19