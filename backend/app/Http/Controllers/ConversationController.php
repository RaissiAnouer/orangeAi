<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function newConversation(Request $request){
        $userId=auth::User()->id;
        $data=[
        'title'=>$request->title,
        'user_id'=>];
        Conversation::create($title);
    }

}
