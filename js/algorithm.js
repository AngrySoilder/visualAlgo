var canvas = document.getElementById('canvas');
var el_dict = [];
var data = [9,8,7,6,5,4,3,2,1];


/**
 * This Function is Used to Create Data

 * @param  {Element} canvas Container Element
 * @param  {Array} data Data Array
 * @return {void}        Not Return Anything
 */
function appendElement(canvas, data) {
	/**
	 *<div class="container" id="canvas">
		<div class="node-cover">
			<p class="nomargin">12</p>
			<div class="node"></div>
			<!-- This is Node -->
		</div>
	</div>	 
	 * 
	 */
	
	canvas.innerHTML = '';
	el_dict = [];

	 if(data instanceof Array)
	 {
	 	max = Math.max(...data);
	 	data.forEach(element => {
	 		var container = document.createElement('div');
	 		container.classList.add('node-cover');
	 		var el = document.createElement('div');
	 		var para = document.createElement('p');
	 		el.classList.add('node');
	 		el.style.height  = (element/max)*100 + 'px';
	 		para.innerHTML = element;
	 		container.appendChild(el);
	 		container.appendChild(para);
	 		canvas.appendChild(container);
	 		el_dict.push(container);
	 	});
	 }
	 else
	 {
	 	console.log(data)
	 	console.log("Data Should be Array");
	 }
}

/**
 * Sleep Function To Delay in ms
 * @param  {int} ms Millisecond
 */
function sleep(ms) {
	return new Promise( resolve => setTimeout(resolve, ms));
}

appendElement(canvas, data);

/**
  ____             _   _             
 / ___|  ___  _ __| |_(_)_ __   __ _ 
 \___ \ / _ \| '__| __| | '_ \ / _` |
  ___) | (_) | |  | |_| | | | | (_| |
 |____/ \___/|_|   \__|_|_| |_|\__, |
                               |___/ 
 */

 
/**
 * Insersion Sort
 * Best case: n
 * Average Case : n^2
 * Wrost Case: n^2
 * @return {void} 
 */
async function insersion_sort() {

	var oldArray = data.slice();
	var i  = 1;
	while( i < oldArray.length)
	{
		j = i;
		while( j > 0 && oldArray[j - 1] > oldArray[j])
		{
			await sleep(1000);
			let _store = oldArray[j-1];
			el_dict[j-1].children[0].style.backgroundColor = 'red';
			el_dict[j].children[0].style.backgroundColor = 'red';
			await sleep(1000);
			oldArray[j-1] = oldArray[j];
			oldArray[j] = _store;
			j--;
			appendElement(canvas,oldArray);
		}
		i = i + 1;
	}
		
}

function swapOldarray(){
	// swapping using Index
}

function merge_sort(data){
	var oldArray = data.slice();
	appendElement(canvas, data);
	return merge_sort2(oldArray, 0);
}


/**
 * Merge Sort
 * Best Case: nlogn
 * Wrost Case:nlogn
 * Average Case: nlogn
 * @return {void} 
 */
async function merge_sort2(data, base){
	//Impliment Merge Sort
	/**
	 * Merge Sort Implimentation in Pseudo Code
	 * func merge_sort(Array a):
	 		if(lengh of a <= 1):
	 			Return a

	 		mid = floorValue(length of a / 2)

	 		x = a[0 to mid]
	 		y = [mid + 1 to end]

	 		merge(
				merge_sort(x), merge_sort(y)
	 		)


	 * 		mid = [(length of a)/2] RoundUp
	 * 		
	 */
	if(data.length <= 1) return data;

	var mid = Math.floor(data.length / 2)
	var x = data.slice(0, mid);
	var y = data.slice(mid);
	var calc_base = base + mid;

	var x_val = await merge_sort2(x, base);
	var y_val = await merge_sort2(y, calc_base);
	
	return merge(x_val, y_val, base, calc_base);
	
	

}

