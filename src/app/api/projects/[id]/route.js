import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const projectData = await request.json();
    
    const client = await clientPromise;
    const db = client.db('firm');
    
    const updatedProject = {
      ...projectData,
      id: parseInt(id),
      updatedAt: new Date()
    };
    
    const result = await db.collection('projects').updateOne(
      { id: parseInt(id) },
      { $set: updatedProject }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const client = await clientPromise;
    const db = client.db('firm');
    
    const result = await db.collection('projects').deleteOne({ id: parseInt(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}