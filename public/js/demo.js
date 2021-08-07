//function to return api data in json form
function getHTTPData(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    data = xmlHttp.responseText;
    return JSON.parse(data);
}
 //https://api.covid19india.org/v4/data.json


 //function to return state wise records

 function getStateWiseData() {
    const data = getHTTPData("https://api.covid19india.org/state_district_wise.json");

    var stateWise = []
    for (var state in data){
        var confirm = 0;
        var recover = 0; 
        var active = 0;
        for (var distdata in data[state]){
            for(var dist in data[state][distdata]){
                for (key in data[state][distdata][dist]){
                    if (key == 'confirmed' && typeof(data[state][distdata][dist]['confirmed']) != 'undefined'){
                        confirm += data[state][distdata][dist]['confirmed'];
                    }
                    else if (key == 'recovered' && typeof(data[state][distdata][dist]['recovered']) != 'undefined'){
                        recover += data[state][distdata][dist]['recovered'];
                    }

                    else if (key == 'active' && typeof(data[state][distdata][dist]['active']) != 'undefined'){
                        active += data[state][distdata][dist]['active'];
                    }
                    
                    
                }
            }
        } 
        stateWise.push({state : state, confirmed : confirm, active : active, recovered : recover, death : confirm - (active + recover)});   
    }

    stateWise.sort((a, b) => (a.confirmed > b.confirmed) ? 1 : (a.confirmed < b.confirmed) ? -1 : 0);
    return stateWise;
 }

//convert in lakh form

function convertLakh(num){
    num = num/100000;
    return num.toFixed(2);
}

//convert in thousand
function convertThousand(num){
    num = num/1000;
    return num.toFixed(2);
}

function getNumLength(num){
    return ("" + num).length;
}

function getRequiredFormat(num){
    var len = getNumLength(num);
    if (len <= 3)
        return num;
    else if (len <= 5)
        return (convertThousand(num) + '  Thousand');
    return convertLakh(num) + '  Lakh';
    
}

function cardHtml(data){
    return `<div class="item">
                <div class="header"><a href='state/${data['state']}'><h4>${data['state']}</h4></a></div>

                <div class="itemData">
                    <p>Confirmed: ${convertLakh(data['confirmed'])} Lakh</p>
                    <p>Active: ${convertLakh(data['active'])} Lakh</p>
                    <p>Recovered: ${convertLakh(data['recovered'])} Lakh</p>
                    <p>Death: ${convertThousand(data['death'])}K</p>
                </div>
            </div>`;
}

function getTopStateCards(stateWise) {
    var len = stateWise.length;
    for(var i = len - 1; i >= (len - 6); i--){
        $("#high-case-state").append(cardHtml(stateWise[i]));
    }
}


//make graph for india corona record

function getPieChartGraph(myData, myLabels, myColors, chardId){
    const labels = [
      myLabels[0],
      myLabels[1]
    ];

    const data = {
      labels: labels,
      datasets: [{
        label: 'Active close cases of corona',
        backgroundColor: [
            myColors[0],
            myColors[1]
        ],
        borderColor: [
           myColors[1],
           myColors[0] 
        ],
        data: [myData[0], myData[1]],
      }]
    };

    const config = {
      type: 'pie',
      data,
      options: {}
    };

    var myChart = new Chart(
        chardId,
        config
    );
}



function getIndiaGraph() {
    const stateData = getStateWiseData();
    stateData.shift();
    var activeClosedCases = [0, 0];
    var confirmDeathCases = [0, 0];
    for(var i = 0; i < stateData.length; i++){
        activeClosedCases[0] += stateData[i]['active'];
        activeClosedCases[1] += stateData[i]['recovered'];
        confirmDeathCases[0] += stateData[i]['confirmed'];
        confirmDeathCases[1] += stateData[i]['death'];

    }
    

    $('#active-closed-header').append(`<h5>Total active & recoverd<br>cases: ${convertLakh(activeClosedCases[0] + activeClosedCases[1])} Lakh</h5>`);

    $('#total-death-header').append(`<h5>Total confirmed &<br>death cases: ${convertLakh(confirmDeathCases[0] + confirmDeathCases[1])} Lakh</h5>`);
    var chartId = document.getElementById('active-closed');
    getPieChartGraph(activeClosedCases, ['active', 'recovered'], ['#17a2b8', '#28a745' ], chartId);

    chartId = document.getElementById('total-death');
    getPieChartGraph(confirmDeathCases, ['confirmed', 'death'], ['#ffc107cc', '#dc3545' ], chartId);

    //Fill the corona-info 
    $('.corona-info-header').append(`<h5>Total cases: ${convertLakh(confirmDeathCases[0])} Lakh</h5>`);
    $('.corona-info-body').append(`<p>Total active cases: ${convertLakh(activeClosedCases[0])} Lakh</p><p>Total recovered: ${convertLakh(activeClosedCases[1])} Lakh</p><p>Total death: ${convertThousand(confirmDeathCases[1])}K</p>`);
    
}