async function merge(leftArray, rightArray, base, calc_base){
	// Merge Operation
	// result = []
	// leftArray, Right Array, leftindex, yindex
	// while(leftindex < leftArray && rightindex < right index)
	// 		if (leftArray[leftindex] <= right[yindex])
	// 			Result.Push(leftarray[leftindex])
	// 			leftindex ++;
	// 		else:
	// 			Result.push(rightarray[rightindex])
	// 			yindex++
	// endwhile
	// Add Left of Array of Both 			
	//
	// 				
	var result = [];
	var leftindex = 0, rightIndex = 0;
	await sleep(1000);
	while (leftindex < leftArray.length && rightIndex < rightArray.length){
		if (leftArray[leftindex] <= rightArray[rightIndex]){
			result.push(leftArray[leftindex])
			leftindex++
		}else{
			result.push(rightArray[rightIndex]);
			rightIndex++;
		}
	}
	var remainx = leftArray.slice(leftindex)
	var remainy = rightArray.slice(rightIndex)
	result.push(...remainx);
	result.push(...remainy);
	appendElement(canvas, result)
	return result;
}

/**
 * Quicksort Implimentation
 * Analysis:
 * 	Best:nlogn
 * 	Average: nlogn
 * 	Wrost: n^2
 */
async function quicksort(data, low, high){
	if(low < high){
		var pivot = await partition(data, low, high);
		quicksort(data, low, pivot - 1);
		quicksort(data, pivot + 1, high);
	}
}


/**
 * Helper Function for Paratation
 */
async function partition(data, low, high) {
	// Helper function for partition 
	var pivot = data[high];
	
	var i = low;
	for (var j = low; j< high; j++){
		//await to show comparison and Green
		await sleep(1000);
		el_dict[high].children[0].style.backgroundColor = 'green';
		el_dict[j].children[0].style.backgroundColor = 'red';
		await sleep(1000);
		appendElement(canvas, data);
		if(data[j] < pivot) {
			
			el_dict[j].children[0].style.backgroundColor = 'red';
			await sleep(1000);
			swap(i, j);
			i++;
			appendElement(canvas, data);
		}
	}
	await sleep(1000);
	el_dict[i].children[0].style.backgroundColor = 'red';
	el_dict[high].children[0].style.backgroundColor = 'green';
	await sleep(1000)
	swap(i, high);
	appendElement(canvas, data);
	await sleep(1000)

	return i;
}


function swap(i, j){
	var _storage = data[i];
	data[i] = data[j];
	data[j] = _storage;
}


/**
 * Selection Sort Defination
 * Analysis:
 * 	Best: n^2
 * 	Wrost: n^2
 * 	Average: n^2
 * 	
 */
async function selection_sort(data){

	for(var i = 0; i < data.length ; i++){

		var jmin = i;
		el_dict[jmin].children[0].style.backgroundColor = 'green';
		await sleep(500);

		for(var j = i + 1; j < data.length; j ++)
		{	
			appendElement(canvas, data);
			el_dict[j].children[0].style.backgroundColor = 'red';
			el_dict[jmin].children[0].style.backgroundColor = 'green';
			await sleep(500);
			if(data[j] < data[jmin])
			{
				jmin = j;
			}
			appendElement(canvas, data)
		}

		if( jmin != i)
		{
			el_dict[jmin].children[0].style.backgroundColor = 'red';
			el_dict[i].children[0].style.backgroundColor = 'green';
			await sleep(500);
			var _storage = data[jmin];
			data[jmin] = data[i];
			data[i] = _storage;
		}
		appendElement(canvas, data);	
	}
}


/**
 * Bubble Sort
 * Analysis
 * 	Best: n
 * 	Average: n^2
 * 	Wrost: n^3
 */
async function bubble_sort(data)
{
	let sorted = false;
	while(!sorted)
	{
		sorted = true;
		for (let i = 1; i < data.length; i++)
		{
			
			if(data[i-1] > data[i])
			{
				let _storage = data[i];
				data[i] = data[i-1];
				data[i-1] = _storage;
				sorted = false;
			}
			el_dict[i].children[0].style.backgroundColor = 'red';
			el_dict[i-1].children[0].style.backgroundColor = 'red';
			await sleep(500);
			appendElement(canvas, data);
			
		}

	}
}

/**
 * Cocktail Sort
 * Analysis
 * 	Best: n
 * 	Wrost: n^2
 * 	Average: n^2
 */
