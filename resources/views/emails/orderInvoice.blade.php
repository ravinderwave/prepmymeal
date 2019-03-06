<!DOCTYPE html>
<html>
<head>
    <style>
    </style>
</head>
<body style="margin: 0 auto; width:1100px; height:auto;">


<div style="width: 50%;float: left;">

    <h3>Prepmymeal GmbH – Unterlindau 28– 60323 Frankfurt am Main</h3><br>
    {{ $data->address->address }}<br>
    {{ $data->address->city }}<br>
    {{ $data->address->state }}, {{ $data->address->zip }}
    Tel: {{ $data->customer->phone }}<br>
    Email: {{ $data->customer->email }}<br>


</div>
<div style="width: 50%;float: right; text-align: right;">


    <h3>Prepmymeal GmbH</h3><br>
    Unterlindau 28<br>
    60323 Frankfurt am Main<br>
    Tel.: 0170-4528916<br>
    E-Mail: info@ prepmymeal.de<br>
    Internet: www.prepmymeal.de<br>


</div>
<div style="width: 100%;float: left;">
    <h2>Rechnung</h2>

</div>
<div style="width: 45%;float: left;">

    <div style="font-size: 12px;">Rechnung Nr. #{{$data->order_id}}</div>
    <div style="font-size: 12px;">Versand per Do. 21. Feb. 2019 (9-12)</div>


</div>
<div style="width: 35%;float: left;">

    <div style="font-size: 12px;">Kunden-Nr.: {{ $data->customer->id }}</div>
    <div style="font-size: 12px;">Zahlungsmethode: {{ $data->payment_mode }}</div>


</div>
<div style="width: 20%;float: left;">

    <div style="font-size: 12px; font-weight: bold; text-align: right;">Datum: {{ date('m.d.Y',strtotime($data->created_at)) }}</div>


</div>
<div style="width: 100%;float: left;">

    <hr style="color:#000; height:4px; border:none; padding-bottom: 30px;">
    <hr>
    <br><br>


</div>


<div>
    <table style="border: 1px solid #000;border-collapse: collapse;width: 100%; text-align: center;">
        <tr style="font-size: 13px;">
            <th style="text-align: center; border: 1px solid #000;background: #70ad47;">Pos</th>
            <th style="text-align: center; border: 1px solid black;background: #70ad47;">Leistung</th>
            <th style="text-align: center; border: 1px solid black;background: #70ad47;">MwSt.</th>
            <th style="text-align: center; border: 1px solid black;background: #70ad47;">Einzelpreis</th>
            <th style="text-align: center; border: 1px solid black;background: #70ad47;">Anzahl</th>
            <th style="text-align: center; border: 1px solid black;background: #70ad47;">Gesamtpreis</th>
        </tr>
    <?php
    use App\Meal;
    use App\Option;
    $siteOptions = Option::first();
    $drinkTax = $mealTax = 0;

    foreach($data->items as $key => $item)    {

    $mealInfo = Meal::find($item->meal_id);

    ?>
    <?php if ($mealInfo->type == 2) {
        $drinkTax += $item->tax;
    } else {

        $mealTax += $item->tax;

    }?>
    <!-- foreach ($order->lineItems as $line) or some such thing here -->
        <tr  style="font-size: 11px;">
            <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{ $key+1 }}</td>
            <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{ $item->name }}</td>
            <?php if ($mealInfo->type == 2) { ?>
            <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{ $siteOptions->drink_vat_tax }}%</td>
            <?php }else {?>
            <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{ $siteOptions->vat_tax }}%</td>
            <?php }?>
            <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;" class="text-center">{{ number_format($item->price,2) }} EUR</td>
            {{-- <td class="text-center">1</td> --}}
            <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;" class="text-center">{{ $item->quantity }}</td>
            <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;" class="text-center">{{ round($item->price * $item->quantity, 2) }} EUR</td>
        </tr>

        <?php }?>


    </table>
</div>
<div style="width: 100%;float: left;">

    <hr style="color:#000; height:4px; border:none; margin-bottom: 50px;">
    <hr>
    <br>


</div>
<div style="width: 60%;float: left;">

    <p>.</p>

</div>
<div style="width: 20%;float: left;">

    <div style="font-size: 12px; text-align: right;">Nettobetrag:<br>
        Versand:<br>
        <?php if(isset($data->coupon_discount)) {?>
        Abzgl. Gutschein<br>
        <?php }?>
        <?php  if ($mealTax > 0) { ?>
        zzgl. 7 % MwSt<br>
        <?php }?>
        <?php  if ($drinkTax > 0)  { ?>
        zzgl. 19 % MwSt:<br>
        <?php }?>


        Gesamtbetrag:<br>
    </div>


</div>
<div style="width: 20%;float: left;">

    <div style="font-size: 12px; text-align: right; font-weight: bold;">{{ $data->sub_total }} EUR<br>
        {{ $siteOptions->shipping_tax }} EUR<br>
        <?php
        if (isset($data->coupon_discount))

            echo '-' . $data->coupon_discount . 'EUR<br>';
        ?>
        <?php  if ($mealTax > 0) { ?>
        <?php echo number_format($mealTax, 2)?> EUR<br>
        <?php }?>
        <?php  if ($drinkTax > 0) { ?>
        <?php echo number_format($drinkTax, 2)?>EUR<br>
        <?php }?>

        <?php echo number_format($data->total, 2)?> EUR<br>
    </div>