//for state wise graph on dashbord page
function makeLineChartGraph(myLabel, confirmed, recovered, active, death, chartId){
    const labels = myLabel

    const data = {
      labels: labels,
      datasets: [{
        label: 'confirmed case in Thousand',
        backgroundColor: [
            '#ffc107'
        ],
        borderColor:[
            '#fd7e14e6'
        ],
        data: confirmed,
      },
      {
        label: 'recovered case in Thousand',
        backgroundColor: [
           '#34af50'
        ],
        borderColor:[
            '#07b72f'
        ],
        data: recovered,
      },
      {
        label: 'active case in Thousand',
        backgroundColor: [
            '#17a2b8'
        ],
        borderColor:[
            '#007bffb3'
        ],
        data: active,
      },
      {
        label: 'Total death in Thousand',
        backgroundColor: [
           '#da2738'
        ],
         borderColor:[
            '#ff0000b3'
        ],
        data: death,
      }]
    };

    const config = {
      type: 'line',
      data,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'easeInQuad',
            from: 1,
            to: 0,
            loop: false
          }
        },
        responsive: false
      }
    };

    var myChart = new Chart(
        chartId,
        config
    );
}

function collectDataSet(stateWise) {
    var states = [];
    var confirmed = [];
    var recovered = [];
    var active = []
    var death = [];

    for (var i = 0; i < stateWise.length; i++){
        states.push(stateWise[i]['state']);
        confirmed.push(convertThousand(stateWise[i]['confirmed']));
        recovered.push(convertThousand(stateWise[i]['recovered']));
        active.push(convertThousand(stateWise[i]['active']));
        death.push(convertThousand(stateWise[i]['death']));
    }
    return [states, confirmed, recovered, active, death];

}

function getLineGraph(stateWise) {
    var alldata = collectDataSet(stateWise);
    var states = alldata[0];
    var confirmed = alldata[1];
    var recovered = alldata[2];
    var active = alldata[3];
    var death = alldata[4];
    var chartid = document.getElementById('state-wise-corona-graph');
    makeLineChartGraph(states, confirmed, recovered, active, death, chartid)
}

function addStateLinks(stateWise) {
    var alldata = collectDataSet(stateWise);
    var states = alldata[0];
    var obj = $('.state-links');

    for(var i = 0; i < states.length; i++){
        obj.append(`<h6><a href='/state/${states[i]}'><li>${states[i]}</li></a></h6>`)
    }
}

function makeIndiaTable(stateData) {
    var temp = collectDataSet(stateData);
    var stateNames = temp[0];
    var confirmed = temp[1];
    var recovered = temp[2];
    var active = temp[3];
    var death = temp[4];
    console.log(stateNames, confirmed, recovered);

    const columnDefs = [
        { field : "State" , sortable : true},
        { field : "Confirmed"},
        { field : "Active" },
        { field : "Recovered", sortable : true},
        { field : "Death", sortable : true}
    ];

    //make row data

    var rowData = [];

    for(var i = 0; i < stateNames.length - 1; i++){
        rowData.push({
            //here data is already taken in lakh
                State : stateNames[i],
                Confirmed :confirmed[i] + ' Lakh',
                Active : active[i] + ' Lakh',
                Recovered : recovered[i] + ' Lakh',
                Death : death[i] + ' Lakh'
            });
    }

    // let the grid know which columns and what data to use
    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData
    };


    // lookup the container we want the Grid to use
    const eGridDiv = document.querySelector('#ag-table');

    new agGrid.Grid(eGridDiv, gridOptions);
    //console.log(getNumLength(100));
}





// Scripts for showing graph for each state state/maharasta

function districtWise(myState) {
    //console.log(myState);
    const data = getHTTPData("https://api.covid19india.org/state_district_wise.json");

    if(data[myState] == undefined) return;

    var distNames = [];
    var confirmed = [];
    var recovered = [];
    var active = [];
    var death = [];
    if (state == 'State Unassigned')
        return;
    for (var distdata in data[myState]){
        for (var dist in data[myState][distdata]){
            if (dist == 'Unknown' || dist == '0' || dist == '1' ) continue;
            var confirm = data[myState][distdata][dist]['confirmed'];
            var recover = data[myState][distdata][dist]['recovered'];
            var activetemp = data[myState][distdata][dist]['active'];
            if (typeof(confirm) != undefined && typeof(recover) != undefined && typeof(activetemp) != undefined) {
                distNames.push(dist);
                confirmed.push(confirm); 
                recovered.push(recover);
                active.push(activetemp);
                var dead = confirm - (recover + activetemp);
                death.push(dead);
            }
        }
    }
    return [distNames, confirmed, recovered, active, death];
}

function getStateLineGraph(myState) {

    var temp = districtWise(myState);
    var distNames = temp[0];
    var confirmed = temp[1];
    var recovered = temp[2];
    var active = temp[3];
    var death = temp[4];

    // console.log(distNames, confirmed, recovered, active, death);
    var chartId = document.getElementById(myState);
    makeLineChartGraph(distNames, confirmed, recovered, active, death, chartId);
}

