
const {
  SALESFORCE_LOGIN_URL = '',
  SALESFORCE_LOGIN = '',
  SALESFORCE_PASSWORD = '',
} = process.env

const init = async () => {
  const salesforceClient = new jsforce.Connection({
    loginUrl: SALESFORCE_LOGIN_URL,
  })
  return salesforceClient.login(
    SALESFORCE_LOGIN,
    SALESFORCE_PASSWORD,
  )
}

const createCase = (conn, ticket) => 
  new Promise((resolve, reject) => {
    conn.sobject("Case").create(ticket, function(err, ret) {
      if (err || !ret.success) { return reject(err); }
      resolve(ret.id);
    });
  })

module.exports = {
  init,
  createCase
}