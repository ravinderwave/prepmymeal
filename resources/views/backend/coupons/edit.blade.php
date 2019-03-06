@extends('backend.layouts.app')

@section('title','Edit Coupon || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        Edit Coupon
                        <span class="tools pull-right">
						</span>
                    </header>
                    <div class="panel-body">
						<div class="position-center">
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
							{!! Form::open(['route'=>['coupons.update',$coupon->id],'autocomplete'=>'oldfield','method'=>'put']) !!}
                                <div class="form-group">
                                    <label for="username">Username *</label>
                                    <input type="text" class="form-control" id="username" name="username" value="{{ $coupon->username }}" placeholder="Username">
                                    <div class="text-danger"> {{ $errors->first('username') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="code">Coupon Code *</label>
                                    <input type="text" class="form-control" id="code" name="code" value="{{ $coupon->code }}" placeholder="Coupon Code">
                                    <div class="text-danger"> {{ $errors->first('code') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="discount">Discount *</label>
                                    <input type="text" class="form-control" id="discount" name="discount" value="{{ $coupon->discount }}" placeholder="Discount">
                                    <div class="text-danger"> {{ $errors->first('discount') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="type">Discount Type *</label>
                                    <select name="type" class="form-control">
                                        <option value="0">%</option>
                                        <option value="1">€</option>
                                    </select>
                                    <div class="text-danger"> {{ $errors->first('type') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="valid_till">Valid Till *</label>
                                    <input type="text" class="form-control form-control-inline input-medium default-date-picker" id="valid_till" name="valid_till" value="{{ $coupon->valid_till }}" placeholder="Valid Till">
                                    <div class="text-danger"> {{ $errors->first('valid_till') }}</div>
                                </div>
                                <button type="submit" class="btn btn-info">Submit</button>
                            {!! Form::close() !!}
						</div>
			        </div>
			    </section>
			</div>
		</div>
	</section>
</section>
@endsection

@section('styles')
<style type="text/css">
    .cke_chrome{
        border: 1px solid #d1d1d1 !important;
    }
    .block{
        padding: 0px;
        margin-bottom: 10px;
        padding-right: 10px;
    }
    .datepicker table tr td.disabled,
    .datepicker table tr td.disabled:hover {
      background: none;
      color: #e2dada;
      cursor: default;
    }    
</style>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/backend/js/bootstrap-datepicker/css/datepicker.css') }}" />
@endsection

@section('scripts')
<script type="text/javascript" src="{{ asset('assets/backend/js/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
<script type="text/javascript">
$('.default-date-picker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    startDate :new Date()
});    
</script>
@endsection