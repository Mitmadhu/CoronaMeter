@extends('layouts/main-layout')

@section('title', "state-info")


@section('main-contents')
    <div class="container-fluid">
        <div class="main-page-text">
            <br>
            <h2>Corona cases of <span style="color: #0c63bf">{{ $state }}</span></h2>
        </div>

        <div class="dist-wise-records">
            <canvas id="{{ $state}}" height="500px" width="1200px"></canvas>
        </div>

        <div class="state-column-flex">
            <div class="state-graph">
                <div class="state-graph-card">
                    <div class="state-graph-card-header" id="active-closed-header"> {{-- add dynamically--}}</div>
                    <div class="state-graph-card-data">
                        <canvas id="active-closed">{{-- add dynamically--}}</canvas>
                    </div> 
                    {{-- <div><button type="button" class="btn btn-primary">click me</button></div> --}}
                </div>
                <div class="state-graph-card">
                    <div class="state-graph-card-header" id="total-death-header"> {{-- add dynamically--}}</div>
                    <div class="state-graph-card-data">
                        <canvas id="total-death">{{-- add dynamically--}}</canvas>
                    </div> 
                </div>               
            </div>
            <div class="corona-info">
               <div class="corona-info-header">{{-- add dynamically--}}</div>
               <div class="corona-info-body">{{-- add dynamically--}}</div>
            </div>
        </div>

        <div id="ag-table" class="ag-theme-alpine my-ag-table" style="height: 530px; width: 1000px;"></div>

    </div>
@endsection  

@section('scripts')
<script type="text/javascript">
    const state = '<?php echo $state ?>';
    getStateLineGraph(state);
    getStatePieGraph(state);
    makeStateWiseTable(state);
</script>
@endsection