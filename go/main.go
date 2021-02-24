package main

import (
	"fmt"

	"github.com/streadway/amqp"

	env "golang/src/env"
)

// use godot package to load/read the .env file and
// return the value of the key
// func goDotEnvVariable(key string) string {

// 	// load .env file
// 	err := godotenv.Load(".env")

// 	if err != nil {
// 		log.Fatalf("Error loading .env file")
// 	}

// 	return os.Getenv(key)
// }

func main() {
	RabbitURL := env.GoDotEnvVariable("RABBIT_URL")

	fmt.Println("Go RabbitMQ")
	conn, err := amqp.Dial(RabbitURL)
	if err != nil {
		fmt.Println("Failed Initializing Broker Connection")
		panic(err)
	}

	ch, err := conn.Channel()
	if err != nil {
		fmt.Println(err)
	}
	defer ch.Close()

	if err != nil {
		fmt.Println(err)
	}

	msgs, err := ch.Consume(
		"GO_TEST_RABBIT",
		"",
		true,
		false,
		false,
		false,
		nil,
	)

	forever := make(chan bool)
	go func() {
		fmt.Println(msgs)
		for d := range msgs {
			fmt.Printf("Recieved Message: %s\n", d.Body)
			fmt.Printf(d.UserId)
		}
	}()

	fmt.Println("Successfully Connected to our RabbitMQ Instance")
	fmt.Println(" [*] - Waiting for messages")
	<-forever
}
