package petapi

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ozzyfromspace/pet-project/server/database"
	"github.com/ozzyfromspace/pet-project/server/nextauth"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type petApi struct {
	db *database.Adapter
}

type UserPermissions map[string]string

type pet struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Owner     string             `json:"owner" bson:"owner"`
	Fullname  string             `json:"fullname" bson:"fullname"`
	Birthdate string             `json:"birthdate" bson:"birthdate"`
	Gender    string             `json:"gender" bson:"gender"`
	Species   string             `json:"species" bson:"species"`
}

const (
	Owner        = "Owner"
	ReadAndWrite = "Read_And_Write"
	Read         = "Read"
)

func New(db *database.Adapter) *petApi {
	return &petApi{
		db: db,
	}
}

func (p *petApi) CreatePetHandler(ctx *gin.Context) {
	session, _ := ctx.Get("session")

	newPet := &pet{}
	if err := ctx.BindJSON(newPet); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "could not parse body"})
		return
	}

	newPet.Owner = session.(*nextauth.NextAuthSession).User.Email
	result, err := p.db.Create("pets", newPet)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": "failed to create pet"})
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": result})
}

func (p *petApi) GetPetsHandler(ctx *gin.Context) {
	session, _ := ctx.Get("session")
	emailAddress := session.(*nextauth.NextAuthSession).User.Email

	filter := bson.D{{Key: "owner", Value: emailAddress}}
	result, err := p.db.Get("pets", filter)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": "failed to get pets"})
	}

	foundPets := []pet{}
	result.All(context.Background(), &foundPets)

	ctx.JSON(http.StatusCreated, gin.H{"msg": foundPets})
}
