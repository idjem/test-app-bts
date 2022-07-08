const jsforce = require("jsforce");
const { SALESFORCE_LOGIN_URL = "", SALESFORCE_ACCESS_TOKEN = "" } = process.env;

let salesforceClient;

const connect = () => {
  salesforceClient = new jsforce.Connection({
    instanceUrl: SALESFORCE_LOGIN_URL,
    accessToken: SALESFORCE_ACCESS_TOKEN,
  });
};

const getPayfitAdmin = async (userId) => {
  const payfitAdmins = await salesforceClient.sobject("payfit_user__c").find({
    PayFit_User_ID__c: userId,
  });
  return payfitAdmins?.[0];
};

const getContact = (contactId) =>
  salesforceClient.sobject("Contact").select("*, Account.Extra_Care__c").where({
    Full_ID_Contact__c: contactId,
  });

const getBillingAccount = (billingAccountId) =>
  salesforceClient.sobject("Zuora__CustomerAccount__c").find({
    BO_ID__c: billingAccountId,
  });

const createCase = (ticket) =>
  salesforceClient.sobject("Case").create({
    ...ticket,
    Origin: "Intercom",
  });

module.exports = {
  connect,
  createCase,
  getPayfitAdmin,
  getContact,
  getBillingAccount,
};
