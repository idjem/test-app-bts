const jsforce = require("jsforce");
const {
  SALESFORCE_LOGIN_URL = "",
  SALESFORCE_LOGIN = "",
  SALESFORCE_PASSWORD = "",
  SALESFORCE_ACCESS_TOKEN = "",
} = process.env;

let salesforceClient;

const connect = () => {
  salesforceClient = new jsforce.Connection({
    loginUrl: SALESFORCE_LOGIN_URL,
    accessToken: SALESFORCE_ACCESS_TOKEN,
  });
  return new Promise((resolve, reject) => {
    salesforceClient.login(
      SALESFORCE_LOGIN,
      SALESFORCE_PASSWORD,
      function (err, res) {
        if (err) reject(err);
        resolve(salesforceClient);
      }
    );
  });
};

const getPayfitAdmin = (userId) =>
  salesforceClient.sobject("payfit_user__c").find({
    PayFit_User_ID__c: userId,
  });

const getContact = (contactId) =>
  salesforceClient.sobject("Contact").select("*, Account.Extra_Care__c").where({
    Full_ID_Contact__c: contactId,
  });

const getBillingAccount = (billingAccountId) =>
  salesforceClient.sobject("Zuora__CustomerAccount__c").find({
    BO_ID__c: billingAccountId,
  });

const getOpenCasesFromCompany = (companyId) =>
  salesforceClient.sobject("Case").find({
    Billing_Account__c: companyId,
  });

const createCase = (ticket) => salesforceClient.sobject("Case").create(ticket);

module.exports = {
  connect,
  createCase,
  getPayfitAdmin,
  getContact,
  getBillingAccount,
  getOpenCasesFromCompany,
};
