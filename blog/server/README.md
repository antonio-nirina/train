###### ssh-keygen -t rsa -b 2048 -f private.key
###### Don't add passphrase
###### openssl rsa -in private.key -pubout -outform PEM -out public.pem

###### Build Pack in Heroku

heroku buildpacks:set  heroku/nodejs

###### PROD

https://training-appv1.herokuapp.com/api
