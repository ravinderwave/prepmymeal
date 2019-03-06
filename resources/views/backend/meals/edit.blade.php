@extends('backend.layouts.app')

@section('title','Edit Meal || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        Edit Meal
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
							{!! Form::open(['route'=>['meals.update',$meal->id],'autocomplete'=>'oldfield','files'=>true,'method'=>'put']) !!}
                                <div class="form-group">
                                    <label for="title">Title *</label>
                                    <input type="text" class="form-control" id="title" name="title" value="{{ $meal->title }}" placeholder="Title">
                                    <div class="text-danger"> {{ $errors->first('title') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="slug">Slug *</label>
                                    <input type="text" class="form-control" id="slug" name="slug" value="{{ $meal->slug }}" placeholder="Slug">
                                    <div class="text-danger"> {{ $errors->first('slug') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="short_description">Short Description *</label>
                                    <textarea class="editor1" id="short_description" name="short_description">{{ $meal->short_description }}</textarea>
                                    <div class="text-danger"> {{ $errors->first('short_description') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="description">Description *</label>
                                    <textarea class="editor1" id="description" name="description">{{ $meal->description }}</textarea>
                                    <div class="text-danger"> {{ $errors->first('description') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="sku">SKU *</label>
                                    <input type="text" class="form-control" id="sku" name="sku" value="{{ $meal->sku }}" placeholder="SKU">
                                    <div class="text-danger"> {{ $errors->first('sku') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price * (<small>Price excluding VAT</small>)</label>
                                    <input type="text" class="form-control" id="price" name="price" value="{{ $meal->price }}" placeholder="Price">
                                    <div class="text-danger"> {{ $errors->first('price') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="price">Is Saleable *</label>
                                    <div class="icheck minimal">
                                        <label class='box'>
                                            <input type="radio" class='icheck-me' name="saleable" value="1" data-skin="flat" @if($meal->type=='1') checked @endif  data-color="orange"> Yes
                                        </label>
                                        <label class='box'>
                                            <input type="radio" id="radio-inline" class='icheck-me' name="saleable" value="0" @if($meal->type=='0') checked @endif data-skin="flat" data-color="grey"> No 
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group" id="showDiscount" @if($meal->type=='0') style="display: none;" @endif>
                                    <label for="discount_percentage">Discount Percentage</label>
                                    <input type="text" class="form-control" id="discount_percentage" name="discount_percentage" value="{{ $meal->discount_percentage }}" placeholder="Discount Percentage">
                                    <div class="text-danger"> {{ $errors->first('discount_percentage') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="type">Choose Type *</label>
                                    <select name="type" class="form-control" id="mealType">
                                        <option @if($meal->type=='0') selected @endif value="0">Normal</option>
                                        <option @if($meal->type=='1') selected @endif value="1">Meal Box</option>
                                        <option @if($meal->type=='2') selected @endif value="2">Drink</option>
                                    </select>
                                    <div class="text-danger"> {{ $errors->first('type') }}</div>
                                </div>
                                <div id="ntrDiv">
                                    @if(!empty($meal->ntr_options))
                                    @php 
                                        $ntrOptions = json_decode($meal->ntr_options,true);
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
                                    <div id="ntrBlock1" class="mainBlocks" @if($meal->type=='1') style="display: none;" @endif>
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
                                <div id="mealDiv" @if($meal->type==0) style="display: none;" @endif>
                                    @if(!empty($meal->meal_options))
                                    @php 
                                        $mealOptions = json_decode($meal->meal_options,true);
                                    @endphp
                                    @foreach($mealOptions as $key=>$box)
                                    <div id="mealBlock{{ $key }}" class="mainBlocks">
                                        <div class="form-group">
                                            <label for="type">Meal Box {{ $key }}</label>
                                            @if($key==1)
                                            <span class=" btn btn-info btn-sm pull-right addMeal">Add More</span>
                                            @else
                                            <span class=" btn btn-danger btn-sm pull-right removeMeal">Remove</span>
                                            @endif
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 1</label>
                                            <select name="mbc[{{ $key }}][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==0)
                                                <option @if($box[0]==$component->id) selected @endif value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 2</label>
                                            <select name="mbc[{{ $key }}][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==0)
                                                <option @if($box[1]==$component->id) selected @endif value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 3</label>
                                            <select name="mbc[{{ $key }}][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==0)
                                                <option @if($box[2]==$component->id) selected @endif value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 4</label>       
                                            <select name="mbc[{{ $key }}][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==1)
                                                <option @if($box[3]==$component->id) selected @endif value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    @endforeach
                                    @else
                                    <div id="mealBlock1" class="mainBlocks">
                                        <div class="form-group">
                                            <label for="type">Meal Box 1</label>
                                            <span class=" btn btn-info btn-sm pull-right addMeal">Add More</span>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 1</label>
                                            <select name="mbc[1][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==0)
                                                <option value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 2</label>
                                            <select name="mbc[1][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==0)
                                                <option value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 3</label>
                                            <select name="mbc[1][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==0)
                                                <option value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="block col-md-6 col-sm-6">
                                            <label for="type">Component 4</label>       
                                            <select name="mbc[1][]" class="form-control">
                                                @foreach($components as $component)
                                                @if($component->type==1)
                                                <option value="{{ $component->id }}">{{ ucfirst($component->title) }}</option>
                                                @endif
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <label for="image1">Image1 *</label>
                                    @if($meal->image1!=null)
                                    <img class="thumbnail img-responsive" src="{{ asset('uploads/'.$meal->image1) }}" width="150px">
                                    <label for="image">Change Image1</label>
                                    @endif
                                    <input type="file" name="image1">
                                    <div class="text-danger"> {{ $errors->first('image1') }}</div>
                                </div>
                                <div class="form-group">
                                    <label for="image2">Image2</label>
                                    @if($meal->image2!=null)
                                    <img class="thumbnail img-responsive" src="{{ asset('uploads/'.$meal->image2) }}" width="150px">
                                    <label for="image">Change Image2</label>
                                    @endif
                                    <input type="file" name="image2">
                                    <div class="text-danger"> {{ $errors->first('image2') }}</div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="mtitle">Meta Title </label>
                                    <input type="text" class="form-control" id="mtitle" name="mtitle" value="{{ $meal->mtitle }}" placeholder="Meta Title">
                                </div>
                                <div class="form-group">
                                    <label for="mdesc">Meta Description </label>
                                    <textarea class="form-control" id="mdesc" name="mdesc" placeholder="Meta Description">{{ $meal->mdesc }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="mkey">Meta Keyword </label>
                                    <textarea class="form-control" id="mkey" name="mkey" placeholder="Meta Keyword">{{ $meal->mkey }}</textarea>
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
    .box{ display:inline-block; width: 50px;} .icheck-me{ display:inline-block; float:left;}
    .block{
        padding: 0px;
        margin-bottom: 10px;
        padding-right: 10px;
    }
</style>
<link href="{{ asset('assets/backend/js/iCheck/skins/minimal/minimal.css') }}" rel="stylesheet">
@endsection

@section('scripts')
<script src="https://cdn.ckeditor.com/4.10.0/standard-all/ckeditor.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/speakingurl/14.0.1/speakingurl.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-slugify@1.2.5/dist/slugify.min.js"></script>
<script src="{{ asset('assets/backend/js/iCheck/jquery.icheck.js') }}"></script>
<script type="text/javascript">
jQuery(document).ready(function() {
    CKEDITOR.replaceAll('editor1');
    jQuery('#mealType').on('change',function(){
        if (jQuery(this).val()==0) {
            jQuery('#mealDiv').hide();
            jQuery('#ntrDiv').show();
        }
        if (jQuery(this).val()==1) {
            jQuery('#mealDiv').show();
            jQuery('#ntrDiv').hide();
        }
    });
    jQuery('input').on('ifChanged',function(){
        console.log(jQuery(this).val());
        if (jQuery(this).val()==1) {
            jQuery('#showDiscount').show();
        }
        if (jQuery(this).val()==0) {
            jQuery('#showDiscount').hide();
        }
    });
    jQuery('#slug').slugify('#title');
    jQuery('.minimal input').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%' // optional
    });

    mealCount= <?php echo (isset($mealOptions))?count($mealOptions):0; ?>;
    jQuery('.addMeal').click(function(){
        var parentEl = jQuery('div[id^="mealBlock"]:last');
        mealCount++;
        var childEl = parentEl.clone().prop('id','mealBlock'+mealCount);
        childEl.find('.form-group label').text('Meal Box '+mealCount);
        childEl.find('.form-group span').text('Remove');
        childEl.find('.form-group span').removeClass('btn-info').addClass('removeMeal')
            .removeClass('addMeal').addClass('btn-danger');
        childEl.find('select').prop('name','mbc['+mealCount+'][]');
        jQuery('#mealDiv').append(childEl);
    });
    jQuery(document).on('click','.removeMeal',function(){
        mealCount--;
        jQuery(this).closest('.mainBlocks').remove();
    });

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
});
</script>
@endsection