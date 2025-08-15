const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = 'mongodb://localhost:27017/firm';

async function migrateData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('firm');
    const collection = db.collection('projects');
    
    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing projects');
    
    // Read JSON data
    const jsonPath = path.join(__dirname, 'src/app/data/projects.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Add timestamps to projects
    const projectsWithTimestamps = jsonData.projects.map(project => ({
      ...project,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert projects
    const result = await collection.insertMany(projectsWithTimestamps);
    console.log(`Inserted ${result.insertedCount} projects`);
    
    // List inserted projects
    const projects = await collection.find({}).toArray();
    console.log('Projects in database:');
    projects.forEach(p => console.log(`- ${p.title} (ID: ${p.id})`));
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await client.close();
  }
}

migrateData();