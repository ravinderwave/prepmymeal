<?php $__env->startSection('title','Cart || PrepMyMeal'); ?>
<?php $__env->startSection('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst'); ?>
<?php $__env->startSection('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung'); ?>

<?php $__env->startSection('content'); ?>

    <?php


            ?>
    <section class="">
        <div class="item "><img src="<?php echo e(asset('assets/frontend/img/13.jpg')); ?>" alt="Los Angeles" style="width:100%;"></div>
    </section>
    <section class="main-three  main-space">
        <div class="container">
            <div class="two">
                <div class="heading"><p> Your Shopping Bag </p></div>
                <?php
                    $cart = session('cart');
                ?>
                <?php if(!empty($meals) && count($meals)>0): ?>
                    <?php $__currentLoopData = $meals; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $meal): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="col-md-12 col-sm-12 col-xs-12 cart-list-main meal-product-img">
                            <div class="col-md-1 col-sm-2 col-xs-3"><img
                                        src="<?php if($meal->image1!=null): ?><?php echo e(asset('uploads/'.$meal->image1)); ?><?php else: ?> <?php echo e(asset('assets/frontend/img/background_img.jpg')); ?> <?php endif; ?>">
                            </div>
                            <div class="col-md-5 col-sm-4 col-xs-7">
                                <h4 class="card-product-title"><?php if($meal->status==1): ?><a
                                            href="<?php echo e(url($meal->slug)); ?>"><?php echo e(ucfirst($meal->title)); ?></a><?php else: ?> <?php echo e(ucfirst($meal->title)); ?> <?php endif; ?></h4>
                            </div>
                            <div class="clear  product-price-list">
                                <div class="col-md-1 col-xs-2 col-sm-1 card-product-title"><span
                                            class="fixed-price">
                                     <?php if ($meal->type == 2) { ?>
                                        <b>&#8364; <?php echo e(number_format($meal->price + ($meal->price*($siteOptions->drink_vat_tax/100)),2)); ?></b>

                                        <?php  }else{ ?>
                                        <b>&#8364; <?php echo e(number_format($meal->price + ($meal->price*($siteOptions->vat_tax/100)),2)); ?></b>
                                        <?php }?>
                                    </span>
                                </div>
                                <div class="col-md-3 col-xs-6 col-sm-3 count-product  card-product-title">
                                    <div class="quantity">
                                        <div class="input-group">
								<span class="input-group-btn">
									<button type="button" class="btn btn-default btn-number cart-btn-padding" data-type="minus" data-field="quant[1]"><span
                                                class="glyphicon glyphicon-minus"></span></button>
								</span>
                                            <input type="text" name="quant[1]" class="form-control input-number" value="<?php echo e($cart[$meal->id]['qty']); ?>"
                                                   min="1" max="100" data-price="<?php echo e($meal->price); ?>" data-id="<?php echo e($meal->id); ?>">
                                            <span class="input-group-btn">
									<button type="button" class="btn btn-default btn-number cart-btn-padding" data-type="plus"
                                            data-field="quant[1]"><span class="glyphicon glyphicon-plus"></span></button>
								</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-1  col-sm-1 col-xs-2  card-product-title"><span class="fixed-price singleTotal<?php echo e($meal->id); ?>">
                                     <?php if ($meal->type == 2) { ?>
                                        <b>&#8364; <?php echo e(number_format($cart[$meal->id]['qty']*($meal->price+ ($meal->price*
                                        ($siteOptions->drink_vat_tax/100))),2)); ?></b>
                                        <?php  }else{ ?>
                                        <b>&#8364; <?php echo e(number_format($cart[$meal->id]['qty']*($meal->price+ ($meal->price*($siteOptions->vat_tax/100))),2)); ?></b>
                                        <?php }?>
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-1  col-sm-1 col-xs-2 card-product-title"><span data-id="<?php echo e($meal->id); ?>" class="close remove-cart">&times;</span>
                            </div>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php else: ?>
                    <div class="col-md-12 col-sm-12 col-xs-12 cart-list-main meal-product-img text-center">
                        <h3>You don't have any meal in cart. </h3>
                        <a href="<?php echo e(url('/meals')); ?>" class="button-add">Continue Shopping</a>
                    </div>
                <?php endif; ?>
                <?php if(!empty($meals) && count($meals)>0): ?>
                    <div class=" col-md-8 col-sm-6 col-xs-12 coupon_code_main ">
                        <form class="coupon_code_field">
                            <div class="col-md-3">
                                <label>Coupon code:</label>
                            </div>
                            <div class="col-md-4">
                                <input name="coupon_code" class="form-control coupon_code" type="text">
                            </div>
                            <div class="col-md-5">
                                <button class="button-add apply-coupon" type="button">Apply</button>
                            </div>
                        </form>
                        <div class="clear-bag-main">
                            <div class="col-md-6 col-sm-5 padding-none">
                                <a href="#" class="button-add">Clear Bag</a>
                            </div>
                            <div class="col-md-6 col-sm-7 align-right padding-none">
                                <a href="<?php echo e(url('/meals')); ?>" class="button-add">Continue Shopping</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-6 cart_total">
                        <div class="col-md-12  cart-sidebar">
                            <b>Items <span
                                        id="itemTotal"> <b>&#8364; <?php echo e(number_format($cart['total'],2)); ?></b></span></b>
                            <h5>Shipping Charge.
                                <span> <b>&#8364; <?php echo e(number_format($siteOptions->shipping_tax ,2)); ?></b></span>
                            </h5>
                            <h5>MwSt. <span
                                        id="vatTax">
                                     <?php if ($meal->type == 2) { ?>
                                    <b>&#8364; <?php echo e(number_format(($cart['total']*($siteOptions->drink_vat_tax/100))  + ($siteOptions->shipping_tax *  ($siteOptions->drink_vat_tax/100)),2)); ?></b>
                                    <?php  }else{ ?>
                                    <b>&#8364; <?php echo e(number_format(($cart['total']*($siteOptions->vat_tax/100))  + ($siteOptions->shipping_tax*($siteOptions->vat_tax/100)),2)); ?></b>
                                    <?php }?>
                                </span></h5>
                            <h5>Total.<span
                                        id="cartTotal">&#8364;
                                    <?php if ($meal->type == 2) { ?>
                                    <b> <?php echo e(number_format(($cart['total'] + ($cart['total']*($siteOptions->drink_vat_tax/100))
                                    +$siteOptions->shipping_tax + ($siteOptions->shipping_tax*($siteOptions->drink_vat_tax/100))),2)); ?></b>
                                    <?php  }else{ ?>
                                    <b> <?php echo e(number_format(($cart['total'] + ($cart['total']*($siteOptions->vat_tax/100))+$siteOptions->shipping_tax + ($siteOptions->shipping_tax*($siteOptions->vat_tax/100))),2)); ?></b>
                                <?php }?>
                            </h5>
                        </div>
                        <div class="">
                            <form>
                                <div class="terms-check col-md-12">
                                    <input id="tearm" type="checkbox" class="col-xs-1 col-sm-1 col-md-1 col-lg-1"> <label
                                            class="col-xs-11 col-sm-11 col-md-11 col-lg-11" for="tearm">
                                        <a href="javascript:void(0);" data-toggle="modal" data-target="#myModal2">I agree with Terms and Conditions
                                            and
                                            Widerrufsbelehrung & Widerrufsformular</a></label>
                                </div>
                                <div class="select-field col-md-12">
                                    <a href="javascript:void(0);" data-link="<?php echo e(route('checkout')); ?>" id="do-checkout" class="button-add">Checkout</a>
                                </div>
                            </form>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <div></div>
    </section>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog" style="margin-left:25%">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                    <h4 class="modal-title">Minimum Order!</h4>
                </div>
                <div class="modal-body text-center">
                    <h5>Minimum order subtotal is € 25.00. Please add some more items to your bag.</h5>
                </div>

            </div>
        </div>
    </div>
    <div class="modal fade" id="myModal2" role="dialog" style="margin-left:25%">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-body">

                    <style>


                        div.ecwid-popup.ecwid-responsive-popup, div.ecwid-popup.ecwid-responsive-popup div.popupContent {
                            -webkit-overflow-scrolling: touch;
                            overflow: auto;
                            margin: 0;
                        }

                        div.ecwid-popup.ecwid-responsive-popup, div.ecwid-popup.ecwid-responsive-popup div.popupContent, div.ecwid-popup.ecwid-responsive-popup div.ecwid-popup-touchLimiter {
                            display: -ms-flex;
                            display: -webkit-flex;
                            display: flex;
                            -webkit-box-orient: vertical;
                            -webkit-box-align: stretch;
                            -webkit-box-flex: 1;
                            justify-content: center;
                        }

                        div.ecwid-SelectOptionsPopup .popupContent, div.ecwid-FormPopup .popupContent, div.ecwid-productBrowser-cart-chooseLocationPopup .popupContent, div.ecwid-productBrowser-cart-changeOptionsPopup .popupContent {
                            padding: 5px;
                            box-sizing: border-box;
                            border: 1px solid #ededed;
                            border-radius: 5px;
                            position: relative;
                            margin: 0 auto;
                            background: #fff;
                            display: inline-block;
                        }

                        .ecwid-TermsPopup .popupContent {
                            max-width: 740px;
                            width: 100%;
                        }

                        div.ecwid-popup.ecwid-responsive-popup, div.ecwid-popup.ecwid-responsive-popup div.popupContent, div.ecwid-popup.ecwid-responsive-popup div.ecwid-popup-touchLimiter {
                            display: -ms-flex;
                            display: -webkit-flex;
                            display: flex;
                            -webkit-box-orient: vertical;
                            -webkit-box-align: stretch;
                            -webkit-box-flex: 1;
                            justify-content: center;
                        }

                        .ecwid tr {
                            display: table-row;
                        }

                        div.ecwid-popup.ecwid-compact-popup div.ecwid-popup-touchLimiter > table {
                            margin: 0 auto;
                            table-layout: auto;
                        }

                        div.ecwid-popup.ecwid-compact-popup div.ecwid-popup-touchLimiter > table {
                            margin: 0 auto;
                            table-layout: auto;
                        }

                        div.ecwid-TermsPopup.ecwid-compact-popup div.ecwid-popup-content {
                            padding: 0 15px 15px;
                        }

                        div.ecwid-TermsPopup div.ecwid-popup-content .ecwid-popup-contentPanel {
                            table-layout: fixed;
                        }

                        div.ecwid-TermsPopup.ecwid-compact-popup div.ecwid-TermsPopup-terms {
                            height: auto;
                        }

                        div.ecwid-TermsPopup-terms {
                            text-align: left;
                            margin-top: 10px;
                        }

                        div.ecwid-Terms-navigation {
                            word-break: break-word;
                        }

                        div.ecwid-TermsPopup div.ecwid-popup-headLabel {
                            font-size: 24px;
                            line-height: 1.3;
                            margin: 11px 0 14px 0;
                        }

                        div.ecwid-popup-headLabel {
                            font-size: 20px;
                            color: #333;
                            margin: 0 0 12px 0;
                            min-width: 240px;
                            text-align: center;
                        }

                        div.ecwid-Terms-link-title {
                            color: #1e7ec8;
                            cursor: pointer;
                            display: inline;
                        }

                        div.ecwid-Terms-content {
                            border: 1px solid #bfbfbf;
                            overflow: auto;
                            height: 197px;
                            margin-bottom: 13px;
                            padding: 0 15px;
                            max-width: 666px;
                            font-size: 14px;
                            line-height: 1.4;
                        }

                        .ecwid td {
                            display: table-cell;
                            vertical-align: middle;
                        }

                        .ecwid td[align="left"] {
                            text-align: left;
                        }

                        div.ecwid-TermsPopup div.ecwid-popup-headLabel {
                            font-size: 24px;
                            line-height: 1.3;
                            margin: 11px 0 14px 0;
                        }

                        div.ecwid-TermsPopup.ecwid-compact-popup div.ecwid-Terms-link {
                            min-width: 100px;
                        }

                        div.ecwid-Terms-link {
                            font-size: 14px;
                            margin-bottom: 8px !important;
                            line-height: 1.3;
                        }

                        table.ecwid-Terms-navigation-table td {
                            display: block;
                        }

                        .ecwid td {
                            display: table-cell;
                            vertical-align: middle;
                        }

                        button.ecwid-popup-closeButton {
                            cursor: pointer;
                            background-size: 8px auto;
                            border: none;
                            width: 18px;
                            height: 18px;
                            margin: 5px 7px;
                            border-radius: 50%;
                            font-size: 12px;
                            padding: 0;
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            z-index: 1000;
                        }
                    </style>
                    <div class="ecwid-popup ecwid-FormPopup ecwid-TermsPopup ec-size ec-size--xxs ec-size--xs ec-size--s ec-size--m ec-size--l ec-size--xl ecwid-responsive-popup ecwid-no-touch ecwid-supports-cssanimations ecwid ecwid-compact-popup">
                        <div class="popupContent">
                            <div class="ecwid-popup-touchLimiter">
                                <table cellspacing="0" cellpadding="0"
                                       class="ecwid-popup-container">
                                    <tbody>
                                    <tr>
                                        <td align="right" style="text-align: right; vertical-align: top;">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="text-align: left; vertical-align: top;">
                                            <div class="ecwid-popup-content">
                                                <table cellspacing="0" cellpadding="0" class="ecwid-popup-contentPanel">
                                                    <tbody>
                                                    <tr>
                                                        <td align="left" style="vertical-align: top;">
                                                            <div class="ecwid-popup-headLabel">Terms and Conditions</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" style="vertical-align: top;">
                                                            <div class="ecwid-TermsPopup-terms">
                                                                <div>
                                                                    <div class="ecwid-Terms-navigation">
                                                                        <table class="ecwid-Terms-navigation-table" cellpadding="0" cellspacing="0">
                                                                            <colgroup>
                                                                                <col>
                                                                            </colgroup>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <div class="ecwid-Terms-link">
                                                                                        <div class="ecwid-Terms-link-title">Widerrufsbelehrung &amp;
                                                                                            Widerrufsformular
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div class="ecwid-Terms-link">
                                                                                        <div class="ecwid-Terms-link-title ecwid-Terms-link-title-selected">
                                                                                            Terms and Conditions
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div class="ecwid-Terms-content" id="ecwid-PrintTerms" style="height: 206px;"><p>
                                                                        Allgemeine Geschäftsbedingungen</p>
                                                                    <p><br><br>§1 Geltungsbereich</p>
                                                                    <p><br><br>Für alle Bestellungen über unseren Online-Shop durch Verbraucher und
                                                                        Unternehmer gelten die nachfolgenden AGB.</p>
                                                                    <p><br><br>Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu
                                                                        Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer
                                                                        selbständigen beruflichen Tätigkeit zugerechnet werden können. Unternehmer ist
                                                                        eine natürliche oder juristische Person oder eine rechtsfähige
                                                                        Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung
                                                                        ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.</p>
                                                                    <p><br><br>Gegenüber Unternehmern gelten diese AGB auch für künftige
                                                                        Geschäftsbeziehungen, ohne dass wir nochmals auf sie hinweisen müssten.
                                                                        Verwendet der Unternehmer entgegenstehende oder ergänzende Allgemeine
                                                                        Geschäftsbedingungen, wird deren Geltung hiermit widersprochen; sie werden nur
                                                                        dann Vertragsbestandteil, wenn wir dem ausdrücklich zugestimmt haben.</p>
                                                                    <p><br><br>§2 Vertragspartner, Vertragsschluss</p>
                                                                    <p><br><br>Der Kaufvertrag kommt zustande mit Schmid, Kevin und Noyon, Jonas GbR.
                                                                    </p>
                                                                    <p><br><br>Die Darstellung der Produkte im Online-Shop stellt kein rechtlich
                                                                        bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Sie
                                                                        können unsere Produkte zunächst unverbindlich in den Warenkorb legen und Ihre
                                                                        Eingaben vor Absenden Ihrer verbindlichen Bestellung jederzeit korrigieren,
                                                                        indem Sie die hierfür im Bestellablauf vorgesehenen und erläuterten
                                                                        Korrekturhilfen nutzen. Durch Anklicken des Bestellbuttons geben Sie eine
                                                                        verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung
                                                                        des Zugangs Ihrer Bestellung erfolgt per E-Mail unmittelbar nach dem Absenden
                                                                        der Bestellung und stellt noch keine Vertragsannahme dar. Wir können Ihre
                                                                        Bestellung durch Versand einer Annahmeerklärung in separater E-Mail oder durch
                                                                        Auslieferung der Ware innerhalb von 2 Tagen annehmen.</p>
                                                                    <p><br><br>Ein bindender Vertrag kann auch bereits zuvor wie folgt zustande
                                                                        kommen:</p>
                                                                    <p><br><br></p>
                                                                    <ul>
                                                                        <li>Wenn Sie Kreditkartenzahlung gewählt haben, kommt der Vertrag zum
                                                                            Zeitpunkt der Kreditkartenbelastung zustande.
                                                                        </li>
                                                                    </ul>
                                                                    <ul>
                                                                        <li>Wenn Sie die Zahlungsart PayPal gewählt haben, kommt der Vertrag zum
                                                                            Zeitpunkt Ihrer Bestätigung der Zahlungsanweisung an PayPal zustande.
                                                                        </li>
                                                                    </ul>
                                                                    <p><br><br>Die Bestellabwicklung und Kontaktaufnahme finden in der Regel per
                                                                        E-Mail und automatisierter Bestellabwicklung statt. Der Kunde hat
                                                                        sicherzustellen, dass die von ihm zur Bestellabwicklung angegebene
                                                                        E-Mail-Adresse zutreffend ist, so dass unter dieser Adresse die vom Verkäufer
                                                                        versandten E-Mails empfangen werden können. Insbesondere hat der Kunde bei dem
                                                                        Einsatz von SPAM-Filtern sicherzustellen, dass alle vom Verkäufer oder von
                                                                        diesem mit der Bestellabwicklung beauftragten Dritten versandten E-Mails
                                                                        zugestellt werden können.</p>
                                                                    <p><br><br>Die für den Vertragsschluss zur Verfügung stehende Sprache ist
                                                                        ausschließlich Deutsch.</p>
                                                                    <p><br><br>Der Kunde kann den Vertragstext vor der Abgabe der Bestellung an den
                                                                        Verkäufer ausdrucken, indem er im letzten Schritt der Bestellung die
                                                                        Druckfunktion seines Browsers nutzt.</p>
                                                                    <p><br><br>Der Verkäufer sendet dem Kunden außerdem eine Bestellbestätigung mit
                                                                        allen Bestelldaten an die von Ihm angegebene E-Mail-Adresse zu. Mit der
                                                                        Bestellbestätigung erhält der Kunde ferner eine Kopie der AGB nebst
                                                                        Widerrufsbelehrung und den Hinweisen zu Versandkosten sowie Liefer- und
                                                                        Zahlungsbedingungen. Sofern Sie sich in unserem Shop registriert haben
                                                                        sollten, können Sie in Ihrem Profilbereich Ihre aufgegebenen Bestellungen
                                                                        einsehen. Darüber hinaus speichern wir den Vertragstext, machen ihn jedoch im
                                                                        Internet nicht zugänglich.</p>
                                                                    <p><br><br></p>
                                                                    <p><br><br>§3 Lieferbedingungen und Preise</p>
                                                                    <p><br><br>Alle Preise, die auf der Website des Verkäufers angegeben sind,
                                                                        verstehen sich einschließlich der jeweils gültigen gesetzlichen Umsatzsteuer.
                                                                    </p>
                                                                    <p><br><br>Zuzüglich zu den angegebenen Produktpreisen kommen gegebenenfalls noch
                                                                        Versandkosten hinzu. Näheres zur Höhe der Versandkosten erfahren Sie bei den
                                                                        Angeboten.</p>
                                                                    <p><br><br>Wir liefern nur im Versandweg.</p>
                                                                    <p><br><br>Die Lieferung von Waren erfolgt auf dem Versandweg an die vom Kunden
                                                                        angegebene Lieferanschrift, sofern nichts anderes vereinbart ist. Bei der
                                                                        Abwicklung der Transaktion ist die in der Bestellabwicklung des Verkäufers
                                                                        angegebene Lieferanschrift maßgeblich. Abweichend hiervon ist bei Auswahl der
                                                                        Zahlungsart PayPal die vom Kunden zum Zeitpunkt der Bezahlung bei PayPal
                                                                        hinterlegte Lieferanschrift maßgeblich.</p>
                                                                    <p><br><br>Sendet das Transportunternehmen die versandte Ware an den Verkäufer
                                                                        zurück, da eine Zustellung beim Kunden nicht möglich war, trägt der Kunde die
                                                                        Kosten für den erfolglosen Versand. Dies gilt nicht, wenn der Kunde sein
                                                                        Widerrufsrecht wirksam ausübt, wenn er den Umstand, der zur Unmöglichkeit der
                                                                        Zustellung geführt hat, nicht zu vertreten hat oder wenn er vorübergehend an
                                                                        der Annahme der angebotenen Leistung verhindert war, es sei denn, dass der
                                                                        Verkäufer ihm die Leistung eine angemessene Zeit vorher angekündigt hatte.</p>
                                                                    <p><br><br>Der Kunde verpflichtet sich sicherzustellen, dass die persönliche
                                                                        Übergabe der Ware bei der von Ihnen angegebene Lieferadresse zum benannten
                                                                        Lieferzeitpunkt möglich ist. Ist die Übergabe nicht möglich, gerät der Kunde
                                                                        in Annahmeverzug.</p>
                                                                    <p><br><br>Wenn die persönliche Übergabe der Ware nicht möglich ist, kann der
                                                                        Vertrag auch durch Zustellung der Ware an einen benachbarten Haushalt oder
                                                                        Betrieb erfüllt werden. Im Moment der Abgabe bei einem benachbarten Haushalt
                                                                        oder Betrieb wird der Kunde Eigentümer der Ware gemäß §§ 929, 854 Abs. 2 BGB.
                                                                    </p>
                                                                    <p><br><br>Ist eine Übergabe an einen benachbarten Haushalt oder Betrieb nicht
                                                                        möglich, kann der Vertrag auch durch Abstellen der Ware an einem Ort im
                                                                        Bereich der Lieferadresse, der für den ausliefernden Fahrer zugänglich ist,
                                                                        erfüllt werden. Soweit ein Abstellen durch den Kunden nicht gewünscht oder ein
                                                                        Abstellen im Bereich der Lieferadresse nicht möglich ist, kann die Erfüllung
                                                                        durch eine Bereitstellung zur Abholung erfolgen. Im Moment des Abstellens bzw.
                                                                        der Bereitstellung zur Abholung der Ware wird der Kunde Eigentümer der Ware
                                                                        gemäß §§ 929, 854 Abs. 2 BGB. Eine Abholung von bereitgestellter Ware muss
                                                                        durch den Kunden noch am Tag des Zustellversuchs geschehen.</p>
                                                                    <p><br><br>Eine Selbstabholung der Ware ist leider nicht möglich.</p>
                                                                    <p><br><br>Wenn das bestellte Produkt nicht verfügbar ist, weil der Verkäufer mit
                                                                        diesem Produkt von seinem Lieferanten ohne eigenes Verschulden nicht beliefert
                                                                        wird, kann der Verkäufer vom Vertrag zurücktreten. In diesem Fall wird der
                                                                        Verkäufer den Kunden unverzüglich informieren und Ihnen ggf. die Lieferung
                                                                        eines vergleichbaren Produktes vorschlagen. Wenn kein vergleichbares Produkt
                                                                        verfügbar ist oder der Kunde keine Lieferung eines vergleichbaren Produktes
                                                                        wünscht, wird der Verkäufer dem Kunden ggf. bereits erbrachte Gegenleistungen
                                                                        unverzüglich erstatten.</p>
                                                                    <p><br><br>Kunden werden über Lieferzeiten und Lieferbeschränkungen (z.B.
                                                                        Beschränkung der Lieferungen auf bestimmten Länder) auf einer gesonderten
                                                                        Informationsseite oder innerhalb der jeweiligen Produktbeschreibung
                                                                        unterrichtet.</p>
                                                                    <p><br><br>§4 Bezahlung</p>
                                                                    <p><br><br>In unserem Shop stehen Ihnen die folgenden Zahlungsarten zur Verfügung:
                                                                    </p>
                                                                    <p><br><br></p>
                                                                    <ul>
                                                                        <li>Kreditkarte</li>
                                                                    </ul>
                                                                    Die Belastung Ihrer Kreditkarte erfolgt mit Abschluss der Bestellung.<p><br><br>
                                                                    </p>
                                                                    <ul>
                                                                        <li>Paypal</li>
                                                                    </ul>
                                                                    Sie bezahlen den Rechnungsbetrag über den Online-Anbieter Paypal. Sie müssen
                                                                    grundsätzlich dort registriert sein bzw. sich erst registrieren, mit Ihren
                                                                    Zugangsdaten legitimieren und die Zahlungsanweisung an uns bestätigen. Weitere
                                                                    Hinweise erhalten Sie beim Bestellvorgang.<p><br><br>Werden Drittanbieter mit der
                                                                        Zahlungsabwicklung beauftragt (z.B. Paypal) gelten deren Allgemeine
                                                                        Geschäftsbedingungen neben unseren.</p>
                                                                    <p><br><br><br>§5 Widerrufsrecht</p>
                                                                    <p><br><br>Verbrauchern steht das gesetzliche Widerrufsrecht wie in der
                                                                        Widerrufsbelehrung beschrieben zu. Unternehmern wird kein freiwilliges
                                                                        Widerrufsrecht eingeräumt.</p>
                                                                    <p><br><br>§6 Transportschäden</p>
                                                                    <p><br><br>Werden Waren mit offensichtlichen Transportschäden angeliefert, so
                                                                        reklamieren Sie solche Fehler bitte möglichst sofort beim Zusteller und nehmen
                                                                        Sie bitte unverzüglich Kontakt zu uns auf. Die Versäumung einer Reklamation
                                                                        oder Kontaktaufnahme hat für Ihre gesetzlichen Ansprüche und deren
                                                                        Durchsetzung, insbesondere Ihre Gewährleistungsrechte keinerlei Konsequenzen.
                                                                        Sie helfen uns aber, unsere eigenen Ansprüche gegenüber dem Frachtführer bzw.
                                                                        Transportversicherung geltend machen zu können.</p>
                                                                    <p><br><br>§7 Sachmängelgewährleistung und Garantie</p>
                                                                    <p><br><br>1. Die Gewährleistung bestimmt sich nach gesetzlichen Vorschriften.<br>2.
                                                                        Der Kunde ist gehalten, die Ware bei Entgegennahme auf offensichtliche Mängel
                                                                        zu untersuchen und uns unverzüglich über diese zu informieren.<br>3. Für den
                                                                        Fall, dass wir die geschuldete Leistung aufgrund höherer Gewalt nicht
                                                                        erbringen können, sind wir für die Dauer der Hinderung von der
                                                                        Leistungspflicht befreit, und Sie zum Rücktritt vom Vertrag berechtigt.<br>4.
                                                                        Eine Garantie besteht bei den vom Verkäufer gelieferten Waren nur, wenn diese
                                                                        ausdrücklich abgegeben wurde. Kunden werden über die Garantiebedingungen vor
                                                                        der Einleitung des Bestellvorgangs informiert.§8 Sachmängelgewährleistung und
                                                                        Garantie</p>
                                                                    <p><br><br>§8. Haftung, Schadensersatz &amp; Obliegenheiten des Bestellers</p>
                                                                    <p><br><br>1. Soweit sich nachstehend nichts anderes ergibt, sind über die
                                                                        gesetzlichen Gewährleistungsrechte hinausgehende Ansprüche des Auftraggebers,
                                                                        gleich aus welchen Rechtsgründen, ausgeschlossen, soweit der Schaden durch uns
                                                                        nicht vorsätzlich oder grob fahrlässig verursacht wurde. Insbesondere haften
                                                                        wir nicht für entgangenen Gewinn oder sonstige Vermögensschäden des Kunden.
                                                                        Dies gilt nicht, soweit es sich um die schuldhafte Verletzung wesentlicher
                                                                        Vertragspflichten handelt, deren Einhaltung zur Erreichung des Vertragszweckes
                                                                        unbedingt geboten ist. Haften wir wegen leicht fahrlässiger Verletzung
                                                                        wesentlicher Vertragspflichten, so ist die Ersatzpflicht für Sachschäden der
                                                                        Höhe nach auf jene Schäden beschränkt, mit deren Eintritt das Unternehmen bei
                                                                        Vertragsschluss vernünftigerweise rechnen musste.<br>2. Ferner haftet der
                                                                        Verkäufer für die leicht fahrlässige Verletzung von wesentlichen Pflichten,
                                                                        deren Verletzung die Erreichung des Vertragszwecks gefährdet, oder für die
                                                                        Verletzung von Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des
                                                                        Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Kunde
                                                                        regelmäßig vertraut. In diesem Fall haftet der Verkäufer jedoch nur für den
                                                                        vorhersehbaren, vertragstypischen Schaden. Der Verkäufer haftet nicht für die
                                                                        leicht fahrlässige Verletzung anderer als der in den vorstehenden Sätzen
                                                                        genannten Pflichten.<br>3. Vorstehende Haftungsbeschränkung gelten im gleichen
                                                                        Umfang für unsere Erfüllungs- oder Verrichtungsgehilfen.<br>4. Für die auf
                                                                        unserer Website befindlichen Berechnungstabellen (Kalorienbedarfsberechnung,
                                                                        etc.) sowie entsprechender Verweise, können wir hinsichtlich Inhalt,
                                                                        Vollständigkeit und Richtigkeit keine Garantie und / oder Haftung
                                                                        übernehmen.<br>5. Der Besteller ist verpflichtet Produkt, Verzehr – und
                                                                        Warnhinweise zu gelieferten Produkten vor Verwendung sorgfältig zu lesen und
                                                                        zu beachten.</p>
                                                                    <p><br><br>§9 Gerichtsstand, Anwendbares Recht, Vertragssprache</p>
                                                                    <p><br><br>1. Gerichtstand und Erfüllungsort ist der Sitz des Verkäufers, wenn der
                                                                        Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
                                                                        öffentlich-rechtliches Sondervermögen ist.<br>2. Vertragssprache ist
                                                                        deutsch.<br>3. Nebenabreden bestehen nicht.<br>4. Sollte eine Bestimmung in
                                                                        diesen Geschäftsbedingungen oder eine Bestimmung im Rahmen sonstiger
                                                                        Vereinbarungen unwirksam sein oder werden, so wird hiervon die Wirksamkeit
                                                                        aller sonstigen Bestimmungen oder Vereinbarungen nicht berührt. In diesem Fall
                                                                        wird die unwirksame Klausel durch eine wirksame Klausel ersetzt, die der
                                                                        unwirksamen Klausel wirtschaftlich am nächsten kommt. Dies gilt auch für den
                                                                        Fall der Regelungslücke.</p>
                                                                    <p><br><br>§10 Schlussbestimmungen</p>
                                                                    <p><br><br>Sind Sie Unternehmer, dann gilt deutsches Recht unter Ausschluss des
                                                                        UN-Kaufrechts.</p>
                                                                    <p><br><br>Sind Sie Kaufmann im Sinne des Handelsgesetzbuches, juristische Person
                                                                        des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist
                                                                        ausschließlicher Gerichtsstand für alle Streitigkeiten aus
                                                                        Vertragsverhältnissen zwischen uns und Ihnen unser Geschäftssitz.</p></div>
                                                                <div class="ecwid-TermsPrint-enabled hidden">
                                                                    <a onclick="window.print();" class="btn btn-primary ecwid-TermsPrint-link"
                                                                       href="javascript:;"><i class="fa
                                                                                                         fa-print"></i> Print</a></div>
                                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="vertical-align: top;">
                                            <div></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="vertical-align: top;"><img
                                                    src="https://d1q3axnfhmyveb.cloudfront.net/static/br/26.5-43638-gbf1bb8af9cb/8CB9E57BEDDE62E4F67DEB6E19F5308C.cache.png"
                                                    width="20" height="20" class="ecwid-SpacerImage"
                                                    style="display: block; height: 20px; width: 20px;"></td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="vertical-align: top;">
                                            <table cellspacing="0" cellpadding="0" class="ecwid-popup-buttonsPanel"
                                                   style="margin-top: -8px;">
                                                <tbody>
                                                <tr>
                                                    <td align="left" style="vertical-align: top;">
                                                        <button data-dismiss="modal" type="button" class=" btn
                                                                        btn-success
                                                                                              ecwid-btn ecwid-btn--secondary accept-btn
                                                                                              ecwid-btn--terms_popup_button ecwid-btn--secondary-inverse"
                                                                aria-label="Accept All">Accept All
                                                        </button>
                                                    </td>
                                                    <td align="left" style="vertical-align: top;"><img
                                                                src="https://d1q3axnfhmyveb.cloudfront.net/static/br/26.5-43638-gbf1bb8af9cb/8CB9E57BEDDE62E4F67DEB6E19F5308C.cache.png"
                                                                width="28" height="28" class="ecwid-SpacerImage"
                                                                style="display: block; height: 28px; width: 28px;"></td>
                                                    <td align="left" style="vertical-align: top;">
                                                        <button type="button"
                                                                class="ecwid-btn btn btn-danger ecwid-btn--secondary
                                                                                ecwid-btn--terms_popup_button"
                                                                aria-label="Decline">Decline
                                                        </button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </td>
                            </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
    <?php echo Notify::render(); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('styles'); ?>
