const arrayBufferToBase64 = (arrayBuffer) => {
  const byteArray = new Uint8Array(arrayBuffer);

  const byteString = String.fromCharCode.apply(null, byteArray);

  const b64 = window.btoa(byteString);

  return b64;
};

const addNewLines = (oneLineString) => {
  let str = oneLineString;
  let multiLineString = '';

  while (str.length > 0) {
    multiLineString += `${str.substring(0, 64)}\n`;
    str = str.substring(64);
  }

  return multiLineString;
};

const toPem = (key, isPrivate = true) => {
  const multiLineString = addNewLines(arrayBufferToBase64(key));

  const type = isPrivate ? 'PRIVATE' : 'PUBLIC';
  const pem = `-----BEGIN ${type} KEY-----\n${multiLineString}-----END ${type} KEY-----`;

  return pem;
};

export default toPem;
