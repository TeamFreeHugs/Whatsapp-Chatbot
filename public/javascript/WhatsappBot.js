var killTypes = ['$1 was murdered',
    'Voldermort (aka Shadow Wizard) used Avada Kedavra on $1', '$1 disappeared for no reason',
    '$1 played too much Minecraft and got eaten by a zombie', '$1 sleeps with the fishes',
    '$1 has been entered into a Death Note', '$1 was accidentally decapitated in an old factory',
    'A noose appeared around $1\'s neck and he tripped and fell off a cliff', 'An axe fell on $1\'s head.',
    'in\u0252z\u0258m\u0252\u042f.A.M poured trifluoromethanesulfonic acid on $1'];


var lickingWords = ['happily', 'sadly', 'madly', 'crazily', 'like a mad dog'];

var aliveMessages = ['Duh', 'Of course', 'Wat du u think?', 'Mmmm', 'Punches $1', 'what u want', 'its okay'];

var quoterNames = ['Isaac\'s Mom', 'Jaimmie', 'Isaac'];

var quotes = {
    'Isaac\'s Mom': ['its okay', 'what u want', 'is this a joke', 'no lol', 'LOL NO'],
    'Jaimmie': ['Hi doggie', 'Lol ok?', 'Bruh, nice imagination', 'But theres no axe on my head?', 'Lol k', 'Woof woof'],
    'Isaac': ['Tell me', 'STOP STALKING PEOPLE', 'I am On my way!']
};

var staringTypes = ['\u0ca0_\u0ca0', '\u10da(\u0ca0\u76ca\u0ca0\u10da)',
    '(\u2022_\u2022)=\u03b5/\u0335\u0347\u033f\u033f/"\u033f"\u033f \u033f',
    '(\u30ce\u0ca0\u76ca\u0ca0)\u30ce\u5f61\u253b\u2501\u253b',
    '\u10da(\u0ca0\u76ca\u0ca0)=\u03b5/\u0335\u0347\u033f\u033f/"\u033f"\u033f \u033f',
    '\ud83d\udc73\ud83d\udce1 \ud83d\udce3\ud83d\udc6e'];

var emojis = ['\u2615\ud83c\udf5d\ud83c\udf71'];

var foodTypes = ['\ud83c\udf82', '\ud83c\udf5c', '\ud83c\udf72', '\ud83c\udf73', '\ud83c\udf71',
    '\ud83c\udf5d', '\ud83c\udf75', '\u2615', '\ud83c\udf5f', '\ud83c\udf54', '\ud83c\udf55',
    '\ud83c\udf63', '\ud83c\udf64', '\ud83c\udf65'];

var handlers = {};

