<!DOCTYPE html>
<html>
<head>
	<title>@yield('title')</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('/css/demo.css')}}">
	

	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	{{--  bootstap - 4 is used  --}}
	<link rel="stylesheet" href="{{ asset('/css/bootstrap.min.css') }}" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<!-- aG table - stylesheet -->
  	<link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css">
  	<link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-alpine.css">
	
</head>
<body>

	<!-- Navigation -->
	  	<header class="topbar">
	      <div class="container">
		        <div class="row">
		          <!-- social icon-->
			          	<div class="col-sm-12">
				            <ul class="social-network">
				              <li>
				              	<a class="waves-effect waves-dark" href="#">
				              		<i class="fa fa-facebook"></i>
				              	</a>
				              </li>
				              <li>
				              	<a class="waves-effect waves-dark" href="#">
				              		<i class="fa fa-twitter"></i>
				              	</a>
				              </li>
				              <li>
				              	<a class="waves-effect waves-dark" href="#">
				              		<i class="fa fa-linkedin"></i>
				              	</a>
				              </li>
				            </ul>
			          	</div>
		        </div>
	      </div>
	  	</header>


	  	<nav class="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
		    <div class="container">
		    	  <img src="https://img.icons8.com/plasticine/100/000000/coronavirus.png"/>	
			      <a class="navbar-brand" href="/home" style="text-transform: uppercase; color: black;">Get Covid-19 updates</a>

			      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			      </button>

			      <div class="collapse navbar-collapse" id="navbarResponsive">
				        <ul class="navbar-nav ml-auto">
					        <li class="nav-item active">
					            <a class="nav-link" href="/home">Home
					              <span class="sr-only">(current)</span>
					            </a>
					        </li>

					        <li class="nav-item">
					            <a class="nav-link" href="#">Dashboard</a>
					        </li>

					        <li class="nav-item">
					            <a class="nav-link" href="#">About</a>
					        </li>

					       	<li class="nav-item">
					            <a class="nav-link" href="#">Login</a>
					        </li>

					        <li class="nav-item">
					            <a class="nav-link" href="#">Sign up</a>
					        </li>

					        <li class="nav-item">
					            <a class="nav-link" href="#">Contact us</a>
					        </li>
				        </ul>
			      </div>
		    </div>
	  	</nav>


	<div>
		@yield('main-contents')
	</div>

	{{-- footer --}}
	<footer class="page-footer font-small blue">

	  <!-- Copyright -->
	  <div id="copyright"><a href="https://api.covid19india.org/state_district_wise.json">Made in India</a> 
	  	<img height="30px" src="https://img.icons8.com/color/48/000000/like--v3.png"/>
	  		with
	    	<a href="https://www.linkedin.com/in/madhu-verma-25935118a/"> Madhu Verma</a>
	  </div>

	</footer>
		




	

	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script src="{{ asset('/js/bootstrap.min.js') }}" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	{{-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> --}}

	{{-- script file for writing my own js --}}
	<script type="text/javascript" src = "{{ asset('/js/demo.js')}}"></script>

	<!-- aG table - scripts -->
	<script src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.noStyle.js"></script>

	<!-- chart js script -->
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

	@yield("scripts")
	
</body>
</html>