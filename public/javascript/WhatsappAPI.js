function ChatError(message) {
    this.name = 'ChatError';
    this.message = message || '';
}

ChatError.prototype = Error.prototype;

function init() {
    if (typeof jQuery === 'undefined') {
        var jQueryScript = document.createElement('script');
        jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
        document.head.appendChild(jQueryScript);
    }

    return {
        messageHandlers: [],
        attachElements: {},
        isWatching: false,
        messageWatcher: null,
        //Used to track who sent the message.
        lastSender: '',
        reload: function () {
            this.attachElements.messageContentBox = jQuery('div.input');
            this.attachElements.messagesDiv = jQuery('.message-list');
            if (this.attachElements.messageContentBox.length === 0) {
                throw new ChatError('Can\'t find input box!')
            }
            if (this.attachElements.messagesDiv.length === 0) {
                throw new ChatError('Can\'t find messages box');
            }
            this.attachElements.userTitle = jQuery('h2.chat-title > span:nth-child(1)');
            if (this.attachElements.userTitle.length === 0) {
                throw new ChatError('Can\'t find user name');
            }
            return this;
        }, sendMessage: function (text, force) {
            this.reload();

            if (text === undefined || text === null) {
                throw new ChatError('Empty message to send!');
            }
            if (typeof text === 'string')
                if (text === '')
                    throw new ChatError('Empty message to send!');
            if (this.attachElements.messageContentBox.text().trim() !== '' && !force) {
                throw new ChatError('Input box isn\'t empty!');
            }
            this.attachElements.messageContentBox.text(text);
            window.InputEvent = window.Event || window.InputEvent;
            //noinspection JSCheckFunctionSignatures
            var event = new InputEvent('input', {bubbles: true});
            this.attachElements.messageContentBox[0].dispatchEvent(event);
            var sendButton = jQuery('button.icon.btn-icon.icon-send.send-container');
            sendButton.click();
            return this;
        }, sendImage: function (imageURL) {
            this.reload();
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var image = new Image();
            image.setAttribute('crossOrigin', 'anonymous');
            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, image.width, image.height);
                canvas.width(function (blob) {
                    //noinspection JSClosureCompilerSyntax
                    var event = new Event('drop');
                    var uri = new URI(imageURL);
                    var file = new File([blob], 'upload.' + uri.path.substr(uri.path.lastIndexOf('.') + 1), {type: 'image/' + (uri.path.substr(uri.path.lastIndexOf('.') + 1))});

                });
            };
            image.src = imageURL;

            return this;
        }, attachHandler: function (handler) {
            this.reload();
            this.messageHandlers.push(handler);
            return this;
        }, startWatching: function () {
            if (this.isWatching)
                throw new ChatError('Already watching');
            this.reload();
            var watcher = this.attachElements.messagesDiv;
            var handlers = this.messageHandlers;
            this.messageWatcher = new MutationObserver(function (mutations) {
                    var mutation = mutations[mutations.length - 1];
                    if (mutation.addedNodes.length != 0) {
                        var latestMessageElement = jQuery(watcher[0].children[watcher[0].children.length - 1].querySelector('.message .bubble.bubble-text .message-text span.selectable-text'));
                        if (latestMessageElement.length === 0)
                            return;
                        var isIncoming = latestMessageElement.parent().parent().parent().hasClass('message-in');
                        for (var p1 = 0; p1 < handlers.length; p1++) {
                            var handlerNew = handlers[p1]['newMessage'];
                            if (handlerNew !== undefined && handlerNew !== null) {
                                var html = jQuery('<div>').html(latestMessageElement.html())[0];
                                var outputHTML = '';
                                for (var i = 0; i < html.childNodes.length; i++) {
                                    var node = html.childNodes[i];
                                    if (node.nodeType === 3) {
                                        outputHTML += node.textContent;
                                    } else if (node.nodeType === 1) {
                                        if (node.tagName === 'IMG') {
                                            outputHTML += node.alt;
                                        }
                                        else {
                                            console.warn('Unknown tag ' + node.tagName.toLowerCase() + '! Please report this on the github repo (https://github.com/TeamFreeHugs/Whatsapp-Chatbot/issues/new) if it isn\'t already reported. Please copy the following in your report: ');
                                            var errorMessage = 'Title: Error while processing message due to unknown tag name.\n';
                                            errorMessage += 'Body:\n';
                                            errorMessage += 'Tag: `<' + node.tagName.toLowerCase();
                                            for (var key in node.attributes) {
                                                if (node.attributes.hasOwnProperty(key))
                                                    errorMessage += ' ' + node.attributes[key].name + '="' + node.attributes[key].value + '"';
                                            }
                                            errorMessage += '>`\n';
                                            errorMessage += 'Inner HTML: \n\n';
                                            var innerHTML = node.innerHTML;
                                            console.warn(errorMessage);
                                        }
                                    }
                                }
                                var sender;
                                if (isIncoming) {
                                    sender = null;
                                } else {
                                    if (latestMessageElement.find('div > div > h3 > span > span.text-clickable > span').length === 0)
                                        sender = this.lastSender;
                                    else {
                                        sender = latestMessageElement.find('div > div > h3 > span > span.text-clickable > span').text();
                                        this.lastSender = sender;
                                    }
                                }
                                handlerNew(outputHTML, isIncoming, sender);
                            }
                        }
                    } else if (mutation.removedNodes.length != 0) {
                        for (var p2 = 0; p2 < handlers.length; p2++) {
                            var handlerDel = handlers[p2]['deletedMessage'];
                            if (handlerDel !== undefined && handlerDel !== null) {
                                handlerDel(mutation.removedNodes[0].children[0].querySelector('.message .bubble.bubble-text .message-text span.selectable-text').innerHTML);
                            }
                        }
                    }
                }
            );
            this.messageWatcher.observe(jQuery(this.attachElements.messagesDiv)[0], {childList: true});
            for (var p = 0; p < this.messageHandlers.length; p++) {
                var handler = this.messageHandlers[p];
                if (typeof handler.bot_start !== 'undefined') {
                    handler.bot_start();
                }
            }
            this.isWatching = true;
            return this;
        }, stopWatching: function () {
            this.messageWatcher.disconnect();
            this.messageWatcher = null;
            this.isWatching = false;
            return this;
        }, getCurrentUser: function () {
            this.reload();
            return this.attachElements.userTitle.text();
        }, getAllUsers: function () {
            this.reload();
            var usersRaw = jQuery('div.chat-status:nth-child(2) > span:nth-child(1)').attr('title');
            if (typeof usersRaw === 'undefined') {
                return [this.getCurrentUser()];
            } else {
                var users = usersRaw.replace(/, /, ',').split(/,/);
                users.splice(users.length - 1, 1);
                return users.map(function (e) {
                    return e.trim().replace(/^\+\d+ /, '')
                });
            }
        }
    }.reload();
}