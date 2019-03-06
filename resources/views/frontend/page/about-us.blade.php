@extends('frontend.layouts.app')

@section('title','About-Us || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')

    <section class="">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="item "><img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="Los Angeles" style="width:100%;"></div>
        </div>
    </section>
    <section class="main-tow  main-space">
        <div class="container">
            <div class="two ">
                <div class="heading contact">
                    <p> Wer steckt hinter prepmymeal?</p>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12  ">
                    <div class="about-img">
                        <img class="img-responsive" src="{{asset('assets/frontend/img/')}}/about-img.jpg">
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12  work-img">

                    <div class="about-text">
                        <p>Wir, Jonas und Kevin, sind die Gründer von prepmymeal. Von klein auf waren sportliche Aktivität und das damit einhergehende
                            Interesse für gesunde Ernährung unsere Leidenschaft. Leider kommt vor allem die ausgewogene Ernährung im stressigen
                            Berufsalltag häufig zu kurz und man findet auswärts keine passenden Anbieter. Mit prepmymeal möchten wir dir helfen,
                            gesunde
                            Ernährung in deinen Alltag zu integrieren. Um dies zu ermöglichen, liefern wir dir gesunde Gerichte einfach nach Hause
                            oder an
                            den Arbeitsplatz. Du sparst dir so wertvolle Zeit in der Küche, die du mit deinen Liebsten verbringen kannst.</p>
                    </div>
                </div>

            </div>
        </div>
        <div class="container">
            <div class="two about-section-2">

                <div class="col-md-6 col-sm-6 col-xs-12   work-img">
                    <div class="about-text">
                        <p>Wir, Jonas und Kevin, sind die Gründer von prepmymeal. Von klein auf waren sportliche Aktivität und das damit einhergehende
                            Interesse für gesunde Ernährung unsere Leidenschaft. Leider kommt vor allem die ausgewogene Ernährung im stressigen
                            Berufsalltag häufig zu kurz und man findet auswärts keine passenden Anbieter. Mit prepmymeal möchten wir dir helfen,
                            gesunde
                            Ernährung in deinen Alltag zu integrieren. Um dies zu ermöglichen, liefern wir dir gesunde Gerichte einfach nach Hause
                            oder an
                            den Arbeitsplatz. Du sparst dir so wertvolle Zeit in der Küche, die du mit deinen Liebsten verbringen kannst.</p>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12  ">
                    <div class="about-img">
                        <img class="img-responsive" src="{{asset('assets/frontend/img/')}}/about-img-1.jpg">
                    </div>

                </div>

            </div>
        </div>
    </section>

@endsection