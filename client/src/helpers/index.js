export const findById = (resources, id) => {
	if (!resources) return null
	return resources.find((res) => res._id === id)
}

export const upsert = (resources, resource) => {
	const index = resources.findIndex((p) => p._id === resource._id)
	if (resource._id && index !== -1) {
		resources[index] = resource
	} else {
		resources.push(resource)
	}
}
export const docToResource = (doc) => {
	if (typeof doc?.data !== 'function') return doc
	return { ...doc.data(), id: doc.id }
}
