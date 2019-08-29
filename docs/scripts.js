"use strict";

if ("undefined" == typeof TextEncoder) {
  TextEncoder = function TextEncoder() {}, TextEncoder.prototype.encode = function (e) {
    "use strict";

    for (var t = e.length, n = -1, o = "undefined" == typeof Uint8Array ? new Array(1.5 * t) : new Uint8Array(3 * t), r = 0, i = 0, c = 0; c !== t;) {
      if (r = e.charCodeAt(c), c += 1, r >= 55296 && r <= 56319) {
        if (c === t) {
          o[n += 1] = 239, o[n += 1] = 191, o[n += 1] = 189;
          break;
        }

        if (!((i = e.charCodeAt(c)) >= 56320 && i <= 57343)) {
          o[n += 1] = 239, o[n += 1] = 191, o[n += 1] = 189;
          continue;
        }

        if (c += 1, (r = 1024 * (r - 55296) + i - 56320 + 65536) > 65535) {
          o[n += 1] = 240 | r >>> 18, o[n += 1] = 128 | r >>> 12 & 63, o[n += 1] = 128 | r >>> 6 & 63, o[n += 1] = 128 | 63 & r;
          continue;
        }
      }

      r <= 127 ? o[n += 1] = 0 | r : r <= 2047 ? (o[n += 1] = 192 | r >>> 6, o[n += 1] = 128 | 63 & r) : (o[n += 1] = 224 | r >>> 12, o[n += 1] = 128 | r >>> 6 & 63, o[n += 1] = 128 | 63 & r);
    }

    return "undefined" != typeof Uint8Array ? o.subarray(0, n + 1) : (o.length = n + 1, o);
  }, TextEncoder.prototype.toString = function () {
    return "[object TextEncoder]";
  };

  try {
    Object.defineProperty(TextEncoder.prototype, "encoding", {
      get: function get() {
        if (TextEncoder.prototype.isPrototypeOf(this)) return "utf-8";
        throw TypeError("Illegal invocation");
      }
    });
  } catch (e) {
    TextEncoder.prototype.encoding = "utf-8";
  }

  "undefined" != typeof Symbol && (TextEncoder.prototype[Symbol.toStringTag] = "TextEncoder");
}
