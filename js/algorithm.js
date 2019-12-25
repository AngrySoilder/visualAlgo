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


/**
 * Merge Sort
 * Best Case: nlogn
 * Wrost Case:nlogn
 * Average Case: nlogn
 * @return {void} 
 */
function merge_sort(data){
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
	
	return merge(merge_sort(x), merge_sort(y));

}

function merge(leftArray, rightArray){
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
	return result;
}


var sorted = merge_sort([9,8,7,6,5,4,3,2,1]);
console.log(sorted);