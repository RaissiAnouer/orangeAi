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
        $conversation=Auth::user()->conversation()->latest()->get();
        if(!$conversation) return response()->json(['success'=>false,'conversation'=>[]]);
        
        
        return response()->json(['success'=>true,'conversation'=>$conversation]);
        
    }
    public function show($id){
        $user=Auth::user();
        $conversation=$user->conversation()->find($id);
        if(!$conversation) return response()->json(['success'=>false,'message'=>'conversation doesn\'t exist']);
        return response()->json(['success'=>true,"chat"=>$conversation->chat]);
    }

    public function destroy($id){
        $conversation=Auth::user()->conversation()->find($id);
        $conversation->delete();
        return response()->json(['success'=>true,"message"=>'conversation deleted successfully']);
    }
    

}
