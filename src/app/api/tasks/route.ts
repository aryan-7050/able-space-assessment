import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Task from '../../models/Task';
import jwt from 'jsonwebtoken';

// Helper to get user from token
async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;
  
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return null;
    
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const body = await request.json();
    const task = await Task.create({ ...body, userId });
    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create task' },
      { status: 400 }
    );
  }
}