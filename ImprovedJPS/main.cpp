#include <bits/stdc++.h>
#include <chrono>
using namespace std::chrono;
using namespace std;

#define N 50

vector<pair<int,int>> dir = {{0,1},{1,1},{1,0},{1,-1},{0,-1},{-1,-1},{-1,0},{-1,1}};
pair<int,int>src;
pair<int,int>dest;
double ans;
priority_queue<pair<double,pair<int,int>>,vector<pair<double,pair<int,int>>>,greater<pair<double,pair<int,int>>>> pq;
vector<vector<bool>> visited(N,vector<bool> (N,false));
vector<vector<char>>grid(N,vector<char>(N));
vector<vector<double>> dist(N,vector<double>(N,DBL_MAX)); 
//vector<vector<pair<pair<int,int>,pair<int,int>>>> parent(N,vector<pair<pair<int,int>,pair<int,int>>>(N));
double euclidean(pair<int,int>a, pair<int,int>b){
    return sqrt(pow(a.first-b.first,2)+pow(a.second-b.second,2));
}

bool forced_neig(pair<int,int> next, pair<int,int> dirLocal){
	if(dirLocal.first!=0  && dirLocal.second!=0){
        if(next.first-dirLocal.first>=0 && next.first-dirLocal.first<N && next.second+dirLocal.second>=0 && next.second+dirLocal.second<N){
            if(grid[next.first-dirLocal.first][next.second]=='X' && grid[next.first][next.second+dirLocal.second]!='X') return true;
        }
        if(next.first+dirLocal.first>=0 && next.first+dirLocal.first<N && next.second-dirLocal.second>=0 && next.second-dirLocal.second<N){
            if(grid[next.first][next.second-dirLocal.second]=='X' && grid[next.first+dirLocal.first][next.second]!='X') return true;
        }
    }
	else{
        if(next.first+dirLocal.first+dirLocal.second>=0 && next.first+dirLocal.first+dirLocal.second<N && next.second+dirLocal.second+dirLocal.first>=0 && next.second+dirLocal.second+dirLocal.first<N){
        if(grid[next.first+dirLocal.second][next.second+dirLocal.first]=='X' && grid[next.first+dirLocal.first+dirLocal.second][next.second+dirLocal.second+dirLocal.first]!='X') return true;
        }
        if(next.first+dirLocal.first-dirLocal.second>=0 && next.first+dirLocal.first-dirLocal.second<N && next.second+dirLocal.second-dirLocal.first>=0 && next.second+dirLocal.second-dirLocal.first<N){
            if(grid[next.first-dirLocal.second][next.second-dirLocal.first]=='X' && grid[next.first+dirLocal.first-dirLocal.second][next.second+dirLocal.second-dirLocal.first]!='X') return true;
        }
	}
	
	return false;
}

pair<int,int> jump(pair<int,int> curr, pair<int,int> dirLocal){
	pair<int,int> next ={curr.first+dirLocal.first, curr.second+dirLocal.second};
	if(next.first<0 || next.first>=N || next.second<0 || next.second>=N)
        return {-1,-1};
	if(grid[next.first][next.second]=='X' || visited[next.first][next.second]) 
		return {-1,-1};
	if(next==dest) 
		return next;
	if(forced_neig(next,dirLocal)) 
		return next;
	if(dirLocal.first!=0 && dirLocal.second!=0){
		pair<int,int> jumpPoint;
		jumpPoint = jump(next,{dirLocal.first,0});
		if(jumpPoint.first!=-1 && jumpPoint.second!=-1) return next;
		jumpPoint = jump(next,{0,dirLocal.second});
		if(jumpPoint.first!=-1 && jumpPoint.second!=-1) return next;
	}
	return jump(next,dirLocal);
}

void exploreJPS(pair<int,int> curr, pair<int,int> &dirLocal,double distance){
	pair<int,int> jumpPoint = jump(curr,dirLocal);
	if(jumpPoint.first==-1 && jumpPoint.second==-1) return;
	if( dist[jumpPoint.first][jumpPoint.second]>distance+euclidean(curr,jumpPoint)){
		dist[jumpPoint.first][jumpPoint.second]=distance+euclidean(curr,jumpPoint);
		pq.push({dist[jumpPoint.first][jumpPoint.second]+euclidean(jumpPoint,dest),jumpPoint});
		// visited[jumpPoint.first][jumpPoint.second]=true;
	}
	return;
}

void JPS(){
	if(pq.empty()) return;
	pair<double,pair<int,int>> curr = pq.top();
	pq.pop();
	if(visited[curr.second.first][curr.second.second]) return JPS();
	visited[curr.second.first][curr.second.second] = true;
	if(curr.second==dest){
		return;
	}
	for(int i=0;i<dir.size();i++){
		exploreJPS(curr.second,dir[i],dist[curr.second.first][curr.second.second]);
	}
	JPS();
	return;
}

