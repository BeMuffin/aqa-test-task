import {generateFirstName, generateLastName, generateLongPhoneNumber, generatePersonalEmail,generatePhoneNumber, generateRandomText} from './app-form-fixture'

export const userGeneratedData = {
    userName: generateFirstName() || 'Hanna',
    lastName: generateLastName() || 'Key',
    email: generatePersonalEmail() || 'babauprijefro-6867@yopmail.com',
    phoneNumber: generatePhoneNumber() || '+995123456789',
    emailSubject: 'Important email',
    emailText: generateRandomText() || 'Email important text',
    longPhoneNumber:generateLongPhoneNumber()
}


export const invalidUserData = {
    userName : 'user123',
    email: 'invalidEmail',
    phoneNumber: 'invalidPhoneNumber123',
    emailSubject: 123,
    emailText: 'Test',
    doubleAtEmail: '@test@gmail.com'
}