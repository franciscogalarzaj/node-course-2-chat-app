var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');            
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});            

socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formatedTime}: ${message.text}`);
    
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    
    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
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
