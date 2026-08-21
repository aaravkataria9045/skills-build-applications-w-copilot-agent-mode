import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    await UserModel.insertMany([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Runner', team: 'Trail Blazers' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Walker', team: 'Trail Blazers' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Strength', team: 'Power Crew' },
    ]);
    await TeamModel.insertMany([
      { name: 'Trail Blazers', description: 'Run and walk together.', members: ['alex', 'jordan'] },
      { name: 'Power Crew', description: 'Build strength through consistency.', members: ['sam'] },
    ]);
    await ActivityModel.insertMany([
      { username: 'alex', type: 'Running', durationMinutes: 30, points: 45 },
      { username: 'jordan', type: 'Walking', durationMinutes: 45, points: 30 },
      { username: 'sam', type: 'Strength training', durationMinutes: 25, points: 40 },
    ]);
    await LeaderboardModel.insertMany([
      { username: 'alex', points: 245, rank: 1 },
      { username: 'sam', points: 210, rank: 2 },
      { username: 'jordan', points: 185, rank: 3 },
    ]);
    await WorkoutModel.insertMany([
      { title: 'Starter Run', description: 'A steady cardio session.', difficulty: 'Beginner', durationMinutes: 20 },
      { title: 'Full Body Circuit', description: 'A balanced strength workout.', difficulty: 'Intermediate', durationMinutes: 30 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
