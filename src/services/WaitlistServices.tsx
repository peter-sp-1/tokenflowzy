import { Client, Databases, ID } from 'appwrite';
import toast from 'react-hot-toast';

// Appwrite Client Configuration
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

// Email validation utility
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && 
         email.length >= 5 && 
         email.length <= 320;
}

// Submit email to waitlist
export async function submitWaitlistEntry(email: string) {
  // Validate email
  if (!validateEmail(email)) {
    toast.error('Invalid email address');
    throw new Error('Invalid email address');
  }

  try {
    // Submit to Appwrite
    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_WAITLIST_COLLECTION_ID,
      ID.unique(),
      {
        email: email.toLowerCase(),
        submittedAt: new Date().toISOString()
      }
    );

    return response;
  } catch (error: any) {
    // Handle specific Appwrite errors
    if (error.code === 409) {
      toast.error('This email is already on the waitlist');
      throw new Error('Email already exists');
    }

    toast.error(error.message || 'Failed to submit to waitlist');
    throw error;
  }
}