const encryptData = async (data, publicKey) => {
  let encrypted;
  try {
    encrypted = await window.crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      data,
    );
  } catch (err) {
    console.dir(err);
  }

  return encrypted;
};

export default encryptData;
