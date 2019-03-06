@extends('backend.layouts.app')

@section('title','Coupons || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        Coupons Listing
                        <span class="tools pull-right">
                        	<a style="color: #fff;" href="{{ route('coupons.create') }}" class="btn btn-info"><i class="fa fa-gift"></i> Add Coupon</a>
						</span>
                    </header>
                    <div class="panel-body">
                    	<div class="adv-table">
		                    <table  class="display table table-bordered table-striped" id="dynamic-table">
			                    <thead>
				                    <tr>
				                        <th># ID</th>
				                        <th>Username</th>
				                        <th>Coupon</th>
				                        <th>Discount</th>
				                        <th>Valid Till</th>
				                        <th>Usage Count</th>
				                        <th>Status</th>
				                        <th class="hidden-phone">Action</th>
				                    </tr>
			                    </thead>
			                    <tbody>
			                    	@if(count($coupons))
			                    	@foreach($coupons as $row=>$coupon)
				                    <tr>
				                        <td>{{ $row+1 }}</td>
				                        <td><a href="{{ route('coupons.edit',$coupon->id) }}" class="btn btn-xs btn-edit">{{ $coupon->username }}</a></td>
				                        <td>{{ $coupon->code }}</td>
				                        <td>{{ $coupon->discount }}</td>
				                        <td>{{ $coupon->valid_till }}</td>
				                        <td>{{ (empty($coupon->usage_count))?0:$coupon->usage_count }}</td>
				                        <td>
				                        	@if($coupon->status==1)
											<label class="label label-success">Active</label>
				                        	@else
											<label class="label label-danger">Suspended</label>
				                        	@endif
				                        </td>
				                        <td class="center hidden-phone">
				                        	<a href="{{ route('coupons.edit',$coupon->id) }}" class="btn btn-xs btn-info"><i class="fa fa-eye"></i> View</a>
											{!! Form::open(array('method' => 'DELETE','route' => ['coupons.destroy', $coupon->id],'onsubmit' => "return confirm('Are you sure about this?')",'style'=>'display:inline;')) 
											!!}
											<button type="submit" name="submit" class="btn btn-xs btn-trash"><i class="fa fa-trash-o"></i> Delete</button>
											{!! Form::close() !!}
											@if($coupon->status==1)
											<a href="{{ route('coupons.show',$coupon->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-ban"></i> Suspend</a>
											@else
											<a href="{{ route('coupons.show',$coupon->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-check-circle"></i> Activate</a>
											@endif
				                        </td>
				                    </tr>
				                    @endforeach
				                    @endif
			                	</tbody>
			                </table>
			            </div>
			        </div>
			    </section>
			</div>
		</div>
	</section>
</section>
@endsection

@section('styles')
<!--dynamic table-->
<link href="{{ asset('assets/backend/js/advanced-datatable/css/demo_page.css') }}" rel="stylesheet" />
<link href="{{ asset('assets/backend/js/advanced-datatable/css/demo_table.css') }}" rel="stylesheet" />
<link href="{{ asset('assets/backend/js/data-tables/DT_bootstrap.css') }}" rel="stylesheet" />
@endsection

@section('scripts')
<!--dynamic table-->
<script type="text/javascript" src="{{ asset('assets/backend/js/advanced-datatable/js/jquery.dataTables.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/backend/js/data-tables/DT_bootstrap.js') }}"></script>
<script type="text/javascript">
	jQuery('#dynamic-table').dataTable( {
        "aaSorting": [[ 0, "asc" ]],
        "bPaginate": true,
    });	
</script>
@endsection