const exportKey = async (key, isPrivate = true) => {
  const format = isPrivate ? 'pkcs8' : 'spki';

  const exported = await window.crypto.subtle.exportKey(format, key);

  return exported;
};

export default exportKey;
