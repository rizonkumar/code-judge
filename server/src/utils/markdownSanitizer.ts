import { marked } from "marked";
import sanitizeHTML from "sanitize-html";
import TurndownService from "turndown";

import logger from "../config/loggerConfig";

function cleanAndSanitizeMarkdown(markdownInput: string): string {
  logger.info("Starting markdown sanitization process");
  const turndownService = new TurndownService();

  const htmlFromMarkdown = marked.parse(markdownInput) as string;
  logger.debug("Converted markdown to HTML");

  const sanitizedHtml = sanitizeHTML(htmlFromMarkdown, {
    allowedTags: sanitizeHTML.defaults.allowedTags.concat(["img"]),
  });
  logger.debug("Sanitized HTML");

  const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);
  logger.debug("Converted sanitized HTML back to markdown");

  logger.info("Markdown sanitization process completed");
  return sanitizedMarkdown;
}

export default cleanAndSanitizeMarkdown;
