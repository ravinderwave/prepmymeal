@extends('backend.layouts.app')

@section('title','Edit Components || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        Edit Component
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
							{!! Form::open(['route'=>['components.update',$component->id],'autocomplete'=>'oldfield','files'=>true,'method'=>'put']) !!}
                                <div class="form-group">
                                    <label for="title">Title *</label>
                                    <input type="text" class="form-control" id="title" name="title" value="{{ $component->title }}" placeholder="Title">
                                    <div class="text-danger"> {{ $errors->first('title') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="weight">Weight(g) *</label>
                                    <input type="text" class="form-control" id="weight" name="weight" value="{{ $component->weight }}" placeholder="Weight in gram">
                                    <div class="text-danger"> {{ $errors->first('weight') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="type">Choose Type *</label>
                                    <select name="type" class="form-control">
                                        <option @if($component->type=='0') selected @endif value="0">Main</option>
                                        <option @if($component->type=='1') selected @endif value="1">Additional</option>
                                    </select>
                                    <div class="text-danger"> {{ $errors->first('type') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price *</label>
                                    <input type="text" class="form-control" id="price" name="price" value="{{ $component->price }}" placeholder="Price">
                                    <div class="text-danger"> {{ $errors->first('price') }}</div>
                                </div>
                                <div id="ntrDiv">
                                    @if(!empty($component->ntr_options))
                                    @php 
                                        $ntrOptions = json_decode($component->ntr_options,true);
                                    @endphp
                                    @foreach($ntrOptions as $key=>$box)
                                    <div id="ntrBlock{{ $key }}" class="mainBlocks">
                                        <div class="form-group">
                                            <label for="type">Nutrition {{ $key }}</label>
                                            @if($key==1)
                                            <span class=" btn btn-info btn-sm pull-right addNtr">Add More</span>
                                            @else
                                            <span class=" btn btn-danger btn-sm pull-right removeNtr">Remove</span>
                                            @endif
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Name</label>
                                            <input type="text" class="form-control" id="ntrName{{ $key }}" name="ntr[{{ $key }}][name]" value="{{ $box['name'] }}" placeholder="Name">
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Weight(in KCal/g)</label>
                                            <input type="text" class="form-control" id="ntrWeight{{ $key }}" name="ntr[{{ $key }}][weight]" value="{{ $box['weight'] }}" placeholder="Weight(in KCal/g)">
                                        </div>
                                    </div>
                                    @endforeach
                                    @else
                                    <div id="ntrBlock1" class="mainBlocks">
                                        <div class="form-group">
                                            <label for="type">Nutrition 1</label>
                                            <span class=" btn btn-info btn-sm pull-right addNtr">Add More</span>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Name</label>
                                            <input type="text" class="form-control" id="ntrName" name="ntr[1][name]" value="{{ old('ntrName') }}" placeholder="Name">
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Weight(in Cal/g)</label>
                                            <input type="text" class="form-control" id="ntrWeight" name="ntr[1][weight]" value="{{ old('ntrWeight') }}" placeholder="Weight(in Cal/g)">
                                        </div>
                                    </div>                                    
                                    @endif
                                </div>
                                <div class="form-group">
                                    <label for="image">Image</label>
                                    @if($component->image!=null)
                                    <img class="thumbnail img-responsive" src="{{ asset('uploads/'.$component->image) }}" width="150px">
                                    <label for="image">Change Image</label>
                                    @endif
                                    <input type="file" name="image">
                                    <div class="text-danger"> {{ $errors->first('image') }}</div>
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
</style>
@endsection

@section('scripts')
<script type="text/javascript">
    ntrCount=<?php echo (isset($ntrOptions))?count($ntrOptions):0; ?>;
    jQuery('.addNtr').click(function(){
        var parentEl = jQuery('div[id^="ntrBlock"]:last');
        ntrCount++;
        var childEl = parentEl.clone().prop('id','ntrBlock'+ntrCount);
        childEl.find('.form-group label').text('Nutrition '+ntrCount);
        childEl.find('.form-group span').text('Remove');
        childEl.find('.form-group span').removeClass('btn-info').addClass('removeNtr')
            .removeClass('addNtr').addClass('btn-danger');
        childEl.find("[id^='ntrName']").prop('id','ntrName'+ntrCount);
        childEl.find("[id^='ntrWeight']").prop('id','ntrWeight'+ntrCount);
        childEl.find('#ntrName'+ntrCount).prop('name','ntr['+ntrCount+'][name]');
        childEl.find('#ntrWeight'+ntrCount).prop('name','ntr['+ntrCount+'][weight]');
        childEl.find(':text').prop('value','');
        jQuery('#ntrDiv').append(childEl);
    });
    jQuery(document).on('click','.removeNtr',function(){
        ntrCount--;
        jQuery(this).closest('.mainBlocks').remove();
    });
</script>
@endsection