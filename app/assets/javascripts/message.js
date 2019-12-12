$(function(){

  function buildHTML(message){

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
      
      $('.main__chat-main__message-list').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.main__chat-main__message-list').animate({ scrollTop: $('.main__chat-main__message-list')[0].scrollHeight});

    })
    
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});
