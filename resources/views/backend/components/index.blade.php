@extends('backend.layouts.app')

@section('title','Components || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        Components Listing
                        <span class="tools pull-right">
                        	<a style="color: #fff;" href="{{ route('components.create') }}" class="btn btn-info"><i class="fa fa-th-large"></i> Add Component</a>
						</span>
                    </header>
                    <div class="panel-body">
                    	<div class="adv-table">
		                    <table  class="display table table-bordered table-striped" id="dynamic-table">
			                    <thead>
				                    <tr>
				                        <th># ID</th>
				                        <th width="20%">Title</th>
				                        <th>Price</th>
				                        <th>Type</th>
				                        <th>Status</th>
				                        <th class="hidden-phone">Action</th>
				                    </tr>
			                    </thead>
			                    <tbody>
			                    	@if(count($components))
			                    	@foreach($components as $row=>$component)
				                    <tr>
				                        <td>{{ $row+1 }}</td>
				                        <td>
				                        	<a style="color: #337ab7;" href="{{ route('components.edit',$component->id) }}">{{ $component->title }}</a>
				                        </td>
				                        <td>${{ $component->price }}</td>
				                        <td>
				                        	@if($component->type==0)
				                        	<label class="label label-info">Main</label>
											@else
				                        	<label class="label label-default">Additional</label>
				                        	@endif
				                        </td>
				                        <td>
				                        	@if($component->status==1)
				                        	<label class="label label-success">Active</label>
				                        	@else
				                        	<label class="label label-danger">De-Active</label>
				                        	@endif
				                        </td>
				                        <td class="center hidden-phone">
				                        	<a href="{{ route('components.edit',$component->id) }}" class="btn btn-xs btn-edit" title="Edit"><i class="fa fa-edit"></i></a>
											{!! Form::open(array('method' => 'DELETE','route' => ['components.destroy', $component->id],'onsubmit' => "return confirm('Are you sure about this?')",'style'=>'display:inline;')) 
											!!}
											<button type="submit" name="submit" title="Delete" class="btn btn-xs btn-trash"><i class="fa fa-trash-o"></i> </button>
											{!! Form::close() !!}
											@if($component->status==1)
											<a href="{{ route('components.show',$component->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-ban"></i> Deactivate</a>
											@else
											<a href="{{ route('components.show',$component->id) }}" class="btn btn-xs btn-danger"><i class="fa fa-check-circle"></i> Activate</a>
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
        "aaSorting": [[ 4, "desc" ]],
        "bPaginate": true,
    });	
</script>
@endsection