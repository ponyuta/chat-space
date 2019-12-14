$(function(){

  

  

  function buildHTML(message){

    if (message.image) {
      var html = 
      `<div class="main__chat-main__message-list-box-box1" data-message-id="${message.id}">
        <div class="main__chat-main__message-list-box-box1-minibox">
          <div class="main__chat-main__message-list-box-box1-minibox-name">
            ${ message.user_name }
          </div>
          <div class="main__chat-main__message-list-box-box1-minibox-date">
            ${ message.created_at}
          </div>
        </div>
        <div class="main__chat-main__message-list-box-box1-content">
          <p class="main__chat-main__message-list-box-box1-content-p">
            ${ message.content }
          </p>
          <img class="lower-message__image" src="${message.image}" alt="Hero img">
        </div>
      </div>`
       
    } else {
      var html = 
      `<div class="main__chat-main__message-list-box-box1" data-message-id="${message.id}">
        <div class="main__chat-main__message-list-box-box1-minibox">
          <div class="main__chat-main__message-list-box-box1-minibox-name">
            ${ message.user_name }
          </div>
          <div class="main__chat-main__message-list-box-box1-minibox-date">
            ${ message.created_at}
          </div>
        </div>
        <div class="main__chat-main__message-list-box-box1-content">
          <p class="main__chat-main__message-list-box-box1-content-p">
            ${ message.content }
          </p>
        </div>
      </div>`
      
    }
    return html
  }

  

  $( "#new_message" ).on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      
      var html = buildHTML(data);
      
      $('.main__chat-main__message-list-box').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.main__chat-main__message-list').animate({ scrollTop: $('.main__chat-main__message-list')[0].scrollHeight});

    })
    
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      
      last_message_id = $('.main__chat-main__message-list-box-box1').last().data("message-id");
      
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        
          if(messages.length > 0){
            var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main__chat-main__message-list-box').append(insertHTML);
        $('.main__chat-main__message-list').animate({scrollTop: $('.main__chat-main__message-list')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function() {
        
      });
    }
  };
  setInterval(reloadMessages, 7000);
});

