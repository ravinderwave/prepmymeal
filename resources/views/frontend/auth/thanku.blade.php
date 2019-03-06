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
							<div class="alert alert-success">{{ $message }} <a href="{{ route('customer.login') }}">Login Now</a></div>
						@endif
						@if(isset($errorMessage))
							<div class="alert alert-danger">{{ $errorMessage }} <a href="{{ route('customer.login') }}">Register Now</a></div>
						@endif
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