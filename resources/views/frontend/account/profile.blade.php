@extends('frontend.layouts.app')

@section('title','My Account || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')
	<section class="">
		<div class="item ">
			<img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="Los Angeles" style="width:100%; max-height: 300px;">
		</div>
	</section>
	<section class="main-three main-space"> 
	    <div class="container-fluid">
			<div class="col-md-12">
				<div class="heading">
	                <p> My Profile </p>
	            </div>
	            <div class="profile-content">
				    <div class="col-md-12 col-sm-12 col-xs-12">
						<div class="col-xs-12 col-sm-3 col-md-3">
				            <ul class="nav nav-tabs tabs-left">
				                <li class="active"><a href="{{ route('customer.dashboard') }}"> <strong>My Profile</strong></a></li>
				                <li><a href="{{ route('customer.addresses') }}"> Manage Addresses</a></li>
				                <li><a href="{{ route('customer.orders') }}"> My Orders</a></li>
				                <li><a href="{{ route('customer.payments') }}"> Payments</a></li>
				            </ul>
				        </div>
				        <div class="col-xs-12 col-sm-9 col-md-9">
				            <!-- Tab panes -->
				            <div class="tab-content">
				                <div class="tab-pane active" id="profile">
									<div class="row">
										@if(Session::has('message'))
											<div class="alert alert-success">{{ Session::get('message') }}</div>
										@endif										
										<div class="col-md-12 col-xs-12 col-sm-12">
											{!! Form::open(['route'=>'customer.updateProfile','autocomplete'=>'new1-password']) !!}
												<div class="form-group col-md-6">
													<label>Fullname</label>
													<input type="text" class="form-control" placeholder="Enter Fullname" value="{{ $customer->name }}" name="name" />
													<small class="text text-danger">{{ $errors->first('name') }}</small>
												</div>
												<div class="form-group col-md-6">
													<label>Username</label>
													<input type="text" class="form-control" placeholder="Enter Username" value="{{ $customer->username }}" name="username" />
													<small class="text text-danger">{{ $errors->first('username') }}</small>
												</div>
												<div class="form-group col-md-6">
													<label>Email</label>
													<input type="email" class="form-control" placeholder="Enter Email" value="{{ $customer->email }}" name="email" readonly="readonly" />
													<small class="text text-danger">{{ $errors->first('email') }}</small>
												</div>
												<div class="form-group col-md-6">
													<label>Phone</label>
													<input type="text" class="form-control" placeholder="Enter Phone" value="{{ $customer->phone }}" name="phone"/>
													<small class="text text-danger">{{ $errors->first('phone') }}</small>
												</div>
												<div class="form-group col-md-6 padding-none">
													<input type="submit" class="btn-sm btnSubmit" value="Update" />
												</div>
											{!! Form::close() !!}
										</div>
										<div class="col-md-12 col-xs-12 col-sm-12">
											{!! Form::open(['route'=>'customer.updatePassword','autocomplete'=>'new-password']) !!}
												<div class="form-group col-md-6">
													<label>Old Password</label>
													<input type="password" class="form-control" placeholder="Enter Old Password" value="" name="oldPassword"/>
													<small class="text text-danger">{{ $errors->first('oldPassword') }}</small>
												</div>
												<div class="form-group col-md-6">
													<label>New Password</label>
													<input type="password" class="form-control" placeholder="Enter New Password" value="" name="password"/>
													<small class="text text-danger">{{ $errors->first('password') }}</small>
												</div>
												<div class="form-group col-md-6 padding-none">
													<input type="submit" class="btn-sm btnSubmit" value="Change Password" />
												</div>
											{!! Form::close() !!}
										</div>
									</div>	
				                </div>
				            </div>
				        </div>
				        <div class="clearfix"></div>
					</div>
	            </div>
			</div>
		</div>
	</section>
@endsection

@section('styles')
<style type="text/css">
	.tabs-left{
	  border-bottom: none;
	  padding-top: 2px;
	}
	.tabs-left {
	  border-right: 1px solid rgb(234, 124, 0);
	}
	.tabs-left>li{
	  float: none;
	  margin-bottom: 2px;
	}
	.tabs-left>li {
	  margin-right: -1px;
	}
	.tabs-left>li.active>a,
	.tabs-left>li.active>a:hover,
	.tabs-left>li.active>a:focus {
		border-color: #ea7c00 !important;
	  	border-right-color: transparent;
	  	border-right:none;		
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(234, 124, 0) !important;
	}

	.tabs-left>li>a {
	  border-radius: 4px 0 0 4px;
	  margin-right: 0;
	  display:block;
	}
	.vertical-text {
	  margin-top:50px;
	  border: none;
	  position: relative;
	}
	.vertical-text>li {
	  height: 20px;
	  width: 120px;
	  margin-bottom: 100px;
	}
	.vertical-text>li>a {
	  border-bottom: 1px solid #ddd;
	  border-right-color: transparent;
	  text-align: center;
	  border-radius: 4px 4px 0px 0px;
	}
	.vertical-text>li.active>a,
	.vertical-text>li.active>a:hover,
	.vertical-text>li.active>a:focus {
	  border-bottom-color: transparent;
	  border-right-color: #ddd;
	  border-left-color: #ddd;
	}
	.vertical-text.tabs-left {
	  left: -50px;
	}
	.vertical-text.tabs-left>li {
	  -webkit-transform: rotate(-90deg);
	  -moz-transform: rotate(-90deg);
	  -ms-transform: rotate(-90deg);
	  -o-transform: rotate(-90deg);
	  transform: rotate(-90deg);
	}	
	.space-bottom {
	    height: 52px;
	}
	.payment-main {
	    clear: both;
	    padding-top: 26px;
	}
	.user-dashbord-sidebar {
	    margin-top: 100px;
	}
	@media only screen and (max-width: 992px) {
		.user-dashbord-sidebar{	
		margin-top: 72px !important;
		margin-left: 0px !important;
		}
	}
	.order-show-btn:focus {
	    color: #333;
	    text-decoration: none;
	}
	.order-show-btn {

	    color: #333;
	    text-decoration: none;
	}
	.user-dashbord-sidebar {
	    margin-top: 100px;
	    border: 3px solid #eee;
	    position: absolute !important;
	    height: 350px;
	    margin-left: 10px;
	}
	.dashboard-heading {
	    margin-top: 10px;
	}
	.info-box-icon.bg-aqua {

	    background: #ea7c00;
	    padding: 11px;
	    font-size: 32px;
	    text-align: center;
	    color: #fff;
	}
	.info-box-content {

	    font-size: 16px;
	    position: absolute;
	    top: 7px;
	    text-transform: uppercase;
	}
	.info-box-number {

	    font-weight: 600;
	}
	.info-box {
	    border: 2px solid #eee;
	    height: 71px;
	}
	.user-table-main {
	    margin-top: 30px;
	}
</style>
@endsection

@section('scripts')

@endsection

