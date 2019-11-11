package auth

import (
	// "fmt"
	"net/http"

	// auth "github.com/antonio-nirina/sp-go/jwt"
	"github.com/antonio-nirina/formation/blog/server2/response"
)

func HelperTokenMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := OnCheckJWTInvalid(r)
		if err != nil {
			response.ErrorJson(w, http.StatusUnauthorized, "Unauthorized")
			return
		}
		next(w, r)
	}

}
