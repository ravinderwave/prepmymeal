@extends('frontend.layouts.app')

@section('title','Info || PrepMyMeal')
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


                <div class="col-md-6 col-sm-6 col-xs-12  ">
                    <div class="info-heading">
                        <p>Gesundes Meal Prep für dich! </p>
                    </div>
                    <div>
                        <p class="info-color">Gesunde Gerichte für deinen Alltag </p>
                        <p class="info-content"><b>Mit unserem 4-Komponenten Konzept</b> halten wir unsere Meal Prep Gerichte transparent. So weißt du
                            genau, was in deinen Meals steckt und welche Nährwerte sie enthalten. Die Meals bestehen aus einer Eiweißquelle, einer
                            Kohlenhydratquelle (außer Low-Carb-Gerichte), einer Vitaminquelle und einer Soße. Wir verwenden keine Geschmacksverstärker
                            oder Zusatzstoffe – nach unserem Motto »eat clean«. Wir wählen vitaminreiches Gemüse, Fleisch aus Deutschland und nur
                            natürliche Zutaten. </p>
                        <p>
                            <svg version="1.1" id="1868767157" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                                 y="0px" viewBox="0 0 182 72" style="enable-background:new 0 0 182 72;" xml:space="preserve" class="svg u_1868767157"
                                 data-icon-custom="true" data-icon-name="prepmymeal-15.svg" alt="Fitness Food" data-hover-effect="none">
							<style type="text/css" id="1848756336">
                                .st0-1504501518 {
                                    fill: #2C2C2B;
                                }

                                .st1-1504501518 {
                                    fill: #E77232;
                                }
                            </style>

                                <path class="st0-1504501518" d="M49.5,20.1c-2.3-2.5-5.5-3.9-8.9-3.9c-2.6,0-5.2,0.8-7.3,2.4C33,18.9,32.6,19,32.2,19c-0.4,0-0.7-0.2-1-0.4
								c-2.1-1.6-4.7-2.4-7.3-2.4c-3.2,0-6.3,1.3-8.5,3.6c-3,2.8-4.3,6.9-3.6,10.8c0.1,1,0.6,1.2,1.3,1.2h0.4c1.2-0.1,0.6-0.9,0.5-1.4
								c-0.2-1.4-0.1-2.8,0.1-4.2c1-4.5,5.1-7.8,9.8-7.8c2.4,0,4.8,0.9,6.7,2.5c0.5,0.5,1.1,0.8,1.7,0.9c0.6-0.1,1.2-0.4,1.6-0.8
								c1.7-1.7,4-2.6,6.4-2.6c1.6,0,3.1,0.4,4.5,1.1c6.6,3.1,7.8,11.4,2.5,16.8c-4.6,4.7-9.3,9.3-13.9,14c-0.3,0.4-0.7,0.6-1.1,0.7
								c-0.4-0.1-0.8-0.3-1.1-0.6C27.5,46.5,23.6,42.8,20,39c-0.7-0.8-1.6-1.2-2.6-1.2c-0.4,0-0.8,0.1-1.2,0.1c0,0.2,0,0.3,0.1,0.4
								c5.1,5.2,10.3,10.3,15.4,15.5c0.2,0.2,0.4,0.3,0.7,0.4c0.3,0,0.6-0.2,0.8-0.5c1.3-1.4,2.7-2.7,4.1-4.1c4.3-4.3,8.8-8.5,12.8-13.1
								C54.2,31.7,53.8,24.9,49.5,20.1z" id="1139034704"></path>
                                <path class="st1-1504501518" d="M33.3,32.4l-2.9,10c-0.2,0.7-0.3,1.6-1.3,1.6s-1.2-1-1.3-1.8c-0.9-4.1-1.8-8.1-2.7-12.2
								c-0.1-0.5-0.2-0.9-0.4-1.7c-0.9,2.2-1.7,4-2.4,5.9c-0.2,1.1-1.3,1.8-2.3,1.7c-2.2-0.1-4.4,0-6.6,0c-0.8,0-1.8-0.1-1.7-1.2
								s0.9-1.1,1.7-1.1c1.8,0,3.7-0.1,5.5,0c0.9,0.2,1.7-0.4,1.9-1.2c0.9-2.4,1.9-4.8,2.8-7.2c0.3-0.8,0.4-1.9,1.5-1.8s1.2,1.3,1.3,2.1
								c0.9,4.1,1.8,8.1,2.7,12.3c0.7-0.4,0.6-1.1,0.8-1.6c0.8-2.5,1.4-5,2.2-7.5c0.2-0.6,0.4-1.2,1.1-1.2s1.1,0.6,1.3,1.2
								c0.1,0.3,0.2,0.6,0.3,0.9c1.3,4,1.3,4,5.6,4c1,0,1.9,0,2.9,0c0.7,0,1.3,0.3,1.3,1.1c0,0.6-0.4,1.1-1,1.1c0,0-0.1,0-0.1,0
								c-2.6,0-5.2,0-7.9,0c-0.7,0-1.2-0.5-1.4-1.1C33.9,34.1,33.7,33.4,33.3,32.4z" id="1234857821"></path>
                                <path class="st0-1504501518" d="M165.4,43.9c-0.6-3.7-2.3-7-3.6-10.4c-1.2-2.9-1.7-6-1.4-9.1c0.3-2.1,0.9-4.1,1.8-6c0.3-0.7,0.4-1.4-0.5-1.8
								c-0.1-0.1-0.3-0.1-0.5-0.1c-0.6,0-0.9,0.5-1.1,1c-0.8,1.8-1.4,3.7-1.8,5.6c-0.9,4.6,0.3,8.8,2.2,12.9c0.7,1.4,0.2,2-1,2.5
								c-2.4,1-5,1.4-7.6,1.4h-0.4c-2.5,0.1-5.1-0.2-7.5-1c-3-1-3.1-1.1-1.9-3.9c2.6-5.4,2.6-11.7,0-17.1c-0.3-0.6-0.5-1.4-1.2-1.4
								c-0.2,0-0.3,0-0.4,0.1c-1.1,0.4-0.7,1.4-0.4,2.2c0.2,0.5,0.4,0.9,0.5,1.3c1.4,3.5,1.6,7.4,0.5,11c-0.9,2.8-2,5.5-3.1,8.2
								c-2.5,6.2-1.5,11.9,1.7,17.5c0.3,0.5,0.6,0.8,1.1,0.8c0.2,0,0.3,0,0.5-0.1c0.8-0.4,0.7-1.1,0.4-1.8c-0.2-0.4-0.5-0.8-0.7-1.3
								c-1.6-3-2.3-6.5-2-9.9c0.1-0.8,0.3-1.1,0.7-1.1c0.3,0,0.6,0.1,0.8,0.2c3.5,1.4,6.2,4,8.6,6.8c0.7,0.8,1.1,1.8,1,2.9
								c-0.1,1,0,1.9,0,2.9c0,0.7,0.2,1.3,1,1.3l0,0c0.8,0,1-0.6,1-1.3c0-1.1,0-2.2,0-3.4c-0.1-0.5,0-1,0.2-1.4c2.6-3.4,5.6-6.4,9.6-8
								c0.2-0.1,0.4-0.1,0.6-0.2c0.4,0,0.6,0.3,0.6,0.9c0.3,2.2,0.1,4.5-0.6,6.7c-0.5,1.7-1.2,3.3-2,4.9c-0.3,0.6-0.4,1.3,0.4,1.7
								c0.2,0.1,0.3,0.1,0.5,0.2c0.4,0,0.8-0.3,1-0.7C164.7,53,166.1,48.7,165.4,43.9z M161.5,41.5c-3.8,1.5-7.2,4-9.7,7.2
								c-0.3,0.4-0.6,0.6-0.9,0.6s-0.5-0.2-0.9-0.6c-2.7-3.1-5.7-5.8-9.7-7.2c-0.5-0.2-0.9-0.4-0.6-1c0.1-0.3,0.3-0.4,0.4-0.4
								c0.3,0.1,0.5,0.1,0.7,0.3c6.4,2.8,13.6,2.8,19.9,0c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.5,0.2,0.5,0.6S161.9,41.4,161.5,41.5L161.5,41.5
								z" id="1548588153"></path>
                                <path class="st1-1504501518" d="M135.6,27.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.6-0.6-1.4-1.3-0.4-2.2s1.6,0.1,2.1,0.7c3.6,3.6,3.5,2.7,0,6.2
								c-0.2,0.2-0.4,0.4-0.6,0.6c-0.5,0.5-1.1,0.7-1.7,0.1c-0.4-0.4-0.4-1.1,0-1.5c0,0,0,0,0.1-0.1c0.2-0.2,0.4-0.5,0.7-0.8
								c-1.2-0.5-2.3-0.2-3.4-0.3c-0.8-0.1-1.8-0.1-1.8-1.2s0.9-1.1,1.8-1.1L135.6,27.8z" id="1727136124"></path>
                                <path class="st1-1504501518" d="M166.5,27.8c1,0,2,0,3,0s2.1-0.2,2.1,1.1s-1.3,1.2-2.2,1.2s-1.9,0-2.9,0c0,0.3,0,0.4,0,0.5
								c0.5,0.7,1.5,1.4,0.5,2.3c-1,0.9-1.6-0.1-2.1-0.7c-3.6-3.6-3.6-2.7,0-6.2c0.2-0.2,0.4-0.4,0.6-0.6c0.5-0.5,1.1-0.7,1.7-0.1
								s0.3,1.1-0.1,1.6C166.9,27,166.5,27.2,166.5,27.8z" id="1998143149"></path>
                                <path class="st0-1504501518" d="M151,35.8h-0.1c-0.4,0-0.6-0.3-0.6-0.7c0,0,0-0.1,0-0.1c0-0.3,0.1-0.6,0.7-0.7c0.6,0.1,0.7,0.4,0.7,0.7
								S151.6,35.8,151,35.8z" id="1265265211"></path>
                                <path class="st0-1504501518" d="M151,34c-0.6,0-1,0.4-1,1c-0.1,0.5,0.3,1,0.9,1.1c0,0,0,0,0,0h0.1c0.6,0,1-0.4,1-1C152,34.5,151.6,34.1,151,34
								L151,34z" id="1418995211"></path>
                                <rect x="79.6" y="34.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.1799 73.3827)" class="st1-1504501518"
                                      width="17.8" height="5.1" id="1278939093"></rect>
                                <path class="st0-1504501518" d="M108.6,25.7c-2.8-2.8-5.6-5.6-8.4-8.4c-0.4-0.5-1-0.8-1.6-0.8c-0.6,0-1.2,0.3-1.6,0.7c-0.6,0.6-1.2,1.4-2,1.4
								c-0.3,0-0.6-0.1-0.9-0.3c-0.7,0-1.3,0.2-1.8,0.7c-1.2,1.2-2.4,2.3-3.5,3.5c-0.9,0.8-0.9,2.1-0.1,3c0.1,0.1,0.1,0.1,0.2,0.2
								c0.8,0.9,9,9.1,9,9.1c0.3,0.3,0.7,0.7,1.2,1.2c0.8,0.7,1.4,1.7,2.6,1.8h0.1c1.7,0,6.2-4.6,5.7-6.1c-0.4-1.2,0.2-1.7,0.9-2.4
								C109.7,28,109.8,26.9,108.6,25.7z M104.6,32.9c-1.3,1.3-2,2-2.6,2s-1.3-0.7-2.6-2c-2.5-2.5-5-5.2-7.6-7.6c-1.3-1.2-1.1-1.9,0.1-2.8
								c0.5-0.5,1-0.9,1.5-1.5c0.2-0.2,0.4-0.3,0.6-0.5c0.3,0.3,0.6,0.5,0.9,0.8c3.3,3.2,6.5,6.5,9.8,9.7C105.2,31.8,105.3,32.2,104.6,32.9
								L104.6,32.9z M105.9,28.6c-0.1,0.1-0.2,0.2-0.4,0.2c-0.2,0-0.5-0.2-0.6-0.4c-2.5-2.5-4.9-4.9-7.4-7.4c-0.7-0.7-0.1-1.1,0.3-1.6
								c0.2-0.3,0.5-0.5,0.7-0.5c0.3,0,0.5,0.2,0.7,0.4c2.4,2.5,4.8,4.8,7.2,7.3c0.2,0.2,0.4,0.4,0.5,0.6C106.7,27.8,106.4,28.3,105.9,28.6
								z" id="1934130799"></path>
                                <path class="st0-1504501518" d="M86.5,46.4L86.5,46.4L83,43l-2.4-2.4c0,0-1-1-2.2-2.2c-0.8-0.7-1.4-1.7-2.6-1.8h-0.1c-1.7,0-6.1,4.5-5.7,6.1
								c0.3,0.8,0,1.8-0.7,2.3c-1.6,1.6-1.6,2.5-0.1,4.1c2.6,2.6,5.1,5.2,7.7,7.7c0.5,0.6,1.2,1,2,1.1c0.8-0.1,1.5-0.5,2-1.1
								c0.5-0.5,1-1,1.6-1c0.3,0,0.5,0.1,0.8,0.2c0.2,0.1,0.3,0.1,0.5,0.1c0.6-0.1,1.1-0.4,1.5-0.8c1.1-1.1,2.1-2.1,3.2-3.2
								c1.2-1.3,1.2-2.2,0-3.5C87.9,47.8,87.2,47.1,86.5,46.4z M79.7,54.8c-0.2,0.2-0.4,0.4-0.7,0.4c-0.3,0-0.6-0.3-0.9-0.6
								c-2.3-2.3-4.6-4.6-6.9-6.9c-0.3-0.3-0.8-0.5-0.5-1c0.3-0.4,0.6-0.8,0.9-1.2l0,0c0.5,0,1,0.2,1.3,0.6c2.3,2.3,4.6,4.6,6.9,6.9
								C80.5,53.8,80.4,54.2,79.7,54.8L79.7,54.8z M86.5,51c-1.4,1.5-2,2.2-2.7,2.2s-1.3-0.7-2.7-2c-2.7-2.7-5.4-5.4-8.1-8
								c-0.7-0.7-0.8-1.1,0-1.8s1.3-1.3,1.9-1.9c0.2-0.2,0.5-0.4,0.7-0.6c0.3,0.3,0.5,0.5,0.8,0.7c3.3,3.3,6.6,6.7,10,10
								C87,50.1,87,50.4,86.5,51z" id="1816520363"></path>
						</svg>
                        </p>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12 ">
                    <div class="info-heading-right">
                        <p> Unser 4-Komponenten Konzept</p>
                    </div>

                    <div class="info-right-img">
                        <img class="img-responsive" src="{{asset('assets/frontend/img')}}/bg-bild180114.jpg">
                    </div>

                </div>

            </div>
        </div>
    </section>
    <section class="main-tow  main-space">
        <div class="container">
            <div class="two ">


                <div class="col-md-6 col-sm-6 col-xs-12  ">
                    <div class="info-heading">
                        <p>„Was ist prepmymeal?“ </p>
                    </div>
                    <div class="info-right-img">
                        <img class="img-responsive" src="{{asset('assets/frontend/img')}}/prep-meal.jpg">
                    </div>

                </div>
                <div class="col-md-6 col-sm-6 col-xs-12 ">
                    <div class="info-heading-section-two">
                        <p> Prepmymeal kocht leckere Meal Prep Gerichte für deinen gesunden Alltag!</p>
                    </div>
                    <div>

                        <p class="info-content">Oft ist es auf der Arbeit, in der Uni oder unterwegs sehr stressig und man hat wenig Zeit, sich um
                            gesunde
                            Ernährung zu kümmern. Diese ist jedoch für das Wohlbefinden, die Leistungsfähigkeit und das Erreichen der Ziele äußerst
                            wichtig.
                            Wir kochen dir gesunde Gerichte und liefern sie dir nach Hause oder an den Arbeitsplatz.
                            Wir verzichten dabei komplett auf Geschmacksverstärker oder künstliche Zusätze, ganz nach unserem Motto: „eat clean“
                            Die Gerichte werden nach dem Kochen mit einem schonenden Verfahren auf Kühlschranktemperatur abgekühlt und anschließend
                            mit
                            zertifizierten Kühlpaketen direkt zu dir geliefert. Sie können in wenigen Minuten aufgewärmt und verzehrt werden.
                            Du sparst wertvolle Zeit und ernährst dich gesund! </p>

                    </div>


                </div>

            </div>
        </div>
    </section>

@endsection