/**

* Masks the first 5 digits of the mobile number with *

* @param {*} mobileNumber

* @returns {string} returns the mobile number with first 5 digits masked

*/

// eslint-disable-next-line no-unused-vars
function maskMobileNumber(mobileNumber) {
  if (!mobileNumber) {
    return '';
  }

  const value = mobileNumber.toString();

  // Mask first 5 digits and keep the rest

  return ` ${'*'.repeat(5)}${value.substring(5)}`;
}
