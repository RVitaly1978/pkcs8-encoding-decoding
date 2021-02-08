const encryptData = async (data, publicKey) => {
  let encrypted;
  try {
    encrypted = await window.crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      data,
    );
  } catch (err) {
    const e = `Error during encryption: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return encrypted;
};

export default encryptData;
