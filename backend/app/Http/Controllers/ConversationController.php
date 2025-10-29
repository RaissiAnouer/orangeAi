<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function newConversation(Request $request){
        $title=$request->title;
        Conversation::create($title);
    }

}
