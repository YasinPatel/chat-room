<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="{{ asset('css/app.css')}}" rel="stylesheet" type="text/css">
        <style media="screen">
          .list-group{
            overflow-y: scroll;
            height: 200px;
          }
        </style>
    </head>
    <body>
      <div class="container">
        <div class="row" id="app">
          <div class="offset-4 col-4">
            <li class="list-group-item active">Chat Room</li>
            <div class="badge badge-pill badge-primary">
              @{{typing}}
            </div>
            <ul class="list-group " v-chat-scroll>
              <message
                v-for="value,index in chat.message"
                :key=value.index
                :color=chat.color[index]
                :user=chat.user[index]
                :time=chat.time[index]
              >
              @{{ value}}
              </message>
            </ul>
            <input type="text" class="form-control" placeholder="Type.." v-model="message" @keyup.enter='send'>
          </div>
        </div>
      </div>


      <script src="{{ asset('js/app.js') }} ">
      </script>
    </body>
</html>
