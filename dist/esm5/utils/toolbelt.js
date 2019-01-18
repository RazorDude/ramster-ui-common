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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJlbHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJ1dGlscy90b29sYmVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sS0FBTyxTQUFTLEdBQUcsVUFBQyxNQUFXLEVBQUUsS0FBYTtJQUNuRCxJQUFJLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsRUFBRTtRQUMvRCxPQUFPLElBQUksQ0FBQTtLQUNYOztRQUNFLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7UUFDL0IsY0FBYyxHQUFHLE1BQU07SUFDeEIsS0FBSyxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7O1lBQ3BCLFlBQVksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksY0FBYyxLQUFLLElBQUksRUFBRTtZQUM1QixPQUFPLGNBQWMsQ0FBQTtTQUNyQjtRQUNELElBQUksQ0FBQyxPQUFPLGNBQWMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLFdBQVcsQ0FBQyxFQUFFO1lBQ3JHLE9BQU8sY0FBYyxDQUFBO1NBQ3JCO1FBQ0QsY0FBYyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtLQUM3QztJQUNELE9BQU8sY0FBYyxDQUFBO0FBQ3RCLENBQUM7O0FBRUQsTUFBTSxLQUFPLFNBQVMsR0FBRyxVQUFDLE1BQVcsRUFBRSxLQUFhLEVBQUUsS0FBVTs7UUFDekQsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFBO0tBQ1o7O1FBQ0csYUFBYSxHQUFHLE1BQU07O1FBQ3pCLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7SUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFDM0IsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDcEQsT0FBTyxLQUFLLENBQUE7U0FDWjtRQUNELGFBQWEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEM7SUFDRCxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFBO0lBQzFDLE9BQU8sSUFBSSxDQUFBO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcpOiBhbnkgPT4ge1xyXG5cdGlmICgodHlwZW9mIHBhcmVudCAhPT0gJ29iamVjdCcpIHx8ICh0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdGxldCBmaWVsZERhdGEgPSBmaWVsZC5zcGxpdCgnLicpLFxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBwYXJlbnRcclxuXHRmb3IgKGxldCBpIGluIGZpZWxkRGF0YSkge1xyXG5cdFx0bGV0IGlubmVyRWxlbWVudCA9IGZpZWxkRGF0YVtpXVxyXG5cdFx0aWYgKGN1cnJlbnRFbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG5cdFx0fVxyXG5cdFx0aWYgKCh0eXBlb2YgY3VycmVudEVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSB8fCAodHlwZW9mIGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudF0gPT09ICd1bmRlZmluZWQnKSkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50XVxyXG5cdH1cclxuXHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG5cdGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZC5zcGxpdCgnLicpXHJcblx0aWYgKCFmaWVsZE5hbWVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50LFxyXG5cdFx0bG9vcEVuZCA9IGZpZWxkTmFtZXMubGVuZ3RoIC0gMVxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcEVuZDsgaSsrKSB7XHJcblx0XHRjb25zdCBmaWVsZE5hbWUgPSBmaWVsZE5hbWVzW2ldXHJcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudFtmaWVsZE5hbWVdXHJcblx0fVxyXG5cdGN1cnJlbnRQYXJlbnRbZmllbGROYW1lc1tsb29wRW5kXV0gPSB2YWx1ZVxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuIl19