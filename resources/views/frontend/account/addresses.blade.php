@extends('frontend.layouts.app')

@section('title','My Addresses || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')

@section('styles')
    <style type="text/css">
        button.btn.btn-sm.btnSubmit.pull-right {
            position: absolute;
            bottom: 190px;
            left: 800px;
        }

        .address-container {

            overflow-y: scroll;
            max-height: 175px;
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

        .space-bottom {
            height: 52px;
        }

        .payment-main {
            clear: both;
            padding-top: 26px;
        }

        .user-dashbord-sidebar {
            margin-top: 100px;
        }

        @media only screen and (max-width: 992px) {
            .user-dashbord-sidebar {
                margin-top: 72px !important;
                margin-left: 0px !important;
            }
        }

        .order-show-btn:focus {
            color: #333;
            text-decoration: none;
        }

        .order-show-btn {

            color: #333;
            text-decoration: none;
        }

        .user-dashbord-sidebar {
            margin-top: 100px;
            border: 3px solid #eee;
            position: absolute !important;
            height: 350px;
            margin-left: 10px;
        }

        .dashboard-heading {
            margin-top: 10px;
        }

        .info-box-icon.bg-aqua {

            background: #ea7c00;
            padding: 11px;
            font-size: 32px;
            text-align: center;
            color: #fff;
        }

        .info-box-content {

            font-size: 16px;
            position: absolute;
            top: 7px;
            text-transform: uppercase;
        }

        .info-box-number {

            font-weight: 600;
        }

        .info-box {
            border: 2px solid #eee;
            height: 71px;
        }

        .user-table-main {
            margin-top: 30px;
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
@endsection
<section class="">
    <div class="item ">
        <img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="Los Angeles" style="width:100%; max-height: 300px;">
    </div>
</section>
<section class="main-three main-space">
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="heading">
                <p> Manage Addresses </p>
            </div>
            <div class="profile-content">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="col-xs-12 col-sm-3 col-md-3">
                        <ul class="nav nav-tabs tabs-left">
                            <li><a href="{{ route('customer.dashboard') }}"> My Profile</a></li>
                            <li class="active"><a href="{{ route('customer.addresses') }}"> <strong>Manage Addresses</strong></a></li>
                            <li><a href="{{ route('customer.orders') }}"> My Orders</a></li>
                            <li><a href="{{ route('customer.payments') }}"> Payments</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-12 col-sm-9 col-md-9">
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="profile">
                                <div class="row">
                                    <button class="btn btn-sm btnSubmit pull-right" data-toggle="modal" data-target="#addAddress"
                                            data-backdrop="static" data-keyboard="false">Add Address
                                    </button>

                                    <div class="col-md-12 col-xs-12 col-sm-12 address-container">
                                        <label>Addresses</label>
                                        <hr>
                                        @if(count($addresses))
                                            @foreach($addresses as $address)
                                                <div class="form-group">
                                                    <div>{{ $address->address }},{{ $address->city }},{{ $address->state }},{{ $address->zip }}
                                                        <button class="btn btn-xs btnSubmit btnEditView" data-id="{{ $address->id }}"><i
                                                                    class="fa fa-edit"> edit</i></button>
                                                    </div>
                                                </div>
                                                <hr>
                                            @endforeach
                                        @endif
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
@endsection



@section('scripts')
    <script type="text/javascript">
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
    </script>
@endsection