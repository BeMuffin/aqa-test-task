// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { userCredentials, roomInfo } from "../fixtures/crm-fixture.js";

Cypress.Commands.add("setBaseUrl", (baseUrl) => {
  const urls = {
    mailFormBaseUrl: "https://automationintesting.online/",
    crmBaseUrl: "https://automationintesting.online/#/admin",
  };
  Cypress.config("baseUrl", urls[baseUrl]);
});

Cypress.Commands.add("checkAllCheckboxes", (checkboxesLocatorsObj) => {
  Object.keys(checkboxesLocatorsObj).forEach((checkboxType) => {
    cy.log(checkboxesLocatorsObj[checkboxType]);
    cy.get(checkboxesLocatorsObj[checkboxType]).check();
  });
});

Cypress.Commands.add("createRoomForBooking", (roomId, roomLocatorsObj, roomTypesObj, roomAccessibleType, roomFacilitiesLocators, roomPrice) => {
  cy.get(roomLocatorsObj.roomId).type(roomId);
  cy.get(roomLocatorsObj.roomTypeDropdown).select(roomTypesObj.double);
  cy.get(roomLocatorsObj.roomAccessDropdown).select(
    roomAccessibleType.accessible
  );
  cy.get(roomLocatorsObj.roomPrice).type(roomPrice ?? roomInfo.highPrice);

  cy.checkAllCheckboxes(roomFacilitiesLocators);
  cy.get(roomLocatorsObj.createRoomBtn).click();
});

Cypress.Commands.add('checkElementUnique', (locator)=>{
    cy.get(locator).then((elements) =>{
        return elements.length
    })
})
