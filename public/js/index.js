var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');            
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
});

socket.on('newLocationMessage', function (message) {
    var template = jQuery('#message-location-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    jQuery('#messages').append(html);
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
