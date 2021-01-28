const vis = document.querySelector(".visualize");
function algorithm(a){
    if(!exploring){
        algo = a.dataset.algo;
        var con = "Visualize-"+algo;
        vis.innerHTML = con;
        vis.onclick = visualize;
    }
}
function disableVisual(){
    vis.onclick = null;
    exploring = true;
}
function enableVisual(){
    vis.onclick = visualize;
    exploring = false;
}