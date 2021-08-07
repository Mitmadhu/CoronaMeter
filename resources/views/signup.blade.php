@extends('layouts/main-layout')

@section('title', "user-signup")


@section('main-contents')
    <div class="container-fluid">
        <div class="main-page-text">
            <br>
            <h2>
                Sign up here
            </h2>
        </div>

    </div>
@endsection  

@section('scripts')
<!-- {{-- script file for calling those script applicable for this page --}}
<script type="text/javascript" src = "{{ asset('js/dashboard.js')}}"></script>  --> 
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.js"></script>
<script>
    test();
</script>
@endsection