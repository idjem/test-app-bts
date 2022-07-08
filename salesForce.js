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

const getCaseLink = (newCaseId) =>
  `${process.env.SALESFORCE_CONSOLE_URL}/r/Case/${newCaseId}/view`;

const getCompanyBOLink = (companyId) =>
  `${process.env.SALESFORCE_BACK_OFFICE_URL}/companies/${companyId}/overview`;

const getBillingAccountLink = (billingAccountId) =>
  `${process.env.SALESFORCE_CONSOLE_URL}/r/Zuora__CustomerAccount__c/${billingAccountId}/view`;

module.exports = {
  connect,
  createCase,
  getPayfitAdmin,
  getContact,
  getBillingAccount,
  getCaseLink,
  getCompanyBOLink,
  getBillingAccountLink,
};
