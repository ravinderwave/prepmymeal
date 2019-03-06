<?php $__env->startSection('title','Home || PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('content'); ?>
    <?php
        $siteOptions = Config::get('siteOptions');
    ?>
    <section class="">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="item "><img src="<?php echo e(asset('assets/frontend/img/13.jpg')); ?>" alt="Los Angeles" style="width:100%;"></div>
        </div>
    </section>
    <section class="main-three  main-space">
        <div class="container">
            <div class="two">
                <div class="heading"><p> <?php echo e(ucwords($meal->title)); ?> </p></div>
                <div class="col-md-5 col-sm-12 col-xs-12  meal-product-img">
                    <div class=""><img src="<?php echo e(asset('uploads/'.$meal->image1)); ?>"></div>
                    <div class="translate">
                        <div class=" col-md-12 col-sm-12 col-xs-12">
                            <img id="imageToSwap" class="profile img-responsive " src="<?php echo e(asset('uploads/'.$meal->image1)); ?>">
                        </div>
                    </div>
                </div>
                <div class="col-md-7 col-sm-12 col-xs-12  meal-product-text">
                    <div class=" col-md-12">
                        <p class=" meal-product-heading"> SKU <?php echo e($meal->sku); ?> </p>
                        <div class="rating">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <?php if($meal->type == '2'){ ?>
                        <p class="meal-product-heading price">
                            <?php echo e(number_format($meal->price+ ($meal->price*($siteOptions->drink_vat_tax/100)),2)); ?> &euro; </p>
                        <?php }else { ?>

                        <p class="meal-product-heading price">
                            <?php echo e(number_format($meal->price+ ($meal->price*($siteOptions->vat_tax/100)),2)); ?> &euro; </p>
                        <?php } ?>
                        <p class="vat-text"><?php echo $meal->short_description; ?></p>
                        <?php
                            $cart = session('cart');
                        ?>
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
                                                   value="<?php if(!empty($cart) && array_key_exists($meal->id,$cart)): ?> <?php echo e($cart[$meal->id]['qty']); ?> <?php else: ?> 1 <?php endif; ?>"
                                                   min="1" max="100">
                                            <span class="input-group-btn">
												<button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]"><span
                                                            class="glyphicon glyphicon-plus"></span></button>
											</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="select-field col-md-8">
                                    <button class="button-add btnCart" data-price="<?php echo e($meal->price); ?>" data-id="<?php echo e($meal->id); ?>" type="button">add to
                                        card
                                    </button>
                                    <?php if(!empty($cart) && array_key_exists($meal->id,$cart)): ?>
                                        <p class="text-info"> Item already in your cart</p>
                                    <?php endif; ?>
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
                    <?php echo $meal->description; ?>

                </div>
            </div>
        </div>
    </section>
    <?php if(count($meals)>0): ?>
        <section class="container Related-food">
            <div class="related-heading"><p>related food</p></div>
            <div class="col-md-12 related-img">
                <?php $__currentLoopData = $meals; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $rMeal): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="col-md-4 rlte-img">
                        <img src="<?php echo e(asset('uploads/'.$rMeal->image1)); ?>">
                        <p class="head-txt"><a href="<?php echo e(url($rMeal->slug)); ?>"><?php echo e(ucwords($rMeal->title)); ?></a></p>
                        <p class="content-txt"><?php echo str_limit($rMeal->description,100); ?></p>
                        <div class="order-now">
                            <div class="col-md-6 odr-now">
                                <p><?php echo e($rMeal->price); ?> &#128;</p>
                            </div>
                            <div class="col-md-6 btn-odr-now">
                                <a href="<?php echo e(url($rMeal->slug)); ?>" class="now-btn">order now</a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </section>
    <?php endif; ?>
    <?php echo Notify::render(); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('styles'); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>