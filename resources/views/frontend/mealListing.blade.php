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
            <div class="item active"><img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="" style="width:100%;"></div>
        </div>
    </section>
    <section class="container Related-food main-space">
        <div class=" col-md-12 related-heading"><p class=" col-md-12">Meals</p></div>
        <div class="col-md-12 related-img">
            @if(count($meals)>0)
                @foreach($meals as $meal)
                    <div class="col-md-4  col-xs-12 col-sm-6 rlte-img">
                        <img src="{{ asset('uploads/'.$meal->image1) }}">
                        <div class=" col-md-12  meal-product show-product-kalorien">
                            <div class="col-md-6  col-xs-6 col-sm-6 meal-product-round-main">
                                <div class="Kohlenhydrate">
                                    <p>Protein</p>
                                    <p><span id="js-protein-span">0</span> g</p>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 col-sm-6  meal-product-round-main">
                                <div class="Kohlenhydrate Kalorien">
                                    <p>Calories</p>
                                    <p><span id="js-calories-span">0</span> kcal</p>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 col-sm-6  meal-product-round-main">
                                <div class="Kohlenhydrate Proteine">
                                    <p>Carbs</p>
                                    <p><span id="js-carbs-span">0</span> g</p>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 col-sm-6  meal-product-round-main">
                                <div class="Kohlenhydrate Fett">
                                    <p>Fat</p>
                                    <p><span id="js-fat-span">0</span> g</p>
                                </div>
                            </div>
                        </div>
                        <p class="head-txt"><a href="{{ url($meal->slug) }}">{{ ucwords($meal->title) }}</a></p>
                        <p class="content-txt">{!! str_limit($meal->description,100) !!}</p>
                        <div class="order-now">
                            <div class="col-md-6  col-sm-6  col-xs-6 odr-now">
                                <?php if ($meal->type == 2) { ?>
                                <p>{{ number_format($meal->price+ ($meal->price*($siteOptions->drink_vat_tax/100)),2) }} &#128;</p>

                                <?php  }else{ ?>
                                <p>{{ number_format($meal->price+ ($meal->price*($siteOptions->vat_tax/100)),2) }} &#128;</p>

                                <?php }?>
                            </div>
                            <div class="col-md-6  col-sm-6  col-xs-6 btn-odr-now">
                                <a href="{{ url($meal->slug) }}" class="now-btn">order now</a>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </section>
@endsection

@section('styles')
@endsection

@section('scripts')
@endsection

