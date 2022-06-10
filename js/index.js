var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        $(document).addEventListener("deviceready", this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        //callNativeFunction();
        $("#capture-btn").click(function () {
            var element = $("#root");
            html2canvas(element, {
                onrendered: function (canvas) {
                    var dataURL = canvas.toDataURL();
                    $("#screenshotimg").src = dataURL;
                },
            });
        }, false);

        $("#email-btn").click(function () {
            var imgData = $("#screenshotimg").src;
            cordova.plugins.email.isAvailable(function (isAvailable) {
                cordova.plugins.email.open({
                    to: "",
                    cc: "",
                    bcc: [],
                    subject: "",
                    //attachments: imgData,
                    body: '<img src="' + imgData + '">',
                });
            });
        }, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {},
};

app.initialize();
