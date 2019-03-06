@extends('backend.layouts.app')

@section('title','Meals || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        Meals Listing
                        <span class="tools pull-right">
                        	<a style="color: #fff;" href="{{ route('meals.create') }}" class="btn btn-info"><i class="fa fa-cutlery"></i> Add Meal</a>
						</span>
                    </header>
                    <div class="panel-body">
                    	<div class="adv-table">
		                    <table  class="display table table-bordered table-striped" id="dynamic-table">
			                    <thead>
				                    <tr>
				                        <th># ID</th>
				                        <th width="20%">Title</th>
				                        <th>SKU</th>
				                        <th>Price</th>
				                        <th>Type</th>
				                        <th>Status</th>
				                        <th class="hidden-phone">Action</th>
				                    </tr>
			                    </thead>
			                    <tbody>
			                    	@if(count($meals))
			                    	@foreach($meals as $row=>$meal)
				                    <tr>
				                        <td>{{ $row+1 }}</td>
				                        <td><a href="{{ route('meals.edit',$meal->id) }}" class="btn btn-xs btn-edit">{{ $meal->title }}</a></td>
				                        <td>{{ $meal->sku }}</td>
				                        <td>{{ $meal->price }}</td>
				                        <td>
				                        	@if($meal->type==1)
				                        	<label class="label label-info">Meal Box</label>
				                        	@else
				                        	<label class="label label-default">Normal</label>
				                        	@endif
				                        </td>
				                        <td>
				                        	@if($meal->status==1)
				                        	<label class="label label-success">Published</label>
				                        	@else
				                        	<label class="label label-danger">Un Published</label>
				                        	@endif
				                        </td>
				                        <td class="center hidden-phone">
				                        	<a href="{{ route('meals.edit',$meal->id) }}" class="btn btn-xs btn-edit"><i class="fa fa-edit"></i></a>
											{!! Form::open(array('method' => 'DELETE','route' => ['meals.destroy', $meal->id],'onsubmit' => "return confirm('Are you sure about this?')",'style'=>'display:inline;')) 
											!!}
											<button type="submit" name="submit" class="btn btn-xs btn-trash"><i class="fa fa-trash-o"></i> </button>
											{!! Form::close() !!}
											@if($meal->status==1)
											<a href="{{ route('meals.show',$meal->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-ban"></i> Un-Published</a>
											@else
											<a href="{{ route('meals.show',$meal->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-check-circle"></i> Published</a>
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
        "aaSorting": [[ 0, "desc" ]],
        "bPaginate": true,
    });	
</script>
@endsection