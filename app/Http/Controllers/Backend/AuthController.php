<?php
namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Auth;

class AuthController extends Controller
{
    
    public function index()
    {
        return view('backend.login');
    }    

    public function login(Request $request)
    {
        $this->validate($request,[
            'username' => 'required|exists:users,username',
            'password' => 'required'
        ]);
        $username=$request->input('username');
        $password=$request->input('password');
        if (Auth::attempt(['username' => $username, 'password' => $password]))
        {
            $user = Auth::user();
            $request->session()->put('id', $user->id);
            $request->session()->put('email', $user->email);
            $request->session()->put('role', $user->role);
            $request->session()->put('username', $user->username);
            return redirect()->intended('/backend');
        }
        else
        {
            return view('backend.login')->with('message','Username or Password is Incorrect !'); 
        }
        return back()->withInput();
    }

    public function logout()
    {
        Auth::logout();
        session()->flush();
        return redirect('/backend');
    }
}
