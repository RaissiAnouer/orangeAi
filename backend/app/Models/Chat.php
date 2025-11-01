<?php

namespace App\Models;

use App\Models\Conversation;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable=['conversation_id','userMessage','aiMessage'];
    
    public function conversation(){
        return $this->belongsTo(Conversation::class);
    }
    
}
