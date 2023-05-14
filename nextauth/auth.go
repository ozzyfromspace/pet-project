package nextauth

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type NextAuthRequester struct {
	HostURL string
}

type NextAuthUser struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Image string `json:"image"`
}

type NextAuthSession struct {
	User NextAuthUser `json:"user"`
}

func NewRequester() *NextAuthRequester {
	if err := godotenv.Load(".env.local"); err != nil {
		log.Fatal(err)
	}

	NEXTAUTH_URL := os.Getenv("NEXTAUTH_URL")

	if NEXTAUTH_URL == "" {
		log.Fatal("NEXTAUTH_URL env variable is not set")
	}

	return &NextAuthRequester{
		HostURL: strings.ToLower(strings.Trim(NEXTAUTH_URL, " /")),
	}
}

func (nar *NextAuthRequester) ApplyNextAuthHeaders(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", nar.HostURL)

	if ctx.Request.Method == "OPTIONS" {
		ctx.Header("Access-Control-Allow-Headers", "Authorization")
		ctx.AbortWithStatus(http.StatusOK)
		return
	}

	ctx.Next()
}

func (nar *NextAuthRequester) GetSessionMiddleware(ctx *gin.Context) {
	client := &http.Client{}
	endpoint := fmt.Sprintf("%v/api/auth/session", nar.HostURL)

	req, _ := http.NewRequest("GET", endpoint, nil)
	cookieFromHeader := ctx.GetHeader("Authorization")

	token, extracted := extractToken(cookieFromHeader, "__next-auth-token__")

	if !extracted {
		ctx.AbortWithError(http.StatusBadRequest, errors.New("could not identify auth header"))
		return
	}

	req.Header.Add("Cookie", token)

	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	}

	userSession := NextAuthSession{}

	err = json.Unmarshal(body, &userSession)

	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
	}

	ctx.Set("session", &userSession)
	ctx.Next()
}

func extractToken(input string, tokenType string) (token string, extracted bool) {
	if tokenType == "" {
		return "", false
	}

	if startsWithTokenType := strings.HasPrefix(input, tokenType); !startsWithTokenType {
		return "", false
	}

	parts := strings.Split(input, tokenType)

	reconstructedToken := strings.Join(parts[1:], "")

	if len(reconstructedToken) == 0 {
		return "", false
	}

	return strings.Trim(reconstructedToken, " "), true
}
