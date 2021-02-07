import { base64ToArrayBuffer } from './encode-decode-data';

const removeHeaderAndFooter = (pem, isPrivate = true) => {
  const keyType = isPrivate ? 'PRIVATE' : 'PUBLIC';

  const header = `-----BEGIN ${keyType} KEY-----`;
  const footer = `-----END ${keyType} KEY-----`;

  return pem.substring(header.length, pem.length - footer.length);
};

const joinMultiLineToOneLineStr = (multiLineStr) => {
  const splitter = '\n';
  return multiLineStr.split(splitter).join('');
};

const pemToArrayBuffer = (pem, isPrivate = true) => {
  const pemBody = removeHeaderAndFooter(pem, isPrivate);
  const pemContent = joinMultiLineToOneLineStr(pemBody);

  return base64ToArrayBuffer(pemContent);
};

export default pemToArrayBuffer;
