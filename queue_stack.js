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
	distance(element){
		if(!this.isEmpty()){
			var i = this.a.indexOf(element);
			if(i!=-1){
				return b[i];
			}
		}
		return Infinity;
	}
	remove(element){
		if(!this.isEmpty()){
			var i = this.a.indexOf(element);
			if(i!=-1){
				this.a.splice(i,1);
				this.b.splice(i,1);
			}
		}
	}
	enqueue(element,dist){
		var flag = true;
		for(let i=0;i<this.a.length;i++){
			if(this.b[i]>dist){
				this.a.splice(i,0,element);
				this.b.splice(i,0,dist);
				flag=false;
				break;
			}
		}
		if(flag){
			this.a.push(element);
			this.b.push(dist);
		}
	}
	dequeue(){
		if(!this.isEmpty()){
			var el =  this.a.shift();
			var dist = this.b.shift();
			return [el,dist];
		}
	}
}