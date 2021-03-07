var f = new PriorityQueue();

function findPath(v){
    if(v[0]==start_x && v[1]==start_y){
        path.push(v);
        return;
    }
    var el = document.querySelector(`div[data-x="${v[0]}"][data-y="${v[1]}"]`);
    path.push(v);
    el.dataset.state = 'path';
    findPath([el.dataset.par_x, el.dataset.par_y]);

}

function manhattan(a,b){
    return Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]);
}

function exploreAStar(a,b,g){
    if(a[0]<0||a[0]>=x||a[1]<0||a[1]>=y) return;
    const ad = document.querySelector(`div[data-x="${a[0]}"][data-y="${a[1]}"]`);
    if(ad.dataset.state=="wall") return;
    if(ad.dataset.visited==0 && ad.dataset.dist>g){
        var h = manhattan([end_x,end_y],a);
        var temp = h + g;
        f.enqueue(a,temp);
        ad.dataset.dist = g;
        ad.dataset.par_x = b[0];
        ad.dataset.par_y = b[1];
    }
}

async function AStar(){
    if(f.isEmpty()) return;

    var u = f.dequeue();
    const el = document.querySelector(`div[data-x="${u[0][0]}"][data-y="${u[0][1]}"]`);
    el.dataset.visited = 1;
    el.classList.add('explore');

    if(el.dataset.state=="end"){
        findPath(u[0]);
        f.empty();
        return;
    }

    var ad;
    var g = parseInt(el.dataset.dist) +1;
    ad = [u[0][0]+1,u[0][1]];
    exploreAStar(ad,u[0],g);
    ad = [u[0][0],u[0][1]+1];
    exploreAStar(ad,u[0],g);
    ad = [u[0][0]-1,u[0][1]];
    exploreAStar(ad,u[0],g);
    ad = [u[0][0],u[0][1]-1];
    exploreAStar(ad,u[0],g);

    await new Promise(function(resolve,reject){
        setTimeout(()=>{
            AStar().then(()=>{
                resolve();
            })
        },100);
    });
    return;
}