import { userGeneratedData, invalidUserData } from "../fixtures/app-form-body";
import "@4tw/cypress-drag-drop";

// these locators should be located in Page object or in Page Components, however received task required only tests
const emailFormLocators = {
  userNameField: "#name",
  userEmailField: "#email",
  userPhoneField: "#phone",
  emailSubjectField: "#subject",
  emailDescriptionField: "#description",
  submitButton: "#submitContact",
  submitedFormText: ".contact h2",
};

const alertFormLocators = {
  alertForm: ".alert-danger",
  errorFormText: ".alert-danger p:first-of-type",
};

const bookingFormLocators = {
  bookRoomBtn: "  .hotel-room-info .openBooking",
  firstName: ".room-firstname",
  lastName: ".room-lastname",
  email: ".room-email",
  phone: ".room-phone",
  submitBookingBtn: ".hotel-room-info .book-room",
};

describe("Mail form positive tests", () => {
  beforeEach(() => {
    cy.setBaseUrl("mailFormBaseUrl");
    cy.visit("/");
  });

  it("[AT1] should submit mail form with valid credentials", () => {
    const userInfo = userGeneratedData;

    cy.get(emailFormLocators.userNameField)
      .scrollIntoView()
      .type(userInfo.userName);
    cy.get(emailFormLocators.userEmailField).type(userInfo.email);
    cy.get(emailFormLocators.userPhoneField).type(userInfo.phoneNumber);
    cy.get(emailFormLocators.emailSubjectField).type(userInfo.emailSubject);
    cy.get(emailFormLocators.emailDescriptionField).type(userInfo.emailText);
    cy.get(emailFormLocators.submitButton).click();

    const submitedText = cy.get(emailFormLocators.submitedFormText);
    submitedText.should("contain", userInfo.userName);
  });

  it("[AT2] should submit mail form with 20 digits phone number", () => {
    const userInfo = userGeneratedData;

    cy.get(emailFormLocators.userNameField)
      .scrollIntoView()
      .type(userInfo.userName);
    cy.get(emailFormLocators.userEmailField).type(userInfo.email);
    cy.get(emailFormLocators.userPhoneField).type(userInfo.longPhoneNumber);
    cy.get(emailFormLocators.emailSubjectField).type(userInfo.emailSubject);
    cy.get(emailFormLocators.emailDescriptionField).type(userInfo.emailText);
    cy.get(emailFormLocators.submitButton).click();

    const submitedText = cy.get(emailFormLocators.submitedFormText);
    submitedText.should("contain", userInfo.userName);
  });
});

