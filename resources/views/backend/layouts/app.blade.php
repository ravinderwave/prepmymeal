<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf8_unicode_ci">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="PrepMyMeal">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
    <meta http-equiv="X-UA-Compatible" content="IE=9">
    <meta http-equiv="Content-Type" content="text/html; charset=utf8_unicode_ci" />    

    <link rel="shortcut icon" href="{{ asset('images/favicon.png') }}">
    <title>@yield('title')</title>
    <!--Core CSS -->
    <link href="{{ asset('assets/backend/bs3/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/backend/js/jquery-ui/jquery-ui-1.10.1.custom.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/backend/css/bootstrap-reset.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/backend/font-awesome/css/font-awesome.css') }}" rel="stylesheet">
    <!--clock css-->
    <link href="{{ asset('assets/backend/js/css3clock/css/style.css') }}" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="{{ asset('assets/backend/css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/backend/css/style-responsive.css') }}" rel="stylesheet"/>
    <script src="{{ asset('assets/backend/js/jquery.js') }}"></script>
    @yield('styles')
    <style type="text/css">
    .loader {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: url('{{ url("/") }}/assets/backend/images/loader.gif') 50% 50% no-repeat rgb(249,249,249);
        opacity: .8;
    }    
    </style>
</head>
<body>
<div class="loader" style="display: none;"></div>
<section id="container">
    <!--header start-->
    <header class="header fixed-top clearfix">
        <!--logo start-->
        <div class="brand">
            <a href="{{ url('/backend') }}" class="logo">
                <img style="width: 62%" src="{{ asset('assets/frontend/img/preplogo.png') }}" alt="">
            </a>
            <div class="sidebar-toggle-box">
                <div class="fa fa-bars"></div>
            </div>
        </div>
        <!--logo end-->
        <div class="top-nav clearfix">
            <!--search & user info start-->
            <ul class="nav pull-right top-menu">
                <!-- user login dropdown start-->
                <li class="dropdown">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <img alt="" src="{{ asset('assets/backend/images/admin-avatar.png') }}">
                        <span class="username">{{ ucfirst(Auth::user()->username) }}</span><b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu extended logout">
                        <!--li><a href="{{ route('profile') }}"><i class=" fa fa-suitcase"></i>Profile</a></li-->
                        <li><a href="{{ route('logout') }}"><i class="fa fa-key"></i> Log Out</a></li>
                    </ul>
                </li>
                <!-- user login dropdown end -->
            </ul>
            <!--search & user info end-->
        </div>
    </header>
    <!--header end-->
    @include('backend.layouts.sidebar')
    @yield('content')
</section>
<!-- Placed js at the end of the document so the pages load faster -->
<!--Core js-->
<script src="{{ asset('assets/backend/bs3/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('assets/backend/js/jquery.dcjqaccordion.2.7.js') }}"></script>
<script src="{{ asset('assets/backend/js/jquery.scrollTo.min.js') }}"></script>
<script src="{{ asset('assets/backend/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.js') }}"></script>
<script src="{{ asset('assets/backend/js/jquery.nicescroll.js') }}"></script>
<!--common script init for all pages-->
<script src="{{ asset('assets/backend/js/scripts.js') }}"></script>
<!--script for this page-->
@yield('scripts')
</body>
</html>