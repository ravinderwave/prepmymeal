<?php

return [

	// The default gateway to use
	'default' => 'paypal',

	// Add in each gateway here
	'gateways' => [
		'paypal' => [
			'driver'  => 'PaypalRest',
			'options' => [
                'client_id' =>env('PAYPAL_CLIENT_ID',''),
                'secret' => env('PAYPAL_SECRET',''),
                /**
                 * Available option 'sandbox' or 'live'
                 */
                'testMode' => env('PAYPAL_MODE','sandbox'),
				'solutionType'   => '',
				'landingPage'    => 'https://github.com/ignited/laravel-omnipay',
				'headerImageUrl' => ''
			]
		]
	]

];