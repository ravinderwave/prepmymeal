<?php

if (isset($data['orderData'])) {
    $orderData = $data['orderData'];

}
if (isset($data['components'])) {

    $components = $data['components'];

}
?>
        <!DOCTYPE html>
<html>
<head>
</head>
<body>
<style>
    .verticalTableHeader {
        text-align: center;
        white-space: nowrap;
        g-origin: 50% 50%;
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);

    }

    .verticalTableHeader p {
        margin: 0 -100%;
        display: inline-block;
    }

    .verticalTableHeader p:before {
        content: '';
        width: 0;
        padding-top: 110%; /* takes width as reference, + 10% for faking some extra padding */
        display: inline-block;
        vertical-align: middle;
    }

    table {
        background-color: #b5b3b36e;
    }


</style>
<div style="width: 80%">


    <table style="width:100%;  border: 1px solid black;border-collapse: collapse;">
        <tr>
            <td style="background: yellow; text-align: center" colspan="25">Komponenten</td>
        </tr>
        <tr>
            <th style="border: 1px solid black;border-collapse: collapse;text-align: left;">Name</th>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">ID</th>
            <?php
            $item = array();
            $sauce = array();
            $meals = array();
            if (count($components) > 0) {

            foreach ($components as $index => $component) {
            $item[$component->id] = 0;
            $sauce[$component->id] = 0;
            ?>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">{{$component->title}}</th>

            <?php   }
            }?>
        </tr>

        <?php if (count($orderData) > 0) {

        foreach ($orderData as $i => $order) { ?>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;text-align: left;">{{$order->customer->username}}</td>
            <td style=" border: 1px solid black;border-collapse: collapse;text-align: left;">{{$order->id}}</td>
            <?php if (count($components) > 0) {

            foreach ($components as $index => $component) { ?>
            <td style=" border: 1px solid black;border-collapse: collapse;text-align: left;"><?php


                foreach ($order->ordersMeals as $ordersMeal) {


                    if ($component->id == $ordersMeal->meals->first()->components->first()->id) {


                        echo $count = $ordersMeal->meals->first()->components->count();

                        $item[$component->id] += $count;
                    }

                }

                ?></td>

            <?php   }
            }?>

        </tr>
        <?php   }
        }?>


        <tr></tr>
        <tr>
            <td style="  border: 1px solid black;border-collapse: collapse;"><b>Total</b></td>
            <td style="  border: 1px solid black;border-collapse: collapse;"><b> </b></td>
            <?php if (count($components) > 0) {

            foreach ($components as $index => $component) { ?>
            <td style=" border: 1px solid black;border-collapse: collapse;text-align: left;"><?php if (isset($item[$component->id])) {

                    echo $item[$component->id];
                }?></td>

            <?php   }
            }?>
        </tr>
    </table>
</div>

<div style="width: 50%;">
    <h3 style="background: #FFFF00">An die Küche schicken</h3>

    <div style="width:100%;">
        <table style="width:50%;  border: 1px solid black;border-collapse: collapse;float:left;">

            <tr>
                <th style="border: 1px solid black;border-collapse: collapse;text-align: left;">Meals</th>
                <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">ID</th>
                <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">Anzahl</th>
            </tr>
            <?php

            if (count($orderData) > 0) {
            $mealCount = 0;
            foreach ($orderData as $i => $order) { ?>


            <?php if (count($order->ordersMeals) > 0) {

            foreach ($order->ordersMeals  as $index => $ordersMeal) {
            $mealCount += $ordersMeal->meals->count();
            ?>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;text-align: left;">{{$ordersMeal->meals->first()->title}}</td>
                <td style=" border: 1px solid black;border-collapse: collapse;text-align: left;">{{$order->id }}</td>
                <td style="background: #FFFF00; border: 1px solid black;border-collapse: collapse;text-align: left;">{{$ordersMeal->meals->count()
                }}</td>
            </tr>
            <?php } ?>

            <?php   }
            ?>


            <?php   }
            }?>

            <tr>
                <td style="  border: 1px solid black;border-collapse: collapse;"><b>Gesamt</b></td>
                <td style="  border: 1px solid black;border-collapse: collapse;"></td>
                <td style="  border: 1px solid black;border-collapse: collapse;"><b>{{$mealCount}}</b></td>
            </tr>
        </table>
        <table style="width:40%;  border: 1px solid black;border-collapse: collapse;float:left;">
            <tr>
                <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">Anzahl Saucen:</th>
                <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;"></th>
            </tr>
            <?php if (count($orderData) > 0) {

            foreach ($orderData as $i => $order) {
            if (count($components) > 0) {
            foreach ($components as $index => $component)
            {
            $sauceCount = 0;
            foreach ($order->ordersMeals as $ordersMeal) {
            if ($ordersMeal->meals->first()->components->first()->type == 1)
            {
            $sauceCount++;
            $sauce[$component->id] += 1;
            ?>

            <tr>
                <td style="  border: 1px solid black;border-collapse: collapse;">{{$ordersMeal->meals->first()->components->first()->title}}</td>
                <td style="  border: 1px solid black;border-collapse: collapse;">{{$sauceCount}}</td>
            </tr>


            <?php
            }   }
            }
            } }
            }?>

            <tr>
                <td style="  border: 1px solid black;border-collapse: collapse;"></td>
                <td style="  border: 1px solid black;border-collapse: collapse;"><b>{{$sauce[$component->id]}}</b></td>
            </tr>
        </table>
    </div>
    <table style="width:40%; border: 1px solid black;border-collapse: collapse;float:left; clear:both;margin-top:30px;">
        <tr>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">Zutaten</th>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">Einkaufen</th>
        </tr>
        <?php

        if (count($components) > 0) {
        foreach ($components as $index => $component) {
        if($component->type == 0){
        ?>
        <tr>
            <td style="  border: 1px solid black;border-collapse: collapse;">{{$component->title}}</td>
            <td style="  border: 1px solid black;border-collapse: collapse;"><?php
                if ($item[$component->id] > 0) {
//                echo($item[$component->id] . $component->formula->measure);
                    echo math_eval($item[$component->id] . $component->formula->measure) . ' ' . $component->formula->measure_type;
                }
                ?>
            </td>
        </tr>
        <?php
        }
        }
        }?>


    </table>
    <table style="width:40%; border: 1px solid black;border-collapse: collapse;float:left; clear:both;margin-top:30px;">
        <tr>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">Zutaten Soße</th>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">Einkaufen</th>
        </tr>
        <?php

        if (count($components) > 0) {
        foreach ($components as $index => $component) {
        if($component->type == 1){

        ?>
        <tr>
            <td style="  border: 1px solid black;border-collapse: collapse;">{{$component->title}}</td>
            <td style="  border: 1px solid black;border-collapse: collapse;"><?php
                if ($sauce[$component->id] > 0) {
                    if ($component->formula->sub_component) {

                        $qty = explode(',', $component->formula->sub_component);
                        if (count($qty) == 1) {

                            $expression = str_replace(['QTY1'], [$sauce[$qty[0]]], $component->formula->measure);
                        }
                        if (count($qty) == 2) {

                            $expression = str_replace(['QTY1', 'QTY2'], [$sauce[$qty[0]], $sauce[$qty[1]]], $component->formula->measure);
                        }

//                        echo $expression;
                        echo math_eval($expression) . ' ' . $component->formula->measure_type;
                    }

                }

                ?>
            </td>
        </tr>
        <?php
        }
        }
        }?>
    </table>
