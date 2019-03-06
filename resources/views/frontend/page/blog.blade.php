@extends('frontend.layouts.app')

@section('title','FAQ || PrepMyMeal')
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
                <div class="heading contact blog-heading">
                    <p> blog </p>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="container blog-border-bottom">
            <div class=" col-md-12">
                <div class="col-md-8">
                    <div class="card">
                        <div class="col-md-2 col-xs-12 col-sm-2 post_date-main">
                            <p class="post_date">2 Sep 2018</p>
                        </div>
                        <div class="col-md-10 col-xs-12 col-sm-10 post-heading_main">
                            <p class="post-heading">TITLE HEADING</p>
                        </div>
                        <div class="blog-image"><img src="{{ asset('assets/frontend/img/') }}/3.jpg" alt="New York" style="width:100%;"></div>
                        <div class="blog-admin-text">
                            <div class="col-md-8 col-xs-12 col-sm-8  post_date-main">
                                <p class="post-by">posted by : admin</p>
                            </div>
                            <div class="col-md-4 col-xs-12 col-sm-4 post-by-main">
                                <p class="comnt-by">comment : <span class="black">20</span> <span class="user-like"> like :  <span
                                                class="black"> 50  </span> </span></p>
                            </div>
                        </div>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                        <div class="blog-button">
                            <a href="{{url('page/single-blog')}}">read more </a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="col-md-2 col-xs-12 col-sm-2 post_date-main">
                            <p class="post_date">2 Sep 2018</p>
                        </div>
                        <div class="col-md-10 col-xs-12 col-sm-10 post-heading_main">
                            <p class="post-heading">TITLE HEADING</p>
                        </div>
                        <div class="blog-image"><img src="{{ asset('assets/frontend/img/') }}/3.jpg" alt="New York" style="width:100%;"></div>
                        <div class="blog-admin-text">
                            <div class="col-md-8 col-xs-12 col-sm-8  post_date-main">
                                <p class="post-by">posted by : admin</p>
                            </div>
                            <div class="col-md-4 col-xs-12 col-sm-4 post-by-main">
                                <p class="comnt-by">comment : <span class="black">20</span> <span class="user-like"> like :  <span
                                                class="black"> 50  </span> </span></p>
                            </div>
                        </div>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                        <div class="blog-button">
                            <a href="{{url('page/single-blog')}}">read more </a>
                        </div>
                    </div>


                </div>
                <div class="col-md-4 ">
                    <div class="latest-post">
                        <div class=" post-heading_main">
                            <p class="post-heading">TITLE HEADING</p>
                        </div>
                        <div class="sidebar-latest-post-main">
                            <div class="sidebar-group-blog-post">
                                <div class="col-md-5 col-sm-5 col-xs-5 post_date-main ">
                                    <img class="sidebar-post-image " src="{{ asset('assets/frontend/img/') }}/3.jpg" alt="New York"
                                         style="width:100%;">
                                </div>
                                <div class="col-md-7 col-sm-7 col-xs-7">
                                    <p class="sidebar-post-heading"> heading</p>
                                    <p class="sidebar-post-text"> Sunt in culpa qui officia deserunt mollit anim id</p>
                                    <p class="sidebar-post-button"><a href="#">read more..</a></p>
                                </div>
                            </div>
                            <div class="sidebar-group-blog-post">
                                <div class="col-md-5 col-sm-5 col-xs-5 post_date-main ">
                                    <img class="sidebar-post-image " src="{{ asset('assets/frontend/img/') }}/3.jpg" alt="New York"
                                         style="width:100%;">
                                </div>
                                <div class="col-md-7 col-sm-7 col-xs-7">
                                    <p class="sidebar-post-heading"> heading</p>
                                    <p class="sidebar-post-text"> Sunt in culpa qui officia deserunt mollit anim id</p>
                                    <p class="sidebar-post-button"><a href="{{url('page/single-blog')}}">read more..</a></p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="latest-categories">
                        <div class=" post-heading_main">
                            <p class="post-heading">categories</p>
                        </div>
                        <div class="categories-list">
                            <ul>
                                <li><a href="#">event</a></li>
                                <li><a href="#">food</a></li>
                                <li><a href="#">gallery</a></li>
                                <li><a href="#">delicious</a></li>
                                <li><a href="#">uncategorized</a></li>


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </section>

@endsection