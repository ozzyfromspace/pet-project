package petapi

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ozzyfromspace/pet-project/server/database"
	"github.com/ozzyfromspace/pet-project/server/nextauth"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type petApi struct {
	db *database.Adapter
}

type UserPermissions map[string]string

type pet struct {
	ID              primitive.ObjectID `json:"_id" bson:"-"`
	UserPermissions UserPermissions    `json:"userPermissions" bson:"userPermissions"`
	Fullname        string             `json:"fullname" bson:"fullname"`
	Birthdate       string             `json:"birthdate" bson:"birthdate"`
	Gender          string             `json:"gender" bson:"gender"`
	Species         string             `json:"species" bson:"species"`
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
	session, found := ctx.Get("session")

	if !found {
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": "could not retrieve session"})
		return
	}

	newPet := &pet{}
	if err := ctx.BindJSON(newPet); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"msg": "could not parse body"})
		return
	}

	userEmail := session.(*nextauth.NextAuthSession).User.Email
	newPet.UserPermissions = UserPermissions{}

	newPet.UserPermissions[userEmail] = Owner

	result, err := p.db.Create("pets", newPet)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": "failed to create pet"})
	}

	ctx.JSON(http.StatusCreated, gin.H{"msg": result})
}

func (p *petApi) GetPets(ctx *gin.Context) {
	// 	session, found :=
	//
	// 	result, err := p.db.Create("pets", newPet)
	//
	// 	if err != nil {
	// 		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": "failed to create pet"})
	// 	}
	//
	// 	ctx.JSON(http.StatusCreated, gin.H{"msg": result})
}
