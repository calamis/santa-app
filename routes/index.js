const express = require("express");
const { ERROR } = require("../utils/constants");
const mainRoutes = express.Router();
const pendingWishes = [];

// Utils
const {
  checkStringSpaces,
  renderErrorScreen,
  getRegisteredUsersFromURL,
  searchUser,
  getUserProfilesFromURL,
  searchUserProfile,
  isDateFormatValid,
  getAge,
  renderConfirmScreen,
} = require("../utils/helpers");

// DEFINE ENDPOINTS
mainRoutes.get("/", async (req, res) => {
  res.render("index");
});

mainRoutes.post("/", async (req, res) => {
  try {
    const { username, wish } = req.body;

    // Check
    if (checkStringSpaces(username)) {
      renderErrorScreen(res, ERROR.childNotRegistered);
      return;
    }

    // Get registered users from URL
    const registeredUsers = await getRegisteredUsersFromURL();

    // From the registered users, search the input user. If exist, return userId
    const user = searchUser(registeredUsers.data, username);

    // Is user not registered?
    if (user === null || user === undefined) {
      renderErrorScreen(res, ERROR.childNotRegistered);
      return;
    }

    const userId = user.uid;

    // Get user profile from URL
    const userProfileInfo = await getUserProfilesFromURL();
    // Get user profile
    const userProfile = searchUserProfile(userProfileInfo.data, userId);
    // deconstruct userProfile
    const { address, birthdate } = userProfile;

    // Is Date format not valid?
    if (!isDateFormatValid(birthdate)) {
      renderErrorScreen(res, ERROR.invalidBirthDate);
      return;
    }

    //Is users Age greater than 10?
    if (getAge(birthdate) > 10) {
      renderErrorScreen(res, ERROR.childAgeMoreThanTen);
      return;
    }

    // Push the wish to the global variable
    pendingWishes.push({ username, address, wish });
    renderConfirmScreen(res);
  } catch (error) {
    console.log(error);
    renderErrorScreen(res, ERROR.internalError);
  }
});

module.exports = mainRoutes;
