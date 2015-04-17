import Ember from 'ember';

export default Ember.Controller.extend({
    init: function() {
        this._super();
        window.addEventListener("message", this, false);
    },

    appName: null,

    showModuleNav: true,

    navData: Ember.A([{"label":"hello"}]),

    handleEvent: function(event) {
        var message = event.data;

        if(typeof event.data === 'string') {
            message = JSON.parse(event.data);
        }

        if(message.source !== "chrome") {
          var tmp = Ember.A();
          for(var nav in message.data) {
            var navInfo = message.data[nav];
            tmp.push(navInfo);
          }

          this.set('navData', tmp);
        }
    },

    actions: {
        switchApp: function(appName) {
           this.set('appName', appName);
        },

        selectAppRoute: function(routeName) {
            var message = {
                "type": "unity",
                "data": routeName,
                "source": "chrome",
                "name": "msg",
            };

            var target = Ember.$("#module-iframe")[0].contentWindow;
            target.postMessage(JSON.stringify(message), "*");
        }
    }
});
