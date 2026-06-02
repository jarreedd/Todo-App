/**
 *
 * @param {Array} array The array that has to be modified
 * @param {number} prev_index Index number of the item that has to be moved (Index notation, starting from 0)
 * @param {number} new_index Index number of where the item has to be moved to (Index notation, starting from 0)
 * @returns {Array} A new array reordered
 */

export function moveItem(array, prev_index, new_index) {
	let new_array = [];
	array.forEach((item) => {
		new_array.push(item);
	});
	const item = new_array.splice(prev_index, 1);
	const itemContent = item[0];

	const slice1 = new_array.slice(0, new_index);

	const slice2 = new_array.slice(new_index);

	new_array = slice1;
	new_array.push(itemContent);

	slice2.forEach((item) => {
		new_array.push(item);
	});

	return new_array;
}
