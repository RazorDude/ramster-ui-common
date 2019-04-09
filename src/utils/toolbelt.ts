export const getNested = (parent: any, field: string): any => {
	if ((typeof parent !== 'object') || (parent === null) || (typeof field !== 'string') || !field.length) {
		return undefined
	}
	let fieldData = field.split('.'),
		fieldDataLength = fieldData.length,
		currentElement = parent
	for (let i = 0; i < fieldDataLength; i++) {
		if ((typeof currentElement === 'undefined') || (currentElement === null)) {
			return undefined
		}
		let innerElementName = fieldData[i]
		// logic for handling sequelize-style $foo.bar$ - should be treated as a single element
		if (innerElementName.charAt(0) === '$') {
			let closingBracketFound = false,
				closingBracketIndex = i + 1
			while (closingBracketIndex < fieldDataLength) {
				const element = fieldData[closingBracketIndex]
				// false alarm - there's another $ opening before the current one closed - so the current one must be just a variable name, not a bracket
				if (element.charAt(0) === '$') {
					break
				}
				// found it !
				if (element.charAt(element.length - 1) === '$') {
					closingBracketFound = true
					break
				}
				closingBracketIndex++
			}
			if (closingBracketFound) {
				for (let j = i + 1; j <= closingBracketIndex; j++) {
					innerElementName += `.${fieldData[j]}`
				}
				i = closingBracketIndex
			}
		}
		let nextElement = currentElement[innerElementName]
		if (typeof nextElement === 'undefined') {
			return undefined
		}
		// if the next element is an array, prepare to return an array of the inner items
		if (nextElement instanceof Array) {
			// if this is the last item, just return the array
			if (i === (fieldDataLength - 1)) {
				return nextElement
			}
			// if the next item is not an index, recursively call self for each item of the array
			if (isNaN(parseInt(fieldData[i + 1], 10))) {
				currentElement = []
				let innerPath = ''
				for (let j = i + 1; j < fieldDataLength; j++) {
					innerPath += `${fieldData[j]}${j < (fieldDataLength - 1) ? '.' : ''}`
				}
				nextElement.forEach((item, iIndex) => {
					let innerValue = getNested(item, innerPath)
					if (typeof innerValue !== 'undefined') {
						// if the innerValue is an array too, merge it with the currentElement - this way we can have nested arrays without indexes
						if (innerValue instanceof Array) {
							currentElement = currentElement.concat(innerValue)
							return
						}
						 currentElement.push(innerValue)
					}
				})
				return currentElement
			}
		}
		currentElement = nextElement
	}
	return currentElement
}

export const setNested = (parent: any, field: string, value: any): boolean => {
	const fieldNames = field.split('.')
	if (!fieldNames.length) {
		return false
	}
	let currentParent = parent,
		loopEnd = fieldNames.length - 1
	for (let i = 0; i < loopEnd; i++) {
		const fieldName = fieldNames[i]
		if (typeof currentParent[fieldName] === 'undefined') {
			return false
		}
		currentParent = currentParent[fieldName]
	}
	currentParent[fieldNames[loopEnd]] = value
	return true
}
