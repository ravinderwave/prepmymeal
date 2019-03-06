<?php $__env->startSection('title','Home || PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('content'); ?>
    <?php
        $siteOptions = Config::get('siteOptions');
    ?>
    <section class="">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="item active"><img src="<?php echo e(asset('assets/frontend/img/13.jpg')); ?>" alt="" style="width:100%;"></div>
        </div>
    </section>
    <section class="container Related-food main-space">
        <div class=" col-md-12 related-heading"><p class=" col-md-12">Meals</p></div>
        <div class="col-md-12 related-img">
            <?php if(count($meals)>0): ?>
                <?php $__currentLoopData = $meals; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $meal): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="col-md-4  col-xs-12 col-sm-6 rlte-img">
                        <img src="<?php echo e(asset('uploads/'.$meal->image1)); ?>">
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
                        <p class="head-txt"><a href="<?php echo e(url($meal->slug)); ?>"><?php echo e(ucwords($meal->title)); ?></a></p>
                        <p class="content-txt"><?php echo str_limit($meal->description,100); ?></p>
                        <div class="order-now">
                            <div class="col-md-6  col-sm-6  col-xs-6 odr-now">
                                <?php if ($meal->type == 2) { ?>
                                <p><?php echo e(number_format($meal->price+ ($meal->price*($siteOptions->drink_vat_tax/100)),2)); ?> &#128;</p>

                                <?php  }else{ ?>
                                <p><?php echo e(number_format($meal->price+ ($meal->price*($siteOptions->vat_tax/100)),2)); ?> &#128;</p>

                                <?php }?>
                            </div>
                            <div class="col-md-6  col-sm-6  col-xs-6 btn-odr-now">
                                <a href="<?php echo e(url($meal->slug)); ?>" class="now-btn">order now</a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <?php endif; ?>
        </div>
    </section>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('styles'); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>