<?php

namespace App\Http\Controllers\frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Customer;
use Validator;
use Session;
use Auth;
use Mail;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Check if session exist
        if (Auth::guard('customer')->check()) {
            return redirect()->route('customer.dashboard');
        }

        return view('frontend.auth.login');
    }

    /**
     * Perform login for the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Check if session exist
        if (Auth::guard('customer')->check()) {
            return redirect()->route('customer.dashboard');
        }

        $this->validate($request,[
            'email' => 'required|exists:customers,email',
            'password' => 'required'
        ]);
        // Attempt to log the user in
        if (Auth::guard('customer')->attempt(['email' => $request->email, 'password' => $request->password])) {
            // if successful, then redirect to their intended location
            return redirect()->route('customer.dashboard');
        }
        else
        {
            return view('frontend.auth.login')->with('errorMessage','Email or Password is Incorrect !'); 
        }
        // if unsuccessful, then redirect back to the login with the form data
        return redirect()->back()->withInput($request->only('email'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Check if session exist
        if (Auth::guard('customer')->check()) {
            return redirect()->route('customer.dashboard');
        }

        $this->validate($request,[
            'username' => 'required',
            'phone' => 'required|numeric|digits:10',
            'email' => 'required|unique:customers,email',
            'password' => 'required|min:6'
        ]);

        $customer = new Customer;
        $customer->username = $request->username;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->email_verified_at = '';
        $customer->password = bcrypt($request->password);
        $customer->save();
        
        // Send the verify email verification to customer
        //$this->sendMail(array('username'=>$customer->username,'email'=>$customer->email));

        return redirect()->back()->with('message','Registered successfully!.'); 
    }

    /**
     * Logout the specified user.
     *
     */
    public function logout()
    {
        Session::flush();
        Auth::guard('customer')->logout();
        return redirect('/');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function sendMail($data)
    {
        $mailData = array('username'=>$data['username'],'token'=>base64_encode($data['email']));
        Mail::send('frontend.auth.email',$data, function ($message) use ($data) {
            $message->subject('Verify your account');
            $message->from(env('MAIL_USERNAME'));
            $message->to($data['email']);
        });
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function verifyToken($token)
    {
        $email = base64_decode($token);
        $customer = Customer::where('email',$email)->find();
        if(!empty($customer)){
            return view('frontend.auth.thanku')->with('message','Account verified successfully!. Please login now');
        }else{
            return view('frontend.auth.thanku')->with('errorMessage','Invalid Token !');
        }
    }
}