var helpTexts = {
    lick: {
        short: 'Lick the floor',
        long: 'Licks the floor.\n Syntax: "..lick"'
    }, echo: {
        short: 'Echos args',
        long: 'Echos back the provided arguments.\n Syntax: "..echo to echo"'
    }, kill: {
        short: 'Kills someone',
        long: 'Kills someone in a few fun ways.\n Syntax: "..kill somenoe"'
    }, randRange: {
        short: 'Random number in a range',
        long: 'Generates a random number in the provided range.\n Syntax: "..randRange start end"'
    }, help: {
        short: 'Um duh',
        long: 'You still don\'t get the help command? *Sigh*\n Syntax: "..help some_command long|short"'
    }, eval: {
        short: 'Evaluates something in JavaScript',
        long: 'Evaluates something in JavaScript, using a masked eval call.\n Syntax: "..eval something"'
    }, wat: {
        short: 'Quotes something from Isaac\'s mom.',
        long: 'Really you don\'t get it? Syntax: "..wat"'
    }, wut: {
        short: 'Same as wat',
        long: 'Still same as wat.\n Syntax: "..wut"'
    }, coffee: {
        short: 'Brews coffee',
        long: 'Free cup of coffee for you\n Syntax: "..coffee"'
    }, quote: {
        short: 'Quotes something from some random people',
        long: 'Picks a random quote from one of this people: ' + quoterNames.slice(0, quoterNames.length - 1).join(', ') + ' or ' + quoterNames[quoterNames.length - 1] + '\n Syntax: "..quote"'
    }, alive: {
        short: 'Alive?',
        long: 'Checks if bot is alive.\n Syntax: "..alive"'
    }, beer: {
        short: 'Beer',
        long: 'Brews a mug of beer for you.\n Syntax: "..beer"'
    }, blame: {
        short: 'Blames someone',
        long: 'Someone broke your coffee machine, I heard.\n Syntax: "..blame"'
    }, cook: {
        short: 'Cooks food with person',
        long: 'Cooks the thing provided with some random foods.\n Syntax: "..cook something"'
    }, emoji: {
        short: 'Random emoji from a list',
        long: 'Random emoji from a list\n Syntax: "..emoji"'
    }, '.emoji': {
        short: 'Moar random emoji',
        long: 'But this time, it\'s from all the whatsapp emojis.\n Syntax: "...emoji"'
    }, facepalm: {
        short: 'Facepalm',
        long: '*Facepalm* YOU DON\'T GET ME???????\n Syntax: "..facepalm"'
    }, hug: {
        short: 'Hugs',
        long: 'Moar free hugz\n Syntax: "..hug someone"'
    }, numberRange: {
        short: 'Numbers in a range.',
        long: 'Numbers in the provided range, in a nice list.\n Syntax: "..numberRange start end"'
    }, polish: {
        short: 'Polishes something belonging to you',
        long: 'Still polishes something belonging to you.\n Syntax: "..polish something"'
    }, randColor: {
        short: 'Random nice color',
        long: 'Random nice color from "http://www.colorpicker.com/color-chart/".\n Syntax: "..randColor"\n Do note that on first run, it may be a bit slow.'
    }, randbool: {
        short: 'Random boolean',
        long: 'Can\'t choose if to kill ex-gf (Or enemy) or not? Use this!\n Syntax: "..randbool"'
    }, splitRegex: {
        short: 'Splits a regex and a string',
        long: 'Splits a regex and a string. Regex or string may not be longer than 100 chars.\n Syntax: \'..splitRegex /regexp/ "test string"\''
    }, stare: {
        short: 'Staring emoji',
        long: 'Stares at group forever.\n Syntax: "..stare"'
    }, tea: {
        short: 'Brews tea for you',
        long: 'However, only ingredients are provided!\n Syntax: "..tea"'
    }, '.polish': {
        short: 'Polishes something',
        long: 'Polishes something. Anything.\n Syntax: "...polish something"'
    }, commands: {
        short: 'All command',
        long: 'Lists all commands.\n Syntax: "..commands"'
    }
};

if (typeof whatsapp !== 'undefined')
    delete whatsapp;

window.whatsapp = initWhatsappAPI();

whatsapp.attachHandler({
    newMessage: function (text) {
        if (text.startsWith('..')) {
            console.log('Command!');
            var command = text.substr(2).split(' ')[0];
            var args = text.substr(3 + command.length);
            var handler = handlers[command];
            if (typeof handler === 'function') {
                try {
                    handler(args);
                } catch (e) {
                    whatsapp.sendMessage('500 Internal Server Error; An error occurred while processing the command');
                    console.log(e);
                }
            } else {
                whatsapp.sendMessage('Command "' + command + '" is unknown. ', true);
            }
        }
        //},
        //deletedMessage: function (text) {
        //    whatsapp.sendMessage('Lol message deleted. Contents: "' + text + '"', true);
        //}, bot_start: function () {
        //    whatsapp.sendMessage('Bot started.', true);
    }
});

handlers.lick = function () {
    whatsapp.sendMessage('Licks floor ' + lickingWords[randNum(0, lickingWords.length - 1)]);
};

handlers.echo = function (args) {
    if (args === '')
        whatsapp.sendMessage('Nothing to echo!', true);
    else
        whatsapp.sendMessage(args, true);
};

handlers.kill = function (args) {
    whatsapp.sendMessage(killTypes[Math.floor(Math.random() * (killTypes.length + 1))].replace(/\$1/g, args));
};

window.randNum = function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

handlers.randRange = function (args) {
    var parts = args.split(' ');
    if (parts.length < 2) {
        whatsapp.sendMessage(Math.random());
        return;
    }
    var max = parseInt(parts[1]),
        min = parseInt(parts[0]);
    whatsapp.sendMessage(randNum(min, max));
};

handlers.help = function (args) {
    if (!args.trim()) {
        whatsapp.sendMessage('Hi. I\'m Uni*\'s chatbot, ported to whatsapp, writted in JS.', true);
        return;
    }
    var parts = args.split(' ');
    if (parts.length === 1) {
        parts[1] = 'short';
    }

    if (!parts[1]) {
        parts[1] = 'short';
    }
    parts[0] = parts[0].toLowerCase();
    parts[1] = parts[1].toLowerCase();
    if (parts[1] !== 'short' && parts[1] !== 'long') {
        parts[1] = 'short';
    }

    if (!helpTexts[parts[0]])
        whatsapp.sendMessage('No help entry found for "' + parts[0] + '"');
    else {
        whatsapp.sendMessage(helpTexts[parts[0]][parts[1]]);
    }
};

