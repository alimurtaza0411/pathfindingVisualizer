function toggleWall(){
    if(this.dataset.state=='start' || this.dataset.state=='end'){
        return;
    }
    if(state =="wall" && wall){
        this.classList.toggle('wall');
        if(this.dataset.state=='wall'){
            this.dataset.state='none';
        }
        else{
            this.dataset.state='wall';
        }
    }
}


function changeState(s){
    if(state==""){
       clearExploration();    
    }
    else{
        document.querySelector(`li[data-state="${state}"]`).classList.remove('active');
    }
    state = s.dataset.state;
    s.classList.add('active');
}


function algorithm(a){
    if(!exploring){
        algo = a.dataset.algo;
        var con = "Visualize-"+algo;
        vis.innerHTML = con;
        vis.onclick = visualize;
    }
}


function activateState(){
    if(state=='wall'){
        if(this.dataset.state=='start' || this.dataset.state=='end'){
            return;
        }
        this.classList.toggle('wall');
        if(this.dataset.state=='wall'){
            this.dataset.state='none';
        }
        else{
            this.dataset.state='wall';
        }
    }
    else if(state=='start'){
        const s = document.querySelector(`div[data-x="${start_x}"][data-y="${start_y}"]`);
        s.innerHTML = "";
        s.dataset.state='none'
        this.classList.remove('wall');
        this.innerHTML = start;
        this.dataset.state = 'start';
        start_x = parseInt(this.dataset.x);
        start_y = parseInt(this.dataset.y);
    }
    else if(state=='end'){
        const e = document.querySelector(`div[data-x="${end_x}"][data-y="${end_y}"]`);
        e.innerHTML = "";
        e.dataset.state='none';
        this.classList.remove('wall');
        this.innerHTML = end;
        this.dataset.state = 'end';
        end_x = parseInt(this.dataset.x);
        end_y = parseInt(this.dataset.y);
    }
}

const boxes = document.querySelectorAll('.box');
boxes.forEach(box=>box.addEventListener('click',activateState));
Grid.addEventListener('mousedown', () => wall = true);
boxes.forEach(box=>box.addEventListener('mouseover',toggleWall));
document.addEventListener('mouseup', () => wall = false);