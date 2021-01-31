function addPath(){
    if(path.isEmpty()){
        return;
    }
    var b = path.pop();
    document.querySelector(`div[data-x="${b[0]}"][data-y="${b[1]}"]`).classList.add('path');
    setTimeout("addPath()",50);
}

function visualize(){
    if(state!=""){
        document.querySelector(`li[data-state="${state}"]`).classList.remove('active');
        state="";
    }
    clearExploration();
    boxes.forEach((box)=>{
        box.dataset.visited = 0;
        box.dataset.dist = Infinity;
    });
    const s = document.querySelector(`div[data-x="${start_x}"][data-y="${start_y}"]`);
    const e = document.querySelector(`div[data-x="${end_x}"][data-y="${end_y}"]`);
    s.innerHTML=start;
    e.innerHTML=end;
    if(algo=='bfs'){
        disableVisual();
        queue.enqueue([start_x,start_y]);
        bfs().then(()=>{
            s.dataset.state="start";
            e.dataset.state="end";
            addPath();
            enableVisual();
        });
    }
    else if(algo=='dfs'){
        disableVisual();
        stack.push([start_x,start_y]);
        dfs().then(()=>{
            s.dataset.state="start";
            e.dataset.state="end";
            addPath();
            enableVisual();
        });
    }
    else if(algo=='dijsktra'){
        disableVisual();
        pq.enqueue([start_x,start_y],0);
        dijsktra().then(()=>{
            s.dataset.state="start";
            e.dataset.state="end";
            addPath();
            enableVisual();
        });
    }
    
}