@extends('frontend.layouts.app')

@section('title','FAQ || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')

    <style>
        .post-title p {

            font-weight: 600;
            font-size: 20px;
            color: #333;

        }

        .relate-image h2 {
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .relate-image p {

            font-size: 11px;
            color: #333;

        }

        .comment-title p {

            font-weight: 600;
            font-size: 20px;
            color: #333;
            text-transform: uppercase;
            margin-top: 30px;

        }

        .pic-txt h6 {
            position: absolute;
            right: 0;
            top: 0;
            text-transform: uppercase;
            color: #333;
        }

        .relate-heading {
            color: #000;
            font-weight: 600;
            font-size: 16px;
        }

        .img-right {

            margin-left: 52px;
            margin-top: 30px;

        }

        .img-right h5 {

            width: 86%;

        }

        .img-right h6 {

            position: absolute;
            left: 465px;

        }

        .comment-img {
            margin-top: 30px;
        }

        .section-form {
            clear: both;
        }

        .form-txt p {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 20px;
            color: #333;
            padding-top: 30px;
        }

        .cntct-field input {
            padding: 20px 20px;
            margin-bottom: 10px;
        }

        .cntct-button button {

            font-size: 21px;
            padding: 10px 70px;
            background: #ea7c00;
            border: 0;
            color: #fff;
            border-radius: 7px;
            position: relative;
            right: 0;

        }

        @media screen and (min-width: 320px) and (max-width: 720px) {
            .comnt-pic img {
                margin-bottom: 20px;
            }

            .img-right h6 {
                left: auto;
            }

            .img-right h5 {
                width: 100%;
            }
        }

        @media screen and (min-width: 992px) and (max-width: 1052px) {
            .img-right h6 {
                position: absolute;
                left: 352px;
            }
        }

        @media screen and (min-width: 1052px) and (max-width: 1200px) {
            .img-right h6 {
                position: absolute;
                left: 352px !important;
            }
        }

    </style>
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
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                    <div class="related-post">
                        <div class="post-title">
                            <p>RELATED POST</p>
                        </div>
                        <div class="related-img">
                            <div class="col-md-12 row rlted">
                                <div class="col-md-4 col-sm-4 col-xs-12 relate-image">
                                    <img class="img-responsive" src="{{ asset('assets/frontend/img/') }}/image_1280px_f9e4e4a9e80f4d09ab96d1f627b4b26d.jpeg">
                                    <h2 class="relate-heading">seafood special</h2>
                                    <p class="relate-contant">06.06.2018 <span>- ANGELINE LORANS</span>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12 relate-image">
                                    <img class="img-responsive" src="{{ asset('assets/frontend/img/') }}/image_1280px_f9e4e4a9e80f4d09ab96d1f627b4b26d.jpeg">
                                    <h2 class="relate-heading">fine dining music</h2>
                                    <p class="relate-contant">06.06.2018 <span>- ANGELINE LORANS</span>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12 relate-image">
                                    <img class="img-responsive" src="{{ asset('assets/frontend/img/') }}/image_1280px_f9e4e4a9e80f4d09ab96d1f627b4b26d.jpeg">
                                    <h2 class="relate-heading">lemon cart</h2>
                                    <p class="relate-contant">06.06.2018 <span>- ANGELINE LORANS</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comment-title">
                        <p>comments</p>
                    </div>
                    <div class="col-md-12 row comment-img">
                        <div class="comment">
                            <div class="col-md-2 col-sm-2 col-xs-6 comnt-pic">
                                <img class="img-responsive img-circle" src="{{ asset('assets/frontend/img/') }}/Steven_Hallam-slide.jpg">
                            </div>
                            <div class="col-md-10 col-sm-10 col-xs-12 pic-txt">
                                <p>19.06.2018</p>
                                <h6>reply</h6>
                                <h3 class="relate-heading">MARK WILLSON</h3>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                                    ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, </h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 row comment-img img-right">
                        <div class="comment">
                            <div class="col-md-2 col-sm-2 col-xs-6 comnt-pic">
                                <img class="img-responsive img-circle" src="{{ asset('assets/frontend/img/') }}/Steven_Hallam-slide.jpg">
                            </div>
                            <div class="col-md-10 col-sm-10 col-xs-12 pic-txt">
                                <p>19.06.2018</p>
                                <h6>reply</h6>
                                <h3 class="relate-heading">MARK WILLSON</h3>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                                    ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, </h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 row comment-img">
                        <div class="comment">
                            <div class="col-md-2 col-sm-2 col-xs-6 comnt-pic">
                                <img class="img-responsive img-circle" src="{{ asset('assets/frontend/img/') }}/Steven_Hallam-slide.jpg">
                            </div>
                            <div class="col-md-10 col-sm-10 col-xs-12 pic-txt">
                                <p>19.06.2018</p>
                                <h6>reply</h6>
                                <h3 class="relate-heading">MARK WILLSON</h3>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                                    ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, </h5>
                            </div>
                        </div>
                    </div>
                    <div class="section-form">
                        <div class="form-txt">
                            <p>post a comment</p>
                        </div>
                        <form>
                            <div class="col-md-12 cntct-field">
                                <div class="form-group col-md-12 message-area">
                                    <textarea class="form-control" placeholder="Your comment" rows="5" id="comment"></textarea>
                                </div>
                                <div class="col-md-12">
                                    <input type="text" class="form-control" placeholder="Your Name" name="name" id="username">
                                </div>
                                <div class="col-md-12">
                                    <input type="text" class="form-control" placeholder="Your Email" name="name" id="useremail">
                                </div>
                                <div class="col-md-12">
                                    <input type="text" class="form-control" placeholder="Website" name="name" id="userwebsite">
                                </div>

                                <div class="form-group col-md-12 cntct-button">
                                    <button type="submit" class="">Send</button>
                                </div>
                            </div>
                        </form>
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
                                    <img class="sidebar-post-image " src="{{ asset('assets/frontend/img/') }}/3.jpg" alt="New York" style="width:100%;">
                                </div>
                                <div class="col-md-7 col-sm-7 col-xs-7">
                                    <p class="sidebar-post-heading"> heading</p>
                                    <p class="sidebar-post-text"> Sunt in culpa qui officia deserunt mollit anim id</p>
                                    <p class="sidebar-post-button"><a href="#">read more..</a></p>
                                </div>
                            </div>
                            <div class="sidebar-group-blog-post">
                                <div class="col-md-5 col-sm-5 col-xs-5 post_date-main ">
                                    <img class="sidebar-post-image " src="{{ asset('assets/frontend/img/') }}/3.jpg" alt="New York" style="width:100%;">
                                </div>
                                <div class="col-md-7 col-sm-7 col-xs-7">
                                    <p class="sidebar-post-heading"> heading</p>
                                    <p class="sidebar-post-text"> Sunt in culpa qui officia deserunt mollit anim id</p>
                                    <p class="sidebar-post-button"><a href="#">read more..</a></p>
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