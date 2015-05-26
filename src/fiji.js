/* exported fiji */

function createResult(ok, error, parameter, value) {
    return {
        ok: ok,
        error: error,
        parameter: parameter,
        value: value
    };
}

function printError(parseResult) {
    console.log(
        "%c[" + parseResult.parameter + "] ERROR ",
        "background: #000; color: #00FF00"
    );
    console.log(parseResult.error);
    console.log(
        "%c[" + parseResult.parameter + "] CURRENT VALUE ",
        "background: #000; color: #00FF00"
    );
    console.log(parseResult.value);
    console.log("\n");
}

function parseNumber(context, key, map) {
    if (context[key][map] === Number) {
        try {
            context[key] = Number(map);
        } catch(err) {
            return createResult(false, err, key, map);
        }
        return createResult(true);
    } else {
        return createResult(false);
    }
}

function parseObject(context, key, map) {
    if (context[key][map] === Object) {
        try {
            context[key] = JSON.parse(map);
        } catch(err) {
            return createResult(false, err, key, map);
        }
        return createResult(true);
    } else {
        return createResult(false);
    }
}

function parseArray(context, key, map) {
    if (context[key][map] === Array) {
        try {
            context[key] = JSON.parse(map);
        } catch(err) {
            return createResult(false, err, key, map);
        }
        return createResult(true);
    } else {
        return createResult(false);
    }
}

function parsePlain(context, key, map) {
    if (typeof(context[key][map]) === "function") {
        context[key] = context[key][map](map);
        return createResult(true);
    } else {
        return createResult(false);
    }
}

function fiji(context) {
    var parsers = [parseNumber, parseObject, parseArray, parsePlain];
    var parseResult;
    for (var key in context) {
        if (typeof(context[key]) === "object") {
            for (var map in context[key]) {
                for (var i = 0 ; i < parsers.length ; i++) {
                    parseResult = parsers[i](context, key, map);
                    if (parseResult.ok) {
                        break;
                    } else if (parseResult.error) {
                        printError(parseResult);
                    }
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