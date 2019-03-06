@extends('frontend.layouts.app')

@section('title','Login/Signup || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')
	<section class="">
	    <div id="myCarousel" class="carousel slide" data-ride="carousel">
	        <div class="item active"><img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="" style="width:100%;"></div>
	    </div>
	</section> 
  	<section class="main-tow main-six main-space"> 
		<div class="container">
			<div class="two ">
				<div class="container login-container">
					<div class="row">
						@if(isset($message))
							<div class="alert alert-success">{{ $message }}</div>
						@endif
						@if(isset($errorMessage))
							<div class="alert alert-danger">{{ $errorMessage }}</div>
						@endif
						<div class="col-md-5  col-sm-5">
							<h3 class="login-border">Registration</h3>
							<div class="login-width">
								{!! Form::open(['route'=>'customer.register','autocomplete'=>'new-password']) !!}
									<div class="form-group">
										<label>Username</label>
										<input type="text" class="form-control" placeholder="Enter Username" value="{{ old('username') }}" name="username" />
										<small class="text text-danger">{{ $errors->first('username') }}</small>
									</div>
									<div class="form-group">
										<label>Email</label>
										<input type="email" class="form-control" placeholder="Enter Email" value="{{ old('email') }}" name="email"/>
										<small class="text text-danger">{{ $errors->first('email') }}</small>
									</div>
									<div class="form-group">
										<label>Phone</label>
										<input type="text" class="form-control" placeholder="Enter Phone" value="{{ old('phone') }}" name="phone"/>
										<small class="text text-danger">{{ $errors->first('phone') }}</small>
									</div>
									<div class="form-group">
										<label>Password</label>
										<input type="password" class="form-control" placeholder="Enter Password" value="" name="password"/>
										<small class="text text-danger">{{ $errors->first('password') }}</small>
									</div>
									<div class="form-group">
										<label>Confirm Password</label>
										<input type="password" class="form-control" placeholder="Enter Confirm Password" value="" name="confirm-password"/>
										<small class="text text-danger">{{ $errors->first('confirm-password') }}</small>
									</div>
									<div class="form-group col-md-6 padding-none">
										<input type="submit" class="btnSubmit" value="Registration" />
									</div>
								{!! Form::close() !!}
							</div>
						</div>
						<div class="col-md-2 col-sm-2 hidden-xs-down">
							<div class=" login-form-border">
							</div>
						</div>
						<div class="col-md-5 col-sm-5  ">
							<h3 class="login-border">Login</h3>
							<div class="login-width">								
								{!! Form::open(['route'=>'post.login','autocomplete'=>'old-password']) !!}
									<div class="form-group">
										<label>Email</label>
										<input type="email" class="form-control" placeholder="Enter Email" value="{{ old('email') }}" name="email"/>
										<small class="text text-danger">{{ $errors->first('email') }}</small>
									</div>
									<div class="form-group">
										<label>Password</label>
										<input type="password" class="form-control" placeholder="Enter Password" value="" name="password"/>
										<small class="text text-danger">{{ $errors->first('password') }}</small>
									</div>
									<div class="form-group col-md-6 padding-none">
										<input type="submit" class="btnSubmit" value="Login" />
									</div>
								{!! Form::close() !!}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
 	</section> 
@endsection

@section('styles')
@endsection

@section('scripts')
@endsection