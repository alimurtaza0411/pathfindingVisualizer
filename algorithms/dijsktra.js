var pq = new PriorityQueue();

function findPath(v){
    if(v[0]==start_x && v[1]==start_y){
        path.push(v);
        return;
    }
    el = document.querySelector(`div[data-x="${v[0]}"][data-y="${v[1]}"]`);
    path.push(v);
    el.dataset.state = 'path';
    findPath([el.dataset.par_x, el.dataset.par_y]);

}



function explore(a,b,c){
    if(a[0]<0||a[0]>=x||a[1]<0||a[1]>=y) return;
    const ad = document.querySelector(`div[data-x="${a[0]}"][data-y="${a[1]}"]`);
    if(ad.dataset.state=='wall') return;
	if(ad.dataset.visited==0 && ad.dataset.dist>c){
        pq.enqueue(a,c);
        ad.dataset.dist = c;
        ad.dataset.par_x = b[0];
        ad.dataset.par_y = b[1];
    }
}



async function dijsktra(){
	if(pq.isEmpty()) return;
 
    var u = pq.dequeue();
    const el = document.querySelector(`div[data-x="${u[0][0]}"][data-y="${u[0][1]}"]`);
    el.dataset.visited =1;

	//end
	if(el.dataset.state=='end'){
        pq.empty();
		findPath([u[0][0],u[0][1]]);
		return;
	}

    //adjacents
    var ad;
    ad = [u[0][0]+1,u[0][1]];
	explore(ad,u[0],u[1]+1);
    ad = [u[0][0],u[0][1]+1];
    explore(ad,u[0],u[1]+1); 
    ad = [u[0][0]-1,u[0][1]];
    explore(ad,u[0],u[1]+1);
    ad = [u[0][0],u[0][1]-1];
	explore(ad,u[0],u[1]+1);
	

	await new Promise(function(resolve, reject){
		setTimeout(()=>{
			el.classList.add('explore');
			dijsktra().then(()=>{
				resolve();
			});
		},50);
	});
	return;
}