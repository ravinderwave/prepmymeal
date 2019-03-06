<?php $__env->startSection('title','My Addresses || PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('styles'); ?>
    <style type="text/css">

        #mySidebar a {
            border-bottom: 1px solid #eee;
            text-transform: capitalize;
            font-size: 15px;
        }

        .order-show-hide a {
            background: #ea7c00;
            color: #fff;
            padding: 5px;
            border-radius: 4px;
        }

        .order-show-hide a:focus {
            text-decoration: none;
        }

        .tabs-left {
            border-bottom: none;
            padding-top: 2px;
        }

        .tabs-left {
            border-right: 1px solid rgb(234, 124, 0);
        }

        .tabs-left > li {
            float: none;
            margin-bottom: 2px;
        }

        .tabs-left > li {
            margin-right: -1px;
        }

        .tabs-left > li.active > a,
        .tabs-left > li.active > a:hover,
        .tabs-left > li.active > a:focus {
            border-color: #ea7c00 !important;
            border-right-color: transparent;
            border-right: none;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(234, 124, 0) !important;
        }

        .tabs-left > li > a {
            border-radius: 4px 0 0 4px;
            margin-right: 0;
            display: block;
        }

        .vertical-text {
            margin-top: 50px;
            border: none;
            position: relative;
        }

        .vertical-text > li {
            height: 20px;
            width: 120px;
            margin-bottom: 100px;
        }

        .vertical-text > li > a {
            border-bottom: 1px solid #ddd;
            border-right-color: transparent;
            text-align: center;
            border-radius: 4px 4px 0px 0px;
        }

        .vertical-text > li.active > a,
        .vertical-text > li.active > a:hover,
        .vertical-text > li.active > a:focus {
            border-bottom-color: transparent;
            border-right-color: #ddd;
            border-left-color: #ddd;
        }

        .vertical-text.tabs-left {
            left: -50px;
        }

        .vertical-text.tabs-left > li {
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            transform: rotate(-90deg);
        }
    </style>
<?php $__env->stopSection(); ?>
<?php $__env->startSection('content'); ?>
    <section class="">
        <div class="item ">
            <img src="<?php echo e(asset('assets/frontend/img/13.jpg')); ?>" alt="Los Angeles" style="width:100%; max-height: 300px;">
        </div>
    </section>
    <section class="main-tow  main-space">
        <div class="container-fluid">
            <div class="col-md-12">
                <div class="heading">
                    <p> Manage Order </p>
                </div>
                <div class="profile-content">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="col-xs-12 col-sm-3 col-md-3">
                            <ul class="nav nav-tabs tabs-left">
                                <li><a href="<?php echo e(route('customer.dashboard')); ?>"> My Profile</a></li>
                                <li><a href="<?php echo e(route('customer.addresses')); ?>"> <strong>Manage Addresses</strong></a></li>
                                <li class="active"><a href="<?php echo e(route('customer.orders')); ?>"> My Orders</a></li>
                                <li><a href="<?php echo e(route('customer.payments')); ?>"> Payments</a></li>
                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-9 col-md-9">
                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div class="tab-pane active" id="profile">
                                    <div class="row">

                                        <div class="col-md-12 col-xs-12 col-sm-12">
                                            <label>My Order List</label>

                                            <div class="table-responsive" style="max-height: 250px;">
                                                <table class="table">
                                                    <thead>
                                                    <tr class="">
                                                        <th>Order.no</th>
                                                        <th>Product Name</th>
                                                        <th>Cost</th>
                                                        <th>Taxes</th>
                                                        <th>Address</th>
                                                        <th>status</th>
                                                        <th>Action</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    <?php if(count($myOrders)): ?>
                                                        <?php $__currentLoopData = $myOrders; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $order): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                            <?php
                                                            //                                                            $orderMeta = json_decode($order->first()->details->item_value, true);
                                                            if (count($order->ordersMeals) > 0) {
                                                                $mealInfo = \App\Meal::find($order->ordersMeals[0]->meals_id);
                                                                $mealTitle = $mealInfo->title;
                                                            } else {
                                                                $mealTitle = 'N/A';
                                                            }

                                                            $address = $order->first()->address;

                                                            ?>
                                                            <tr>
                                                                <td><?php echo e($order->id); ?></td>
                                                                <td><?php echo e($mealTitle); ?></td>
                                                                <td><?php echo e($order->order_total); ?></td>
                                                                <td><?php echo e($order->tax); ?></td>
                                                                <td><?php echo e($address->address); ?>,<?php echo e($address->city); ?>,<?php echo e($address->state); ?>

                                                                    ,<?php echo e($address->zip); ?></td>
                                                                <td><span class="label label-success">
                                                                        <?php if ($order->status == '0') {
                                                                            echo "PROCCESSING";
                                                                        } if ($order->status == '1') {
                                                                            echo "DELIEVERD";
                                                                        }
                                                                        ?>
                                                                    </span></td>
                                                                <td><a
                                                                            href="<?php echo e(route('payment.success',['id'=>$order->txn_id])); ?>"
                                                                            class="btn btn-xs btn-info"><i class="fa fa-file">
                                                                            INVOICE</i></a></td>
                                                            </tr>

                                                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                                    <?php endif; ?>
                                                    </tbody>


                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>

    </section>
<?php $__env->stopSection(); ?>



<?php $__env->startSection('scripts'); ?>
    <script type="text/javascript">

        /* order table tr hide show js  */
        $(document).ready(function () {
            $(".show1").click(function () {
                $('.visible1').slideToggle();
                $('.show1').html($('.show1').text() == 'Hide ' ? 'Show ' : 'Hide ');
            });
        })

        /*end order table tr hide show js  */
    </script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>