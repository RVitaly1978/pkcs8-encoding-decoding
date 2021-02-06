const decryptData = async (data, privateKey) => {
  let decrypted;
  try {
    decrypted = await window.crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      privateKey,
      data,
    );
  } catch (err) {
    console.dir(err);
  }

  return decrypted;
};

export default decryptData;
