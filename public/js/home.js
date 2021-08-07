document.addEventListener("DOMContentLoaded", function(event){
	  
    
    var stateWise = getStateWiseData();
    stateWise.shift();
    
    //Get home five state cards detail
    getTopStateCards(stateWise);

    //get pie chart
    getIndiaGraph();
    
});