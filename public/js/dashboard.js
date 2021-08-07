document.addEventListener("DOMContentLoaded", function(event){
	
	var stateWise = getStateWiseData();
    stateWise.shift(); 
    getLineGraph(stateWise);
    addStateLinks(stateWise);
    
});
