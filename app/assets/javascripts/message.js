$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = 
      `<div class="main__chat-main__message-list-box-minibox">
        <div class="main__chat-main__message-list-box-minibox-name">
        ${ message.user_name }
        </div>
        <div class="main__chat-main__message-list-box-minibox-date">
        ${ message.created_at}
        </div>
      </div>
        <div class="main__chat-main__message-list-box">
          <p class="main__chat-main__message-list-box">
          ${ message.content }
          </p>
          <img class="lower-message__image" src="${message.image}" alt="Hero img">
        </div>`
      // var html = 
      // <p class="main__chat-main__message-list-box"></p>
      //メッセージに画像が含まれる場合のHTMLを作る} 
    } else {
      var html = 
      `<div class="main__chat-main__message-list-box-minibox">
        <div class="main__chat-main__message-list-box-minibox-name">
        ${ message.user_name }
        </div>
        <div class="main__chat-main__message-list-box-minibox-date">
        ${ message.created_at}
        </div>
      </div>
        <div class="main__chat-main__message-list-box">
          <p class="main__chat-main__message-list-box">
          ${ message.content }
          </p>
        </div>`
      //メッセージに画像が含まれない場合のHTMLを作る
    }
    return html
  }

  

  $( "#new_message" ).on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      // console.log(data);
      // console.log(data);
      var html = buildHTML(data);
      // console.log(html);
      $('.main__chat-main__message-list').append(html);
      $('#message_content').val('');
      $('.form__submit').prop('disabled', false);
      $('.main__chat-main__message-list').animate({ scrollTop: $('.main__chat-main__message-list')[0].scrollHeight});

    })
    
      // ①postの中身を確認
      // ②buildHTMLという関数を呼び出す（引数にはpostをセット）
      // ③②の処理を何か変数に入れる
      // ④appendメソッドを調べ、③の変数を適切なクラスにappendする

    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});
