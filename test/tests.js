module("fiji");

test( "init test", function( assert ) {
    var f = fiji({
        plain: "text"
    });
    assert.equal( typeof(f.run), "function", "Return callable function" );
});

test( "target function called", function( assert ) {
    var called = assert.async();
    function main(context) {
        assert.equal(context.plain, "text", "Target function is called.");
        called();
    };
    fiji({
        plain: "text"
    }).run(main);
});

test( "parse plain", function( assert ) {
    var called = assert.async();
    function main(context) {
        assert.equal(
            context.plain_text, "plain text",
            "Plain string remains plain string."
        );
        assert.equal(
            context.plain_number, 1,
            "Plain number remains plain number."
        );
        assert.equal(
            context.plain_object.type, "plain object",
            "Plain object remains plain object."
        );
        called();
    };
    fiji({
        plain_text: "plain text",
        plain_number: 1,
        plain_object: {"type": "plain object"},
    }).run(main);
});
