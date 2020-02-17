package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	// "os"
	"strings"
	"time"
	// "path/filepath"
	"crypto/rsa"
	//"crypto/x509"
	//"encoding/pem"
	"io/ioutil"

	_jwt "github.com/dgrijalva/jwt-go"
)

const (
	privateKeyPath = "config/private.key"
	publicKeyPath  = "config/public.pem"
)

/*func CreateToken(user_email string, id interface{}) (string, error) {
	claims := _jwt.MapClaims{}
	claims["authorized"] = true
	claims["email"] = user_email
	claims["id"] = id
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix() //Token expires after 1 hour
	token := _jwt.NewWithClaims(_jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("APP_SECRET")))
}*/

func CreateToken(user_email string, id interface{}) (string, error) {
	claims := _jwt.MapClaims{}
	claims["authorized"] = true
	claims["email"] = user_email
	claims["id"] = id
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix()
	t := _jwt.NewWithClaims(_jwt.GetSigningMethod("RS256"), claims)
	// Creat token string
	return t.SignedString(getPrivateKey())
}

func getPrivateKey() *rsa.PrivateKey {
	key, err := ioutil.ReadFile(privateKeyPath)
	if err != nil {
		panic(err)
	}
	signKey, err := _jwt.ParseRSAPrivateKeyFromPEM(key)
	if err != nil {
		panic(err)
	}
	return signKey
}

/*func OnCheckJWTInvalid(r *http.Request) error {
	tknStr := getCurrentToken(r)
	token, err := _jwt.Parse(tknStr, func(token *_jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*_jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("APP_SECRET")), nil
	})
	if err != nil {
		return err
	}

	if claims, ok := token.Claims.(_jwt.MapClaims); ok && token.Valid {
		Pretty(claims)
	}
	return nil
}*/

func OnCheckJWTInvalid(r *http.Request) error {
	tknStr := getCurrentToken(r)
	verifyBytes, err := ioutil.ReadFile(publicKeyPath)

	if err != nil {
		return err
	}

	verifyKey, err := _jwt.ParseRSAPublicKeyFromPEM(verifyBytes)

	if err != nil {
		return err
	}

	token, err := _jwt.Parse(tknStr, func(token *_jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*_jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return verifyKey, nil
	})
	if err != nil {
		return err
	}

	if claims, ok := token.Claims.(_jwt.MapClaims); ok && token.Valid {
		Pretty(claims)
	}
	return nil
}

func getCurrentToken(r *http.Request) string {
	var tknStr string
	bearerToken := r.Header.Get("Authorization")
	// fmt.Println(bearerToken)
	if len(strings.Split(bearerToken, " ")) == 2 {
		tknStr = strings.Split(bearerToken, " ")[1]
	}

	return tknStr
}

//Verify Token
func GetUserCurrent(r *http.Request) (string, error) {
	tknStr := getCurrentToken(r)
	verifyBytes, err := ioutil.ReadFile(publicKeyPath)

	if err != nil {
		return "", err
	}

	verifyKey, err := _jwt.ParseRSAPublicKeyFromPEM(verifyBytes)

	if err != nil {
		return "", err
	}

	token, err := _jwt.Parse(tknStr, func(token *_jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*_jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return verifyKey, nil
	})

	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(_jwt.MapClaims)
	fmt.Println(claims)
	if ok && token.Valid {
		email := fmt.Sprintf("%v", claims["email"])
		return email, nil
	}

	return "", nil
}

func Pretty(data interface{}) {
	b, err := json.MarshalIndent(data, "", " ")
	if err != nil {
		log.Println(err)
		return
	}

	fmt.Printf(string(b))
}
