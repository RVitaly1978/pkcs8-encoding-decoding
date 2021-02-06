const exportKey = async (key, isPrivate = true) => {
  const format = isPrivate ? 'pkcs8' : 'spki';

  let exported;
  try {
    exported = await window.crypto.subtle.exportKey(format, key);
  } catch (err) {
    console.dir(err);
  }

  return exported;
};

export default exportKey;
