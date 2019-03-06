<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $__env->yieldContent('title'); ?></title>
    <meta name="description" content="<?php echo $__env->yieldContent('mdesc'); ?>"/>
    <meta name="keywords" content="<?php echo $__env->yieldContent('mkey'); ?>"/>
    <link rel="stylesheet" href="<?php echo e(asset('assets/frontend/css/prep.css?v='.rand())); ?>">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo e(asset('assets/frontend/css/style.css?v='.rand())); ?>"> <!-- Resource style -->

    <!-- header menu file  -->
    <script id="locale_urls" type="application/json">{}</script>
    <meta name="description"
          content="foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst"/>
    <meta name="keywords" content="Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung"/>


    <script>
        var FORM_KEY_NEEDED = false;
    </script>
    <script type="application/json" id="global_data"></script>
    <link rel="stylesheet" type="text/css" href="<?php echo e(asset('assets/frontend/css/heade.css?v='.rand())); ?>" media="all"/>
    <script type="text/javascript" src="<?php echo e(asset('assets/frontend/js/header_menu.js?v='.rand())); ?>"></script>
    <!-- end header menu file  -->


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>




    <?php echo $__env->yieldContent('styles'); ?>

</head>
<body>
<header class="banner separator-line clear-fix autohide autohide-desktop" id="mainHeader">
    <div class="container">
        <button class="btn responsive-menu-button hidden-lg " id="responsive-menu-button">
            <span class="line l1"></span>
            <span class="line l2"></span>
            <span class="line l3"></span>
        </button>
        <h1 class='logo no-hover'><span class='sr-only'>prepmymeal</span><a href="<?php echo e(url('/')); ?>"><img
                        src="<?php echo e(asset('assets/frontend/img/preplogo.png')); ?>" alt=""/></a></h1>
        <div class="header-shopping-cart   cd-main-nav__list shopping-icon ">
            <a href="<?php echo e(url('/cart')); ?>" class="cartIco"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>
                		<?php if(session()->has('cart')): ?>
                        <?php
                            $cartCount = session('cart');
                            unset($cartCount['total']);
                            unset($cartCount['grandTotal']);
                        ?>
                        <?php echo e(count($cartCount)); ?> <?php else: ?> 0
                    <?php endif; ?>
            		</span>
            </a>
        </div>
        <?php if(Auth::guard('customer')->check()): ?>
            <div class="header-shopping-cart flyout-wrapper js-flyout-wrapper js-shopping-cart-link-wrapper cd-main-nav__list js-signin-modal-trigger">
                <a class="login-menu" href="<?php echo e(route('customer.dashboard')); ?>" data-signin="myaccount"><i class="fa fa-user"></i> My Account</a>
            </div>
            <div class="header-shopping-cart flyout-wrapper js-flyout-wrapper js-shopping-cart-link-wrapper cd-main-nav__list js-signin-modal-trigger">
                <a class="login-menu" href="<?php echo e(route('customer.logout')); ?>" data-signin="login">Logout</a>
            </div>
        <?php else: ?>
            <div class="header-shopping-cart flyout-wrapper js-flyout-wrapper js-shopping-cart-link-wrapper cd-main-nav__list js-signin-modal-trigger">
                <a class="login-menu" href="<?php echo e(route('customer.login')); ?>" data-signin="login">Sign in</a>
            </div>
        <?php endif; ?>
        <nav class="responsive-navigation" id="responsive-navigation">
            <ul class="navigation-main">
                <li class="level0 nav-1 first level-top parent dropdown">
                    <a href="#" class="level-top ee-navigation-link dropdown-toggle" data-toggle="dropdown">meals <i class="fa fa-angle-down"
                                                                                                                     aria-hidden="true"></i></a>
                    <ul class="level0 dropdown-menu clearfix" role="menu">
                        <li class="level1 nav-1-3 parent">
                            <ul class="level1">
                                <li class="level2 nav-1-3-1 first"><a href="<?php echo e(url('/meals')); ?>" class=" ee-navigation-link">meals </a></li>
                                <li class="level2 nav-1-3-1 first"><a href="" class=" ee-navigation-link">Individuelles Meals</a></li>
                                <li class="level2 nav-1-3-2"><a href="" class=" ee-navigation-link">Muskelaufbau</a></li>
                                <li class="level2 nav-1-3-2"><a href="" class=" ee-navigation-link">abnehm box </a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="level0 nav-1 first level-top parent">
                    <a href="#" class="level-top ee-navigation-link">info <i class="fa fa-angle-down" aria-hidden="true"></i></a>
                    <ul class="level0">
                        <li class="level1 nav-1-3 parent">
                            <ul class="level1">
                                <li class="level2 nav-1-3-1 first"><a href="<?php echo e(url('/page/info')); ?>" class="ee-navigation-link">info </a></li>
                                <li class="level2 nav-1-3-1 first"><a href="<?php echo e(url('/page/about-us')); ?>" class=" ee-navigation-link">about us</a></li>
                                <li class="level2 nav-1-3-2"><a href="<?php echo e(url('/page/faq')); ?>" class=" ee-navigation-link">faq</a></li>
                                <li class="level2 nav-1-3-2"><a href="<?php echo e(url('/page/blog')); ?>" class=" ee-navigation-link">blog </a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="level0 nav-1 first level-top ">
                    <a href="contact.html" class="level-top ee-navigation-link">contact</a>
                </li>
            </ul>
        </nav>
    </div>
