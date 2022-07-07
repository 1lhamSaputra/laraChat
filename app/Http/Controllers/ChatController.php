<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    //
    public function chat(){
        return view('welcome');
    }

    public function send(Request $request){
        $user = User::find(Auth::id());
        event(new ChatEvent($request->message, $user));
    }
}