handlers.eval = function (args) {
    if (args.trim() === '') {
        whatsapp.sendMessage('Syntax: ..eval (thing_to_eval)', true);
        return;
    }
    if (args.match(/\w+\.prototype.+/) != null) {
        whatsapp.sendMessage('Looks like you\'re trying to access the prototype of some object! This is disabled for security reasons.', true);
        return;
    }

    var mask = {};
    for (var p in this) { //noinspection JSUnfilteredForInLoop
        if (typeof this[p] === 'object')
            if (this.hasOwnProperty(p))
                mask[p] = undefined;
    }
    mask.JSON = JSON;
    try {
        whatsapp.sendMessage('"' + new Function('with(this) { return ' + args + '}').call(mask) + '"', true);
        console.log('"' + new Function('with(this) { return ' + args + '}').call(mask) + '"');
    } catch (e) {
        console.log(e);
        if (e instanceof ChatError) {
            whatsapp.sendMessage('<Empty response for ' + args + '>', true);
        } else
            whatsapp.sendMessage(e.name + ': ' + e.message)
    }
};

handlers.wat = function () {
    whatsapp.sendMessage('Wat u want? (Quoted from Isaac\'s Mom)', true);
};

handlers.wut = handlers.wat;

handlers.coffee = function () {
    whatsapp.sendMessage('Passes coffee to ' + whatsapp.getCurrentUser());
};

handlers.quote = function () {
    var quoters = [];
    for (var quoter in quotes) {
        if (quotes.hasOwnProperty(quoter))
            quoters.push(quoter);
    }
    var randomQuoter = quoters[randNum(0, quoters.length - 1 - 1)];
    var quote = '> ' + quotes[randomQuoter][randNum(0, quotes[randomQuoter].length - 1)] + '\n' +
        'By ' + randomQuoter;
    whatsapp.sendMessage(quote)
};

handlers.alive = function (a, b, c) {
    var usersWithoutPhoneNumber = whatsapp.getAllUsers().filter(function (e) {
        return e.match(/[89]\d{3} ?\d{4}/);
    });
    usersWithoutPhoneNumber.push(whatsapp.getCurrentUser().trim());
    whatsapp.sendMessage(aliveMessages[randNum(0, aliveMessages.length - 1)].replace(/\$1/, usersWithoutPhoneNumber[randNum(0, usersWithoutPhoneNumber.length - 1)]));
};

handlers.facepalm = function () {
    whatsapp.sendMessage('Facepalm', true);
};

handlers.stare = function () {
    whatsapp.sendMessage(staringTypes[randNum(0, aliveMessages.length - 1)])
};

handlers.randbool = function () {
    whatsapp.sendMessage(randNum(0, 2) === 1);
};

handlers.numberRange = function (args) {
    var parts = args.split(' ');
    if (parts.length < 2) {
        whatsapp.sendMessage('Syntax: ..numberRange start end', true);
        return;
    }
    var result = [];
    try {
        var start = parseInt(parts[0]);
        var end = parseInt(parts[1]);
    } catch (e) {
        whatsapp.sendMessage('Syntax: ..numberRange start end', true);
    }
    for (var i = start; i <= end; i++) {
        result[i] = i;
    }
    result = result.filter(function (e) {
        return typeof e !== 'undefined'
    });
    whatsapp.sendMessage('[ ' + result.join(', ') + ' ]', true);
};

handlers.polish = function (args) {
    if (args === '') {
        whatsapp.sendMessage('Polishes ' + whatsapp.getCurrentUser());
        return;
    }
    whatsapp.sendMessage('Polishes ' + whatsapp.getCurrentUser() + '\'s ' + args);
};

handlers['.polish'] = function (args) {
    if (args === '') {
        whatsapp.sendMessage('Polishes ' + whatsapp.getCurrentUser());
        return;
    }
    whatsapp.sendMessage('Polishes ' + args);
};

handlers.beer = function () {
    whatsapp.sendMessage('Brews beer for ' + whatsapp.getCurrentUser())
};

handlers.tea = function () {
    whatsapp.sendMessage('Throws teabag on ' + whatsapp.getCurrentUser());
    whatsapp.sendMessage('Throws boiling hot water on ' + whatsapp.getCurrentUser())
};