describe("Mail form negative tests", () => {
  beforeEach(() => {
    cy.setBaseUrl("mailFormBaseUrl");
    cy.visit("/");
  });

  it("[AT3] should not submit mail form w/o email value", () => {
    const userInfo = userGeneratedData;

    cy.get(emailFormLocators.userNameField)
      .scrollIntoView()
      .type(userInfo.userName);
    cy.get(emailFormLocators.userPhoneField).type(userInfo.phoneNumber);
    cy.get(emailFormLocators.emailSubjectField).type(userInfo.emailSubject);
    cy.get(emailFormLocators.emailDescriptionField).type(userInfo.emailText);
    cy.get(emailFormLocators.submitButton).click();

    const errorFormText = cy.get(alertFormLocators.errorFormText);
    errorFormText.should("be.visible");
    cy.get(emailFormLocators.submitedFormText).should("not.exist");
  });

  // failed because of bug #D1
  it("[AT4] should not submit mail form with digits in name field", () => {
    const invalidUserInfo = invalidUserData;
    const validUserInfo = userGeneratedData;

    cy.get(emailFormLocators.userNameField)
      .scrollIntoView()
      .type(invalidUserInfo.userName);
    cy.get(emailFormLocators.userEmailField).type(validUserInfo.email);
    cy.get(emailFormLocators.userPhoneField).type(validUserInfo.phoneNumber);
    cy.get(emailFormLocators.emailSubjectField).type(
      validUserInfo.emailSubject
    );
    cy.get(emailFormLocators.emailDescriptionField).type(
      validUserInfo.emailText
    );
    cy.get(emailFormLocators.submitButton).click();

    const errorFormText = cy.get(alertFormLocators.errorFormText);
    errorFormText.should("be.visible");
    cy.get(emailFormLocators.submitedFormText).should("not.exist");
  });

  it("[AT5] should not submit mail form with invalid email info", () => {
    const invalidUserInfo = invalidUserData;
    const validUserInfo = userGeneratedData;

    cy.get(emailFormLocators.userNameField)
      .scrollIntoView()
      .type(validUserInfo.userName);
    cy.get(emailFormLocators.userEmailField).type(invalidUserInfo.email);
    cy.get(emailFormLocators.userPhoneField).type(validUserInfo.phoneNumber);
    cy.get(emailFormLocators.emailSubjectField).type(
      validUserInfo.emailSubject
    );
    cy.get(emailFormLocators.emailDescriptionField).type(
      validUserInfo.emailText
    );
    cy.get(emailFormLocators.submitButton).click();

    const errorFormText = cy.get(alertFormLocators.errorFormText);
    errorFormText.should("be.visible");
    errorFormText.should("contain", "must be a well-formed email address");

    cy.get(emailFormLocators.submitedFormText).should("not.exist");
  });

  it("[AT6] should not submit mail form with two @ signs in the email info", () => {
    const invalidUserInfo = invalidUserData;
    const validUserInfo = userGeneratedData;

    cy.get(emailFormLocators.userNameField)
      .scrollIntoView()
      .type(validUserInfo.userName);
    cy.get(emailFormLocators.userEmailField).type(
      invalidUserInfo.doubleAtEmail
    );
    cy.get(emailFormLocators.userPhoneField).type(validUserInfo.phoneNumber);
    cy.get(emailFormLocators.emailSubjectField).type(
      validUserInfo.emailSubject
    );
    cy.get(emailFormLocators.emailDescriptionField).type(
      validUserInfo.emailText
    );
    cy.get(emailFormLocators.submitButton).click();

    const errorFormText = cy.get(alertFormLocators.errorFormText);
    errorFormText.should("be.visible");
    errorFormText.should("contain", "must be a well-formed email address");

    cy.get(emailFormLocators.submitedFormText).should("not.exist");
  });
});

describe("Room Booking negative tests", () => {
  let bookingPageUrl;

  beforeEach(() => {
    cy.setBaseUrl("mailFormBaseUrl");
    cy.visit("/");
    cy.url().then((url) => {
      cy.log(url);
      bookingPageUrl = url;
    });
  });

  // failed due to bug #D2
  it("[AT7] should not submit booking without dates", () => {
    const userInfo = userGeneratedData;

    console.log(`!!!!!!!!! ${bookingPageUrl}`);
    cy.get(bookingFormLocators.bookRoomBtn)
      .first()
      .should("be.visible")
      .scrollIntoView()
      .click();
    cy.get(bookingFormLocators.firstName).type(userInfo.userName);
    cy.get(bookingFormLocators.lastName).type(userInfo.lastName);
    cy.get(bookingFormLocators.email).type(userInfo.email);
    cy.get(bookingFormLocators.phone).type(userInfo.phoneNumber);

    cy.get(bookingFormLocators.submitBookingBtn).contains("Book").click();
    cy.url().should("eq", bookingPageUrl);
    cy.get(bookingFormLocators.bookRoomBtn).first().should("be.visible");
  });

  // failed due to bug #D3
  it("[AT8] should not submit booking without required user info", () => {
    cy.get(bookingFormLocators.bookRoomBtn)
      .first()
      .should("be.visible")
      .scrollIntoView()
      .click();
    cy.get(bookingFormLocators.submitBookingBtn).contains("Book").click();
    cy.url().should("eq", bookingPageUrl);
    cy.get(bookingFormLocators.bookRoomBtn).first().should("be.visible");
  });
});
