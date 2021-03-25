var stack = new Stack();

function exploreDFS(a,b){
	if(a<0||a>=x||b<0||b>=y) return false;
	var ad = document.querySelector(`div[data-x="${a}"][data-y="${b}"]`);
	if(ad.dataset.visited==0 && ad.dataset.state!='wall'){
		ad.dataset.visited=1;
		stack.push([a,b]);
		return true;
	}
	return false;
}



async function dfs(){
	if(stack.isEmpty()) return false;
	
	var u = stack.pop();
	el = document.querySelector(`div[data-x="${u[0]}"][data-y="${u[1]}"]`);
				
	if(el.dataset.state=='end'){
		path.push([u[0],u[1]]);
		stack.empty();
		el.dataset.state='path';
		return true;
	}

    await new Promise(function(resolve,reject){
        setTimeout(()=>{
            el.classList.add('explore');
            resolve();
        },50);
	});
	
	//adjacennts
	if(exploreDFS(u[0]+1,u[1])){
		var flag =false;
		await new Promise(function(resolve,reject){
			dfs().then((value)=>{
				if(value){
					el.dataset.state='path';
					path.push([u[0]+1,u[1]]);
					flag =true;
				}
				resolve();
			});
		});
		if(flag){
			return true;
		}
	}

	if(exploreDFS(u[0],u[1]+1)){
		var flag =false;
		await new Promise(function(resolve,reject){
			dfs().then((value)=>{
                if(value){
					el.dataset.state='path';
					path.push([u[0],u[1]+1]);
					flag =true;
				}
				resolve();
			});
		});
		if(flag){
			return true;
		}
	}

	if(exploreDFS(u[0]-1,u[1])){
		var flag =false;
		await new Promise(function(resolve,reject){
			dfs().then((value)=>{
				if(value){
					el.dataset.state='path';
					path.push([u[0]-1,u[1]]);
					flag =true;
				}
				resolve();
			});
		});
		if(flag){
			return true;
		}
	}

	if(exploreDFS(u[0],u[1]-1)){
		var flag =false;
		await new Promise(function(resolve,reject){
			dfs().then((value)=>{
				if(value){
					el.dataset.state='path';
					path.push([u[0],u[1]-1]);
					flag =true;
				}
				resolve();
			});
		});
		if(flag){
			return true;
		}
	}
	
	return false;
				
}