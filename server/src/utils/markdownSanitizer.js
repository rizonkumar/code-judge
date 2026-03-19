const marked = require("marked");
const sanitizeHTML = require("sanitize-html");
const TurndownService = require("turndown");
const logger = require("../config/logger.config");

function cleanAndSanitizeMarkdown(markdownInput) {
  logger.info("Starting markdown sanitization process");
  const turndownService = new TurndownService();

  // 1. Convert markdown input to HTML
  const htmlFromMarkdown = marked.parse(markdownInput);
  logger.debug("Converted markdown to HTML");

  // 2. Sanitize the generated HTML
  const sanitizedHtml = sanitizeHTML(htmlFromMarkdown, {
    allowedTags: sanitizeHTML.defaults.allowedTags.concat(["img"]),
  });
  logger.debug("Sanitized HTML");

  // 3. Convert sanitized HTML back to markdown
  const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);
  logger.debug("Converted sanitized HTML back to markdown");

  logger.info("Markdown sanitization process completed");
  return sanitizedMarkdown;
}

module.exports = cleanAndSanitizeMarkdown;
