import { faker } from "@faker-js/faker";

export const generateFirstName = () => {
  return faker.person.firstName();
};

export const generatePersonalEmail = () => {
  return faker.internet.email();
};

export const generatePhoneNumber = () => {
  return faker.phone.number();
};

export const generateRandomText = () => {
  return faker.lorem.sentences(3);
};

export const generateLongPhoneNumber =() =>{
    return faker.string.numeric(21)
}

export const generateLastName = () => {
  return faker.person.lastName();
}
