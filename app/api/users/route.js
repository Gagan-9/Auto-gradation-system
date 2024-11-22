// //app/api/users/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect'; // Ensure path is correct
import { User } from '../../../models/User'; // Ensure path is correct

export async function GET() {
  try {
    await dbConnect(); // Ensure database connection
    const users = await User.find().populate('userInfo'); // Populate if you have userInfo data to include
    console.log('Fetched users:', users); // Debugging line
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Debugging line
    return NextResponse.error({ status: 500, message: 'Failed to fetch users' });
  }
}


