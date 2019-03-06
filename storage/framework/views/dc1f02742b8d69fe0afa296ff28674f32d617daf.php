<?php $__env->startSection('title','Login/Signup || PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('content'); ?>
	<section class="">
	    <div id="myCarousel" class="carousel slide" data-ride="carousel">
	        <div class="item active"><img src="<?php echo e(asset('assets/frontend/img/13.jpg')); ?>" alt="" style="width:100%;"></div>
	    </div>
	</section> 
  	<section class="main-tow main-six main-space"> 
		<div class="container">
			<div class="two ">
				<div class="container login-container">
					<div class="row">
						<?php if(isset($message)): ?>
							<div class="alert alert-success"><?php echo e($message); ?></div>
						<?php endif; ?>
						<?php if(isset($errorMessage)): ?>
							<div class="alert alert-danger"><?php echo e($errorMessage); ?></div>
						<?php endif; ?>
						<div class="col-md-5  col-sm-5">
							<h3 class="login-border">Registration</h3>
							<div class="login-width">
								<?php echo Form::open(['route'=>'customer.register','autocomplete'=>'new-password']); ?>

									<div class="form-group">
										<label>Username</label>
										<input type="text" class="form-control" placeholder="Enter Username" value="<?php echo e(old('username')); ?>" name="username" />
										<small class="text text-danger"><?php echo e($errors->first('username')); ?></small>
									</div>
									<div class="form-group">
										<label>Email</label>
										<input type="email" class="form-control" placeholder="Enter Email" value="<?php echo e(old('email')); ?>" name="email"/>
										<small class="text text-danger"><?php echo e($errors->first('email')); ?></small>
									</div>
									<div class="form-group">
										<label>Phone</label>
										<input type="text" class="form-control" placeholder="Enter Phone" value="<?php echo e(old('phone')); ?>" name="phone"/>
										<small class="text text-danger"><?php echo e($errors->first('phone')); ?></small>
									</div>
									<div class="form-group">
										<label>Password</label>
										<input type="password" class="form-control" placeholder="Enter Password" value="" name="password"/>
										<small class="text text-danger"><?php echo e($errors->first('password')); ?></small>
									</div>
									<div class="form-group">
										<label>Confirm Password</label>
										<input type="password" class="form-control" placeholder="Enter Confirm Password" value="" name="confirm-password"/>
										<small class="text text-danger"><?php echo e($errors->first('confirm-password')); ?></small>
									</div>
									<div class="form-group col-md-6 padding-none">
										<input type="submit" class="btnSubmit" value="Registration" />
									</div>
								<?php echo Form::close(); ?>

							</div>
						</div>
						<div class="col-md-2 col-sm-2 hidden-xs-down">
							<div class=" login-form-border">
							</div>
						</div>
						<div class="col-md-5 col-sm-5  ">
							<h3 class="login-border">Login</h3>
							<div class="login-width">								
								<?php echo Form::open(['route'=>'post.login','autocomplete'=>'old-password']); ?>

									<div class="form-group">
										<label>Email</label>
										<input type="email" class="form-control" placeholder="Enter Email" value="<?php echo e(old('email')); ?>" name="email"/>
										<small class="text text-danger"><?php echo e($errors->first('email')); ?></small>
									</div>
									<div class="form-group">
										<label>Password</label>
										<input type="password" class="form-control" placeholder="Enter Password" value="" name="password"/>
										<small class="text text-danger"><?php echo e($errors->first('password')); ?></small>
									</div>
									<div class="form-group col-md-6 padding-none">
										<input type="submit" class="btnSubmit" value="Login" />
									</div>
								<?php echo Form::close(); ?>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
 	</section> 
<?php $__env->stopSection(); ?>

<?php $__env->startSection('styles'); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>