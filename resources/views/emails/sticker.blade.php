<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 14-02-2019
 * Time: 11:40 PM
 */ ?>


<?php

use App\Sauce;
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
    <style>


    </style>
</head>
<body style="">
<?php

if (count($orderData) > 0) {

foreach ($orderData as $i => $order) {

$orderTotal = $order->order_total;?>
<div style="width:540px;height:370px;border: 1px solid #000;margin-left: 6px;float: left;margin-bottom: 4px;font-size: 12px;">
    <div>
        <div style="width: 20%;border: 1px solid #000;font-size: 11px;padding-left: 11px;text-transform: capitalize;float: left;">
            <b>{{$order->customer->username}}</b>
            <?php if (count($components) > 0) {
            $componentList = '';

            // section ingredients;
            $portionIngredients = ['weight_raw' => 0, 'weight_cooked' => 0, 'brennwert' => 0, 'calories' => 0, 'fat' => 0, 'saturated_fatty_acids' => 0,
                'carbohydrates' => 0,
                'sugar' => 0,
                'protein' => 0, 'salt' => 0];
            $gm100Ingredients = ['weight_raw' => 0, 'weight_cooked' => 0, 'brennwert' => 0, 'calories' => 0, 'fat' => 0, 'saturated_fatty_acids' => 0, 'carbohydrates' => 0, 'sugar' => 0,
                'protein' => 0, 'salt' => 0];

            // section sauce;
            $portionSauce = ['weight_raw' => 0, 'weight_cooked' => 0, 'brennwert' => 0, 'calories' => 0, 'fat' => 0, 'saturated_fatty_acids' => 0, 'carbohydrates' => 0, 'sugar' => 0,
                'protein' => 0, 'salt' => 0];
            $gm100Sauce = ['weight_raw' => 0, 'weight_cooked' => 0, 'brennwert' => 0, 'calories' => 0, 'fat' => 0, 'saturated_fatty_acids' => 0, 'carbohydrates' => 0, 'sugar' => 0,
                'protein' => 0, 'salt' => 0, 'egg_white' => 0];

            foreach ($order->ordersMeals->first()->meals->first()->components  as $index => $componentsInfo) {
            $componentList .= $componentsInfo->title . ',';


            // section ingredients;
            if ($componentsInfo->type == 0) {
                if ($componentsInfo->getDetails) {

                    $componentsDetails = $componentsInfo->getDetails;
                    // print_r($componentsInfo);
                    // portion ingredients
                    $portionIngredients['weight_raw'] += $componentsDetails->weight_raw;
                    $portionIngredients['weight_cooked'] += $componentsDetails->weight_cooked;
                    $portionIngredients['calories'] += $componentsDetails->calorific_value_of_the_quantity;
                    $portionIngredients['fat'] += $componentsDetails->fat_of_the_crowd;
                    $portionIngredients['saturated_fatty_acids'] += $componentsDetails->of_which_saturated_fatty_acids_of_the_amount;
                    $portionIngredients['carbohydrates'] += $componentsDetails->carbohydrates_of_the_crowd;
                    $portionIngredients['sugar'] += $componentsDetails->of_which_sugar_is_the_quantity;
                    $portionIngredients['protein'] += $componentsDetails->protein_of_the_crowd;
                    $portionIngredients['salt'] += $componentsDetails->salt_of_the_crowd;

                    // 100 gm ingredients
                    $gm100Ingredients['weight_raw'] += $componentsDetails->weight_raw;
                    $gm100Ingredients['weight_cooked'] += $componentsDetails->weight_cooked;
                    $gm100Ingredients['calories'] += $componentsDetails->calorific_value_in_100_g;
                    $gm100Ingredients['fat'] += $componentsDetails->fat_in_100g;
                    $gm100Ingredients['saturated_fatty_acids'] += $componentsDetails->saturated_fatty_acids_in_100g;
                    $gm100Ingredients['carbohydrates'] += $componentsDetails->carbohydrate_in_100g;
                    $gm100Ingredients['sugar'] += $componentsDetails->sugar_in_100g;
                    $gm100Ingredients['protein'] += $componentsDetails->protein_in_100g;
                    $gm100Ingredients['salt'] += $componentsDetails->salt_100g;


                }

            }
            // section sauce;

            if ($componentsInfo->type == 1) {


                $sauceDetails = Sauce::where('name', $componentsInfo->title)->first();
                if ($sauceDetails) {

                    // portion sauce
                    $portionSauce['weight_raw'] += $sauceDetails->weight_raw_in_ml_or_g;
                    $portionSauce['weight_cooked'] += $sauceDetails->weight_cooked_in_ml_or_g;
                    $portionSauce['calories'] += $sauceDetails->calorific_value_kcal;
                    $portionSauce['fat'] += $sauceDetails->fett_in_g;
                    $portionSauce['saturated_fatty_acids'] += $sauceDetails->of_which_saturated_fatty_acids_in_g;
                    $portionSauce['carbohydrates'] += $sauceDetails->carbohydrates_in_g;
                    $portionSauce['sugar'] += $sauceDetails->of_which_sugar_in_g;
                    $portionSauce['protein'] += $sauceDetails->protein;
                    $portionSauce['salt'] += $sauceDetails->salt_in_g;

                    // 100 gm sauce
                    $gm100Sauce['weight_raw'] += $sauceDetails->weight_raw_in_ml_or_g;
                    $gm100Sauce['weight_cooked'] += $sauceDetails->weight_cooked_in_ml_or_g;
                    $gm100Sauce['calories'] += $sauceDetails->calorific_value_kcal;
                    $gm100Sauce['fat'] += $sauceDetails->fett_in_g;
                    $gm100Sauce['saturated_fatty_acids'] += $sauceDetails->of_which_saturated_fatty_acids_in_g;
                    $gm100Sauce['carbohydrates'] += $sauceDetails->carbohydrates_in_g;
                    $gm100Sauce['sugar'] += $sauceDetails->of_which_sugar_in_g;
                    $gm100Sauce['protein'] += $sauceDetails->protein;
                    $gm100Sauce['salt'] += $sauceDetails->salt_in_g;
                }
            }


            ?>


            <div>{{$componentsInfo->title}},</div>

            <?php




            ?>

            <?php   }
            }?>

        </div>
        <div style="width: 77%;float: left;">
            <img src="{{asset('assets/frontend/img/stickedr.jpg')}}" style="width: 100%;height: 67px;">
        </div>
    </div>
    <div style="width: 50%;float: left;">
        <div style="width: 30%;float: left;">
            <img src="{{asset('assets/frontend/img/tv.png')}}" style="width: 47%;padding: 1px 11px;border: 1px solid;height: 35px;margin-left: 8px;">
        </div>
        <div style="width: 70%;float: left;">
            Die Folie abziehen und das Essen
            ohne den Soßenbehälter für
            ca. 3-4 Minuten bei 700W erwärmen. "
        </div>

    </div>
    <div style="width: 50%;float: left;">
        <div style="width: 30%;float: left;">
            <img src="{{asset('assets/frontend/img/pan.png')}}" style="width: 62%;padding: 7px 14px;border: 1px solid;height: 35px;">
        </div>
        <div style="width: 70%;float: left;">
            Die Lebensmittel in eine
            Pfanne geben und bei mittlerer Hitze erwärmen."

        </div>

    </div>
    <div>
        <table style="border: 1px solid #000;border-collapse: collapse;width: 100%">
            <tr style="font-size: 13px;text-align: left;">
                <th style="border: 1px solid #000;background: #70ad47;">Nährwertangaben</th>
                <th style="border: 1px solid black;background: #70ad47;">100g</th>
                <th style="border: 1px solid black;background: #70ad47;">Portion</th>
                <th style="border: 1px solid black;background: #FFC000;">Nährwertangaben der Soße</th>
                <th style="border: 1px solid black;background: #FFC000;">100ml</th>
                <th style="border: 1px solid black;background: #FFC000;">Portion</th>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Brennwert</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['weight_raw']}} kj</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['weight_raw']}} kj</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Brennwert</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['weight_raw']}} kj</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['weight_raw']}} kj</td>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;"></td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['calories']}} kcal
                </td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['calories']}} kcal
                </td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;"></td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['calories']}} kcal
                </td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['calories']}} kcal
                </td>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Fett</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['fat']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['fat']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Fett</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['fat']}} g
                </td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['fat']}} g
                </td>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">davon gesättigte Fettsäuren</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['saturated_fatty_acids']}}g
                </td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['saturated_fatty_acids']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">davon gesättigte Fettsäuren</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['saturated_fatty_acids']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['saturated_fatty_acids']}} g</td>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Kohlenhydrate</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['carbohydrates']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['carbohydrates']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Kohlenhydrate</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['carbohydrates']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['carbohydrates']}} g</td>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">davon Zucker*</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['sugar']}} g
                </td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['sugar']}} g
                </td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">davon Zucker*</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['sugar']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['sugar']}} g</td>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Eiweiß</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['protein']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['protein']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Eiweiß</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['protein']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['protein']}} g</td>
            </tr>
            <tr style="font-size: 11px;">
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Salz</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionIngredients['salt']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Ingredients['salt']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">Salz</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$portionSauce['salt']}} g</td>
                <td style="border: 1px solid #000;border-collapse: collapse;border-bottom: 0px;">{{$gm100Sauce['salt']}} g</td>
            </tr>
        </table>
    </div>
    <div>
        <div style="width: 50%;float: left;">
            <div style="width: 70%;float: left;">
                <div style="font-size: 12px;">*enthält von Natur aus Zucker</div>
                <div style="font-size: 12px;">**Zutaten: Protion 375g (gekocht)


                </div>
            </div>
            <div style="width: 30%;float: left;height: 30px;"></div>
            {{--<div style="clear: both;padding-top: 5px;">--}}
            {{--<div style="font-size: 12px;float: left;">{{$componentList}}</div>--}}
            {{--</div>--}}
            <div style="clear: both;padding-top: 5px;">


                <div style="font-size: 12px;float: left;width: 100%;">{{$componentList}}</div>

            </div>
            <div style="float: left;width: 50%;">
                <div style="font-size: 12px;float: left; "><b>Salz, Pfeffer</b></div>
            </div>
        </div>
        <div style="width: 50%;float: left;">
            <div style="width: 65%;float: left;">
                <div style="font-size: 12px;">*enthält von Natur aus Zucker</div>
                <div style="font-size: 12px;">**Zutaten: Portion 80ml</div>
            </div>
            <div style="width: 35%;float: left;height: 30px;font-size: 10px;">
                <div>Unter 7°C mindestens</div>
                <div>haltbar bis</div>
            </div>
            <div style="clear: both;padding-top: 5px;">
                <div style="font-size: 12px;float: left;"><?php
                                        if ($sauceDetails) {

                                            echo $sauceDetails->Ingredients;
                                        }
                    ?></div>

            </div>
            <div style="float: left;width: 50%;">
                <div style="font-size: 12px;float: left; "><b>Salz, Pfeffer</b></div>
            </div>
            <div style="float: left;width: 50%;">
                <div style="font-size: 12px;float: left; "><b>Grundpre, Hergestellt in</b></div>
            </div>
        </div>
    </div>
    <div style=" font-size: 14px;width: 70%;float: left;padding-top: 10px;">
        <div style="">Prepmymeal GbR; Unterlindau 28; 60323 Frankfurt am Main; info@prepmymeal.de</div>

    </div>

    <div style=" font-size: 14px;width: 10%;float: left;padding-top: 10px;">
        <div style="">{{$orderTotal}} €</div>
    </div>
    <div style=" font-size: 14px;width: 10%;float: left;padding-top: 10px;">
        <div style="">Deutschland</div>
    </div>
</div>

<?php   }
}?>
</body>
</html>

