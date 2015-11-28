# Whatsapp-Chatbot

Fun and simple to setup WhatsApp chatbot!

How to run:

   git clone https://github.com/TeamFreeHugs/Whatsapp-Chatbot.git
   cd Whatsapp-Chatbot
   npm install -d
   node bin/www
   
That loads up the getaround for CSP. Now for the chatbot itself:

Load up [`http://web.whatsapp.com`](http://web.whatsapp.com)

Open up JS console, and paste in the contents of `WhatsappUtils.js`. Or, you can save it as a userscript that injects it into page load.

`WhatsappUtils.js` will load up the WhatsApp API and it's dependencies. Now, just paste in the contents of `WhatsappBot.js` into the console.

Done!

Fun fact:

To get around CSP and CORS, do this:

    requestSomething({
        url: 'http://some-website-that-does-not-have-cors.com/',
        callback: function (data) {
            console.log(data);
        }
    });
    
To perform other requests, do this:

    requestSomething({
        url: 'http://some-website-that-does-not-have-cors.com/',
        callback: function (data) {
            console.log(data);
        },
        method: 'POST'
    });

An example:

    requestSomething({
        url: 'http://example.com/',
        callback: function (data) {
            console.log(data);
        }
    });
    
And you can see the contents of `example.com`!