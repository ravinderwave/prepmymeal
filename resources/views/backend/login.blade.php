<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="PrepMyMeal">
    <link rel="shortcut icon" href="images/favicon.html">
    <title>Login || PrepMyMeal</title>
    <!--Core CSS -->
    <link href="{{ asset('assets/backend/bs3/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/backend/css/bootstrap-reset.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/backend/font-awesome/css/font-awesome.css') }}" rel="stylesheet" />
    <!-- Custom styles for this template -->
    <link href="{{ asset('assets/backend/css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/backend/css/style-responsive.css') }}" rel="stylesheet" />
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
  <body class="login-body">
    <div class="container">
      {!! Form::open(['route'=>'login','method'=>'post','class'=>'form-signin']) !!}
        <h2 class="form-signin-heading">Login in</h2>
        <div class="login-wrap">
            <div class="user-login-info">
              @if ($errors->any())
                  <div class="alert alert-danger">
                      <ul>
                          @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                          @endforeach
                      </ul>
                  </div>
              @endif              
              @if(isset($message))
                <div class="text-danger">
                  {{ $message }}
                </div>
              @endif              
              <input type="text" class="form-control" name="username" autocomplete="off" placeholder="Username" autofocus>
              <div class="text-danger"> {{ $errors->first('username') }}</div>
              <input type="password" class="form-control" name="password" autocomplete="off" placeholder="Password">
              <div class="text-danger"> {{ $errors->first('password') }}</div>
            </div>
            <label class="checkbox">
              <span class="pull-right">
                <a href=""> Forgot Password?</a>
              </span>
            </label>
            <button class="btn btn-lg btn-login btn-block" type="submit">Sign in</button>
        </div>
      {!! Form::close() !!}
    </div>
    <!-- Placed js at the end of the document so the pages load faster -->
    <!--Core js-->
    <script src="{{ asset('assets/backend/js/jquery.js') }}"></script>
    <script src="{{ asset('assets/backend/bs3/js/bootstrap.min.js') }}"></script>
  </body>
</html>
