package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ozzyfromspace/pet-project/nextauth"
)

func main() {
	r := gin.Default()

	v1 := r.Group("/api/v1")

	nar := nextauth.NewRequester()
	v1.Use(nar.ApplyNextAuthHeaders, nar.GetSessionMiddleware)

	v1.GET("/", func(ctx *gin.Context) {
		session, _ := ctx.Get("session")
		ctx.JSON(http.StatusOK, gin.H{"data": session})
	}).OPTIONS("/")

	r.Run(":8080")
}
