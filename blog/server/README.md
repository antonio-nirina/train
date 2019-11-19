###### ssh-keygen -t rsa -b 2048 -f private.key
###### Don't add passphrase
###### openssl rsa -in jwtRS256.key -pubout -outform PEM -out public.pem
