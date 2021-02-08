const exportKey = async (key, isPrivate = true) => {
  const format = isPrivate ? 'pkcs8' : 'spki';

  let exported;
  try {
    exported = await window.crypto.subtle.exportKey(format, key);
  } catch (err) {
    const e = `Error during export key: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return exported;
};

export default exportKey;
