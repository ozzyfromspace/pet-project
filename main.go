package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ozzyfromspace/pet-project/server/database"
	envloader "github.com/ozzyfromspace/pet-project/server/env_loader"
	"github.com/ozzyfromspace/pet-project/server/nextauth"
)

func main() {
	envloader.Loader().Load()
	r := gin.Default()

	db := database.NewDatabase()
	db.Connect()

	v1 := r.Group("/api/v1")

	nar := nextauth.NewRequester()
	v1.Use(nar.ApplyNextAuthHeaders, nar.GetSessionMiddleware)

	v1.GET("/", func(ctx *gin.Context) {
		session, _ := ctx.Get("session")
		ctx.JSON(http.StatusOK, gin.H{"data": session})
	}).OPTIONS("/")

	log.Fatal(r.Run(":8080"))
}
