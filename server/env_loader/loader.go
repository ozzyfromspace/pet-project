package envloader

import (
	"log"

	"github.com/joho/godotenv"
)

var loaded = false

type envLoader struct {
}

func Loader() *envLoader {
	return &envLoader{}
}

func (el *envLoader) Load() {
	if loaded {
		log.Fatal("environment already loaded")
	}

	if err := godotenv.Load(".env.local"); err != nil {
		log.Fatal(err)
	}

	loaded = true
	return
}