<?php $__env->stopSection(); ?>



<?php $__env->startSection('scripts'); ?>
    <script type="text/javascript">
        $('.input-number').on('change', function () {
            var mealId = $(this).data('id');
            var price = $(this).data('price');
            var qty = $(this).val();
            $.ajax({
                url: "<?php echo e(route('updateCart')); ?>",
                method: "post",
                data: {'_token': '<?php echo e(csrf_token()); ?>', mealId: mealId, qty: qty, price: price},
                success: function (response) {
                    if (response.status == 200) {
                        updateCart(response, mealId);
                        toastr.success('Qty Added Successfully', 'Cart  Updated', {timeOut: 2000})

                    }
                }
            });
        });
        $('#do-checkout').on('click', function (event) {
            var term = $('#tearm');

            if ($(term).prop("checked") == true) {

                if (parseInt($('#cartTotal > b').html()) < 25) {

                    $('#myModal').modal('show');

                } else {
                    window.location.replace($(this).attr("data-link"));


                }

            }
            else if ($(term).prop("checked") == false) {

                toastr.success('Terms and Conditions ', 'You must agree terms and conditions', {timeOut: 2000})


            }


        });
        $('.accept-btn').on('click', function () {
            $('#tearm').prop("checked", true);


        });

        function updateCart(response, id) {

            var cart = response.cart;
            var type = response.meal_type;
            var shippingTax = parseFloat("<?php echo e($siteOptions->shipping_tax); ?>");
            var vatTax = parseFloat("<?php echo e($siteOptions->vat_tax); ?>");
            var drinkVatTax = parseFloat("<?php echo e($siteOptions->drink_vat_tax); ?>");
            if (type == '2') {
                vatTax = drinkVatTax / 100;

            } else {
                vatTax = vatTax / 100;

            }

            $('#vatTax').html('<b>&#8364; ' + parseFloat((cart.total * vatTax) + (shippingTax * vatTax)).toFixed(2) + '</b>');
            $('#itemTotal').html('<b>&#8364; ' + parseFloat(cart.total).toFixed(2) + '</b>');
            $('.singleTotal' + id).html('<b>&#8364; ' + parseFloat(parseInt(cart[id].qty) * ((parseFloat(cart[id].price) * vatTax) + parseFloat(cart[id].price))).toFixed(2) + '</b>');
            var cartTotal = (shippingTax + (shippingTax * vatTax)) + ((cart.total * vatTax) + cart.total);
            $('#cartTotal').html('<b>&#8364; ' + parseFloat(cartTotal).toFixed(2) + '</b>');
        }

        // Removing meal from cart
        $('.remove-cart').on('click', function (e) {
            var mealId = $(this).data('id');
            $.ajax({
                url: "<?php echo e(route('updateCart')); ?>",
                method: "post",
                data: {'_token': '<?php echo e(csrf_token()); ?>', mealId: mealId},
                success: function (response) {
                    if (response.status == 200) {
                        window.location.reload()
                    }
                    toastr.success('Item Removed Successfully', 'Cart  Updated', {timeOut: 2000})

                }
            });
        });


        // Applying coupon
        $('.apply-coupon').on('click', function () {
            var coupon = $('.coupon_code').val();

            if(coupon == ''){
                return false;
            }
            $.ajax({
                url: "<?php echo e(route('applyCoupon')); ?>",
                method: "post",
                data: {'_token': '<?php echo e(csrf_token()); ?>', coupon: coupon},
                success: function (response) {
                    console.log(response.success);
                    if (response.success == '1') {

                        window.location.reload();

                    } else {

                        toastr.error(response.msg,'Coupon', {timeOut: 2000})

                    }


                }
            });
        });
    </script>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('frontend.layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>