function getStatePieGraph(myState) {
    var temp = districtWise(myState);
    var distNames = temp[0];
    var confirmed = temp[1];
    var recovered = temp[2];
    var active = temp[3];
    var death = temp[4];

    var activeClosedCases = [0, 0];
    var confirmDeathCases = [0, 0];
    for(var i = 0; i < confirmed.length; i++){
        activeClosedCases[0] += active[i];
        activeClosedCases[1] += recovered[i];
        confirmDeathCases[0] += confirmed[i];
        confirmDeathCases[1] += death[i];

    }

    $('#active-closed-header').append(`<h5>Total active & recoverd<br>cases: ${convertLakh(activeClosedCases[0] + activeClosedCases[1])} Lakh</h5>`);

    $('#total-death-header').append(`<h5>Total confirmed &<br>death cases: ${convertLakh(confirmDeathCases[0] + confirmDeathCases[1])} Lakh</h5>`);
    var chartId = document.getElementById('active-closed');
    getPieChartGraph(activeClosedCases, ['active', 'recovered'], ['#17a2b8', '#28a745' ], chartId);

    chartId = document.getElementById('total-death');
    getPieChartGraph(confirmDeathCases, ['confirmed', 'death'], ['#ffc107cc', '#dc3545' ], chartId);

    
    //for take value in thousand or lakh according to need
    var tempconfirm = 0;
    var tempActive = 0;
    var tempRecovered = 0;
    var tempDeath = 0;

    if ((''+ confirmDeathCases[0]).length  <= 5) {
        tempconfirm= convertThousand(confirmDeathCases[0]);
        tempconfirm += ' K';
    }
    else{
        tempconfirm = convertLakh(confirmDeathCases[0]);
        tempconfirm += ' Lakh';

    }
    if ((''+ confirmDeathCases[1]).length  <= 5) {
        tempDeath= convertThousand(confirmDeathCases[1]);
        tempDeath += ' K';
    }
    else{
        tempDeath = convertLakh(confirmDeathCases[1]);
        tempDeath += ' Lakh';

    }

    if ((''+ activeClosedCases[1]).length  <= 5) {
        tempRecovered= convertThousand(activeClosedCases[1]);
        tempRecovered += ' K';
    }
    else{
        tempRecovered = convertLakh(activeClosedCases[1]);
        tempRecovered += ' Lakh';

    }
    if ((''+ activeClosedCases[0]).length  <= 5) {
        tempActive= convertThousand(activeClosedCases[0]);
        tempActive += ' K';
    }
    else{
        tempActive = convertLakh(activeClosedCases[0]);
        tempActive += ' Lakh';

    }
    $('.corona-info-header').append(`<h5>Total cases: ${tempconfirm}</h5>`);
    $('.corona-info-body').append(`<p>Total active cases: ${tempActive}</p><p>Total recovered: ${tempRecovered}</p><p>Total death: ${tempDeath}</p>`);
    
}

// for each district of one state
function makeStateWiseTable(myState) {
    var temp = districtWise(myState);
    var distNames = temp[0];
    var confirmed = temp[1];
    var recovered = temp[2];
    var active = temp[3];
    var death = temp[4];

    const columnDefs = [
        { field : "District" , sortable : true},
        { field : "Confirmed"},
        { field : "Active" },
        { field : "Recovered", sortable : true},
        { field : "Death", sortable : true}
    ];

    //make row data

    var rowData = [];

    for(var i = 0; i < distNames.length - 1; i++){
        var conf = confirmed[i];
        var acti = active[i];
        var rec = recovered[i];
        var dea = death[i];

        rowData.push({
                District : distNames[i],
                Confirmed :getRequiredFormat(conf),
                Active : getRequiredFormat(acti),
                Recovered : getRequiredFormat(rec),
                Death : getRequiredFormat(dea)
            });
    }

    // let the grid know which columns and what data to use
    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData
    };


    // lookup the container we want the Grid to use
    const eGridDiv = document.querySelector('#ag-table');

    new agGrid.Grid(eGridDiv, gridOptions);
    console.log(getNumLength(100));
}



// Scripts for Vaccination records
//http://api.covid19india.org/csv/latest/vaccine_doses_statewise.csv

function makeVaccineGraph(myLabel, myData, chartId) {
     const data = {
      labels: myLabel,
      datasets: [{
        label: 'Records in Crores',
        backgroundColor: [
            '#007bffe0'
        ],
        borderColor:[
            '#007bff'
        ],
        data: myData,
      },]
    };

    const config = {
      type: 'line',
      data,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'easeInQuad',
            from: 1,
            to: 0,
            loop: false
          }
        },
        responsive: false
      }
    };

    var myChart = new Chart(
        chartId,
        config
    );
}

function getVaccineGraph(data) {
    const chartId = $('#vaccination-record-by-date');
    makeVaccineGraph(data[0], data[1], chartId)
}




