const importKey = async (key, isPrivate = true) => {
  const options = isPrivate
    ? [
      'pkcs8',
      key,
      {
        // name: 'RSA-PSS',
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-256',
      },
      true,
      ['decrypt'],
    ]
    : [
      'spki',
      key,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      true,
      ['encrypt'],
    ];

  let imported;
  try {
    imported = await window.crypto.subtle.importKey(...options);
  } catch (err) {
    const e = `Error during import key: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return imported;
};

export default importKey;
