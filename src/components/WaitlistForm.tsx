// import React, { useState, FormEvent } from 'react';
// import { waitlistService } from '../services/WaitlistServices';

// export function WaitlistForm() {
//   const [email, setEmail] = useState<string>('');
//   const [message, setMessage] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     // Prevent multiple submissions
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     setMessage('');

//     try {
//       const result = await waitlistService.submitEmail(email);
      
//       if (result.success) {
//         setMessage(result.message);
//         setEmail(''); // Clear input
//       } else {
//         setMessage(result.message);
//       }
//     } catch (error) {
//       setMessage('An unexpected error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//         required
//       />
//       <button 
//         type="submit" 
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
//       </button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }