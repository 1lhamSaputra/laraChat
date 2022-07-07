<?php

namespace App\Listeners;

use App\Events\ChatEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChatListener implements ShouldBroadcast
{
    public $message;
    public $user;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct($message, User $user)
    {
        //
        $this->message = $message;
        $this->user = $user;
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ChatEvent  $event
     * @return void
     */
    public function handle(ChatEvent $event)
    {
        //
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }
}