async function cocktail_sort(data){
	// Cocktail Sort
	let sorted = false;
	while(!sorted)
	{
		sorted = true;
		for (let i = 1; i < data.length; i++)
		{
			
			if(data[i-1] > data[i])
			{
				let _storage = data[i];
				data[i] = data[i-1];
				data[i-1] = _storage;
				sorted = false;
			}
			el_dict[i].children[0].style.backgroundColor = 'red';
			el_dict[i-1].children[0].style.backgroundColor = 'red';
			await sleep(500);
			appendElement(canvas, data);
			
		}

		if(sorted == true){
			break;
		}
	
	
		for (let i = data.length-1; i >= 1; i--)
		{	
			console.log("we are hitting This");
			
			if(data[i-1] > data[i])
			{
				let _storage = data[i];
				data[i] = data[i-1];
				data[i-1] = _storage;
				sorted = false;
			}
			el_dict[i].children[0].style.backgroundColor = 'red';
			el_dict[i-1].children[0].style.backgroundColor = 'red';
			await sleep(500);
			appendElement(canvas, data);
			
		}
	}
}

/**
 * Odd Even Sorting
 * Analysis: 
 * 	Best Case: n
 * 	Wrost Case: n^2
 * 	Average Case: n^2 
 */
async function od_even(data)
{
	let sorted = false;
	while(!sorted)
	{
		sorted = true;
		for (let i = 1; i < data.length; i= i+2)
		{
			
			if(data[i-1] > data[i])
			{
				let _storage = data[i];
				data[i] = data[i-1];
				data[i-1] = _storage;
				sorted = false;
			}
			el_dict[i].children[0].style.backgroundColor = 'red';
			el_dict[i-1].children[0].style.backgroundColor = 'red';
			await sleep(1000);
			appendElement(canvas, data);
			
		}

		if(sorted == true){
			break;
		}
	
	
		for (let i = 0;  i <= data.length; i = i + 2)
		{	
			
			if(data[i-1] > data[i])
			{
				let _storage = data[i];
				data[i] = data[i-1];
				data[i-1] = _storage;
				sorted = false;
				el_dict[i].children[0].style.backgroundColor = 'red';
				el_dict[i-1].children[0].style.backgroundColor = 'red';
				await sleep(1000);
			}
			appendElement(canvas, data);
		}
	}
}


/**
  ____                      _     _             
 / ___|  ___  __ _ _ __ ___| |__ (_)_ __   __ _ 
 \___ \ / _ \/ _` | '__/ __| '_ \| | '_ \ / _` |
  ___) |  __| (_| | | | (__| | | | | | | | (_| |
 |____/ \___|\__,_|_|  \___|_| |_|_|_| |_|\__, |
                                          |___/ 
*/

/**
 * Searching Linearly
 * @param {array} data Random Data
 * @param {int} search Element to search
 */
async function linear_search(data, search)
{
	
	
	appendElement(canvas, data);

	for(let index = 0; index <= data.length - 1; index++)
	{
		el_dict[index].children[0].style.backgroundColor = 'red';
		await sleep(500);
		if (search == data[index])
		{
			el_dict[index].children[0].style.backgroundColor = 'green';
			return index;
		}
		appendElement(canvas, data);
	}
	return false
}

/**
 * Binary Search
 * @param {array} data Array To find Data
 * @param {int} search_element Searching Element
 */
async function binary_search(data, search_element)
{
	appendElement(canvas, data);
	await sleep(500);
	data = data.sort();
	appendElement(canvas, data);

	let indexStart = 0;
	let indexEnd = data.length-1;

	while(indexStart != indexEnd)
	{
		let mid = 
		indexStart == 0 ? Math.floor(indexEnd/2)
		: Math.floor((indexStart + data.length-1)/2);
		console.log(mid);
		
		el_dict[mid].children[0].style.backgroundColor = 'purple';
		await sleep(500);
		if(search_element == data[mid])
		{
			el_dict[mid].children[0].style.backgroundColor = 'green';
			return mid;
		} 
		
		if(search_element < data[mid])
		{	
			for(let i = indexStart; i <= mid ; i++)
			{
				el_dict[i].children[0].style.backgroundColor = 'red';
			}
			indexEnd = mid;
		}else
		{	
			for(let i = mid; i <= indexEnd ; i++)
			{
				el_dict[i].children[0].style.backgroundColor = 'red';
			}
			indexStart = mid;
		}
		await sleep(500);
		appendElement(canvas, data);
	}

	if(search_element = data[indexEnd])
	{

		el_dict[indexEnd].children[0].style.backgroundColor = 'red';
		await sleep(500);
		appendElement(canvas, data);
		return indexEnd;
	}
	return false;
}