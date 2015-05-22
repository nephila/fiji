/* exported fiji */
function fiji(context) {
    for (var key in context) {
        if (typeof(context[key]) === "object") {
            for (var map in context[key]) {
                console.log(context[key][map]);
                if (context[key][map] === Number) {
                    context[key] = Number(map);
                } else if (context[key][map] === Object) {
                    context[key] = JSON.parse(map);
                } else if (context[key][map] === Array) {
                    context[key] = JSON.parse(map);
                } else {
                    context[key] = context[key][map](map);
                }
            }
        }
    }
    return {
        run: function(fn) {
            fn(context);
        }
    };
}