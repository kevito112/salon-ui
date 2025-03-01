import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';

// Define your website's URLs
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/gallery', changefreq: 'weekly', priority: 0.8 },
  { url: '/services', changefreq: 'weekly', priority: 0.9 },
  // Add more URLs as needed
];

// Create a stream to write to the sitemap.xml file
const sitemapStream = new SitemapStream({ hostname: 'https://www.keybeautybyyeny.com' });
const writeStream = createWriteStream(path.join(path.resolve(), 'public', 'sitemap.xml'));

// Pipe the stream to the write stream
sitemapStream.pipe(writeStream);

// Add each link to the sitemap
links.forEach(link => sitemapStream.write(link));

// End the stream
sitemapStream.end();

// Wait for the stream to finish and log the result
streamToPromise(sitemapStream).then(() => {
  console.log('Sitemap created successfully!');
}).catch(err => {
  console.error('Error creating sitemap:', err);
});