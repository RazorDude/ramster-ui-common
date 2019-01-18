export const getNested = (parent: any, field: string): any => {
	if ((typeof parent !== 'object') || (typeof field !== 'string')) {
			return null
		}
	let fieldData = field.split('.'),
		currentElement = parent
	for (let i in fieldData) {
		let innerElement = fieldData[i]
		if (currentElement === null) {
			return currentElement
		}
		if ((typeof currentElement === 'undefined') || (typeof currentElement[innerElement] === 'undefined')) {
			return currentElement
		}
		currentElement = currentElement[innerElement]
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
