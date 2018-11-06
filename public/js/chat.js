
var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);        
    }
};

socket.on('connect', function () {
    params = getJsonFromUrl(window.location.search);
    
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');            
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});            

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('newLocationMessage', function (message) {
    var template = jQuery('#message-location-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('#message-input');

    if (messageTextbox.val()) {
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function () {
            messageTextbox.val('');
        });   
    }
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  
  locationButton.prop('disabled', true).text('Sending Location...');
 
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.prop('disabled', false).text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function () {
    });
  }, function () {
    locationButton.prop('disabled', false).text('Send Location');
    alert('Unable to fetch location.');
  });
});
