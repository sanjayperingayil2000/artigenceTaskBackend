import Post from '../models/Post.js';

export default async function seedDefaultPost() {
  const count = await Post.estimatedDocumentCount();
  if (count > 0) return;

  await Post.create({
    title: 'Welcome to the Office Articles!',
    content:
      'This is a default post. You can add, edit, or delete posts once you log in. ' +
      'Use the Articles page in the UI to manage content.',
    authorName: 'Admin'
  });

  console.log('Seeded default post');
}
