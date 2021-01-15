function addPath(){
    if(path.isEmpty()){
        return;
    }
    var b = path.pop();
    document.querySelector(`div[data-x="${b[0]}"][data-y="${b[1]}"]`).classList.add('path');
    setTimeout("addPath()",50);
}

function visualize(){
    boxes.forEach((box)=>{
        box.dataset.visited = 0;
    });
    const s = document.querySelector(`div[data-x="${start_x}"][data-y="${start_y}"]`);
    const e = document.querySelector(`div[data-x="${end_x}"][data-y="${end_y}"]`);
    if(state!=""){
        document.querySelector(`li[data-state="${state}"]`).classList.remove('active');
        state="";
    }
    document.querySelector(`div[data-x="${start_x}"][data-y="${start_y}"]`).dataset.visited = 1;
    stack.push([start_x,start_y]);
    queue.enqueue([start_x,start_y]);
    dfs().then(()=>{
        s.dataset.state="start";
        e.dataset.state="end";
        addPath();
    });
    
}