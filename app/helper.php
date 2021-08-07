<?php 

function getCSV()
{
	$data = file_get_contents("http://api.covid19india.org/csv/latest/vaccine_doses_statewise.csv");
	$rows = explode("\n",$data);
	$s = array();
	$header = [];
	$allData = [];
	$count = 0;
	foreach($rows as $row) {
	    //$s[] = str_getcsv($row);
	   	if ($count == 0) {
	   		$tempHeader = str_getcsv($row);
	   		foreach ($tempHeader as $val) {
	   			array_push($header, $val);
	   		}
	   		$count += 1;
	   	}
	   	else{
	   		$tempdata = str_getcsv($row);
	   		$data = [];
	   		foreach ($tempdata as $val) {
	   			array_push($data, $val);
	   		}
	   		array_push($allData, $data);
	   	}

	}
	return [$header, $allData];
}

function convertToCrore($val)
{
	return round($val/10000000,0);
}
function getLatest15DaysData()
{
	$temp = getCSV();
	$label = [];
	$totalVaccine = array_fill(0,15,0);
	$n = sizeof($temp[0]);

	//take last 15 dates 
	for ($i = ($n - 15); $i <= ($n - 1) ; $i+=1){
		array_push($label, $temp[0][$i]);
	}
	$pos = 0;
	for ($i = ($n - 15); $i <= ($n - 1) ; $i+=1){
		$totalVaccine[$pos] += convertToCrore((int) $temp[1][count($temp[1]) - 1][$i]);
		$pos += 1;
	}

	//convert in value into string value so it can be directy use to make graph
	for($i = 0; $i < count($totalVaccine);$i++) {
    $totalVaccine[$i] = (string) $totalVaccine[$i];
	}
	return [$label, $totalVaccine];
	
}



?>