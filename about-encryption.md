# Help for encryption/decryption

When you encrypt a .env type file, all # comments are also encrypted as well. Yo!

```bash
# MAKE SURE TO UPDATE YOUR ENCRYPTED .env files whenever you make changes to it.
# Encryption (uses SOPS_AGE_RECIPIENTS )
sops -e .env > enc.env

# Decryption  (uses ~/sops/age/keys.txt by default)
sops -d enc.env > .env
```
