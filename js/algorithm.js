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

function sleep(ms) {
	return new Promise( resolve => setTimeout(resolve, ms));
}

appendElement(canvas, data);


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

insersion_sort();



