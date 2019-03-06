@extends('backend.layouts.app')

@section('title','Users || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        Users Listing
                    </header>
                    <div class="panel-body">
                    	<div class="adv-table">
		                    <table  class="display table table-bordered table-striped" id="dynamic-table">
			                    <thead>
				                    <tr>
				                        <th># ID</th>
				                        <th>Username</th>
				                        <th>Email</th>
				                        <th>No of Orders</th>
				                        <th>Status</th>
				                        <th class="hidden-phone">Action</th>
				                    </tr>
			                    </thead>
			                    <tbody>
			                    	@if(count($users))
			                    	@foreach($users as $row=>$user)
				                    <tr>
				                        <td>{{ $row+1 }}</td>
				                        <td><a href="{{ route('users.show',$user->id) }}" class="btn btn-xs btn-edit">{{ $user->username }}</a></td>
				                        <td>{{ $user->email }}</td>
				                        <td>{{ count($user->orders) }}</td>
				                        <td>
				                        	@if($user->status==1)
				                        	<label class="label label-success">Active</label>
				                        	@else
				                        	<label class="label label-danger">Suspended</label>
				                        	@endif
				                        </td>
				                        <td class="center hidden-phone">
				                        	<a href="{{ route('users.show',$user->id) }}" class="btn btn-xs btn-info"><i class="fa fa-eye"></i> View</a>
											{!! Form::open(array('method' => 'DELETE','route' => ['users.destroy', $user->id],'onsubmit' => "return confirm('Are you sure about this?')",'style'=>'display:inline;')) 
											!!}
											<button type="submit" name="submit" class="btn btn-xs btn-trash"><i class="fa fa-trash-o"></i> Delete</button>
											{!! Form::close() !!}
											@if($user->status==1)
											<a href="{{ route('users.edit',$user->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-ban"></i> Suspend</a>
											@else
											<a href="{{ route('users.edit',$user->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-check-circle"></i> Activate</a>
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