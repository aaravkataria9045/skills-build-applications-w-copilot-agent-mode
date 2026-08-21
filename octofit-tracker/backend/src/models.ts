import mongoose, { Schema } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  team?: string;
}

export interface Team {
  name: string;
  description: string;
  members: string[];
}

export interface Activity {
  username: string;
  type: string;
  durationMinutes: number;
  points: number;
  recordedAt: Date;
}

export interface LeaderboardEntry {
  username: string;
  points: number;
  rank: number;
}

export interface Workout {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  team: String,
}, { timestamps: true });

const teamSchema = new Schema<Team>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: { type: [String], default: [] },
}, { timestamps: true });

const activitySchema = new Schema<Activity>({
  username: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  recordedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema<LeaderboardEntry>({
  username: { type: String, required: true, unique: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });

const workoutSchema = new Schema<Workout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
}, { timestamps: true });

export const UserModel = mongoose.model<User>('User', userSchema);
export const TeamModel = mongoose.model<Team>('Team', teamSchema);
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);
export const LeaderboardModel = mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);