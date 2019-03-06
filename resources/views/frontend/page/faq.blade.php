@extends('frontend.layouts.app')

@section('title','FAQ || PrepMyMeal')
@section('mdesc','foodspring® - Premium Fitness Food &amp; Sportnahrung | Qualität Made in Germany | Alles was du für dein Training und einen gesunden Lifestyle brauchst')
@section('mkey','Proteine, Eiweiss, Proteinshake, Muskelaufbau, Training, Fitness, Sportnahrung')

@section('content')

    <section class="">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="item "><img src="{{ asset('assets/frontend/img/13.jpg') }}" alt="Los Angeles" style="width:100%;"></div>
        </div>
    </section>
    <section class="main-tow main-six main-space">
        <div class="container">
            <div class="two ">
                <div class="heading faq">
                    <p> Häufig gestellte Fragen
                    </p>
                </div>


                <section class="accordion-section clearfix mt-3" aria-label="Question Accordions">
                    <div class="container">
                        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading0">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse0"
                                           aria-expanded="true" aria-controls="collapse0">
                                            Q: Wie lange sind die Gerichte haltbar ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse0" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading0">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Die Gerichte werden nach der Bestellung frisch gekocht. Nach der Zustellung sind die Gerichte bei
                                            Kühlschranktemperatur mindestens 5 Tage haltbar.
                                            Es ist jedoch auch problemlos möglich, die Gerichte einzufrieren.</p>

                                    </div>
                                </div>
                            </div>

                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading1">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse1"
                                           aria-expanded="true" aria-controls="collapse1">
                                            Q: Kann ich die Verpackungsmaterialien zurücksenden ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading1">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Damit wir den Abfall so gering wie möglich halten, recyceln wir mit deiner Hilfe die
                                            Versandmaterialien.
                                            Nach deiner zweiten Bestellung kannst du kostenlos die Versandmaterialien zu uns zurücksenden. Diese
                                            kannst du einfach dem UPS Boten mitgeben oder in einen UPS Store bringen.
                                            Schreibe uns dazu eine E-Mail an info@prepmymeal.de und wir generieren dir ein kostenloses
                                            Retourenlabel..</p>
                                    </div>
                                </div>
                            </div>

                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading2">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse2"
                                           aria-expanded="true" aria-controls="collapse2">
                                            Q: Wie funktioniert das Aufwärmen ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading2">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Die Gerichte können in der Mikrowelle, Pfanne oder im Dampfgarer aufgewärmt werden.
                                            Wir empfehlen das Essen für ca. 3-4 Minuten in der Mikrowelle bei ca. 700W zu erwärmen. Bis auf den
                                            Soßenbehälter ist die Verpackung mikrowellentauglich.
                                            Wenn es schnell gehen muss, kannst du die Gerichte auch mit gutem Gewissen kalt verzehren..</p>
                                    </div>
                                </div>
                            </div>

                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading3">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse3"
                                           aria-expanded="true" aria-controls="collapse3">
                                            Q: Kann ich die Verpackungsmaterialien zurücksenden ?

                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading3">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Damit wir den Abfall so gering wie möglich halten, recyceln wir mit deiner Hilfe die
                                            Versandmaterialien.
                                            Nach deiner zweiten Bestellung kannst du kostenlos die Versandmaterialien zu uns zurücksenden. Diese
                                            kannst du einfach dem UPS Boten mitgeben oder in einen UPS Store bringen.
                                            Schreibe uns dazu eine E-Mail an info@prepmymeal.de und wir generieren dir ein kostenloses
                                            Retourenlabel..</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading4">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse4"
                                           aria-expanded="true" aria-controls="collapse4">
                                            Q: Was passiert, wenn ich bei der Lieferung nicht anwesend bin ?

                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading4">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Falls du bei unserer Tageslieferung zwischen 10-12 Uhr nicht Zuhause bist, wird dein prepmymeal-Paket
                                            in einen naheliegenden UPS-Store gebracht. Dort kannst du es jeder Zeit abholen. Bedenke aber, dass es
                                            sich um frische Lebensmittel handelt. Hole es daher noch am selben Tag oder spätestens am nächsten Morgen
                                            in dem UPS Store ab, damit die Kühlkette nicht unterbrochen wird..</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading5">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse5"
                                           aria-expanded="true" aria-controls="collapse5">
                                            Q: Wohin liefert prepmymeal ?

                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading5">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Wir liefern deutschlandweit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading5">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse5"
                                           aria-expanded="true" aria-controls="collapse5">
                                            Q: Wann liefert prepmymeal ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading5">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Am Ende deiner Bestellung kannst du deinen gewünschten Liefertag flexibel auswählen.

                                            Wir liefern an folgenden Tagen:

                                            Dienstag 10-12 Uhr

                                            Mittwoch 10-12 Uhr

                                            Donnerstag 10-12 Uhr .
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading6">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse6"
                                           aria-expanded="true" aria-controls="collapse6">
                                            Q: Wie liefert prepmymeal ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading6">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Wir liefern deutschlandweit mit UPS Express. So ermöglichen wir dir eine möglichst kurze Lieferzeit
                                            und du hast die Garantie, dass dein Essen während des Transports gekühlt und frisch bleibt.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading7">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse7"
                                           aria-expanded="true" aria-controls="collapse7">
                                            Q: Versandkosten ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading7">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Die Versandkosten liegen bei 5,99 €.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading8">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse8"
                                           aria-expanded="true" aria-controls="collapse8">
                                            Q: Werden Konservierungs- oder Farbstoffe verwendet ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse8" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading8">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Nein, wir verwenden nur natürliche Zutaten, ganz nach unserem Motto: "eat clean".
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading9">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse9"
                                           aria-expanded="true" aria-controls="collapse9">
                                            Q: Woher stammen eure Zutaten ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse9" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading9">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Wir verwenden ausschließlich frische Zutaten und qualitativ hochwertiges Fleisch aus deutscher
                                            artgerechter Tierhaltung. Zum größten Teil werden unsere Zutaten aus regionaler Herkunft bezogen. Das
                                            Ergebnis ist eine gesunde und qualitativ hochwertige Mahlzeit mit hervorragendem Geschmack..
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading10">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse10"
                                           aria-expanded="true" aria-controls="collapse10">
                                            Q: Sind die Meals auch für Allergiker geeignet ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse10" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading10">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Ja, die Gerichte eignen sich hervorragend für Allergiker. Mit unserem 4-Komponenten Konzept weißt du
                                            immer genau was in den Gerichten steckt. Lediglich die Soßen sollten bei bestehender Allergie vorher
                                            geprüft werden. Gegebenenfalls können diese problemlos weggelassen werden.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading11">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse11"
                                           aria-expanded="true" aria-controls="collapse11">
                                            Q: Wie ist die Kühlung während des Transportes ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse11" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading11">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Unsere zertifizierten Kühlpakete garantieren dir während des Transports eine optimale Kühlung. Wir
                                            verwenden eine ökologische Strohisolierung in Kombination mit Kühlelementen, damit dein Essen während dem
                                            Transport gekühlt und frisch bleibt..
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading12">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse12"
                                           aria-expanded="true" aria-controls="collapse12">
                                            Q: Wie kann ich ein Partner werden ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse12" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading12">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Unsere zertifizierten Kühlpakete garantieren dir während des Transports eine optimale Kühlung. Wir
                                            verwenden eine ökologische Strohisolierung in Kombination mit Kühlelementen, damit dein Essen während dem
                                            Transport gekühlt und frisch bleibt..
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading p-3 mb-3" role="tab" id="heading13">
                                    <h3 class="panel-title">
                                        <a class="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse13"
                                           aria-expanded="true" aria-controls="collapse13">
                                            Q: Unternehmenslieferungen ?
                                        </a>
                                    </h3>
                                </div>
                                <div id="collapse13" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading13">
                                    <div class="panel-body px-3 mb-4">
                                        <p> Ans: Wir beliefern regelmäßig Unternehmen für Seminare, Workshops und sonstige Events.
                                            Du hättest auch gerne die Gerichte für dein Unternehmen? Schreibe uns eine E-Mail an info@prepmymeal.de
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

            </div>
        </div>
    </section>

@endsection