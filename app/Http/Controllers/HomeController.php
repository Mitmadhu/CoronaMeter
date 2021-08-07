<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function showHome()
    {
    	return view('home');
    }

    public function showDashboard(){
        return view('dashboard');
    }

    public function viewState($stateName)
    {
        return view('statesInfo', ['state' => $stateName]);
    }
}
