const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

/** Constants for configuration */
const OPENAI_ENDPOINT = process.env.OPENAI_ENDPOINT;
const OPENAI_KEY = process.env.OPENAI_KEY;

/**
 * Explains vulnerabilities in a provided smart contract code.
 * @param {Object} issue - The issue object containing smart contract code.
 * @param {string} issue.message - The smart contract code.
 * @returns {Promise<string>} Explanation of vulnerabilities found in the smart contract code.
 * @throws Will throw an error if the request fails or if the input is invalid.
 */
async function explain(issue) {
  if (!issue || typeof issue.message !== 'string' || issue.message.trim() === '') {
    throw new Error('Invalid input: issue.message must be a non-empty string.');
  }

  const payload = {
    messages: [
      {
        role: 'system',
        content: `You are an expert smart contract security auditor. Your task is to thoroughly analyze the provided smart contract code for vulnerabilities, security risks, and best practice violations. Identify and explain any issues you find, including reentrancy, integer overflows/underflows, access control problems, denial of service, front-running, and any other relevant risks. Provide clear explanations and, if possible, suggest remediations for each vulnerability.`
      },
      {
        role: 'user',
        content: issue.message // This should contain the smart contract code
      }
    ]
  };

  try {
    const { data } = await axios.post(
      OPENAI_ENDPOINT,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': OPENAI_KEY
        }
      }
    );

    // Extract explanation from the response
    const explanation = data.choices?.[0]?.message?.content || 'No explanation found.';
    return explanation;
  } catch (error) {
    console.error('Error making request to OpenAI:', error);
    throw new Error('Failed to get explanation from OpenAI.');
  }
}

module.exports = { explain };