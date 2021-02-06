const generateKeys = async () => {
  let keys;

  try {
    keys = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-256' },
      },
      true,
      ['encrypt', 'decrypt'],
    );
  } catch (err) {
    console.dir(err);
  }

  return keys;
};

export default generateKeys;
