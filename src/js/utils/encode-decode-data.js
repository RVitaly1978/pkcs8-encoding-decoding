const utf8ToBase64 = (str) => window.btoa(str);

const base64ToUtf8 = (str) => window.atob(str);

const toSolidBytes = (match, p1) => String.fromCharCode(`0x${p1}`);
const b64EncodeUnicode = (str) => {
  const escaped = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, toSolidBytes);
  return btoa(escaped);
};

const mapFn = (c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
const b64DecodeUnicode = (str) => {
  const component = atob(str).split('').map(mapFn).join('');
  return decodeURIComponent(component);
};

const bufferSourceToStr = (bufferSource) => String
  .fromCharCode.apply(null, new Uint8Array(bufferSource));

const bufferSource16ToStr = (bufferSource) => String
  .fromCharCode.apply(null, new Uint16Array(bufferSource));

const strToArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);

  for (let i = 0; i < str.length; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
};

const strToArrayBuffer16 = (str) => {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);

  for (let i = 0; i < str.length; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
};

const base64ToArrayBuffer = (base64) => {
  const byteStringInUtf8 = base64ToUtf8(base64);
  return strToArrayBuffer(byteStringInUtf8);
};

const arrayBufferToBase64 = (arrayBuffer) => {
  const byteStringInUtf8 = bufferSourceToStr(arrayBuffer);
  return utf8ToBase64(byteStringInUtf8);
};

export {
  utf8ToBase64,
  base64ToUtf8,
  bufferSourceToStr,
  strToArrayBuffer,
  base64ToArrayBuffer,
  arrayBufferToBase64,
  b64EncodeUnicode,
  b64DecodeUnicode,
  bufferSource16ToStr,
  strToArrayBuffer16,
};
