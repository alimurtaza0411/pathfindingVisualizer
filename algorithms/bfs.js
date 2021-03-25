var queue = new Queue();

function exploreBFS(a, b){
	if(a<0||a>=x||b<0||b>=y) return undefined;
	const ad = document.querySelector(`div[data-x="${a}"][data-y="${b}"]`);
	if(ad.dataset.visited==0 && ad.dataset.state!='wall'){
		queue.enqueue([a,b]);
		ad.dataset.visited = 1;
		return ad;
	}
	return undefined;
}



async function bfs(){
	if(queue.isEmpty()) return;
	
	var u = queue.dequeue();
	const el = document.querySelector(`div[data-x="${u[0]}"][data-y="${u[1]}"]`);

	//end
	if(el.dataset.state=='end'){
		path.push([u[0],u[1]]);
		el.dataset.state = 'path';
		queue.empty();
		return;
	}

	//adjacents
	var ad1 = exploreBFS(u[0]+1,u[1]);
	var ad2 = exploreBFS(u[0],u[1]+1);
	var ad3 = exploreBFS(u[0]-1,u[1]);
	var ad4 = exploreBFS(u[0],u[1]-1);
	

	await new Promise(function(resolve, reject){
		setTimeout(()=>{
			el.classList.add('explore');
			bfs().then(()=>{
				if((ad1 && ad1.dataset.state=='path') || (ad2 && ad2.dataset.state=='path') || (ad3 && ad3.dataset.state=='path') || (ad4 && ad4.dataset.state=='path')){
					path.push([u[0],u[1]]);
					el.dataset.state = 'path';
				}
				resolve();
			});
		},40);
	});
	return;
}