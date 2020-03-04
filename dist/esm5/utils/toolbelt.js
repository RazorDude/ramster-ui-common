/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var getNested = (/**
 * @param {?} parent
 * @param {?} field
 * @param {?=} options
 * @return {?}
 */
function (parent, field, options) {
    if ((typeof parent !== 'object') || (parent === null) || (typeof field !== 'string') || !field.length) {
        return undefined;
    }
    var arrayItemsShouldBeUnique = (options || ((/** @type {?} */ ({})))).arrayItemsShouldBeUnique;
    /** @type {?} */
    var fieldData = field.split('.');
    /** @type {?} */
    var fieldDataLength = fieldData.length;
    /** @type {?} */
    var currentElement = parent;
    var _loop_1 = function (i) {
        if ((typeof currentElement === 'undefined') || (currentElement === null)) {
            return { value: undefined };
        }
        /** @type {?} */
        var innerElementName = fieldData[i]
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        ;
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        if (innerElementName.charAt(0) === '$') {
            /** @type {?} */
            var closingBracketFound = false;
            /** @type {?} */
            var closingBracketIndex = i + 1;
            while (closingBracketIndex < fieldDataLength) {
                /** @type {?} */
                var element = fieldData[closingBracketIndex]
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
                for (var j = i + 1; j <= closingBracketIndex; j++) {
                    innerElementName += "." + fieldData[j];
                }
                i = closingBracketIndex;
            }
        }
        /** @type {?} */
        var nextElement = currentElement[innerElementName];
        if (typeof nextElement === 'undefined') {
            return { value: undefined };
        }
        // if the next element is an array, prepare to return an array of the inner items
        if (nextElement instanceof Array) {
            // if this is the last item, just return the array
            if (i === (fieldDataLength - 1)) {
                return { value: nextElement };
            }
            // if the next item is not an index, recursively call self for each item of the array
            if (isNaN(parseInt(fieldData[i + 1], 10))) {
                currentElement = [];
                /** @type {?} */
                var innerPath_1 = '';
                for (var j = i + 1; j < fieldDataLength; j++) {
                    innerPath_1 += "" + fieldData[j] + (j < (fieldDataLength - 1) ? '.' : '');
                }
                nextElement.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    /** @type {?} */
                    var innerValue = getNested(item, innerPath_1);
                    if (typeof innerValue !== 'undefined') {
                        // if the innerValue is an array too, merge it with the currentElement - this way we can have nested arrays without indexes
                        if (innerValue instanceof Array) {
                            innerValue.forEach((/**
                             * @param {?} innerValueItem
                             * @return {?}
                             */
                            function (innerValueItem) {
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
                return { value: currentElement };
            }
        }
        currentElement = nextElement;
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < fieldDataLength; i++) {
        var state_1 = _loop_1(i);
        i = out_i_1;
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return currentElement;
});
/** @type {?} */
export var setNested = (/**
 * @param {?} parent
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
function (parent, field, value) {
    /** @type {?} */
    var fieldNames = field.split('.');
    if (!fieldNames.length) {
        return false;
    }
    /** @type {?} */
    var currentParent = parent;
    /** @type {?} */
    var loopEnd = fieldNames.length - 1;
    for (var i = 0; i < loopEnd; i++) {
        /** @type {?} */
        var fieldName = fieldNames[i];
        if (typeof currentParent[fieldName] === 'undefined') {
            return false;
        }
        currentParent = currentParent[fieldName];
    }
    currentParent[fieldNames[loopEnd]] = value;
    return true;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJlbHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJ1dGlscy90b29sYmVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sS0FBTyxTQUFTOzs7Ozs7QUFBRyxVQUN4QixNQUFXLEVBQ1gsS0FBYSxFQUNiLE9BQThDO0lBRTlDLElBQUksQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUN0RyxPQUFPLFNBQVMsQ0FBQTtLQUNoQjtJQUNNLElBQUEsMEZBQXdCOztRQUMzQixTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1FBQy9CLGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTTs7UUFDbEMsY0FBYyxHQUFHLE1BQU07NEJBQ2YsQ0FBQztRQUNULElBQUksQ0FBQyxPQUFPLGNBQWMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsRUFBRTs0QkFDbEUsU0FBUztTQUNoQjs7WUFDRyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25DLHVGQUF1Rjs7UUFBdkYsdUZBQXVGO1FBQ3ZGLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTs7Z0JBQ25DLG1CQUFtQixHQUFHLEtBQUs7O2dCQUM5QixtQkFBbUIsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUM1QixPQUFPLG1CQUFtQixHQUFHLGVBQWUsRUFBRTs7b0JBQ3ZDLE9BQU8sR0FBRyxTQUFTLENBQUMsbUJBQW1CLENBQUM7Z0JBQzlDLHlJQUF5STs7Z0JBQXpJLHlJQUF5STtnQkFDekksSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMs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OztBQUFHLFVBQUMsTUFBVyxFQUFFLEtBQWEsRUFBRSxLQUFVOztRQUN6RCxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUE7S0FDWjs7UUFDRyxhQUFhLEdBQUcsTUFBTTs7UUFDekIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFOztZQUMzQixTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUNwRCxPQUFPLEtBQUssQ0FBQTtTQUNaO1FBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUN4QztJQUNELGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7SUFDMUMsT0FBTyxJQUFJLENBQUE7QUFDWixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0TmVzdGVkID0gKFxyXG5cdHBhcmVudDogYW55LFxyXG5cdGZpZWxkOiBzdHJpbmcsXHJcblx0b3B0aW9ucz86IHthcnJheUl0ZW1zU2hvdWxkQmVVbmlxdWU/OiBib29sZWFufVxyXG4pOiBhbnkgPT4ge1xyXG5cdGlmICgodHlwZW9mIHBhcmVudCAhPT0gJ29iamVjdCcpIHx8IChwYXJlbnQgPT09IG51bGwpIHx8ICh0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSB8fCAhZmllbGQubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG5cdGNvbnN0IHthcnJheUl0ZW1zU2hvdWxkQmVVbmlxdWV9ID0gKG9wdGlvbnMgfHwgKHt9IGFzIGFueSkpXHJcblx0bGV0IGZpZWxkRGF0YSA9IGZpZWxkLnNwbGl0KCcuJyksXHJcblx0XHRmaWVsZERhdGFMZW5ndGggPSBmaWVsZERhdGEubGVuZ3RoLFxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBwYXJlbnRcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkRGF0YUxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAoKHR5cGVvZiBjdXJyZW50RWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHx8IChjdXJyZW50RWxlbWVudCA9PT0gbnVsbCkpIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdFx0fVxyXG5cdFx0bGV0IGlubmVyRWxlbWVudE5hbWUgPSBmaWVsZERhdGFbaV1cclxuXHRcdC8vIGxvZ2ljIGZvciBoYW5kbGluZyBzZXF1ZWxpemUtc3R5bGUgJGZvby5iYXIkIC0gc2hvdWxkIGJlIHRyZWF0ZWQgYXMgYSBzaW5nbGUgZWxlbWVudFxyXG5cdFx0aWYgKGlubmVyRWxlbWVudE5hbWUuY2hhckF0KDApID09PSAnJCcpIHtcclxuXHRcdFx0bGV0IGNsb3NpbmdCcmFja2V0Rm91bmQgPSBmYWxzZSxcclxuXHRcdFx0XHRjbG9zaW5nQnJhY2tldEluZGV4ID0gaSArIDFcclxuXHRcdFx0d2hpbGUgKGNsb3NpbmdCcmFja2V0SW5kZXggPCBmaWVsZERhdGFMZW5ndGgpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZmllbGREYXRhW2Nsb3NpbmdCcmFja2V0SW5kZXhdXHJcblx0XHRcdFx0Ly8gZmFsc2UgYWxhcm0gLSB0aGVyZSdzIGFub3RoZXIgJCBvcGVuaW5nIGJlZm9yZSB0aGUgY3VycmVudCBvbmUgY2xvc2VkIC0gc28gdGhlIGN1cnJlbnQgb25lIG11c3QgYmUganVzdCBhIHZhcmlhYmxlIG5hbWUsIG5vdCBhIGJyYWNrZXRcclxuXHRcdFx0XHRpZiAoZWxlbWVudC5jaGFyQXQoMCkgPT09ICckJykge1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gZm91bmQgaXQgIVxyXG5cdFx0XHRcdGlmIChlbGVtZW50LmNoYXJBdChlbGVtZW50Lmxlbmd0aCAtIDEpID09PSAnJCcpIHtcclxuXHRcdFx0XHRcdGNsb3NpbmdCcmFja2V0Rm91bmQgPSB0cnVlXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjbG9zaW5nQnJhY2tldEluZGV4KytcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY2xvc2luZ0JyYWNrZXRGb3VuZCkge1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSBpICsgMTsgaiA8PSBjbG9zaW5nQnJhY2tldEluZGV4OyBqKyspIHtcclxuXHRcdFx0XHRcdGlubmVyRWxlbWVudE5hbWUgKz0gYC4ke2ZpZWxkRGF0YVtqXX1gXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGkgPSBjbG9zaW5nQnJhY2tldEluZGV4XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCBuZXh0RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudE5hbWVdXHJcblx0XHRpZiAodHlwZW9mIG5leHRFbGVtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0XHR9XHJcblx0XHQvLyBpZiB0aGUgbmV4dCBlbGVtZW50IGlzIGFuIGFycmF5LCBwcmVwYXJlIHRvIHJldHVybiBhbiBhcnJheSBvZiB0aGUgaW5uZXIgaXRlbXNcclxuXHRcdGlmIChuZXh0RWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgaXRlbSwganVzdCByZXR1cm4gdGhlIGFycmF5XHJcblx0XHRcdGlmIChpID09PSAoZmllbGREYXRhTGVuZ3RoIC0gMSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV4dEVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBpZiB0aGUgbmV4dCBpdGVtIGlzIG5vdCBhbiBpbmRleCwgcmVjdXJzaXZlbHkgY2FsbCBzZWxmIGZvciBlYWNoIGl0ZW0gb2YgdGhlIGFycmF5XHJcblx0XHRcdGlmIChpc05hTihwYXJzZUludChmaWVsZERhdGFbaSArIDFdLCAxMCkpKSB7XHJcblx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBbXVxyXG5cdFx0XHRcdGxldCBpbm5lclBhdGggPSAnJ1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSBpICsgMTsgaiA8IGZpZWxkRGF0YUxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRpbm5lclBhdGggKz0gYCR7ZmllbGREYXRhW2pdfSR7aiA8IChmaWVsZERhdGFMZW5ndGggLSAxKSA/ICcuJyA6ICcnfWBcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmV4dEVsZW1lbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IGlubmVyVmFsdWUgPSBnZXROZXN0ZWQoaXRlbSwgaW5uZXJQYXRoKVxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpbm5lclZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHQvLyBpZiB0aGUgaW5uZXJWYWx1ZSBpcyBhbiBhcnJheSB0b28sIG1lcmdlIGl0IHdpdGggdGhlIGN1cnJlbnRFbGVtZW50IC0gdGhpcyB3YXkgd2UgY2FuIGhhdmUgbmVzdGVkIGFycmF5cyB3aXRob3V0IGluZGV4ZXNcclxuXHRcdFx0XHRcdFx0aWYgKGlubmVyVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdFx0XHRcdGlubmVyVmFsdWUuZm9yRWFjaCgoaW5uZXJWYWx1ZUl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICghYXJyYXlJdGVtc1Nob3VsZEJlVW5pcXVlIHx8IChhcnJheUl0ZW1zU2hvdWxkQmVVbmlxdWUgJiYgKGN1cnJlbnRFbGVtZW50LmluZGV4T2YoaW5uZXJWYWx1ZUl0ZW0pID09PSAtMSkpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRFbGVtZW50LnB1c2goaW5uZXJWYWx1ZUl0ZW0pXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAoIWFycmF5SXRlbXNTaG91bGRCZVVuaXF1ZSB8fCAoYXJyYXlJdGVtc1Nob3VsZEJlVW5pcXVlICYmIChjdXJyZW50RWxlbWVudC5pbmRleE9mKGlubmVyVmFsdWUpID09PSAtMSkpKSB7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudEVsZW1lbnQucHVzaChpbm5lclZhbHVlKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudFxyXG5cdH1cclxuXHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG5cdGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZC5zcGxpdCgnLicpXHJcblx0aWYgKCFmaWVsZE5hbWVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50LFxyXG5cdFx0bG9vcEVuZCA9IGZpZWxkTmFtZXMubGVuZ3RoIC0gMVxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcEVuZDsgaSsrKSB7XHJcblx0XHRjb25zdCBmaWVsZE5hbWUgPSBmaWVsZE5hbWVzW2ldXHJcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudFtmaWVsZE5hbWVdXHJcblx0fVxyXG5cdGN1cnJlbnRQYXJlbnRbZmllbGROYW1lc1tsb29wRW5kXV0gPSB2YWx1ZVxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuIl19