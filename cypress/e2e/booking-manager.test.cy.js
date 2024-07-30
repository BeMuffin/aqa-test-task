import { userCredentials } from "../fixtures/crm-fixture.js";
import { roomInfo } from "../fixtures/crm-fixture.js";

const loginPageLocators = {
  usernameField: "#username",
  passwordField: "#password",
  loginBtn: "#doLogin",
  loginHeader: `[data-testid='login-header']`,
};

const homePageLocators = {
  bookingHeader: ".navbar-brand",
};

const roomBookingLocators = {
  roomId: "#roomName",
  roomTypeDropdown: "#type",
  roomAccessDropdown: "#accessible",
  roomPrice: "#roomPrice",
  createRoomBtn: "#createRoom",
  deleteRoomBtn: ".roomDelete",
  roomInfoRow: ".roomlisting",
  allIncludedRoomDetails: `[id^='detailsWiFi']`,
  createdRoomId: (roomid) => `[id=roomName${roomid}]`,
};

const roomTypes = {
  single: "Single",
  twin: "Twin",
  double: "Double",
  family: "Family",
  suite: "Suite",
};

const roomAccessibleType = {
  accessible: "true",
  notAccessible: "false",
};

const roomFacilitiesLocators = {
  wifiCheckbox: "#wifiCheckbox",
  tvCheckbox: "#tvCheckbox",
  radioCheckbox: "#radioCheckbox",
  refreshmentsCheckbox: "#refreshCheckbox",
  safetyCheckbox: "#safeCheckbox",
  viewsCheckbox: "#viewsCheckbox",
};

describe("Login into Booking Management", () => {
  let loginPageUrl;
  beforeEach(() => {
    cy.setBaseUrl("crmBaseUrl");
    cy.visit("/");
    cy.log(userCredentials.password);
    cy.url().then((url) => {
      cy.log(url);
      loginPageUrl = url;
    });
  });
  it("[AT9] Login into CRM with admin credentials", () => {
    cy.get(loginPageLocators.usernameField).type(userCredentials.adminUsername);
    cy.get(loginPageLocators.passwordField).type(userCredentials.adminPassword);
    cy.get(loginPageLocators.loginBtn).click();

    cy.get(homePageLocators.bookingHeader).should("be.visible");
  });

  it("[AT10] Login into CRM with invalid credentials", () => {
    cy.get(loginPageLocators.usernameField).type(
      userCredentials.unexistedUsername
    );
    cy.get(loginPageLocators.passwordField).type(
      userCredentials.unexistedPassword
    );
    cy.get(loginPageLocators.loginBtn).click();

    cy.get(loginPageLocators.loginHeader).should("be.visible");
  });
});

describe("Managing rooms in the Book Management CRM", () => {
  beforeEach(() => {
    cy.setBaseUrl("crmBaseUrl");
    cy.visit("/")

    cy.get(loginPageLocators.usernameField).type(userCredentials.adminUsername);
    cy.get(loginPageLocators.passwordField).type(userCredentials.adminPassword);
    cy.get(loginPageLocators.loginBtn).click();
  });

  it("[AT11] should add all-included room with a valid data", () => {
    const roomId = roomInfo.roomId.toString();

    cy.get(homePageLocators.bookingHeader).should("be.visible");
    cy.get(roomBookingLocators.roomId).type(roomId);
    cy.get(roomBookingLocators.roomTypeDropdown).select(roomTypes.double);
    cy.get(roomBookingLocators.roomAccessDropdown).select(
      roomAccessibleType.accessible
    );
    cy.get(roomBookingLocators.roomPrice).type(roomInfo.highPrice);

    cy.checkAllCheckboxes(roomFacilitiesLocators);
    cy.get(roomBookingLocators.createRoomBtn).click();
    cy.get(roomBookingLocators.allIncludedRoomDetails)
      .last()
      .contains("WiFi, TV, Radio, Refreshments, Safe, Views");
    cy.get(roomBookingLocators.createdRoomId(roomId)).should("contain", roomId);
  });

  // failed because of bug #D4
  it("[AT12] should delete created room from booking manager", () => {
    const roomId = roomInfo.roomId.toString();
    cy.get(homePageLocators.bookingHeader).should("be.visible");

    cy.createRoomForBooking(
      roomId,
      roomBookingLocators,
      roomTypes,
      roomAccessibleType,
      roomFacilitiesLocators
    );
    cy.get(roomBookingLocators.allIncludedRoomDetails)
      .last()
      .should("contain", "WiFi, TV, Radio, Refreshments, Safe, Views");
    cy.get(roomBookingLocators.createdRoomId(roomId)).should("contain", roomId);

    cy.get(roomBookingLocators.deleteRoomBtn).last().click();
    cy.get(roomBookingLocators.createdRoomId(roomId)).should("not.exist");
  });

  it("[AT13] should not create a room with existed room Id", () => {
    const roomId = roomInfo.roomId.toString();
    cy.get(homePageLocators.bookingHeader).should("be.visible");
    cy.createRoomForBooking(
      roomId,
      roomBookingLocators,
      roomTypes,
      roomAccessibleType,
      roomFacilitiesLocators
    );
    cy.createRoomForBooking(
      roomId,
      roomBookingLocators,
      roomTypes,
      roomAccessibleType,
      roomFacilitiesLocators
    );

    const roomUniqueCount = cy.checkElementUnique(
      roomBookingLocators.createdRoomId(roomId)
    );
    roomUniqueCount.should("eq", 1);
  });

  it("[AT14] should not create a room with letters in price field", () => {
    const roomId = roomInfo.roomId.toString();
    cy.get(homePageLocators.bookingHeader).should("be.visible");
    cy.createRoomForBooking(
      roomId,
      roomBookingLocators,
      roomTypes,
      roomAccessibleType,
      roomFacilitiesLocators,
      "fff"
    );
    cy.get(roomBookingLocators.createdRoomId(roomId)).should("not.exist");
    cy.get(homePageLocators.bookingHeader).should("be.visible");
  });
});
