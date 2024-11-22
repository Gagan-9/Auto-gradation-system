//app/api/problems/route.js
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../utils/dbConnect'; // Adjust path as necessary
// import { Problem } from '../../../models/Problem'; // Adjust path as necessary

// export async function POST(req) {
//   await dbConnect(); // Connect to MongoDB

//   try {
//     const data = await req.json();
//     const problem = new Problem(data);
//     await problem.save();
//     return NextResponse.json(problem, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// //app/api/problems/route.js
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../utils/dbConnect'; // Adjust path as necessary
// import { Problem } from '../../../models/Problem'; // Adjust path as necessary



// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     // Handle the POST request logic here
//     try {
//       // Add your problem creation logic here
//       res.status(200).json({ message: 'Problem added successfully!' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to add problem' });
//     }
//   } else {
//     // Respond with 405 if the method is not POST
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }




// Handle GET request to fetch problems
// export async function GET() {
//   await dbConnect(); // Connect to MongoDB

//   try {
//     const problems = await Problem.find(); // Fetch all problems
//     return NextResponse.json(problems, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }



// // //app/api/problems/route.js
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../utils/dbConnect';
// import { Problem } from '../../../models/Problem';

// // Handle POST request
// export async function POST(req) {
//   await dbConnect(); // Connect to the database

//   try {
//     const data = await req.json(); // Extract JSON data from the request body
//     const problem = new Problem(data); // Create a new problem using the data
//     await problem.save(); // Save the problem to the database

//     return NextResponse.json({ message: 'Problem added successfully!' }, { status: 200 });
//   } catch (error) {
//     console.error('Error adding problem:', error);
//     return NextResponse.json({ error: 'Failed to add problem' }, { status: 500 });
//   }
// }

// // Only allow POST requests
// export const config = {
//   methods: ['POST'],
// };


import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import { Problem } from '../../../models/Problem';

export async function POST(req) {
  await dbConnect();

  try {
    const data = await req.json();
    const problem = new Problem(data);
    await problem.save();

    return NextResponse.json({ message: 'Problem added successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error adding problem:', error);
    return NextResponse.json({ error: 'Failed to add problem' }, { status: 500 });
  }
}

// Handle GET request to fetch all problems
export async function GET() {
  await dbConnect();

  try {
    const problems = await Problem.find({}); // Fetch all problems from the database
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 });
  }
}
