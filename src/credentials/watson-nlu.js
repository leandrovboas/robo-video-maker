module.exports = {
    apiKey: process.env.APIKEY ||  'your watson api key',
    iam_apikey_description: process.env.IAM_APIKEY_DESCRITION || 'your watson api key',
    iam_apikey_name: process.env.IAM_APIKEY_NAME || 'your watson api key',
    iam_role_crn: process.env.IAM_ROLE_CRN || 'your watson api key',
    iam_serviceid_crn: process.env.IAM_SERVICEID_CRN || 'your watson api key',
    url: process.env.URL || 'your watson api key'
}