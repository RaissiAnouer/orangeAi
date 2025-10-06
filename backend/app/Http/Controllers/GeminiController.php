<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeminiController extends Controller
{
    public function chat(Request $request)
    {
        $userMessage=$request->input("message");

        $response=Http::withHeaders([
            'Content-Type'=>'application/json',
            'X-goog-api-key'=>env('GEMINI_API_KEY'),
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',[
        'contents'=>[
            [
                'parts'=>[
                    ['text'=>$userMessage]
                ]
            ]
        ]
    ]);
    if($response->failed()){
        return response()->json(['error'=>'something went wrong'],500);
    }
    $reply = $response->json();
    $outputText = $reply['candidates'][0]['content'][0]['text']?? 'No reply';
    return response()->json(['reply'=> $outputText]);


    }
}
