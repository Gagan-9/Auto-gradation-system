// app/api/submissions/route.js
import dbConnect from '../../../utils/dbConnect';
import { Submission } from '../../../models/Submission'; // Adjust path as needed

export async function GET() {
  try {
    await dbConnect();
    const submissions = await Submission.find().exec(); // Remove populate calls if not needed
    return new Response(JSON.stringify(submissions), { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return new Response('Failed to fetch submissions', { status: 500 });
  }
}