</div>


<div style="width: 100%;float: left;">
    <div style="">Die aufgeführten Dienstleistungen haben Sie gemäß unserer AGB erhalten.</div>
</div>


</body>
</html>


{{--<link href="https://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">--}}
{{--<script src="https://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>--}}
{{--<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>--}}
{{--<!------ Include the above in your HEAD tag ---------->--}}

{{--<div class="container">--}}
{{--<div class="row">--}}
{{--<div class="col-xs-12">--}}
{{--<div class="invoice-title">--}}
{{--<img src="{{asset('assets/frontend/img/preplogo.png')}}" style="width:20%; margin-left:-10px;margin-top:10px;">--}}
{{--</div>--}}
{{--<div class="invoice-title">--}}
{{--<h2>Order Confirmation</h2>--}}
{{--<h3 class="pull-right">Order # {{$data->order_id}}</h3>--}}
{{--</div>--}}
{{--<hr>--}}
{{--<div class="row">--}}
{{--<div class="col-xs-6">--}}
{{--<address>--}}
{{--<strong>Billed To:</strong><br>--}}
{{--{{ $data->customer->name }}<br>--}}
{{--{{ $data->address->address }}<br>--}}
{{--{{ $data->address->city }}<br>--}}
{{--{{ $data->address->state }}, {{ $data->address->zip }}--}}
{{--</address>--}}
{{--</div>--}}
{{--<div class="col-xs-6 text-right">--}}
{{--<address>--}}
{{--<strong>Shipped To:</strong><br>--}}
{{--{{ $data->customer->name }}<br>--}}
{{--{{ $data->address->address }}<br>--}}
{{--{{ $data->address->city }}<br>--}}
{{--{{ $data->address->state }}, {{ $data->address->zip }}--}}
{{--</address>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="row">--}}
{{--<div class="col-xs-6">--}}
{{--<address>--}}
{{--<strong>Payment Method:</strong><br>--}}
{{--{{ $data->payment_mode }}<br>--}}
{{--{{ $data->customer->email }}--}}
{{--</address>--}}
{{--</div>--}}
{{--<div class="col-xs-6 text-right">--}}
{{--<address>--}}
{{--<strong>Order Date:</strong><br>--}}
{{--{{ date('M d, Y', strtotime($data->created_at)) }}<br><br>--}}
{{--</address>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="row">--}}
{{--<div class="col-md-12">--}}
{{--<div class="panel panel-default">--}}
{{--<div class="panel-heading">--}}
{{--<h3 class="panel-title"><strong>Order summary</strong></h3>--}}
{{--</div>--}}
{{--<div class="panel-body">--}}
{{--<div class="table-responsive">--}}
{{--<table class="table table-condensed">--}}
{{--<thead>--}}
{{--<tr>--}}
{{-- <td><strong>Item</strong></td> --}}
{{--<td class="text-center"><strong>Name</strong></td>--}}
{{--<td class="text-center"><strong> Price</strong></td>--}}
{{--<td class="text-center"><strong>Quantity</strong></td>--}}
{{--<td class="text-right"><strong>Totals</strong></td>--}}
{{--</tr>--}}
{{--</thead>--}}
{{--<tbody>--}}
{{--@foreach($data->items as $item)--}}
{{--<!-- foreach ($order->lineItems as $line) or some such thing here -->--}}
{{--<tr>--}}
{{--<td>{{ $item->name }}</td>--}}
{{--<td class="text-center">{{ $item->price }}</td>--}}
{{-- <td class="text-center">1</td> --}}
{{--<td class="text-center">{{ $item->quantity }}</td>--}}
{{--<td class="text-right">{{ round($item->price * $item->quantity, 2) }}</td>--}}
{{--</tr>--}}
{{--@endforeach--}}
{{--<tr>--}}
{{--<td class="thick-line"></td>--}}
{{--<td class="thick-line"></td>--}}
{{--<td class="thick-line"></td>--}}
{{--<td class="thick-line text-center"><strong>Subtotal</strong></td>--}}
{{--<td class="thick-line text-right">{{ $data->sub_total }}</td>--}}
{{--</tr>--}}
{{--<tr>--}}
{{--<td class="no-line"></td>--}}
{{--<td class="no-line"></td>--}}
{{--<td class="no-line"></td>--}}
{{--<td class="no-line text-center"><strong>Shipping</strong></td>--}}
{{--<td class="no-line text-right">{{ $data->sub_tax }}</td>--}}
{{--</tr>--}}
{{--<tr>--}}
{{--<td class="no-line"></td>--}}
{{--<td class="no-line"></td>--}}
{{--<td class="no-line"></td>--}}
{{--<td class="no-line text-center"><strong>Total</strong></td>--}}
{{--<td class="no-line text-right">{{ $data->total }}</td>--}}
{{--</tr>--}}
{{--</tbody>--}}
{{--</table>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--</div>--}}
{{--</div>--}}
{{--</div>--}}