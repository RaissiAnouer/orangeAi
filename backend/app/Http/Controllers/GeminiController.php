<?php

namespace App\Http\Controllers;

use App\Models\Chat;
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
    $outputText="No reply";
    if(!empty($reply['candidates'])){
        $candidate = $reply['candidates'][0];
        if(!empty($candidate['content']['parts'])){
            $outputText=$candidate['content']['parts'][0]['text'] ?? 'No reply';
        }
    }
    if($request->id){
    $data=['userMessage'=>$userMessage,
    'aiMessage'=>$outputText,
    'conversation_id'=>$request->conversation_id];
    Chat::create($data);
    }
    return response()->json(['success'=>true,'reply'=> $outputText]);
    }
}