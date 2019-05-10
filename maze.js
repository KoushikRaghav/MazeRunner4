var rows = 25;
var columns = 25;
var maze = new Array(rows);
var openGate = [];
var closeGate = [];
var start;
var end;
var w,h;
var route = [];
function setup() 
{
 createCanvas(450, 450);
console.log('A*');
 for(var i = 0; i < rows; i++)
 {
maze[i] = new Array(columns);
 }

//console.log(maze);
for(var i = 0; i < rows; i++)
  {
    for(var j = 0; j < columns; j++)
    {
      maze[i][j] = new cell(i,j);
    }
  }

w = width / columns;
h = height / rows;
start = maze[0][0];
end = maze[rows-1][columns - 1];
start.wall = false;
end.wall = true;
openGate.push(start);

 for(var i = 0; i < rows; i++)
  {
    for(var j = 0; j < columns; j++)
    {
      maze[i][j].addNeighbor(maze);
    } 
  }
}


function cell(i,j)
{
this.i = i;
this.j = j;
this.f = 0;
this.h = 0;
this.g = 0;
this.neighbors = [];
this.previous = undefined;
this.wall = false;
 if(random(1) < 0)
 {
    this.wall = true;
 }

this.display = function(col)
  {
   fill(col);
   if(this.wall)
   {
     fill(0);
   }
   stroke(0);
   rect(this.i * w ,this.j * h , w -1, h-1);
  }

this.addNeighbor = function(maze)
{
var i = this.i;
var j = this.j;
  if(i < rows - 1)
  {
   this.neighbors.push(maze[i+1][j]);
  }
 if(i > 0)
 {
  this.neighbors.push(maze[i-1][j]);
 }
 if(j < columns - 1)
 {
  this.neighbors.push(maze[i][j+1]);
 }
 if(j > 0)
 {
  this.neighbors.push(maze[i][j-1]); 
 }
 if(i > 0 && j > 0)
 {
  this.neighbors.push(maze[i-1][j-1]);
 }
 if(i < rows - 1 && j > 0)
 {
  this.neighbors.push(maze[i+1][j-1]);
 }
 if(i > 0 && j < columns-1)
 {
   this.neighbors.push(maze[i-1][j+1]);
 }
 if(i < rows-1 && j < columns-1)
 {
  this.neighbors.push(maze[i+1][j+1]);
 }
}
}
function draw() {

 if(openGate.length > 0){
var win = 0;
for(var i = 0; i < openGate.length; i++){
if(openGate[i].f < openGate[win].f){
win = i;
}
}
var current = openGate[win];
if(current == end){
noLoop();
console.log("DONE!");
}
 closeGate.push(current);
removeCurrent(openGate,current);
 var neighbors = current.neighbors;
for(var i = 0; i < neighbors.length; i++){
var neighbor = neighbors[i];
if(!closeGate.includes(neighbor) &&
!neighbor.wall){
var tempG = current.g + 1;
var newroute = false;
if(openGate.includes(neighbor)){
if(tempG < neighbor.g){
neighbor.g = tempG;
newroute = true;
}
}else {
neighbor.g = tempG;
newroute = true;
openGate.push(neighbor);
}
if(newroute) {
neighbor.h = heuristic(neighbor,end);
neighbor.f = neighbor.g + neighbor.h;
neighbor.previous = current;
}
}
}
}else{
console.log("No Solution");
noLoop();
return;
}
 
 background(0);

for(var i = 0; i < rows; i++){
for(var j = 0; j < columns; j++){
maze[i][j].display(color(255));
}
}

 for(var i = 0; i < closeGate.length; i++){
closeGate[i].display(color(255,0,0));
}

for(var i = 0; i < openGate.length; i++){
openGate[i].display(color(0,255,0));
}

route = [];
var temp = current;
route.push(temp);
while(temp.previous){
route.push(temp.previous);
temp = temp.previous;
}
 
for(var i =0;i < route.length;i++){
route[i].display(color(0,0,255));
}
}
function removeCurrent(arr,elt){
for(var i = arr.length -1 ;i >= 0; i--){
if(arr[i] == elt){
arr.splice(i,1);
}
}
}
function heuristic(a,b){
var d = dist(a.i,a.j,b.i,b.j);
//var d = abs(a.i-b.i) + abs(a.j-b.j);
return d;
}
