// Data needed to start the app, may be subject to a lot of changes in the near future
var adminInfo;
var showHidden=0,showUnseen=0,showFlagged=0;
var sfx = new Audio('music/swipe.mp3');
sfx.volume = 0.05;
fetchDataAdmin();