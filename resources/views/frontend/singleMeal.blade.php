@extends('frontend.layouts.app')

@section('title','Home || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')
    @php
        $siteOptions = Config::get('siteOptions');
    @endphp
    <section class="">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="item "><img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="Los Angeles" style="width:100%;"></div>
        </div>
    </section>
    <section class="main-three  main-space">
        <div class="container">
            <div class="two">
                <div class="heading"><p> {{ ucwords($meal->title) }} </p></div>
                <div class="col-md-5 col-sm-12 col-xs-12  meal-product-img">
                    <div class=""><img src="{{ asset('uploads/'.$meal->image1) }}"></div>
                    <div class="translate">
                        <div class=" col-md-12 col-sm-12 col-xs-12">
                            <img id="imageToSwap" class="profile img-responsive " src="{{ asset('uploads/'.$meal->image1) }}">
                        </div>
                    </div>
                </div>
                <div class="col-md-7 col-sm-12 col-xs-12  meal-product-text">
                    <div class=" col-md-12">
                        <p class=" meal-product-heading"> SKU {{ $meal->sku }} </p>
                        <div class="rating">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <?php if($meal->type == '2'){ ?>
                        <p class="meal-product-heading price">
                            {{ number_format($meal->price+ ($meal->price*($siteOptions->drink_vat_tax/100)),2) }} &euro; </p>
                        <?php }else { ?>

                        <p class="meal-product-heading price">
                            {{ number_format($meal->price+ ($meal->price*($siteOptions->vat_tax/100)),2) }} &euro; </p>
                        <?php } ?>
                        <p class="vat-text">{!! $meal->short_description !!}</p>
                        @php
                            $cart = session('cart');
                        @endphp
                        <div class="meal-form">
                            <form>
                                <div class="select-field col-md-4">
                                    <div class="quantity">
                                        <div class="input-group">
		                                    <span class="input-group-btn">
		                                        <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]"><span
                                                            class="glyphicon glyphicon-minus"></span></button>
											</span>
                                            <input type="text" name="quant[1]" class="form-control input-number"
                                                   value="@if(!empty($cart) && array_key_exists($meal->id,$cart)) {{ $cart[$meal->id]['qty'] }} @else 1 @endif"
                                                   min="1" max="100">
                                            <span class="input-group-btn">
												<button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]"><span
                                                            class="glyphicon glyphicon-plus"></span></button>
											</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="select-field col-md-8">
                                    <button class="button-add btnCart" data-price="{{ $meal->price }}" data-id="{{ $meal->id }}" type="button">add to
                                        card
                                    </button>
                                    @if(!empty($cart) && array_key_exists($meal->id,$cart))
                                        <p class="text-info"> Item already in your cart</p>
                                    @endif
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class=" col-md-12 meal-product">
                        <div class="col-md-3  col-xs-6 col-sm-3 meal-product-round-main">
                            <div class="Kohlenhydrate">
                                <p>Kohlenhydrate</p>
                                <p>7.0g</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6 col-sm-3  meal-product-round-main">
                            <div class="Kohlenhydrate Kalorien">
                                <p>Kalorien</p>
                                <p>598 kcal</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6 col-sm-3  meal-product-round-main">
                            <div class="Kohlenhydrate Proteine">
                                <p>Proteine</p>
                                <p> 56.3 g</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6 col-sm-3  meal-product-round-main">
                            <div class="Kohlenhydrate Fett">
                                <p>Fett</p>
                                <p> 5.4 g</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-12 meal-product-description">
                    {!! $meal->description !!}
                </div>
            </div>
        </div>
    </section>
    @if(count($meals)>0)
        <section class="container Related-food">
            <div class="related-heading"><p>related food</p></div>
            <div class="col-md-12 related-img">
                @foreach($meals as $rMeal)
                    <div class="col-md-4 rlte-img">
                        <img src="{{ asset('uploads/'.$rMeal->image1) }}">
                        <p class="head-txt"><a href="{{ url($rMeal->slug) }}">{{ ucwords($rMeal->title) }}</a></p>
                        <p class="content-txt">{!! str_limit($rMeal->description,100) !!}</p>
                        <div class="order-now">
                            <div class="col-md-6 odr-now">
                                <p>{{ $rMeal->price }} &#128;</p>
                            </div>
                            <div class="col-md-6 btn-odr-now">
                                <a href="{{ url($rMeal->slug) }}" class="now-btn">order now</a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    @endif
    {!! Notify::render() !!}
@endsection

@section('styles')
@endsection

@section('scripts')
@endsection

