/**
 
El seeder no es más que un archivo que contiene una función que se encarga
de insertar datos (generalmente de prueba) en una base de datos.
*
El nombre "seeder" es una convención y significa "semillero".
*
Además, en este caso, se está usando una librería llamada Faker
(https://fakerjs.dev/) para facilitar la creación de datos ficticios como
nombres, apellidos, títulos, direcciones y demás textos.
*
Suele ser común que en los seeders exista un for donde se define la
cantidad de registros de prueba que se insertarán en la base de datos.
**/

const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  const images = [
    "/img/random1.png",
    "/img/random2.png",
    "/img/random3.png",
    "/img/random4.png",
    "/img/random5.png",
    "/img/random6.png",
    "/img/random7.png",
    "/img/random8.png",
    "/img/random9.png",
    "/img/random10.png",
  ];

  for (let i = 0; i < 100; i++) {
    let email = faker.internet.email();
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: email,
      email: email,
      password: await bcrypt.hash("123", 2),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      description: faker.lorem.sentence(2),
      profilePicture: randomImage,
      tweetList: [],
      following: [],
      followers: [],
    });
  }
  await User.insertMany(users);

  console.log("[Database] Se corrió el seeder de Users.");
};
