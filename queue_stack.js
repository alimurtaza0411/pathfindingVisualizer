class Queue {
	constructor(){
		this.a = new Array();
	}
	isEmpty(){
		return this.a.length==0;
	}
	enqueue(element){
		this.a.push(element);
	}
	dequeue(){
		if(!this.isEmpty()){
			return this.a.shift();
		}
	}
	rev(){
		this.a.reverse();
	}
	empty(){
		this.a=[];
	}
}
			
class Stack {
	constructor(){
		this.a = new Array();
	}
	isEmpty(){
		return this.a.length==0;
	}
	push(element){
		this.a.push(element);
	}
	pop(){
		if(!this.isEmpty()){
			return this.a.pop();
		}
	}
}

class PriorityQueue{
	constructor(){
		this.a = new Array();
		this.b = new Array();
	}
	isEmpty(){
		return this.a.length==0;
	}
	enqueue(element,dist){
		let l=0, r=this.a.length;
		while((r-l)>1){
			let m = Math.floor((l+r)/2);
			if(this.b[m]<=dist){
				l=m;
			}
			else{
				r=m;
			}
		}
		if(this.a.length==1 && dist<this.b[0]){
			this.a.splice(0,0,element);
			this.b.splice(0,0,dist);
		}
		else{
			this.a.splice(r,0,element);
			this.b.splice(r,0,dist);
		}
	}
	dequeue(){
		if(!this.isEmpty()){
			var el =  this.a.shift();
			var dist = this.b.shift();
			return [el,dist];
		}
	}
	empty(){
		this.a=[];
		this.b=[];
	}
}