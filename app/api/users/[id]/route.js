

import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/dbConnect';
import { User } from '../../../../models/User';  // Assuming your main user model is User

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('Received ID:', id);

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('Invalid ID format:', id);
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Find the user and populate the userInfo field
    const user = await User.findById(id).populate('userInfo');
    console.log('Queried user:', user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
