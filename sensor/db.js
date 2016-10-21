var db = {

    get: function (collection, f) {
        console.log("GET");
        $.ajax({
            url: base + database + "/collections/" + collection + "?apiKey=" + apiKey,
            type: "GET",
            success: function(data) {
                f(data);
            },
            error: function(msg) {
                console.log(msg['status']);
                console.log(msg['responseText']);
            }
        });
    },

    insert: function (collection, data) {
        console.log("INSERT");
        $.ajax({
            url: base + database + "/collections/" + collection + "?apiKey=" + apiKey,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(msg) {
                console.log(msg)
            },
            error: function(msg) {
                console.log(msg['status']);
                console.log(msg['responseText']);
            }
        });
    }

}
