const core = require('@actions/core')
const tc = require('@actions/tool-cache')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // Download URL for the Nexus IQ CLI
    const cliDownloadURLTenplate =
      'https://download.sonatype.com/clm/scanner/nexus-iq-cli-{iq-cli-version}.jar'
    // Get version of tool to be installed
    const version = core.getInput('version')

    // Throw an error if the version is not provided
    if (!version) {
      throw new Error('Input parameter version is required.')
    }

    // Replace the version placeholder in the download URL
    const cliDownloadURL = cliDownloadURLTenplate.replace(
      '{iq-cli-version}',
      version
    )

    // File chache path for the tool
    let cachedToolPath = tc.find('iq-cli', version)

    // If the tool is not already cached, download it
    if (!cachedToolPath) {
      core.debug(`Downloading IQ CLI version ${version}`)
      const toolPath = await tc.downloadTool(
        cliDownloadURL,
        'sonatype-iq-cli.jar'
      )
      core.debug(`Downloaded IQ CLI to ${toolPath}`)
      cachedToolPath = await tc.cacheFile(
        toolPath,
        'sonatype-iq-cli.jar',
        'iq-cli',
        version
      )
    } else {
      core.debug(`IQ CLI version ${version} found in cache.`)
    }

    core.setOutput('iq-cli-version', version)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

module.exports = {
  run
}
