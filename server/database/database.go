package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Adapter struct {
	dbUri        string
	client       *mongo.Client
	app_database string
}

var connected = false

func NewDatabase() *Adapter {

	return &Adapter{
		dbUri:        os.Getenv("MONGODB_URI"),
		app_database: os.Getenv("APP_DATABASE"),
	}
}

func (db *Adapter) Connect() {
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

func (db *Adapter) Create(collection string, newDoc interface{}) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()
	return db.client.Database(db.app_database).Collection(collection).InsertOne(ctx, newDoc)
}

func (db *Adapter) Get(collection string, filter interface{}) (*mongo.Cursor, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()
	return db.client.Database(db.app_database).Collection(collection).Find(ctx, filter)
}
