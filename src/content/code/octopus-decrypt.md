---
title: Decrypt Octopus Variables
language: "python"
tags: ['python','octopus']
date: 2022-05-16
description:  Decrypt Octopus Sensitive Variables in Python using the cryptography crypto library and the Master Key 
---

```python
from cryptography.hazmat.primitives.ciphers import (
    Cipher, algorithms, modes
)

def octo_decrypt(master_key: str, encrypted_value: str) -> str:
    """
    Decrypts Octopus Sensetive values which are encrypted by AES 256 CBC
    using the master key from octopus config

    :param master_key: Octopus Master Key
    :ptype master_key: str
    :param encrypted_value: Octopus Encrypted Sensetive Value
    :ptype encrypted_value: str
    :return: Returns decrypted string
    """
    
    cipher, salt = encrypted_value.split("|")
    decryptor = Cipher(
            algorithms.AES(base64.b64decode(master_key)),
            modes.CBC(base64.b64decode(salt))
    ).decryptor()

    decrypted_bytes = decryptor.update(base64.b64decode(cipher)) + decryptor.finalize()

    return decrypted_bytes.decode('utf-8')
```
