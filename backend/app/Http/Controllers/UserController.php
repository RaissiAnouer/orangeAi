<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUser($id)
    {
        $user=User::findOrFail($id);
        return response()->json($user,200);
    }   

    public function register(Request $request)
    {
        $validatedData=$request->validate([
            "name"=>"required|string|max:255|min:2",
            "email"=>"required|email|max:250",
            "password"=>"required|string|confirmed"
        ]);
        $validatedData["password"]=Hash::make($validatedData["password"]);
        $user=User::create($validatedData);
        
        return response()->json(['success'=>true,'message'=>'user created successfully'],201);
    }
    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email','password'))) 
            return response()->json(['success'=>false,'message'=>'email adress or the password is wrong'],401);
        $user=Auth::user();
        $token=$user->createToken('token')->plainTextToken;
        return response()->json(['success'=>true,'message'=>'Login successful!','token'=>$token]);
    }

    public function googleLogin(Request $request)
    {
        if($request->state ==="login"){
            $userEmail=$request->UserData['email'];
            $user=User::where("email",$userEmail)->firstOrFail();
            $token=$user->createToken('token')->plainTextToken;
            return response()->json(['success'=>true,'message'=>'login successful!','token'=>$token]);}
        else {
            $validatedData=([
                'name'=>$request->UserData['name'],
                'email'=>$request->UserData['email'],
                'password'=>Hash::make(Str::password(12))
            ]);
            $user=User::create($validatedData);
            return response()->json(['success'=>true,'message'=>'user created successfully'],201);
            
        }
    }
}
