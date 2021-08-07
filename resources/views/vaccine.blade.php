@extends('layouts/main-layout')

@section('title', "vaccination-info")

@section('main-contents')
    <div class="container-fluid">
        <div class="main-page-text">
            <br>
            <h2>
                Vaccination record
                @php
                getLatest15DaysData();
                @endphp
            </h2>
        </div>
        <div class="vaccine-records">
            <canvas id="vaccination-record-by-date" height="500px" width="1100px" style="margin: auto;"></canvas>
        </div>

    </div>
@endsection  

@section('scripts')
<!-- {{-- script file for calling those script applicable for this page --}}
<script type="text/javascript" src = "{{ asset('js/dashboard.js')}}"></script>  --> 
<script>
    var vaccineData = '<?php echo json_encode(getLatest15DaysData()); ?>';
    var vaccineData = JSON.parse(vaccineData);
    getVaccineGraph(vaccineData);

    //for each loop
    // vaccineData.forEach(function(data){
    //     data.forEach(function(val){
    //         console.log(val);
    //     });
    // });
</script>
@endsection