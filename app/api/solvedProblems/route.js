// app/api/solvedProblems/route.js
// import { SolvedProblem } from "@/models/SolvedProblem"; // Make sure this is the correct import

// export async function GET() {
//   try {
//     const solvedProblems = await SolvedProblem.find()  // This should fetch solved problems, not submissions
//       .populate('problem')  // Populate the problem reference
//       .populate('contest')  // Populate the contest reference
//       .exec();

//     return new Response(JSON.stringify(solvedProblems), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching solved problems:", error);
//     return new Response("Failed to fetch solved problems", {
//       status: 500,
//     });
//   }
// }


// app/api/solvedProblems/route.js
import dbConnect from "@/utils/dbConnect"; // Ensure this points to your dbConnect file
import { SolvedProblem } from "@/models/SolvedProblem";  // Ensure this points to the correct SolvedProblem model

export async function GET() {
  try {
    await dbConnect(); // Ensure database connection

    // Fetch solved problems without contest population
    const solvedProblems = await SolvedProblem.find()
      .populate("problem") // Only populate the 'problem' reference
      .exec();
  
    return new Response(JSON.stringify(solvedProblems), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching solved problems:", error);
    return new Response("Failed to fetch solved problems", {
      status: 500,
    });
  }
}


