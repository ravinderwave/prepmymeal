<?php $__env->startSection('title','Home || PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('content'); ?>

    <section class="">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <!-- Wrapper for slides -->
            <div class="carousel-inner home-slider">
                <div class="item active">
                    <img src="<?php echo e(asset('assets/frontend/img/1.jpg')); ?>" alt="" style="width:100%;">
                    <div class="carousel-caption">
                        <h3 class="banner-text">FOOD DELIVERY</h3>
                    </div>
                </div>
                <div class="item">
                    <img src="<?php echo e(asset('assets/frontend/img/2.jpg')); ?>" alt="" style="width:100%;">
                    <div class="carousel-caption">
                        <h3 class="banner-text">FOOD DELIVERY</h3>
                    </div>
                </div>
                <div class="item">
                    <img src="<?php echo e(asset('assets/frontend/img/3.jpg')); ?>" alt="" style="width:100%;">
                    <div class="carousel-caption">
                        <h3 class="banner-text">FOOD DELIVERY</h3>
                    </div>
                </div>
            </div>
            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </section>
    <section class="main-tow main-space">
        <div class="container">
            <div class="two ">
                <div class="heading">
                    <p> how it work </p>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-3  work-img">
                    <img class="img-responsive " src="<?php echo e(asset('assets/frontend/img/1_order_your_meals.svg')); ?>">
                    <div class="work-text">
                        <h3 class="work-heading">Lorem Ipsum</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing .</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-3 work-img">
                    <img class="img-responsive " src="<?php echo e(asset('assets/frontend/img/2.we_cook_fresh.svg')); ?>">
                    <div class="work-text">
                        <h3 class="work-heading">Lorem Ipsum</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing .</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-3  work-img">
                    <img class="img-responsive " src="<?php echo e(asset('assets/frontend/img/3_deliver.svg')); ?>">
                    <div class="work-text">
                        <h3 class="work-heading">Lorem Ipsum</h3>
                        <p>Lorem Ipsum is simply dummy text of the printings .</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3  col-xs-3  work-img">
                    <img class="img-responsive " src="<?php echo e(asset('assets/frontend/img/4_eat_enjoy.svg')); ?>">
                    <div class="work-text">
                        <h3 class="work-heading">Lorem Ipsum</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing .</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="main-three main-space">
        <div class="container">
            <div class="two">
                <div class="heading"><p> create your own individual meal </p></div>
                <div class="col-md-5 col-sm-12 col-xs-12  meal-product-img">
                    <div class=""><img src="<?php echo e(asset('assets/frontend/img/AbnehmBox.png')); ?>"></div>
                    <div class="translate">
                        <div class=" col-md-6 col-sm-6 col-xs-6">
                            <img id="1imageToSwap" class="profile img-responsive " src="<?php echo e(asset('assets/frontend/img/no_item.png')); ?>">
                        </div>
                        <div class=" col-md-6 col-sm-6 col-xs-6">
                            <img id="2imageToSwap" class="profile img-responsive " src="<?php echo e(asset('assets/frontend/img/no_item.png')); ?>">
                        </div>
                        <div class=" col-md-6 col-sm-6 col-xs-6">
                            <img id="3imageToSwap" class="profile img-responsive " src="<?php echo e(asset('assets/frontend/img/no_item.png')); ?>">
                        </div>
                        <div class=" col-md-6 col-sm-6 col-xs-6">
                            <img id="4imageToSwap" class="profile img-responsive " src="<?php echo e(asset('assets/frontend/img/no_item.png')); ?>">
                        </div>
                    </div>
                </div>
                <div class="col-md-7 col-sm-12 col-xs-12  meal-product-text">
                    <div class=" col-md-12">
                        <p class=" meal-product-heading"> SKU 00016 </p>
                        <div class="rating">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <p class="meal-product-heading price"> <span id="js-price-span">0.0</span> &euro; </p>
                        <p class="vat-text">price incl. VAT excl. Shipping</p>
                        <div class="meal-form">
                            <form id="new-meal">
                                <div id="errMsg" style="padding: 0px 0px 10px 20px;" class="text-danger"></div>
                                <div class="col-md-6 select-field">
                                    <div class="form-group">
                                        <select class="form-control cmpChange" data-cmp="1">
                                            <option value="" data-price="0" data-protein="0" data-calories="0" data-carbs="0" data-fat="0" data-img="">Select Component 1</option>
                                            <?php if(count($components)>0): ?>
                                                <?php $__currentLoopData = $components; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $component): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                    <?php if($component->type==0): ?>
                                                        <option value="<?php echo e($component->id); ?>"
                                                                data-img="<?php echo e($component->image); ?>"
                                                                data-price="<?php echo e($component->price); ?>"
                                                                data-protein="<?php echo e(isset($component->ntr_options_array[0]) && is_numeric($component->ntr_options_array[0]['weight']) ? $component->ntr_options_array[0]['weight'] : 0); ?>"
                                                                data-calories="<?php echo e(isset($component->ntr_options_array[1]) && is_numeric($component->ntr_options_array[1]['weight']) ? $component->ntr_options_array[1]['weight'] : 0); ?>"
                                                                data-carbs="<?php echo e(isset($component->ntr_options_array[2]) && is_numeric($component->ntr_options_array[2]['weight']) ? $component->ntr_options_array[2]['weight'] : 0); ?>"
                                                                data-fat="<?php echo e(isset($component->ntr_options_array[3]) && is_numeric($component->ntr_options_array[3]['weight']) ? $component->ntr_options_array[3]['weight'] : 0); ?>"
                                                                ><?php echo e($component->title); ?></option>
                                                    <?php endif; ?>
                                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                            <?php endif; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 select-field">
                                    <div class="form-group">
                                        <select class="form-control cmpChange" data-cmp="2">
                                            <option value="" data-price="0" data-protein="0" data-calories="0" data-carbs="0" data-fat="0" data-img="">Select Component 2</option>
                                            <?php if(count($components)>0): ?>
                                                <?php $__currentLoopData = $components; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $component): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                    <?php if($component->type==0): ?>
                                                        <option value="<?php echo e($component->id); ?>"
                                                                data-img="<?php echo e($component->image); ?>"
                                                                data-price="<?php echo e($component->price); ?>"
                                                                data-protein="<?php echo e(isset($component->ntr_options_array[0]) && is_numeric($component->ntr_options_array[0]['weight']) ? $component->ntr_options_array[0]['weight'] : 0); ?>"
                                                                data-calories="<?php echo e(isset($component->ntr_options_array[1]) && is_numeric($component->ntr_options_array[1]['weight']) ? $component->ntr_options_array[1]['weight'] : 0); ?>"
                                                                data-carbs="<?php echo e(isset($component->ntr_options_array[2]) && is_numeric($component->ntr_options_array[2]['weight']) ? $component->ntr_options_array[2]['weight'] : 0); ?>"
                                                                data-fat="<?php echo e(isset($component->ntr_options_array[3]) && is_numeric($component->ntr_options_array[3]['weight']) ? $component->ntr_options_array[3]['weight'] : 0); ?>"
                                                                ><?php echo e($component->title); ?></option>
                                                    <?php endif; ?>
                                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                            <?php endif; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 select-field">
                                    <div class="form-group">
                                        <select class="form-control cmpChange" data-cmp="3">
                                            <option value="" data-price="0" data-protein="0" data-calories="0" data-carbs="0" data-fat="0" data-img="">Select Component 3</option>
                                            <?php if(count($components)>0): ?>
                                                <?php $__currentLoopData = $components; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $component): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                    <?php if($component->type==0): ?>
                                                        <option value="<?php echo e($component->id); ?>"
                                                                data-img="<?php echo e($component->image); ?>"
                                                                data-price="<?php echo e($component->price); ?>"
                                                                data-protein="<?php echo e(isset($component->ntr_options_array[0]) && is_numeric($component->ntr_options_array[0]['weight']) ? $component->ntr_options_array[0]['weight'] : 0); ?>"
                                                                data-calories="<?php echo e(isset($component->ntr_options_array[1]) && is_numeric($component->ntr_options_array[1]['weight']) ? $component->ntr_options_array[1]['weight'] : 0); ?>"
                                                                data-carbs="<?php echo e(isset($component->ntr_options_array[2]) && is_numeric($component->ntr_options_array[2]['weight']) ? $component->ntr_options_array[2]['weight'] : 0); ?>"
                                                                data-fat="<?php echo e(isset($component->ntr_options_array[3]) && is_numeric($component->ntr_options_array[3]['weight']) ? $component->ntr_options_array[3]['weight'] : 0); ?>"
                                                                ><?php echo e($component->title); ?></option>
                                                    <?php endif; ?>
                                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                            <?php endif; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 select-field">
                                    <div class="form-group">
                                        <select class="form-control cmpChange" data-cmp="4">
                                            <option value="" data-protein="0" data-price="0" data-calories="0" data-carbs="0" data-fat="0" data-img="">Select Component 4</option>
                                            <?php if(count($components)>0): ?>
                                                <?php $__currentLoopData = $components; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $component): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                    <?php if($component->type==1): ?>
                                                        <option value="<?php echo e($component->id); ?>"
                                                                data-img="<?php echo e($component->image); ?>"
                                                                data-price="<?php echo e($component->price); ?>"
                                                                data-protein="<?php echo e(isset($component->ntr_options_array[0]) && is_numeric($component->ntr_options_array[0]['weight']) ? $component->ntr_options_array[0]['weight'] : 0); ?>"
                                                                data-calories="<?php echo e(isset($component->ntr_options_array[1]) && is_numeric($component->ntr_options_array[1]['weight']) ? $component->ntr_options_array[1]['weight'] : 0); ?>"
                                                                data-carbs="<?php echo e(isset($component->ntr_options_array[2]) && is_numeric($component->ntr_options_array[2]['weight']) ? $component->ntr_options_array[2]['weight'] : 0); ?>"
                                                                data-fat="<?php echo e(isset($component->ntr_options_array[3]) && is_numeric($component->ntr_options_array[3]['weight']) ? $component->ntr_options_array[3]['weight'] : 0); ?>"
                                                                ><?php echo e($component->title); ?></option>
                                                    <?php endif; ?>
                                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                            <?php endif; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="select-field col-md-6">
                                    <div class="quantity">
                                        <div class="input-group">
											<span class="input-group-btn">
	                                            <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">
	                                                <span class="glyphicon glyphicon-minus"></span>
	                                            </button>
											</span>
                                            <input type="number" name="quant[1]" id="cart-qty" class="form-control input-number" value="1" min="1" max="100">
                                            <span class="input-group-btn">
	                                            <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
	                                                <span class="glyphicon glyphicon-plus"></span>
	                                            </button>
	                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="select-field col-md-6">
                                    <button class="button-add btnCart" data-price="0" data-id="custom" type="button">add to card</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class=" col-md-12 meal-product">
                        <div class="col-md-3  col-xs-6 col-sm-3 meal-product-round-main">
                            <div class="Kohlenhydrate">
                                <p>Protein</p>
	                            <p><span id="js-protein-span">0</span> g</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6 col-sm-3  meal-product-round-main">
                            <div class="Kohlenhydrate Kalorien">
                                <p>Calories</p>
	                            <p><span id="js-calories-span">0</span> kcal</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6 col-sm-3  meal-product-round-main">
                            <div class="Kohlenhydrate Proteine">
                                <p>Carbs</p>
	                            <p><span id="js-carbs-span">0</span> g</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-6 col-sm-3  meal-product-round-main">
                            <div class="Kohlenhydrate Fett">
                                <p>Fat</p>
	                            <p><span id="js-fat-span">0</span> g</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-12 meal-product-description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla </p>
                </div>
            </div>
        </div>
    </section>
    <section class="main-four main-space">
        <div class="container">
            <div class="two ">
                <div class="heading">
                    <p> get started </p>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12  get-started-main">
                    <div class="col-md-4 col-sm-4 col-xs-12  get-started">
                        <a href="muskelaufbau.html">
                            <div class="polaroid">
                                <img src="<?php echo e(asset('assets/frontend/img/food-for-muscle.jpg')); ?>" alt="Norther Lights" style="width:100%">
                                <div class="get-startedtext">
                                    <p class="get-startedtext-heading">weight gain</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12  get-started">
                        <a href="<?php echo e(url('/meals')); ?>">
                            <div class="polaroid">
                                <img src="<?php echo e(asset('assets/frontend/img/image_1280px_f9e4e4a9e80f4d09ab96d1f627b4b26d.jpeg')); ?>" alt="Norther Lights"
                                     style="width:100%">
                                <div class="get-startedtext">
                                    <p class="get-startedtext-heading">visit court</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12  get-started">
                        <a href="abnehm-box.html">
                            <div class="polaroid">
                                <img src="<?php echo e(asset('assets/frontend/img/balance_ejercicio_alimentacion.jpg')); ?>" alt="Norther Lights"
                                     style="width:100%">
                                <div class="get-startedtext">
                                    <p class="get-startedtext-heading">weight loss</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="main-three main-space">
        <div class="container">
            <div class="two ">
                <div class="heading">
                    <p> values </p>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12  value-main">
                    <div class="col-md-4 col-sm-4 col-xs-12  get-started">
                        <div class="value-left">
                            <div class="col-md-2 col-sm-3 col-xs-3 food-icon">
                                <img src="<?php echo e(asset('assets/frontend/img/food-icon.png')); ?>" style="width:100%">
                            </div>
                            <div class="col-md-10 col-sm-9 col-xs-9 food-icon-text">
                                <p class="get-startedtext-heading">Individual meals</p>
                            </div>
                        </div>
                        <div class="value-left">
                            <div class="col-md-2 col-sm-3 col-xs-3 food-icon">
                                <img src="<?php echo e(asset('assets/frontend/img/food-icon.png')); ?>" style="width:100%">
                            </div>
                            <div class="col-md-10 col-sm-9 col-xs-9 food-icon-text">
                                <p class="get-startedtext-heading">Individual meals</p>
                            </div>
                        </div>
                        <div class="value-left">
                            <div class="col-md-2 col-sm-3 col-xs-3 food-icon">
                                <img src="<?php echo e(asset('assets/frontend/img/food-icon.png')); ?>" style="width:100%">
                            </div>
                            <div class="col-md-10 col-sm-9 col-xs-9 food-icon-text">
                                <p class="get-startedtext-heading">Individual meals</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12  get-started">
                        <div class="">
                            <img src="<?php echo e(asset('assets/frontend/img/1500106271812.png')); ?>" style="width:100%">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12  get-started">
                        <div class="value-left">
                            <div class="col-md-2 col-sm-3 col-xs-3 food-icon">
                                <img src="<?php echo e(asset('assets/frontend/img/food-icon.png')); ?>" style="width:100%">
                            </div>
                            <div class="col-md-10 col-sm-9 col-xs-9 food-icon-text">
                                <p class="get-startedtext-heading">Individual meals</p>
                            </div>
                        </div>
                        <div class="value-left">
                            <div class="col-md-2 col-sm-3 col-xs-3 food-icon">
                                <img src="<?php echo e(asset('assets/frontend/img/food-icon.png')); ?>" style="width:100%">
                            </div>
                            <div class="col-md-10 col-sm-9 col-xs-9 food-icon-text">
                                <p class="get-startedtext-heading">Individual meals</p>
                            </div>
                        </div>
                        <div class="value-left">
                            <div class="col-md-2 col-sm-3 col-xs-3 food-icon">
                                <img src="<?php echo e(asset('assets/frontend/img/food-icon.png')); ?>" style="width:100%">
                            </div>
                            <div class="col-md-10 col-sm-9 col-xs-9 food-icon-text">
                                <p class="get-startedtext-heading">Individual meals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="main-five  main-space">
        <div class="container">
            <div class="two ">
                <div class="heading">
                    <p> Calculate your daily calorie requirement </p>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12  Calculate-main">
                    <div class="col-md-6 col-sm-12 col-xs-12 Calculate-main">
                        <div class="Calculate-calorie-heading">
                            <p>Calculate your calorie</p>
                        </div>
                        <div class="triangle-down"></div>
                        <div class="form-bck">
                            <form>
                                <div class="select-field">

                                    <div class="form-group">
                                        <select class="form-control" id="sel1">
                                            <option value="" selected>You are</option>
                                            <option value="1kg">1</option>
                                            <option value="2kg">2</option>
                                            <option value="2kg">3</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="select-field">

                                    <div class="form-group">
                                        <select class="form-control" id="sel1">
                                            <option value="" selected>How Old are You ?</option>
                                            <option value="1kg">1</option>
                                            <option value="2kg">2</option>
                                            <option value="2kg">3</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="select-field">

                                    <div class="form-group">
                                        <select class="form-control" id="sel1">
                                            <option value="" selected>How Tell are You ?</option>
                                            <option value="1kg">1</option>
                                            <option value="2kg">2</option>
                                            <option value="2kg">3</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="select-field">

                                    <div class="form-group">
                                        <select class="form-control" id="sel1">
                                            <option value="" selected>How much do You weigh ?</option>
                                            <option value="1kg">1</option>
                                            <option value="2kg">2</option>
                                            <option value="2kg">3</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="select-field">

                                    <div class="form-group">
                                        <select class="form-control" id="sel1">
                                            <option value="" selected>How sctive are you in everyday life ?</option>
                                            <option value="1kg">1</option>
                                            <option value="2kg">2</option>
                                            <option value="2kg">3</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="select-field ">
                                    <button class="button-add" type="submit">Calculate calorie requirement</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 col-xs-12 Calculate-main">
                        <div class="calories-result">
                            <img src="<?php echo e(asset('assets/frontend/img/calories.jpg')); ?>">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="main-six  main-space">
        <div class="container ">
            <div class="heading"><p> What our client say </p></div>
            <div class='row'>
                <div class=' col-md-12'>
                    <div class="carousel slide" data-ride="carousel" id="quote-carousel">
                        <!-- Bottom Carousel Indicators -->
                        <ol class="carousel-indicators">
                            <li data-target="#quote-carousel" data-slide-to="0" class="active"></li>
                            <li data-target="#quote-carousel" data-slide-to="1"></li>
                            <li data-target="#quote-carousel" data-slide-to="2"></li>
                        </ol>
                        <!-- Carousel Slides / Quotes -->
                        <div class="carousel-inner">
                            <!-- Quote 1 -->
                            <div class="item active">
                                <blockquote>
                                    <div class="row">
                                        <div class="col-sm-3 text-center">
                                            <img class="img-circle" src="https://s3.amazonaws.com/uifaces/faces/twitter/keizgoesboom/128.jpg"
                                                 style="width: 100px;height:100px;">
                                            <!--<img class="img-circle" src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" style="width: 100px;height:100px;">-->
                                        </div>
                                        <div class="col-sm-9 testimonial-text">
                                            <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit!</p>
                                            <small>Someone famous</small>
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                            <!-- Quote 2 -->
                            <div class="item">
                                <blockquote>
                                    <div class="row">
                                        <div class="col-sm-3 text-center">
                                            <img class="img-circle" src="https://s3.amazonaws.com/uifaces/faces/twitter/keizgoesboom/128.jpg"
                                                 style="width: 100px;height:100px;">
                                        </div>
                                        <div class="col-sm-9 testimonial-text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor nec lacus ut tempor. Mauris.</p>
                                            <small>Someone famous</small>
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                            <!-- Quote 3 -->
                            <div class="item">
                                <blockquote>
                                    <div class="row">
                                        <div class="col-sm-3 text-center">
                                            <img class="img-circle" src="https://s3.amazonaws.com/uifaces/faces/twitter/keizgoesboom/128.jpg"
                                                 style="width: 100px;height:100px;">
                                        </div>
                                        <div class="col-sm-9 testimonial-text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum elit in arcu blandit, eget pretium
                                                nisl accumsan. Sed ultricies commodo tortor, eu pretium mauris.</p>
                                            <small>Someone famous</small>
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <!-- Carousel Buttons Next/Prev -->
                        <a data-slide="prev" href="#quote-carousel" class="left carousel-control"><i class="fa fa-chevron-left"></i></a>
                        <a data-slide="next" href="#quote-carousel" class="right carousel-control"><i class="fa fa-chevron-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php echo Notify::render(); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('styles'); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
    <script type="text/javascript">
        $(document).ready(function () {
            function calculateNutritions() {
                var price = 0;
                var protein = 0;
                var calories = 0;
                var carbs = 0;
                var fat = 0;
                $('.cmpChange').each(function (i, obj) {
                    price += $(obj).children('option:selected').data('price');
                    protein += $(obj).children('option:selected').data('protein');
                    calories += $(obj).children('option:selected').data('calories');
                    carbs += $(obj).children('option:selected').data('carbs');
                    fat += $(obj).children('option:selected').data('fat');
                });

                var qty = 1;
                if ($('#cart-qty').val() > 1) {
                    qty = $('#cart-qty').val();
                }

                $('#js-price-span').text(price * qty);
                $('#js-protein-span').text(protein * qty);
                $('#js-calories-span').text(calories * qty);
                $('#js-carbs-span').text(carbs * qty);
                $('#js-fat-span').text(fat * qty);
                console.log($('.btnCart').data('price'));
                $('.btnCart').data('price', price * qty);
                console.log($('.btnCart').data('price'))
            }

            $(document).on('change', '#cart-qty', function () {
                calculateNutritions();
            });
            $(document).on('change', '.cmpChange', function () {
                calculateNutritions();
                let cmpNo = $(this).data('cmp');
                let cmpVal = $(this).find(':selected').val();
                let cmpImg = $(this).find(':selected').data('img');
                if (cmpVal != '') {
                    $('#' + cmpNo + 'imageToSwap').attr('src', "<?php echo e(asset('uploads')); ?>/" + cmpImg);
                }
            });
        });
    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>