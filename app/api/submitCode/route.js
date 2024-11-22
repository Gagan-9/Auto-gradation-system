//new one
import dbConnect from '@/utils/dbConnect';
import { Problem } from "@/models/Problem";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo.js";
import { SolvedProblem } from "@/models/SolvedProblem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route.js";

export async function POST(req) {
    await dbConnect(); // Ensure database connection is established
    const session = await getServerSession(authOptions); // Fetch session using next-auth
    const userID = session?.user?._id; // Extract userID from session if available

    if (userID) {
        try {
            const { code, problem, language, contest } = await req.json();

            // Fetch user and user information
            const user = await User.findById(userID);
            const userdata = await UserInfo.findById(user.userInfo).populate('solved');

            // Fetch the problem based on problem id
            const prob = await Problem.findOne({ id: problem });

            // Check if the problem has been previously solved by the user
            const existingSolvedProblem = userdata.solved.find(
                (solvedProblem) => solvedProblem.problem.equals(prob._id)
            );

            // Fetch test cases from the problem (assuming prob.testCases is an array)
            const testInput = prob.testCases[0]?.input[0]; // Example: Fetching first test case input
            const testOutput = prob.testCases[0]?.output[0]; // Example: Fetching first test case output

            // Call external API (JDoodle) to execute the code
            const res = await fetch('https://jdoodle2.p.rapidapi.com/v1', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
                    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
                },
                body: JSON.stringify({
                    language: language,
                    version: "latest",
                    code: code,
                    input: testInput, // Use test case input for execution
                }),
            });

            // Parse the response from JDoodle
            const data = await res.json();

            // Determine if the code passed the test cases
            let tcPass;
            let isAccepted;

            if (data.output === testOutput) {
                tcPass = 1;
                isAccepted = "accepted";
            } else {
                tcPass = 0;
                isAccepted = "rejected";
            }

            // Prepare new solution object
            const newSolution = {
                contest: contest !== null ? contest : undefined,
                code: code,
                complexity: [data.cpuTime, data.memory],
                status: isAccepted,
                passedTestCases: tcPass
            };

            // Update existing solved problem or create new solved problem
            if (existingSolvedProblem) {
                existingSolvedProblem.solution.push(newSolution);
                await existingSolvedProblem.save();
                return new Response(JSON.stringify({ isAccepted, output: data.output }), { status: 201 });
            } else {
                if ((isAccepted && contest) || !contest) {
                    const newSolve = new SolvedProblem({
                        contest: contest !== null ? contest : undefined,
                        problem: prob._id,
                        solution: [newSolution]
                    });

                    const newSol = await newSolve.save();
                    userdata.solved.push(newSol.id);
                    await userdata.save();
                    return new Response(JSON.stringify({ isAccepted, output: data.output }), { status: 201 });
                } else {
                    return new Response('Test case failed', { status: 400 });
                }
            }
        } catch (error) {
            console.error("Error handling submitCode request:", error);
            return new Response('Internal server error', { status: 500 });
        }
    }

    return new Response('User not found', { status: 401 });
}