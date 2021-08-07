@extends('layouts/main-layout')

@section('title', "home-page")

@section('main-contents')
    <div class="container-fluid">
        <div class="main-page-text">
            <br>
            <h2>Corona Records of india</h2>
        </div>

        <div class="main-page-banner">
            <img src="/images/coronabanner.jpg">
        </div>

        <div class="corona-record ">
            <div>
                <h3 style="text-align: center;">
                    Top five effected states in <span style="color: #0c63bf">India</span>
                </h3>
            </div>
            <div class="row-wise" id="high-case-state">

            </div>
        </div>

        <div class="getMore">
            <a href="/dashboard">More<i class="arrow right"></i><i class="arrow right"></i><i class="arrow right"></i></a>
        </div>

        <h3 style="text-align: center;">India corona statistics</h3>

        <div class="column-flex">
            <div class="india-graph">
                <div class="india-graph-card">
                    <div class="india-graph-card-header" id="active-closed-header"> {{-- add dynamically--}}</div>
                    <div class="india-graph-card-data">
                        <canvas id="active-closed"></canvas>
                    </div> 
                </div>
                <div class="india-graph-card">
                    <div class="india-graph-card-header" id="total-death-header"> </div>
                    <div class="india-graph-card-data">
                        <canvas id="total-death"></canvas>
                    </div> 
                </div>               
            </div>
            <div class="corona-info">
               <div class="corona-info-header"></div>
               <div class="corona-info-body"></div>
            </div>
        </div>
    </div>
@endsection  

@section('scripts')
{{-- script file for calling those script applicable for this page --}}
<script type="text/javascript" src = "{{ asset('js/home.js')}}"></script>
@endsection
