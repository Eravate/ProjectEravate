// Data needed to start the app, may be subject to a lot of changes in the near future
var numObject = 0;
var solar = 1;
var objects;
var sfx = new Audio('music/swipe.mp3');
sfx.volume = 0.05;
var vis = false;
var hiddenLeft;
var hiddenRight;
fetchData();