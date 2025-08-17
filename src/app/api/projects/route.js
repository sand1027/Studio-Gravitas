import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('MongoDB timeout')), 3000)
    );
    
    const mongoPromise = (async () => {
      const client = await clientPromise;
      const db = client.db('firm');
      return await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    })();
    
    const projects = await Promise.race([mongoPromise, timeoutPromise]);
    
    console.log('Fetched projects:', projects.length);
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("MongoDB failed:", error.message);
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(request) {
  try {
    const projectData = await request.json();
    
    const client = await clientPromise;
    const db = client.db('firm');
    
    // Generate new ID
    const lastProject = await db.collection('projects').findOne({}, { sort: { id: -1 } });
    const newId = lastProject ? lastProject.id + 1 : 1;
    
    const newProject = {
      id: newId,
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('projects').insertOne(newProject);
    
    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}