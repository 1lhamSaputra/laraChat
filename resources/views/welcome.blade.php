<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .list-group {
            overflow-y: scroll;
            height: 200px;
        }
    </style>
</head>

<body>
    <div id="app">
        <div class="container">
            <div class="row">
                <div>
                    <li class="list-group-item active" aria-current="true">Chat Room</li>
                    <ul class="list-group" v-chat-scroll>
                        <message v-for="value in chat.message" :key=value.index color='warning'>@{{ value }}</message>
                    </ul>
                    <input type="text" class="form-control" placeholder="Type your message..." v-model="message" @keyup.enter="send()">
                </div>
            </div>
        </div>
    </div>
</body>
<script src="{{ asset('js/app.js') }}"></script>

</html>
