const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const { setup } = require('./setup')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    core.debug(`Setup Nexus IQ CLI`)
    await setup()
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
