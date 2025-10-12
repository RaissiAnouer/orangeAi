<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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
        return response()->json(['message'=>'user created successfully'],201);
    }
    public function login(Request $request)
    {
        //
    }
}
