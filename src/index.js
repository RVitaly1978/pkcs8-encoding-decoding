import Renderer from './js/dom/renderer';
import App from './js/components/app';

import './styles/style.css';

// import {
//   generateKey,
//   encryptData,
//   decryptData,
//   exportKey,
//   importKey,
//   utf8ToArrayBuffer,
//   bufferSourceToUtf8,
//   arrayBufferToBase64,
// } from './js/utils';
// import {
//   utf8ToArrayBuffer,
//   arrayBufferToBase64,
//   base64ToArrayBuffer,
// } from './js/utils';

// const str = 'abc';
// const ab = utf8ToArrayBuffer(str);
// console.log(ab);
// const str1 = bufferSourceToUtf8(ab);
// const b641 = window.btoa(str1);
// console.log(str1, b641);
// const b642 = arrayBufferToBase64(ab);
// console.log(str1, b642);

// const ab = utf8ToArrayBuffer('ɘŅ');
// const ab = utf8ToArrayBuffer('ab');
// const b64 = arrayBufferToBase64(ab);
// const arr = base64ToArrayBuffer(b64);
// console.log(arr);
// console.log(String.fromCharCode(255));
// console.log(String.fromCharCode(256));
// console.log(String.fromCharCode(325));
// console.log(String.fromCharCode(600));
// (async () => {
//   const msg = 'hello';
//   console.log('msg ----', msg);

//   const keys = await generateKey();
//   const publicKeyExported = await exportKey(keys.publicKey, false);
//   const publicKeyImported = await importKey(publicKeyExported, false);
//   const data = utf8ToArrayBuffer(msg);
//   const encrypted = await encryptData(data, publicKeyImported);
//   console.log('enc ----', encrypted);

//   const privateKeyExported = await exportKey(keys.privateKey);
//   const privateKeyImported = await importKey(privateKeyExported);
//   const decrypted = await decryptData(encrypted, privateKeyImported);
//   console.log('dec ----', decrypted);

//   const decoder = new TextDecoder();
//   console.log('dec ----', decoder.decode(decrypted));
// })();

// -----------------------------------

const root = document.getElementById('root');

const AppRenderer = new Renderer(root);
AppRenderer.render(App);
