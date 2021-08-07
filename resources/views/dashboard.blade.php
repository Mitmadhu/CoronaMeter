@extends('layouts/main-layout')

@section('title', "corona-dashboard")


@section('main-contents')
    <div class="container-fluid">
        <div class="main-page-text">
            <br>
            <h2>Corona cases at different states of
                <span style="color: #0c63bf"> India</span>
            </h2>
        </div>

        <div class="state-wise-records">
            <canvas id="state-wise-corona-graph" height="600px" width="1200px"></canvas>
        </div>
        <div id="ag-table" class="ag-theme-alpine my-ag-table" style="height: 530px; width: 1000px;"></div>
        <div class="custom-margin">
             <h3>Select any state to view full details</h3>  
        </div>
        <div class="state-links" style="margin-left: 20px;">
                     {{-- state links added dynamically --}}
        </div>

    </div>
@endsection  

@section('scripts')
{{-- script file for calling those script applicable for this page --}}
{{-- <script type="text/javascript" src = "{{ asset('js/dashboard.js')}}"></script>  --}}
<script type="text/javascript">
    var stateWise = getStateWiseData();
    stateWise.shift(); 
    getLineGraph(stateWise);
    makeIndiaTable(stateWise);
    addStateLinks(stateWise);
</script> 
@endsection