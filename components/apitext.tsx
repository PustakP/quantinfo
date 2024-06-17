"use client";

import { remark } from 'remark';
import html from 'remark-html';
import { useEffect, useState } from 'react';
import Image from "next/image"
// import './markdown.css'; // Import the CSS file

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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    console.log('Fetching markdown content...');
    setLoading(true);
    fetchAndConvertMarkdown(apiUrl)
      .then(htmlContent => {
        setHtmlContent(htmlContent);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiUrl]);

  if (loading) {
    return (
        <>
      <div className="flex justify-center items-center pt-4">
        <Image src="https://i.ibb.co/WcMMVrK/Book.gif" alt="Loading..." width={75} height={75} />
        
      </div>
      <p className="text-center text-2xl animate-pulse pt-3">Loading...</p>
      </>
    );
  }

  return (
    <div>
      {/* Render the markdown content here */}
      <div className = '' dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
