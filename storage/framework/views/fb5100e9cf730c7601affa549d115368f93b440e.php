<?php $__env->startSection('title','Page Not Found || PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('content'); ?>
	<section class="">
	    <div id="myCarousel" class="carousel slide" data-ride="carousel">
			<div class="item "><img src="<?php echo e(asset('assets/frontend/img/13.jpg')); ?>" alt="Los Angeles" style="width:100%;"></div>
		</div>
	</section> 
	<section class="main-three  main-space"> 
	    <div class="container">
	        <div class="two text-center">
	            <div class="heading"><p> Page Not Found </p></div>
	        </div>
	    </div>
	</section>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('styles'); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>