</header>

<?php echo $__env->yieldContent('content'); ?>

<footer>
    <div class="footer">
        <div class="container">
            <div class="col-md-12 col-sm-12 col-xs-12 ">
                <div class="col-md-4 col-sm-12 col-xs-12 ">
                    <div class="footer-heading">
                        <p>About</p>
                    </div>
                    <div class="footer-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, </p>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12 menu-link">
                    <div class="footer-heading">
                        <p>quick link</p>
                    </div>
                    <div class="footer-content">
                        <p>Home </p>
                        <p>Meals </p>
                        <p>Info </p>
                        <p>Blog </p>
                        <p>Contact </p>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12 ">
                    <div class="footer-heading">
                        <p>sign up our newsletter</p>
                    </div>
                    <div class="footer-content">
                        <form>
                            <div class="news-field">
                                <input type="text" placeholder="enter your email">
                            </div>
                            <div class="news-button">
                                <button type="submit">send</button>
                            </div>
                        </form>
                        <div class="social-icon">
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                            <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="copy-write">
        <div class="container">
            <div class="col-md-6">
                <p>Copyright 2018 All Right Reserved. Prepmymeal</p>
            </div>
            <div class="col-md-6 right-f">
                <p>Digital partner MINDFULL JUNKIES</p>
            </div>
        </div>
    </div>


    <script src="<?php echo e(asset('assets/frontend/js/prepmymeal.js?v='.rand())); ?>"></script>
    <script type="text/javascript">
        // Adding meal to cart
        $('.btnCart').on('click', function (e) {
            var qty = $('.quantity').find('.input-number').val();
            var mealId = $(this).data('id');
            var price = $(this).data('price');
            var dataString = {'_token': '<?php echo e(csrf_token()); ?>', mealId: mealId, qty: qty, price: price};
            if (mealId == 'custom') {
                var cmp = $('.cmpChange');
                var cmpArr = [];
                var errMsg = '';
                for (var i = 0; i < cmp.length; i++) {
                    if ($(cmp[i]).val() == '') {
                        errMsg += (i + 1) + ', ';
                    } else {
                        cmpArr[i] = $(cmp[i]).val();
                    }
                }
                if (errMsg == '') {
                    dataString.cmp = cmpArr;
                } else {
                    $('#errMsg').text('* Component ' + errMsg + ' are required!');
                    return false;
                }
            }

            $.ajax({
                url: "<?php echo e(route('updateCart')); ?>",
                method: "post",
                data: dataString,
                success: function (response) {
                    if (response.status == 200) {
                        $('.cartIco').find('span').text(response.count);
                        $('.btnCart').parent('.select-field ').append('<span class="text-success cartMsg">Item added to cart</span>');
                        $('.cartMsg').delay(3200).hide();

                        toastr.success('New Item Added Successfully', 'Cart  Updated', {timeOut: 2000})


                    }
                }
            });
        });
    </script>
    <?php echo $__env->yieldContent('scripts'); ?>

</footer>
</body>
</html>