<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function store(Request $request){
        $userId=Auth::user()->id;
        $data=[
        'title'=>$request->title,
        'user_id'=>$userId];
        $conversation=Conversation::create($data);
        return response()->json(['success'=>true,'conversation_id'=>$conversation->id]);
    }
    public function index(){
        $conversation=Auth::user()->conversation;
        if(!$conversation) return response()->json(['success'=>false,'conversation'=>[]]);
        return response()->json(['success'=>true,'conversation'=>$conversation]);
        
    }


    public function getConversation($id){
        $user=Auth::user();
        $conversation=$user->conversation()->findOrFail($id);
        if(!$conversation) return response()->json(['success'=>false,'message'=>'conversation doesn\'t exist']);
        return response()->json(['success'=>true,$conversation->chat]);
    }

}
