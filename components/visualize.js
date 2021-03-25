function clearExploration(){
    boxes.forEach((box)=>{
        box.classList.remove('path','explore','jps');
        delete box.dataset.visited;
        delete box.dataset.dist;
        delete box.dataset.par_x;
        delete box.dataset.par_y;
        if(box.dataset.state=='path'){
            box.dataset.state='none';
        }
    });
}
function clearAll(){
    boxes.forEach((box)=>{
        box.classList.remove('path','explore','wall','jps');
        delete box.dataset.visited;
        delete box.dataset.dist;
        start_x = 0;
        start_y = 0;
        end_x = 49;
        end_y = 19;
        box.innerHTML = "";
        if(box.dataset.state!='none'){
            box.dataset.state='none';
        }
    });
}

function disableVisual(){
    vis.onclick = null;
    exploring = true;
}
function enableVisual(){
    vis.onclick = visualize;
    exploring = false;
}
function addPath(){
    if(path.isEmpty()){
        return;
    }
    var b = path.pop();
    document.querySelector(`div[data-x="${b[0]}"][data-y="${b[1]}"]`).classList.remove('jps');
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
    path.empty();
    const s = document.querySelector(`div[data-x="${start_x}"][data-y="${start_y}"]`);
    const e = document.querySelector(`div[data-x="${end_x}"][data-y="${end_y}"]`);
    s.innerHTML=start;
    e.innerHTML = end;
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
        s.dataset.visited=1;
        dfs().then(()=>{
            path.push([start_x,start_y]);
            s.dataset.state="start";
            e.dataset.state="end";
            addPath();
            enableVisual();
        });
    }
    else if(algo=='dijsktra'){
        disableVisual();
        pq.enqueue([start_x,start_y],0);
        s.dataset.dist = 0;
        dijsktra().then(()=>{
            s.dataset.state="start";
            e.dataset.state="end";
            addPath();
            enableVisual();
        });
    }
    else if(algo=='AStar'){
        disableVisual();
        var g = Math.abs(end_x-start_x) + Math.abs(end_y-start_y);
        f.enqueue([start_x,start_y],g);
        s.dataset.dist = 0;
        AStar().then(()=>{
            s.dataset.state="start";
            e.dataset.state="end";
            addPath();
            enableVisual();
        });
    }
    else if(algo=='JPS'){
        disableVisual();
        var h = euclidian([start_x,start_y],[end_x,end_y]);
        jps_pq.enqueue([start_x,start_y],h);
        s.dataset.dist = 0;
        s.dataset.dir_x = (end_x==start_x)?0:((end_x>start_x)?1:-1);
        s.dataset.dir_y = (end_y==start_y)?0:((end_y>start_y)?1:-1);
        JPS().then(()=>{
            s.dataset.state="start";
            e.dataset.state="end";
            console.log("end");
            addPath();
            enableVisual();
        })
    }
    
}