</div>
<div style="clear: both"></div>
<div style="width: 80%">
    <h2>Wichtig wäre, dass der Name "Max Mustermann" nur einmal aufgelistet wird!</h2>
    <h3>An die Küche schicken</h3>
    <table style="width:100%; text-align: center; border: 1px solid black;border-collapse: collapse;float:left; clear:both;margin-top:30px;
    margin-bottom:30px;">
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td style="background-color: #fff705; border: 1px solid black;border-collapse: collapse;text-align: center;"
                colspan="<?php echo $mealCount
                ?>">Wichtig wäre, dass der Name "Max Mustermann" nur einmal aufgelistet wird!
            </td>
        </tr>
        <tr>
            <td colspan="2" style="background-color: #fff705; border: 1px solid black;border-collapse: collapse;text-align: center;">Bestellliste</td>

            <?php if (count($orderData) > 0) {

            foreach($orderData as $i => $order) {
            if (count($order->ordersMeals) > 0) {

            foreach ($order->ordersMeals  as $index => $ordersMeal) {

            ?>
            <td style="  border: 1px solid black;border-collapse: collapse;">{{$ordersMeal->meals->first()->id}}</td>

            <?php }
            }
            }
            }?>
            <td style="  border: 1px solid black;border-collapse: collapse;"></td>

        </tr>

        <tr>
            <td colspan="2" style=" border: 1px solid black;border-collapse: collapse;text-align: left;">&nbsp;</td>
            <?php if (count($orderData) > 0) {

            foreach($orderData as $i => $order) {
            if (count($order->ordersMeals) > 0) {

            foreach ($order->ordersMeals  as $index => $ordersMeal) {

            ?>
            <th class="verticalTableHeader" style="  border: 1px solid black;border-collapse: collapse;"><p>{{$ordersMeal->meals->first()->title}}</p>
            </th>

            <?php }
            }
            }
            }?>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;"></th>
        </tr>
        <tr>
            <th>Name</th>
            <th>ID</th>
            <td colspan="<?php echo $mealCount - 5?>">&nbsp;</td>
        </tr>
        <?php if (count($orderData) > 0) {

        foreach($orderData as $i => $order) {?>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;text-align: left;">{{$order->customer->username}}</td>
            <td style=" border: 1px solid black;border-collapse: collapse;text-align: left;">{{$order->id}}</td>

            <?php if (count($orderData) > 0) {

            foreach($orderData as $ik => $orderk) {
            if (count($orderk->ordersMeals) > 0) {

            foreach ($orderk->ordersMeals  as $index => $ordersMeal) {

            ?>
            <td style=" border: 1px solid black;border-collapse: collapse;">{{$ordersMeal->meals->count()}}</td>

            <?php }
            }
            }
            }?>
            <th style="background-color: #28e662; border: 1px solid black;border-collapse: collapse;text-align: left;">{{$mealCount}}</th>
        </tr>
        <?php }
        }?>
        <tr>
            <td colspan="<?php echo $mealCount - 5?>">&nbsp;</td>
        </tr>
        <tr style="background-color: #28e662">
            <td colspan="2" style=" border: 1px solid black;border-collapse: collapse;text-align: left;">Gesamt</td>

            <?php if (count($orderData) > 0) {

            foreach($orderData as $ik => $orderk) {
            if (count($orderk->ordersMeals) > 0) {

            foreach ($orderk->ordersMeals  as $index => $ordersMeal) {

            ?>
            <td style="  border: 1px solid black;border-collapse: collapse;">{{$ordersMeal->meals->count()}}</td>

            <?php }
            }
            }
            }?>
            <th style=" border: 1px solid black;border-collapse: collapse;text-align: left;">{{$mealCount}}</th>
        </tr>


    </table>
</div>
</body>
</html>
