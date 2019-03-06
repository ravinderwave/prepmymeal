<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Option;
use App\User;
use Auth;

/**
 * Class DashboardController
 * @package App\Http\Controllers
 */
class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return Response
     */
    public function index()
    {
        return view('backend.dashboard');
    }

    /**
     * Show logged-in user's profile.
     *
     * @return Response
     */
    public function profile()
    {

    }

    /**
     * Update Profile data.
     *
     * @return Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Show settings.
     *
     * @return Response
     */
    public function settings()
    {
        $option = Option::first();
        return view('backend.settings')->withOption($option);
    }

    /**
     * Store settings.
     *
     * @return Response
     */
    public function storesettings(Request $request)
    {
        $option = Option::first();
        $option->email = $request->webEmail;
        $option->phone = $request->webMobile;
        $option->facebook = $request->facebook;
        $option->twitter = $request->twitter;
        $option->linkedin = $request->linkedin;
        $option->googlePlus = $request->googlePlus;
        $option->youtube = $request->youtube;
        $option->instagram = $request->instagram;
        $option->flickr = $request->flickr;
        $option->vimeo = $request->vimeo;
        $option->telegram = $request->telegram;
        $option->verifyTag = $request->verifyTag;
        $option->googleAnalytics = $request->googleAnalytics;
        $option->chatLink = $request->chatLink;
        $option->shipping_tax = $request->shippingTax;
        $option->vat_tax = $request->vatTax;
        $option->drink_vat_tax = $request->drinkVatTax;
        $option->ups_email = $request->upsEmail;
        $option->kitchen_email = $request->kitchenEmail;
        $option->marketing_email = $request->marketingEmail;
        $option->save();

        return redirect()->route('settings');
    }    

}
