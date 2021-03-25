var jps_pq = new PriorityQueue();

function forced_neig(a,direction){
    if(direction[0]!=0&&direction[1]!=0){
        if(a[0]-direction[0]>=0 && a[0]-direction[0]<x && a[1]+direction[1]>=0 && a[1]+direction[1]<y){
            var ad = document.querySelector(`div[data-x="${a[0]-direction[0]}"][data-y="${a[1]}"]`);
            var force_ad = document.querySelector(`div[data-x="${a[0]-direction[0]}"][data-y="${a[1]+direction[1]}"]`);
            if(ad.dataset.state=='wall' && force_ad.dataset.state!='wall') return force_ad;
        }
        if(a[0]+direction[0]>=0 && a[0]+direction[0]<x && a[1]-direction[1]>=0 && a[1]-direction[1]<y){
            ad = document.querySelector(`div[data-x="${a[0]}"][data-y="${a[1]-direction[1]}"]`);
            force_ad = document.querySelector(`div[data-x="${a[0]+direction[0]}"][data-y="${a[1]-direction[1]}"]`);
            if(ad.dataset.state=='wall' && force_ad.dataset.state!='wall') return force_ad;
        }
    }
    else{
        if(a[0]+direction[0]+direction[1]>=0 && a[0]+direction[0]+direction[1]<x && a[1]+direction[1]+direction[0]>=0 && a[1]+direction[1]+direction[0]<y){
            var ad = document.querySelector(`div[data-x="${a[0]+direction[1]}"][data-y="${a[1]+direction[0]}"]`);
            var force_ad = document.querySelector(`div[data-x="${a[0]+direction[0]+direction[1]}"][data-y="${a[1]+direction[1]+direction[0]}"]`);
            if(ad.dataset.state=='wall' && force_ad.dataset.state!='wall') return force_ad;
        }
        if(a[0]+direction[0]-direction[1]>=0 && a[0]+direction[0]-direction[1]<x && a[1]+direction[1]-direction[0]>=0 && a[1]+direction[1]-direction[0]<y){
            ad = document.querySelector(`div[data-x="${a[0]-direction[1]}"][data-y="${a[1]-direction[0]}"]`);
            force_ad = document.querySelector(`div[data-x="${a[0]+direction[0]-direction[1]}"][data-y="${a[1]+direction[1]-direction[0]}"]`);
            if(ad.dataset.state=='wall' && force_ad.dataset.state!='wall') return force_ad;
        }    
    }
    return null;
}

function euclidian(a,b){
    return Math.sqrt(Math.pow((a[0]-b[0]),2) + Math.pow((a[1]-b[1]),2));
}

async function jump(a,direction){
    var n=[a[0]+direction[0],a[1]+direction[1]];
    if(n[0]<0||n[0]>=x||n[1]<0||n[1]>=y) return null;
    const jump_el = document.querySelector(`div[data-x="${n[0]}"][data-y="${n[1]}"]`);
    if(jump_el.dataset.state=='wall' || jump_el.dataset.visited==1) return null;
    if(jump_el.dataset.state=='end') return n;
    if(forced_neig(n,direction)!=null) return n;
    await new Promise(function(resolve,reject){
        setTimeout(()=>{
            jump_el.classList.add('jps');
            resolve();
        },5)
    });
    if(direction[0]!=0&&direction[1]!=0){
        var flag=false;
        await new Promise(function(resolve,reject){
            jump(n,[0,direction[1]]).then((value)=>{
                if(value!=null) flag=true;
                jump(n,[direction[0],0]).then((value)=>{
                    if(value!=null) flag=true;
                    resolve();
                });
            });
        });
        if(flag==true) return n;
    }
    return jump(n,direction);

}
async function exploreJPS(a,g,direction){
    await new Promise(function(resolve,reject){
        jump(a,direction).then((value)=>{
            if(value!=null){
                g += euclidian(a,value);
                var el = document.querySelector(`div[data-x="${value[0]}"][data-y="${value[1]}"]`);
                if(el.dataset.dist>=g){
                    var h = euclidian([end_x,end_y],value);
                    jps_pq.enqueue(value,g+h);
                    el.dataset.dist = g;
                    el.dataset.dir_x = direction[0];
                    el.dataset.dir_y = direction[1];
                    el.dataset.par_x = a[0];
                    el.dataset.par_y = a[1];
                }
            }
            resolve();
        });
    });
    return;
}

function makePath(a,el){
    if(el.dataset.state=='start'){
        path.push(a);
        document.querySelector(`div[data-x="${a[0]}"][data-y="${a[1]}"]`).state='path';
        return;
    }
    var b = [parseInt(el.dataset.par_x),parseInt(el.dataset.par_y)];
    while(a[0]!=b[0]||a[1]!=b[1]){
        path.push(a);
        var path_el = document.querySelector(`div[data-x="${a[0]}"][data-y="${a[1]}"]`);
        path_el.dataset.state='path';
        a = [a[0]-parseInt(el.dataset.dir_x),a[1]-parseInt(el.dataset.dir_y)];
    }
    var next_el = document.querySelector(`div[data-x="${b[0]}"][data-y="${b[1]}"]`);
    makePath(b,next_el);
    return;
}
async function JPS(){
    if(jps_pq.isEmpty()) return;
    var u =jps_pq.dequeue();
    const el = document.querySelector(`div[data-x="${u[0][0]}"][data-y="${u[0][1]}"]`);
    el.dataset.visited = 1;
    el.classList.remove('jps');
    el.classList.add('explore');
    console.log(u,el.dataset.state);
    if(el.dataset.state=='end'){
        makePath(u[0],el);
        jps_pq.empty();
        return;
    }
    await new Promise(function(resolve,reject){
        exploreJPS(u[0],parseFloat(el.dataset.dist),[1,0]).then(()=>{
            exploreJPS(u[0],parseFloat(el.dataset.dist),[0,1]).then(()=>{
                exploreJPS(u[0],parseFloat(el.dataset.dist),[-1,0]).then(()=>{
                    exploreJPS(u[0],parseFloat(el.dataset.dist),[0,-1]).then(()=>{
                        exploreJPS(u[0],parseFloat(el.dataset.dist),[1,-1]).then(()=>{
                            exploreJPS(u[0],parseFloat(el.dataset.dist),[1,1]).then(()=>{
                                exploreJPS(u[0],parseFloat(el.dataset.dist),[-1,1]).then(()=>{
                                    exploreJPS(u[0],parseFloat(el.dataset.dist),[-1,-1]).then(()=>{
                                        resolve();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    await new Promise(function(resolve,reject){
        JPS().then(()=>{
            resolve();
        });
    });
    return;  
}
