const utf8ToBase64 = (str) => window.btoa(unescape(encodeURIComponent(str)));

const base64ToUtf8 = (str) => decodeURIComponent(escape(window.atob(str)));

const bufferSourceToUtf8 = (bufferSource) => String
  .fromCharCode.apply(null, new Uint8Array(bufferSource));

const utf8ToArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length);

  const bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
};

const base64ToArrayBuffer = (base64) => {
  const byteStringInUtf8 = base64ToUtf8(base64);
  return utf8ToArrayBuffer(byteStringInUtf8);
};

const arrayBufferToBase64 = (arrayBuffer) => {
  const byteStringInUtf8 = bufferSourceToUtf8(arrayBuffer);
  return utf8ToBase64(byteStringInUtf8);
};

export {
  utf8ToBase64,
  base64ToUtf8,
  bufferSourceToUtf8,
  utf8ToArrayBuffer,
  base64ToArrayBuffer,
  arrayBufferToBase64,
};