handlers.emoji = function () {
    whatsapp.sendMessage(emojis[randNum(0, emojis.length - 1)]);
};

handlers['.emoji'] = function () {
    jQuery('.icon-smiley').click();
    var emojiTabs = jQuery('button.menu-item').not('.active');
    var randomTab = jQuery(emojiTabs[randNum(1, emojiTabs.length - 1)]);
    randomTab.click();
    var tabEmojis = jQuery('.emoji-panel-body div:nth-child(1)');
    var emoji = tabEmojis.children()[randNum(0, tabEmojis.children().length)];
    emoji.click();

    jQuery('button.icon:nth-child(3)').click()
};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

handlers.cook = function (args) {
    if (args === '') {
        whatsapp.sendMessage('Syntax: ..cook something', true);
        return;
    }
    var cookWith = shuffle(foodTypes).filter(function (e, i) {
        return i < 5;
    }).join('');
    whatsapp.sendMessage('Cooks ' + args + ' with ' + cookWith);

};

handlers.blame = function (args) {
    var usersParsed = whatsapp.getAllUsers();
    usersParsed.push('the blamer');
    var blame = usersParsed[randNum(0, usersParsed.length - 1)];
    whatsapp.sendMessage('It\'s ' + blame + '\'s fault!', true);
};

handlers.hug = function (args, isIn, sender) {
    if (args === '') {
        whatsapp.sendMessage('Hugs ' + sender);
    } else {
        whatsapp.sendMessage('Hugs ' + args);
    }
};

var colorPickerDoc = null;

handlers.randColor = function () {
    function getColor() {
        var c = colorPickerDoc.querySelectorAll('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr');
        c.forEach = Array.prototype.forEach;
        var colors = [];
        c.forEach(function (e) {
            colors.push(e);
        });
        colors.splice(0, 1);
        var message = 'Random color:\nName: ';
        var colorNode = colors[randNum(0, colors.length - 1)];
        message += colorNode.childNodes[1].textContent;
        message += '\nHex Color: ';
        message += colorNode.childNodes[2].textContent;
        console.log(message);
        whatsapp.sendMessage(message);
    }

    if (!colorPickerDoc)
        whatsappUtils.requestSomething({
            url: 'http://www.colorpicker.com/color-chart/',
            callback: function (data) {
                colorPickerDoc = new DOMParser().parseFromString(data, 'text/html');
                getColor();
            }
        });
    else {
        getColor();
    }
};

handlers.splitRegex = function (args) {
    var parts = args.split(/\/(.+)\/(g?m?i?) (".*")/).filter(function (e) {
        return !!e
    });
    if (parts.length === 0) {
        whatsapp.sendMessage('No match!');
        return;
    }
    if (!parts[parts.length - 1]) {
        whatsapp.sendMessage('No match!');
        return;
    }
    var test = parts[parts.length - 1].replace(/^"(.*)"$/, '$1');
    if (parts[0].length > 100) {
        whatsapp.sendMessage('Test string is too long!');
        return;
    }
    if (parts[0].length > 100) {
        whatsapp.sendMessage('Regex is too long!');
        return;
    }

    var regex;
    try {
        new RegExp(parts[0]);
    } catch (e) {
        whatsapp.sendMessage('Invalid regex!');
        return;
    }
    if (parts.length === 3)
        regex = new RegExp(parts[0], parts[1]);
    else
        regex = new RegExp(parts[0]);
    var regexParts = test.split(regex).filter(function (e) {
        return !!e
    });
    console.log(regexParts);
    if (!regexParts)
        whatsapp.sendMessage('No match!');
    else
        whatsapp.sendMessage(regexParts.join(', '));
};

handlers.commands = function () {
    var msg = 'Commands: "';
    var commands = [];
    for (var c in handlers) {
        if (handlers.hasOwnProperty(c)) {
            commands.push(c);
        }
    }
    commands.sort();
    msg += commands.join('", "') + '"\n\n';
    msg += 'Use "..help command long|short" to find out more about a command.';
    whatsapp.sendMessage(msg);
};

if (!whatsapp.isWatching)
    whatsapp.startWatching();

//Change chat group hack
// TBI: Put this as part of the API itself. For now, just do this.

//var roomWatcher = new MutationObserver(function (mutations) {
//    var active = $('.active.chat');
//    console.info("Room switched? Selected room: " + active.find('.chat-body .chat-main .chat-title span').attr('title'));
//    whatsapp.stopWatching().startWatching();
//});
//
//roomWatcher.observe($('.infinite-list-viewport')[0], {childList: true, subtree: true});