<?php $__env->startSection('title','Order-Invoice|| PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('content'); ?>

    <style>
        .panel-default {
            border-color: #ddd;
        }

        .panel-title {
            background: unset;
        }

        .panel-body {
            padding: unset !important;
        }

        .panel {
            margin-bottom: 20px;
            background-color: #fff;
            border: 1px solid transparent;
            border-radius: 4px;
            -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
            box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        }

        .panel-default > .panel-heading {
            color: #333;
            background-color: #f5f5f5;
            border-color: #ddd;
        }

        .panel-heading {
            padding: 10px 15px;
            border-bottom: 1px solid transparent;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }

        .invoice {
            border: solid 1px #707070
        }

    </style>
    <section class="">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="item "><img src="<?php echo e(asset('assets/frontend/img/13.jpg')); ?>" alt="Los Angeles" style="width:100%;"></div>
        </div>
    </section>
    <section class="main-tow  main-space ">

        <div class="container invoice">
            <div class="row ">
                <div class="col-xs-12">
                    <div class="invoice-title" >
                        <img src="<?php echo e(asset('assets/frontend/img/preplogo.png')); ?>" style="width:20%; margin-left:-10px;margin-top:10px;">
                    </div>
                    <div class="invoice-title text-center">
                        <h2>Order Invoice</h2>
                        <h3 class="pull-right">Order # <?php echo e($data->order_id); ?></h3>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-xs-6">
                            <address>
                                <strong>Billed To:</strong><br>
                                <?php echo e($data->customer->name); ?><br>
                                <?php echo e($data->address->address); ?><br>
                                <?php echo e($data->address->city); ?><br>
                                <?php echo e($data->address->state); ?>, <?php echo e($data->address->zip); ?>

                            </address>
                        </div>
                        <div class="col-xs-6 text-right">
                            <address>
                                <strong>Shipped To:</strong><br>
                                <?php echo e($data->customer->name); ?><br>
                                <?php echo e($data->address->address); ?><br>
                                <?php echo e($data->address->city); ?><br>
                                <?php echo e($data->address->state); ?>, <?php echo e($data->address->zip); ?>

                            </address>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <address>
                                <strong>Payment Method:</strong><br>
                                <?php echo e($data->payment_mode); ?><br>
                                <?php echo e($data->customer->email); ?>

                            </address>
                        </div>
                        <div class="col-xs-6 text-right">
                            <address>
                                <strong>Order Date:</strong><br>
                                <?php echo e(date('M d, Y', strtotime($data->created_at))); ?><br><br>
                            </address>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title"><strong>Order summary</strong></h3>
                        </div>
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-condensed invoice-table">
                                    <thead>
                                    <tr>
                                        
                                        <td></td>
                                        <td class="text-center"><strong>Name</strong></td>
                                        <td class="text-center"><strong> Price</strong></td>
                                        <td class="text-center"><strong>Quantity</strong></td>
                                        <td class="text-right"><strong>Totals</strong></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php $__currentLoopData = $data->items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <!-- foreach ($order->lineItems as $line) or some such thing here -->
                                        <tr>
                                            <td></td>
                                            <td class="text-center"><?php echo e($item->name); ?></td>
                                            <td class="text-center"><?php echo e($item->price); ?></td>
                                            
                                            <td class="text-center"><?php echo e($item->quantity); ?></td>
                                            <td class="text-right"><?php echo e(round($item->price * $item->quantity, 2)); ?></td>
                                        </tr>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                    <tr>
                                        <td class="thick-line"></td>
                                        <td class="thick-line"></td>
                                        <td class="thick-line"></td>
                                        <td class="thick-line text-center"><strong>Subtotal</strong></td>
                                        <td class="thick-line text-right"><?php echo e($data->sub_total); ?></td>
                                    </tr>
                                    <tr>
                                        <td class="no-line"></td>
                                        <td class="no-line"></td>
                                        <td class="no-line"></td>
                                        <td class="no-line text-center"><strong>Shipping</strong></td>
                                        <td class="no-line text-right"><?php echo e($data->sub_tax); ?></td>
                                    </tr>
                                    <tr>
                                        <td class="no-line"></td>
                                        <td class="no-line"></td>
                                        <td class="no-line"></td>
                                        <td class="no-line text-center"><strong>Total</strong></td>
                                        <td class="no-line text-right"><?php echo e($data->total); ?></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

<?php $__env->stopSection(); ?>




<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>