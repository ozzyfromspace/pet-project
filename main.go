package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/hello", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"hello": "world"})
	})

	r.GET("/thisisme", whoAreYou)

	r.OPTIONS("/thisisme", func(ctx *gin.Context) {
		ctx.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		ctx.Header("Access-Control-Allow-Headers", "Authorization")
	})

	r.GET("/experiment", func(ctx *gin.Context) {
		response := ctx.GetHeader("Authorization")

		log.Println("header value ", response)
		ctx.Header("Access-Control-Allow-Origin", "http://localhost:3000")

		ctx.Status(200)
	})

	r.Run()
}

func whoAreYou(ctx *gin.Context) {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "http://localhost:3000/api/auth/session", nil)
	// cookieFromHeader := req.Header.Get("authorization")
	cookieFromHeader := ctx.GetHeader("Authorization")

	token, extracted := extractToken(cookieFromHeader, "__next-auth-token__")

	if !extracted {
		ctx.JSON(http.StatusOK, gin.H{"msg": "could not identify auth header"})
		return
	}

	log.Println("header we discovered - " + token)
	req.Header.Add("Cookie", token)

	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)

	fmt.Printf("\nYou are - %v\n\n", string(body))

	ctx.Header("Access-Control-Allow-Origin", "http://localhost:3000")

	ctx.JSON(http.StatusOK, gin.H{"msg": string(body)})
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
