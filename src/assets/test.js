const OriginalXHR = XMLHttpRequest;

// wrap the XMLHttpRequest
XMLHttpRequest = function() {
  return new Proxy(new OriginalXHR(), {

    open(method, url, async, username = null, password = null) {
      lg('open');
      // collect URL and HTTP method
      this.modMethod = method;
      this.modUrl = url;

      this.open(...arguments);
    },

    setRequestHeader(name, value) {
      lg('set header');
      if (!this.modReqHeaders) {
        this.modReqHeaders = {};
      }
      // collect headers
      this.modReqHeaders[name] = value;

      // do NOT set headers here. Hold back!
      // this.setRequestHeader(name, value);
    },

    send(body = null) {
      lg('processing request...');
      // do the final processing
      // ...
      // don't forget to set headers
      for (const [name, value] of Object.entries(this.modReqHeaders)) {
        this.setRequestHeader(name, value);
      }

      lg('sending request =>' +
        '\n\t\tmethod: \t' + this.modMethod +
        '\n\t\turl:\t\t' + this.modUrl +
        '\n\t\theaders:\t' + JSON.stringify(this.modReqHeaders));
      this.send(body);
    },

    get(xhr, key) {
      if (!key in xhr) return undefined;

      let value = xhr[key];
      if (typeof value === "function") {
        // if wrapped, use the function in proxy
        value = this[key] || value;
        return (...args) => value.apply(xhr, args);
      } else {
        //return properties
        return value;
      }
    },

    set(xhr, key, value) {
      if (key in xhr) {
        xhr[key] = value;
      }
      return value;
    }
  });
}
console.warn('XMLHttpRequest has been patched!\n XMLHttpRequest: ', XMLHttpRequest);

let url = 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1';


//fancy logging, looks good in dark mode
function lg(msg) {
  console.log('%c\t Proxy: ' + msg, 'background: #222; color: #bada55');
}
