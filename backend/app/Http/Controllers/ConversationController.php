<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function store(Request $request){
        $userId=Auth::user()->id;
        $validatedData= $request->validate([
            "title"=>"required|string"]);
        $data=[
        'title'=>$validatedData['title'],
        'user_id'=>$userId];
        $conversation=Conversation::create($data);
        return response()->json(['success'=>true,'conversation_id'=>$conversation->id]);
    }
    public function index(){
        $conversation=Auth::user()->conversation()->orderBy('created_at' ,'desc')->get();
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
    
    public function rename(Request $request,$id){
        $validatedData=$request->validate(['title'=>'string|required']);
        $conversation=Auth::user()->conversation()->findOrFail($id);
        $conversation->update($validatedData);
        return response()->json(['success'=>true,'conversation'=>$conversation]);
    }

}
