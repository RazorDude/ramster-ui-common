/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var getNested = function (parent, field) {
    if ((typeof parent !== 'object') || (typeof field !== 'string')) {
        return null;
    }
    /** @type {?} */
    var fieldData = field.split('.');
    /** @type {?} */
    var currentElement = parent;
    for (var i in fieldData) {
        /** @type {?} */
        var innerElement = fieldData[i];
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
export var setNested = function (parent, field, value) {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJlbHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJ1dGlscy90b29sYmVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sS0FBTyxTQUFTLEdBQUcsVUFBQyxNQUFXLEVBQUUsS0FBYTtJQUNuRCxJQUFJLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsRUFBRTtRQUMvRCxPQUFPLElBQUksQ0FBQTtLQUNYOztRQUNFLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7UUFDL0IsY0FBYyxHQUFHLE1BQU07SUFDeEIsS0FBSyxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7O1lBQ3BCLFlBQVksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksY0FBYyxLQUFLLElBQUksRUFBRTtZQUM1QixPQUFPLGNBQWMsQ0FBQTtTQUNyQjtRQUNELElBQUksQ0FBQyxPQUFPLGNBQWMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLFdBQVcsQ0FBQyxFQUFFO1lBQ3JHLE9BQU8sY0FBYyxDQUFBO1NBQ3JCO1FBQ0QsY0FBYyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtLQUM3QztJQUNELE9BQU8sY0FBYyxDQUFBO0FBQ3RCLENBQUM7O0FBRUQsTUFBTSxLQUFPLFNBQVMsR0FBRyxVQUFDLE1BQVcsRUFBRSxLQUFhLEVBQUUsS0FBVTs7UUFDekQsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFBO0tBQ1o7O1FBQ0csYUFBYSxHQUFHLE1BQU07O1FBQ3pCLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7SUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFDM0IsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDcEQsT0FBTyxLQUFLLENBQUE7U0FDWjtRQUNELGFBQWEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEM7SUFDRCxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFBO0lBQzFDLE9BQU8sSUFBSSxDQUFBO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRpZiAoKHR5cGVvZiBwYXJlbnQgIT09ICdvYmplY3QnKSB8fCAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHRsZXQgZmllbGREYXRhID0gZmllbGQuc3BsaXQoJy4nKSxcclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gcGFyZW50XHJcblx0Zm9yIChsZXQgaSBpbiBmaWVsZERhdGEpIHtcclxuXHRcdGxldCBpbm5lckVsZW1lbnQgPSBmaWVsZERhdGFbaV1cclxuXHRcdGlmIChjdXJyZW50RWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdH1cclxuXHRcdGlmICgodHlwZW9mIGN1cnJlbnRFbGVtZW50ID09PSAndW5kZWZpbmVkJykgfHwgKHR5cGVvZiBjdXJyZW50RWxlbWVudFtpbm5lckVsZW1lbnRdID09PSAndW5kZWZpbmVkJykpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcblx0XHR9XHJcblx0XHRjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudF1cclxuXHR9XHJcblx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHtcclxuXHRjb25zdCBmaWVsZE5hbWVzID0gZmllbGQuc3BsaXQoJy4nKVxyXG5cdGlmICghZmllbGROYW1lcy5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRsZXQgY3VycmVudFBhcmVudCA9IHBhcmVudCxcclxuXHRcdGxvb3BFbmQgPSBmaWVsZE5hbWVzLmxlbmd0aCAtIDFcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxvb3BFbmQ7IGkrKykge1xyXG5cdFx0Y29uc3QgZmllbGROYW1lID0gZmllbGROYW1lc1tpXVxyXG5cdFx0aWYgKHR5cGVvZiBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXVxyXG5cdH1cclxuXHRjdXJyZW50UGFyZW50W2ZpZWxkTmFtZXNbbG9vcEVuZF1dID0gdmFsdWVcclxuXHRyZXR1cm4gdHJ1ZVxyXG59XHJcbiJdfQ==