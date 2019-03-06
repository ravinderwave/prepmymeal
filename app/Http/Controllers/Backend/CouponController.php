<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Coupon;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $coupons = Coupon::all();
        return view('backend.coupons.index')->withCoupons($coupons);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.coupons.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {




        $coupon = new Coupon;
        $coupon->username = $request->username;
        $coupon->code = $request->code;
        $coupon->discount_type = $request->type;
        $coupon->discount = $request->discount;
        $coupon->valid_till = $request->valid_till;
        $coupon->save();

        return redirect()->route('coupons.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Coupon $coupon)
    {
        if ($coupon->status=='1'){
            $coupon->status='0';
        }else{
            $coupon->status='1';
        }
        $coupon->save();
        return redirect()->route('coupons.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Coupon $coupon)
    {
        return view('backend.coupons.edit')->withCoupon($coupon);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Coupon $coupon)
    {
        $this->validate($request,[
            'username' => 'required',
            'code' => 'required',
            'discount' => 'required|numeric|gt:0',
            'valid_till' => 'required|date_format:"Y-m-d"',
        ]);

        $coupon->username = $request->username;
        $coupon->code = $request->code;
        $coupon->discount_type = $request->type;
        $coupon->discount = $request->discount;
        $coupon->valid_till = $request->valid_till;
        $coupon->save();

        return redirect()->route('coupons.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return redirect()->route('coupons.index');
    }
}
