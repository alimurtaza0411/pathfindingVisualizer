#include <bits/stdc++.h>
#include <chrono>
using namespace std::chrono;
using namespace std;

#define N 100

vector<pair<int,int>> dir = {{0,1},{1,1},{1,0},{1,-1},{0,-1},{-1,-1},{-1,0},{-1,1}};
pair<int,int>src;
pair<int,int>dest;
double ans;
int o=0;
vector<vector<vector<pair<int,int>>>> jp(N,vector<vector<pair<int,int>>>(N,vector<pair<int,int>>(8,{-1,-1})));
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

pair<int,int> Bjump(pair<int,int> curr, pair<int,int> dirLocal, int limit, bool flag){
	if(limit==5){
		if(flag) return curr;
		else return {-1,-1};
	}
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
		jumpPoint = Bjump(next,{dirLocal.first,0},0,false);
		if(jumpPoint.first!=-1 && jumpPoint.second!=-1) return next;
		jumpPoint = Bjump(next,{0,dirLocal.second},0,false);
		if(jumpPoint.first!=-1 && jumpPoint.second!=-1) return next;
	}
	return Bjump(next,dirLocal,limit+1,flag);

	
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
	pair<int,int> jumpPoint;
	if(o==0) jumpPoint= jump(curr,dirLocal);
	else jumpPoint= Bjump(curr,dirLocal,0,true);
	if(jumpPoint.first==-1 && jumpPoint.second==-1) return;
	if( dist[jumpPoint.first][jumpPoint.second]>distance+euclidean(curr,jumpPoint)){
		dist[jumpPoint.first][jumpPoint.second]=distance+euclidean(curr,jumpPoint);
		pq.push({dist[jumpPoint.first][jumpPoint.second]+euclidean(jumpPoint,dest),jumpPoint});
		// visited[jumpPoint.first][jumpPoint.second]=true;
	}
	return;
}

void IJPS(){
	if(pq.empty()) return;
	pair<double,pair<int,int>> curr = pq.top();
	pq.pop();
	if(visited[curr.second.first][curr.second.second]){
        return IJPS();
    }
	visited[curr.second.first][curr.second.second] = true;
	if(curr.second==dest){
		return;
	}
	for(int i=0;i<dir.size();i++){
		pair<int,int> jumpPoint = jp[curr.second.first][curr.second.second][i];
		if(jumpPoint.first!=-1 && jumpPoint.second!=-1){
			double distance = dist[curr.second.first][curr.second.second];
            double eu = euclidean(curr.second,jumpPoint);
			if( dist[jumpPoint.first][jumpPoint.second]>distance+eu){
				dist[jumpPoint.first][jumpPoint.second]=distance+eu;
				pq.push({dist[jumpPoint.first][jumpPoint.second]+euclidean(jumpPoint,dest),jumpPoint});
			}	
		}

	}
	IJPS();
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


int main(){
	src.first=0,src.second=0;
	dest.first=N-1,dest.second=N-1;
	srand(time(0));
	for(int i=0;i<N;i++){   
		for(int j=0;j<N;j++){
			grid[i][j]='.';
            if(!(rand()%20))
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
	for(int i=0;i<N;i++){
		for(int j=0;j<N;j++){
			if(grid[i][j]=='X') continue;
			for(int k=0;k<8;k++){
				jp[i][j][k] = jump({i,j}, dir[k]);
			}
		}
	}
	

	dist[src.first][src.second]=0;
	pq.push({0+euclidean(src,dest),src});
	auto start = high_resolution_clock::now();
	JPS();
	auto stop = high_resolution_clock::now();
	auto duration = duration_cast<microseconds>(stop - start);
  	cout <<"Time taken for JPS Algorithm:" <<duration.count()<<"ms\n";
	cout<<dist[N-1][N-1]<<"\n\n";


	o = 1;
	dist = vector<vector<double>>(N,vector<double>(N,DBL_MAX));
	visited = vector<vector<bool>>(N,vector<bool>(N,false));
	if(!pq.empty())
		pq = priority_queue<pair<double,pair<int,int>>,vector<pair<double,pair<int,int>>>,greater<pair<double,pair<int,int>>>>();
	pq.push({0+euclidean(src,dest),src});
    dist[src.first][src.second]=0;
	start = high_resolution_clock::now();
	JPS();
	stop = high_resolution_clock::now();
	duration = duration_cast<microseconds>(stop - start);
  	cout <<"Time taken for BJPS Algorithm:" <<duration.count()<<"ms\n";
	cout<<dist[N-1][N-1]<<"\n\n";


	o=0;
	dist = vector<vector<double>>(N,vector<double>(N,DBL_MAX));
	visited = vector<vector<bool>>(N,vector<bool>(N,false));
	if(!pq.empty())
		pq = priority_queue<pair<double,pair<int,int>>,vector<pair<double,pair<int,int>>>,greater<pair<double,pair<int,int>>>>();
	pq.push({0+euclidean(src,dest),src});
    dist[src.first][src.second]=0;
	start = high_resolution_clock::now();
	IJPS();
	stop = high_resolution_clock::now();
	duration = duration_cast<microseconds>(stop - start);
  	cout <<"Time taken for IJPS Algorithm:" <<duration.count()<<"ms\n";
	cout<<dist[N-1][N-1]<<"\n\n";
    return 0;
}
