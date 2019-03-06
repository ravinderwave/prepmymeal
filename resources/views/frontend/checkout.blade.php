@extends('frontend.layouts.app')

@section('title','Checkout || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<style>
    .StripeElement {
        background-color: white;
        height: 40px;
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid transparent;
        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
        border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
    
    button {
        display: block;
        width: 100%;
        height: 37px;
        background-color: #d782d9;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
        margin-top: 17px;
    }
    
    .panel-title {
        display: inline;
        font-weight: bold;
    }
        
    .display-table {
        display: table;
    }
    .display-tr {
        display: table-row;
    }
    .display-td {
        display: table-cell;
        vertical-align: middle;
        width: 61%;
    }
    
    span.btn.btn-xs.btnSubmit.btnEditView {
            width: 61px;
            float: right;
            margin-top: -25px;
            height: 22px;
            display: none;
        }
        .modal {
            text-align: center;
        }

        @media screen and (min-width: 768px) {
            .modal:before {
                display: inline-block;
                vertical-align: middle;
                content: " ";
                height: 100%;
            }
        }

        .modal-dialog {
            display: inline-block;
            text-align: left;
            vertical-align: middle;
        }
</style>

    <section class="">
        <div class="item ">
            <img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="Los Angeles" style="width:100%;">
        </div>
    </section>
    <section class="main-three  main-space">
        <div class="container">
            <div class="row">
                <form action="{{route('payment.do')}}" method="POST" id="billing_address payment-form" class="require-validation" data-cc-on-file="false" data-stripe-publishable-key="{{ env('STRIPE_KEY') }}">

                    <div class="col-md-10 col-md-offset-1">
                        <h4 class="mb-3">Login/Guest</h4>


                        <div class="profile-usertitle" style="border: solid #dddddd  1px; padding-left: 5px">
                            <div class="profile-usertitle-name">
                                <?php if (Auth::guard('customer')->check()) {
                                $required = '';

                                ?>


                                {{  ucwords(Auth::guard('customer')->user()->username) }}

                                <?php } else {
                                $required = 'required';

                                ?>

                                <a target="_blank" href="{{route('customer.login')}}">Login</a> or check out as guest

                                <?php }?>
                            </div>
                        </div>


                    </div>
                    <div class="col-md-10 col-md-offset-1">
                        <h4 class="mb-3">Billing address</h4>


                        @if(Auth::guard('customer')->check())
                            <ul class="list-group mb-3 " id="myaddressList">

                                <?php foreach ($addressList as  $address ) {?>
                                <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div class="checked-address">
                                        <input id="address_{{$address->id}}" type="radio" name="address_id" value="{{$address->id}}">
                                    </div>
                                    <div class="checked-address">
                                        <label for="address_{{$address->id}}"><i class="glyphicon glyphicon-home"></i>
                                            <?php
                                            echo "$address->address,  $address->city, $address->state $address->zip"
                                            ?>

                                        </label>

                                    </div>
                                    <span class="btn btn-xs btnSubmit btnEditView btn-success editAddButton" data-id="{{ $address->id }}"><i
                                                class="fa fa-edit"> edit</i></span>
                                </li>
                                <?php }?>

                            </ul>
                        @endif
                        <div class="custom-control custom-checkbox">
                            <input id="new_add" type="checkbox" class="custom-control-input">
                            <label class="custom-control-label" for="new_add">New Address</label>
                        </div>
                        <div id="new_address">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label for="firstName">Full name</label>
                                    <input name="firstName" type="text" class="form-control" id="firstName" placeholder="" value="" {{$required}}>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for="email">Email </label>
                                    <input name="email" type="email" class="form-control" id="email" placeholder=" " {{$required}}></div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label for="address">Address</label>
                                    <input type="text" name="address" class="form-control" id="address" placeholder=" " {{$required}}>

                                </div>

                                <div class="col-md-6 form-group">
                                    <label for="Landmark">Landmark <span class="text-muted">(Optional)</span></label>
                                    <input type="text" name="landmark" class="form-control" id="Landmark" placeholder="">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select name="country" class="custom-select d-block w-100 form-control" id="country" {{$required}}>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>

                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <select class="custom-select d-block w-100 form-control" name="state" id="state" {{$required}}>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>

                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input name="zip" type="text" class="form-control" id="zip" placeholder="" {{$required}}>

                                </div>
                            </div>
                            <hr class="mb-4">
                            <div class="custom-control custom-checkbox">
                                <input name="same_billing" type="checkbox" class="custom-control-input" id="same-address">
                                <label class="custom-control-label" for="save_address">Save to my address book</label>
                            </div>
                        </div>
                        <hr class="mb-4">
                        <div class="">
                            <h4 class="mb-3">Choose delivery method</h4>
                        </div>
                        <div class="">
                            <?php
                            $tuesday = new DateTime();
                            // Modify the date it contains
                            $tuesday->modify('next tuesday');
                            $tuesday = $tuesday->format('d.M.Y');

                            $wednesday = new DateTime();

                            $wednesday->modify('next wednesday');

                            $wednesday = $wednesday->format('d.M.Y');

                            $thursday = new DateTime();

                            $thursday->modify('next thursday');

                            // Output
                            $thursday = $thursday->format(' d.M.Y');


                            ?>
                            <input id="delivery" type="radio" name="delivery" value=""> <label class="custom-control-label" for="delivery">
                                Di. {{$tuesday}} (09-12 Uhr) € {{$siteOptions->shipping_tax}}</label>
                        </div>
                        <div class=" ">
                            <input id="delivery1" type="radio" name="delivery" value=""> <label class="custom-control-label" for="delivery1">
                                Mi. {{$wednesday}} (09-12 Uhr) € {{$siteOptions->shipping_tax}}</label>
                        </div>
                        <div class="">
                            <input id="delivery2" type="radio" name="delivery" value=""> <label class="custom-control-label" for="delivery2">
                                Do. {{$thursday}} (09-12 Uhr) €{{$siteOptions->shipping_tax}}</label>
                        </div>
                        <hr class="mb-4">

                        <h4 class="mb-3">Payment</h4>

                        <div class="d-block my-3">
                            <div class="custom-control custom-radio">
                                <input id="paypal" value="paypal" name="paymentMethod" type="radio" class="custom-control-input" required="">
                                <label class="custom-control-label" for="paypal">Paypal</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input id="stripe" value="stripe" name="paymentMethod" type="radio" class="custom-control-input"
                                       required="">
                                <label class="custom-control-label" for="stripe">Credit/Debit Card</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input id="bank" value="bank" name="paymentMethod" type="radio" class="custom-control-input" required="">
                                <label class="custom-control-label" for="bank">Sofort</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input id="recurring" value="recurring" name="paymentMethod" type="radio" class="custom-control-input" required="">
                                <label class="custom-control-label" for="recurring">Abonnement</label>
                            </div>
                        </div>

                        <hr class="mb-4">
                        {{--<div class="check-total">--superadmin}}
                        {{--<span>Total (euro)</span>--}}
                        {{--<strong>€20</strong>--}}
                        {{--</div>--}}


                        <button class="button-add checkout-btn " type="submit">Continue to checkout</button>


                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="myModal" role="dialog" style="margin-left:25%">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Stripe Payment</h4>
                                </div>
                                <div class="modal-body">
                                    @include('frontend.stripe_recurring')
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="addAddress" role="dialog" data-backdrop="static" data-keyboard="false">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">New Address</h4>
                                </div>
                                <div class="modal-body">
                                    {!! Form::open(['route'=>'customer.addAddress','autocomplete'=>'new1-password']) !!}
                                    <input type="hidden" id="addressID" value="">
                                    <div class="form-group col-md-6">
                                        <label>Address</label>
                                        <input type="text" class="form-control" placeholder="Enter Address" value="{{ old('address') }}" id="addressNew"/>
                                        <small class="text text-danger">{{ $errors->first('address') }}</small>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>City</label>
                                        <input type="text" class="form-control" placeholder="Enter City" value="{{ old('city') }}" id="cityNew"/>
                                        <small class="text text-danger">{{ $errors->first('city') }}</small>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>State</label>
                                        <input type="text" class="form-control" placeholder="Enter State" value="{{ old('state') }}" id="stateNew"/>
                                        <small class="text text-danger">{{ $errors->first('state') }}</small>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Zip</label>
                                        <input type="text" class="form-control" placeholder="Enter Zip" value="{{ old('zip') }}" id="zipNew"/>
                                        <small class="text text-danger">{{ $errors->first('zip') }}</small>
                                    </div>
                                    {!! Form::close() !!}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btnSubmit btnSave btn-sm">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    
    <script src="https://js.stripe.com/v2/"></script>
    <script>

        //  Bind the event handler to the "submit" JavaScript event
        $('form#billing_address').submit(function () {

            // Get the Login Name value and trim its
            var name = $.trim($('input[name="paymentMethod"]:checked').val());
            if (name === '') {
                alert('Select Payment Method');
                return false;
            }
            // Check if empty of not
            if (name === 'stripe') {
                $('#myModal').modal('show');
                return false;
            }
        });

        $('#myModal').on('hidden.bs.modal', function () {
            $('#paypal').click();
        });

        $('input[name="paymentMethod"]').change(function () {
            if ($(this).is(':checked') && $(this).val() == 'recurring') {
                $('#myModal').modal('show');
                $(".recurringinterval").removeClass("hidden");
                var $form         = $(".require-validation");
                $('form.require-validation').bind('submit', function(e) {
                    var $form         = $(".require-validation"),
                    inputSelector = ['input[type=email]', 'input[type=password]',
                                     'input[type=text]', 'input[type=file]',
                                     'textarea'].join(', '),
                    $inputs       = $form.find('.required').find(inputSelector),
                    $errorMessage = $form.find('div.error'),
                    valid         = true;
                    $errorMessage.addClass('hide');

                    $('.has-error').removeClass('has-error');
                    $inputs.each(function(i, el) {
                        var $input = $(el);
                        if ($input.val() === '') {
                            $input.parent().addClass('has-error');
                            $errorMessage.removeClass('hide');
                            e.preventDefault();
                        }
                    });

                    if (!$form.data('cc-on-file')) {
                        e.preventDefault();
                        Stripe.setPublishableKey($form.data('stripe-publishable-key'));
                        Stripe.createToken({
                            number: $('.card-number').val(),
                            cvc: $('.card-cvc').val(),
                            exp_month: $('.card-expiry-month').val(),
                            exp_year: $('.card-expiry-year').val()
                        }, stripeResponseHandler);
                    }
                });
  
                function stripeResponseHandler(status, response) {
                    if (response.error) {
                        $('.error')
                            .removeClass('hide')
                            .find('.alert')
                            .text(response.error.message);
                    } else {
                        // token contains id, last4, and card type
                        var token = response['id'];
                        // insert the token into the form so it gets submitted to the server
                        $form.find('input[type=text]').empty();
                        $form.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
                        $form.get(0).submit();
                    }
                }
            }
            
            if ($(this).is(':checked') && $(this).val() == 'stripe') {
                $('#myModal').modal('show');
                $(".recurringinterval").addClass("hidden");
                var $form         = $(".require-validation");
                $('form.require-validation').bind('submit', function(e) {
                    var $form         = $(".require-validation"),
                    inputSelector = ['input[type=email]', 'input[type=password]',
                                     'input[type=text]', 'input[type=file]',
                                     'textarea'].join(', '),
                    $inputs       = $form.find('.required').find(inputSelector),
                    $errorMessage = $form.find('div.error'),
                    valid         = true;
                    $errorMessage.addClass('hide');

                    $('.has-error').removeClass('has-error');
                    $inputs.each(function(i, el) {
                        var $input = $(el);
                        if ($input.val() === '') {
                            $input.parent().addClass('has-error');
                            $errorMessage.removeClass('hide');
                            e.preventDefault();
                        }
                    });

                    if (!$form.data('cc-on-file')) {
                        e.preventDefault();
                        Stripe.setPublishableKey($form.data('stripe-publishable-key'));
                        Stripe.createToken({
                            number: $('.card-number').val(),
                            cvc: $('.card-cvc').val(),
                            exp_month: $('.card-expiry-month').val(),
                            exp_year: $('.card-expiry-year').val()
                        }, stripeResponseHandler);
                    }
                });
  
                function stripeResponseHandler(status, response) {
                    if (response.error) {
                        $('.error')
                            .removeClass('hide')
                            .find('.alert')
                            .text(response.error.message);
                    } else {
                        // token contains id, last4, and card type
                        var token = response['id'];
                        // insert the token into the form so it gets submitted to the server
                        $form.find('input[type=text]').empty();
                        $form.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
                        $form.get(0).submit();
                    }
                }
            
            }
        });
        
        $('input[name="address_id"]').change(function () {
            if ($(this).is(':checked') && $(this).val() != '') {
                $('#new_address').hide();
                $('#new_add').prop('checked', false);
            }
        });
        $('#new_add').change(function () {
            if ($(this).is(':checked') && $(this).val() != '') {
                $('#new_address').show();
                $('input[name="address_id"]').prop('checked', false);
            }
        });

        $('.btnEditView').on('click', function () {
            var id = $(this).data('id');
            console.log(id)
            $.ajax({
                url: "{{ route('customer.singleAddress') }}",
                method: "get",
                data: {id: id},
                success: function (response) {
                    $('.modal-title').text('Edit Address');
                    $('#addressNew').val(response.address);
                    $('#cityNew').val(response.city);
                    $('#stateNew').val(response.state);
                    $('#zipNew').val(response.zip);
                    $('#addressID').val(response.id);
                    $('#addAddress').modal('show');
                }
            });
        });


        $('#myaddressList li').hover(function(){
            $(this).find('.editAddButton').show();
        },function(){
            $(this).find('.editAddButton').hide();
        });



        $('.btnSave').on('click', function () {
            $(this).prop('disabled', true);
            var address = $('#addressNew').val();
            var city = $('#cityNew').val();
            var state = $('#stateNew').val();
            var zip = $('#zipNew').val();
            var id = $('#addressID').val();
            var dataString = {address: address, city: city, state: state, zip: zip, '_token': '{{ csrf_token() }}'}
            if (id != '') {
                dataString.id = id;
            }
            $.ajax({
                url: "{{ route('customer.addAddress') }}",
                method: "post",
                data: dataString,
                success: function (response) {
                    location.reload(true);
                },
                error: function (request, status, error) {
                    $('.btnSave').removeAttr('disabled');
                    var errorList = request.responseJSON.errors;
                    Object.keys(errorList).forEach(function (key) {
                        $('#' + key + 'New').closest('.form-group').find('.text-danger').text(errorList[key][0]);
                    });
                }
            });
        });


    </script>
    <?php Session::forget('txn_data'); ?>
@endsection

@section('styles')
@endsection

