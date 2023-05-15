package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type adapter struct {
	dbUri        string
	client       *mongo.Client
	app_database string
}

var connected = false

func NewDatabase() *adapter {

	return &adapter{
		dbUri:        os.Getenv("MONGODB_URI"),
		app_database: os.Getenv("APP_DATABASE"),
	}
}

func (db *adapter) Connect() {
	if connected {
		log.Fatal("database is already connected")
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer (func() {
		cancel()
		connected = false
	})()

	if client, err := mongo.Connect(ctx, options.Client().ApplyURI(db.dbUri)); err != nil {
		log.Fatal(err)
	} else {
		db.client = client
		connected = true
		log.Print("database is now connected")
	}
}

func (db *adapter) Create(collection string, newDoc interface{}) {
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()
	returnedColl := db.client.Database(db.app_database).Collection(collection)
	a, b := returnedColl.InsertOne(ctx, newDoc)
	fmt.Print(a, b)
}
