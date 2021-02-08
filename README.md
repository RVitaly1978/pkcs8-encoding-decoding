# PKCS#8-encrypt-decrypt

## Keys generation section

**CryptoKey** is generated, **public** and **private** keys are extracted, and they are encoded in PEM-format according to the PKCS#8 (for storage or transmission over the Internet).

## Keys confirmation (submitting) section

Enter and confirm the keys (in PEM-format according to the PKCS#8) for subsequent encryption. The keys are decoded in DER-format.

You can enter your own keys or copy and paste the keys generated in the *Keys generation section*.

## Encryption-Decryption section

Text data (in utf-8 encoding) is encrypted and decrypted with the keys entered in the *Keys confirmation (submitting) section*.

Text data from the input (on the left) is encrypted (the encrypt button is only available after submitting the key in the *Keys confirmation (submitting) section*) and encoded in base64.

Copy the encrypted data (in base64) and paste it into the input (on the right) to decryption.

The base64 data in the input field (on the right) is decrypted (the decrypt button is only available after submitting the key in the *Keys confirmation (submitting) section*) and output as text data.

## Note

Errors during the generation, export-import of keys, encryption-decryption of data will be displayed in alert.
