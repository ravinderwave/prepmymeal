<?php

namespace App\Http\Controllers\frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Customer;
use App\Address;
use App\Order;
use Auth;

class CustomerController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:customer');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customer = Customer::find(Auth::guard('customer')->user()->id);


        return view('frontend.account.profile')->withCustomer($customer);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addresses()
    {


        $address = Address::where('customer_id', Auth::guard('customer')->user()->id)->get();
        return view('frontend.account.addresses')->withAddresses($address);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function singleAddress(Request $request)
    {
        $address = Address::find($request->id);
        return response()->json($address);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function orders()
    {
        //
        $myOrders = Order::where('customer_id', Auth::guard('customer')->user()->id)->with(['ordersMeals', 'address'])->get();

        return view('frontend.account.orderList', compact('myOrders'));


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function payments()
    {
        //

        return view('frontend.account.payment');


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function updateProfile(Request $request)
    {
        $this->validate($request, [
            'phone' => 'required|numeric|digits:10'
        ]);

        $customer = Customer::find(Auth::guard('customer')->user()->id);
        $customer->name = $request->name;
        $customer->username = $request->username;
        $customer->phone = $request->phone;
        $customer->save();
        return redirect()->back()->with('message', 'Profile updated successfully');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request)
    {
        $this->validate($request, [
            'password' => 'min:6|different:oldPassword',
        ]);

        $customer = Customer::find(Auth::guard('customer')->user()->id);
        $customer->password = bcrypt($request->password);
        $customer->save();
        return redirect()->back()->with('message', 'Password updated successfully');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function addAddress(Request $request)
    {
        $this->validate($request, [
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required|numeric',
        ]);

        $address = ($request->has('id')) ? Address::find($request->id) : new Address;
        if (!$request->has('id'))
            $address->customer_id = Auth::guard('customer')->user()->id;
        $address->address = $request->address;
        $address->city = $request->city;
        $address->state = $request->state;
        $address->zip = $request->zip;
        $address->save();
        return response()->json(['message' => 'Address added successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    public function recurringstop(Request $request){
        $this->validate($request, [
            'subscription' => 'required'
        ]);
        $customer_id = Auth::guard('customer')->user()->id;
        
        $customer = Customer::find($customer_id);
        
        try{
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            
            $date = date('Y-m-d H:i:s');
            $subscription = \DB::table('subscriptions')->where('customer_id', $customer->id)->where('stripe_id', $request->subscription)->where('status', 'active')->first();
            //print_r($subscriptions);die;
            if(isset($subscription)){
                $plan = \Stripe\Plan::retrieve($subscription->stripe_plan);
                
                $product = $plan->product;
                
                $data = $plan->delete();
                
                if($data->deleted == 'true'){
                    
                    $product = \Stripe\Product::retrieve($product);
                    $del_product = $product->delete();
                    
                    if($del_product->deleted == 'true'){
                
                        $sub = \Stripe\Subscription::retrieve($subscription->stripe_id);    
                        $result = $sub->cancel();  

                        if($result->status == 'canceled'){
                            $update = \DB::table('subscriptions')->where('stripe_id', $result->id)->update(array('status' => $result->status, 'ends_at' => $date));
                        }else{
                            return redirect()->back()->with('message', 'Please try again');
                        } 
                    }else{
                        return redirect()->back()->with('message', 'Please try again');
                    }
                }else{
                    return redirect()->back()->with('message', 'Please try again');
                }
            }
        } catch (Exception $ex) {
            dd($e->getMessage());
        }
        return redirect()->back()->with('message', 'Subscription cancelled successfully');
    }
}
