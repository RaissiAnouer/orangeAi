<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function newConversation(Request $request){
        $userId=Auth::user()->id;
        $data=[
        'title'=>$request->title,
        'user_id'=>$userId];
        Conversation::create($data);
    }

}
