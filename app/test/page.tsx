"use client";

import { remark } from 'remark';
import html from 'remark-html';
import { useEffect, useState } from 'react';
import './markdown.css'; // Import the CSS file

async function fetchAndConvertMarkdown(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    const json = await response.json(); // Assuming the response is in JSON format
    const markdown = json.report; // Accessing the 'report' key for markdown content
    console.log('Fetched Markdown:', markdown); // Debugging line
    const result = await remark().use(html).process(markdown);
    const htmlContent = result.toString();
    console.log('Converted HTML:', htmlContent); // Debugging line
    return htmlContent;
  } catch (error) {
    console.error('Error fetching or converting markdown:', error);
    return '<p>Error loading content</p>';
  }
}

interface MarkdownReportProps {
  apiUrl: string;
}

export default function MarkdownReport({ apiUrl }: MarkdownReportProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetchAndConvertMarkdown(apiUrl).then(setHtmlContent);
  }, [apiUrl]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
