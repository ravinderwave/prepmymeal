@extends('backend.layouts.app')

@section('title','Users Dashbaord || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
        <section class="wrapper">
        <!-- page start-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel">
					<header class="panel-heading text-center">
						<a href="{{ route('users.index') }}" class="btn btn-default pull-left"><i class="fa fa-reply"></i> Back </a>
						<strong> User Dashboard</strong>
					</header>                	
                    <div class="panel-body profile-information">
                       <div class="col-md-3">
                           <div class="profile-pic text-center">
                               <img src="{{ asset('assets/backend/images/admin-avatar.png') }}" alt="{{ $user->username }}"/>
                           </div>
                       </div>
                       	<div class="col-md-6">
                           	<div class="profile-desk">
                               	<h1>{{ ucfirst($user->username) }}<small>(Last Login: {{ date('F j Y',strtotime($user->updated_at)) }})</small></h1>
                               	<span class="text-muted">Member since, {{ date('F j Y',strtotime($user->created_at)) }}</span>
								<span class="text-muted"> </span>      	
                               	<div class="overviewDiv" style="padding-bottom: 25px;">
									<div>Name: {{ ucfirst($user->name) }}</div>
									<div>Email: <a href="mailto:{{ $user->email }}" class="text-info">{{ $user->email }}</a> </div>
                               		<div>Mobile: <a href="tel:{{ $user->phone }}" class="text-info">{{ $user->phone }}</a> </div>
                               	</div>
								@if($user->status==1)
								<span style="padding: 10px;font-size: 12px;" class="label label-success">Active Member</span>
								@else
								<span style="padding: 10px;font-size: 12px;" class="label label-danger">Suspended Member</span>
								@endif
								@if($user->status==1)
								<a href="{{ route('users.edit',$user->id) }}" class="btn btn-danger"><i class="fa fa-ban"></i> Suspend</a>
								@else
								<a href="{{ route('users.edit',$user->id) }}" class="btn  btn-success"><i class="fa fa-check-circle"></i> Activate</a>
								@endif
								{!! Form::open(array('method' => 'DELETE','route' => ['users.destroy', $user->id],'onsubmit' => "return confirm('Are you sure about this?')",'style'=>'display:inline;')) 
								!!}
								<button type="submit" name="submit" class="btn btn-danger btn-trash"><i class="fa fa-trash-o"></i> Delete</button>
								{!! Form::close() !!}
                           	</div>
                       	</div>
                       	<div class="col-md-3">
                           	<div class="profile-statistics">
                               	<h1>{{ count($user->orders) }}</h1>
                               	<p><strong>Total Orders</strong></p>
                               	<h1>{{ count($user->addresses) }}</h1>
                               	<p><strong>Total Addresses</strong></p>
                           	</div>
                       	</div>
                    </div>
                </section>
            </div>
            <div class="col-md-12">
                <section class="panel">
                    <header class="panel-heading tab-bg-dark-navy-blue">
                        <ul class="nav nav-tabs nav-justified ">
                            <li class="active"><a data-toggle="tab" href="#addresses">Address Listing</a></li>
                            <li><a data-toggle="tab" href="#orders" class="contact-map">Orders Listing</a></li>
                        </ul>
                    </header>
                    <div class="panel-body">
                        <div class="tab-content tasi-tab">
                            <div id="addresses" class="tab-pane active">
                                <div class="row">
                                    <div class="col-md-12">
	                                	<table class="display table table-bordered table-striped">
						                    <thead>
							                    <tr>
							                        <th># ID</th>
							                        <th>Address</th>
							                        <th>City</th>
							                        <th>State</th>
							                        <th>Zip</th>
							                    </tr>
						                    </thead>
						                    <tbody>
						                    	@if(count($user->addresses))
						                    	@foreach($user->addresses as $row=>$address)
							                    <tr>
							                        <td>{{ $row+1 }}</td>
							                        <td>{{ $address->address }}</td>
							                        <td>{{ $address->city }}</td>
							                        <td>{{ $address->state }}</td>
							                        <td>{{ $address->zip }}</td>
							                    </tr>
							                    @endforeach
							                    @else
							                    <tr>
							                    	<td align="center" colspan="5">No data found</td>
							                    </tr>
							                    @endif
						                    </tbody>
	                                	</table>
	                                </div>
                                </div>
                            </div>
                            <div id="orders" class="tab-pane ">
                                <div class="row">
                                    <div class="col-md-12">
	                                	<table class="display table table-bordered table-striped">
						                    <thead>
							                    <tr>
							                        <th># ID</th>
							                        <th width="20%">Meal</th>
							                        <th>Qty</th>
							                        <th>Amt</th>
							                        <th>Order Date</th>
							                        <th class="hidden-phone">Action</th>
							                    </tr>
						                    </thead>
						                    <tbody>
						                    	@if(count($user->orders))
						                    	@foreach($user->orders as $row=>$order)
							                    <tr>
							                        <td>{{ $row+1 }}</td>
							                        <td>{{ $order->meal->title }}</td>
							                        <td>{{ $order->quantity }}</td>
							                        <td>{{ $order->amount }}</td>
							                        <td>{{ date('Y-m-d',strtotime($order->created_at)) }}</td>
							                        <td class="center hidden-phone">
							                        	<a href="{{ route('orders.show',$order->id) }}" class="btn btn-xs btn-info"><i class="fa fa-eye"></i> View</a>
							                       	</td>
							                    </tr>
							                    @endforeach
							                    @else
							                    <tr>
							                    	<td align="center" colspan="6">No data found</td>
							                    </tr>
							                    @endif
						                    </tbody>
	                                	</table>
                                    </div>
                                </div>
                            </div>                         
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!-- page end-->
        </section>
</section>

@endsection

@section('styles')

@endsection

@section('scripts')
@endsection