void Astar(){
	pq.push({0,src});
	dist[src.first][src.second]=0;
	while(!pq.empty()){
        if(visited[dest.first][dest.second]) break;
		pair<double,pair<int,int>> curr = pq.top();
		pq.pop();
		if(visited[curr.second.first][curr.second.second]) continue;
		visited[curr.second.first][curr.second.second]=true;
		pair<int,int> u = curr.second;
		
		for(int i=0;i<dir.size();i++){
			if(u.first+dir[i].first>=0 && u.first+dir[i].first<N && u.second+dir[i].second>=0 &&u.second+dir[i].second<N){
				double t =euclidean(u,{u.first+dir[i].first,u.second+dir[i].second});
				if(!visited[u.first+dir[i].first][u.second+dir[i].second] && grid[u.first+dir[i].first][u.second+dir[i].second]!='X' && dist[u.first+dir[i].first][u.second+dir[i].second]> dist[u.first][u.second]+t){
					dist[u.first+dir[i].first][u.second+dir[i].second] = dist[u.first][u.second]+t;
					pq.push({dist[u.first+dir[i].first][u.second+dir[i].second] + euclidean(dest,{u.first+dir[i].first,u.second+dir[i].second}),{u.first+dir[i].first,u.second+dir[i].second}});
				}
			}
		}
	}
	return;
}

void dijkstra(){
	pq.push({0,src});
	dist[src.first][src.second]=0;
	while(!pq.empty()){
        if(visited[dest.first][dest.second]) break;
		pair<double,pair<int,int>> curr = pq.top();
		pq.pop();
		if(visited[curr.second.first][curr.second.second]) continue;
		visited[curr.second.first][curr.second.second]=true;
		pair<int,int> u = curr.second;
		for(int i=0;i<dir.size();i++){
			if(u.first+dir[i].first>=0 && u.first+dir[i].first<N && u.second+dir[i].second>=0 &&u.second+dir[i].second<N){
				if(!visited[u.first+dir[i].first][u.second+dir[i].second] && grid[u.first+dir[i].first][u.second+dir[i].second]!='X' && dist[u.first+dir[i].first][u.second+dir[i].second]> dist[u.first][u.second]+euclidean(u,{u.first+dir[i].first,u.second+dir[i].second})){
					dist[u.first+dir[i].first][u.second+dir[i].second] = dist[u.first][u.second]+euclidean(u,{u.first+dir[i].first,u.second+dir[i].second});
					pq.push({dist[u.first+dir[i].first][u.second+dir[i].second],{u.first+dir[i].first,u.second+dir[i].second}});
				}
			}
		}
	}
	return;
}

int main(){
	src.first=0,src.second=0;
	dest.first=N-1,dest.second=N-1;
	srand(time(0));
	for(int i=0;i<N;i++){   
		for(int j=0;j<N;j++){
			grid[i][j]='.';
            if(!(rand()%4))
            {
                grid[i][j]='X';
            }
		}
	}
	grid[src.first][src.second] = '.';
	grid[dest.first][dest.second] = '.';
	for(int i=0;i<N;i++){
		for(int j=0;j<N;j++)cout<<grid[i][j];
		cout<<"\n";
	}
	cout<<"\n";
	dist[src.first][src.second]=0;
	pq.push({0+euclidean(src,dest),src});
	auto start = high_resolution_clock::now();
	JPS();
	auto stop = high_resolution_clock::now();
	auto duration = duration_cast<microseconds>(stop - start);
  	cout <<"Time taken for JPS Algorithm:" <<duration.count()<<"ms\n";
	cout<<dist[N-1][N-1]<<"\n\n";

	dist = vector<vector<double>>(N,vector<double>(N,DBL_MAX));
	visited = vector<vector<bool>>(N,vector<bool>(N,false));
	if(!pq.empty())
		pq = priority_queue<pair<double,pair<int,int>>,vector<pair<double,pair<int,int>>>,greater<pair<double,pair<int,int>>>>();
	start = high_resolution_clock::now();
	dijkstra();
	stop = high_resolution_clock::now();
	duration = duration_cast<microseconds>(stop - start);
  	cout <<"Time taken for Dijkstra's Algorithm:" <<duration.count()<<"ms\n";
	cout<<dist[N-1][N-1]<<"\n\n";

	dist = vector<vector<double>>(N,vector<double>(N,DBL_MAX));
	visited = vector<vector<bool>>(N,vector<bool>(N,false));
	if(!pq.empty())
		pq = priority_queue<pair<double,pair<int,int>>,vector<pair<double,pair<int,int>>>,greater<pair<double,pair<int,int>>>>();
	  
    start = high_resolution_clock::now();
	Astar();
	stop = high_resolution_clock::now();
	duration = duration_cast<microseconds>(stop - start);
  	cout <<"Time taken for A* Algorithm:" <<duration.count()<<"ms\n";
	cout<<dist[N-1][N-1]<<"\n\n";
    return 0;
}
