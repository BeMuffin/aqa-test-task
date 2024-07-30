
export const userCredentials= {
    adminUsername: Cypress.env('crm_username'),
    adminPassword:Cypress.env('crm_password'),
    unexistedUsername: 'hanna',
    unexistedPassword: '1223'
}


export const roomInfo = {
    roomId: Math.floor(Math.random() * (300 - 150 + 1)) + 150,
    lowPrice: 100,
    mediumPrice: 250,
    highPrice: 500,
    constantRoomId: '666'

}