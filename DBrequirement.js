const ApplicationSchema = new mongoose.Schema({
  // 1. Personal Information
  name: { type: String, required: true, trim: true },
  studentId: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  schoolEmail: { type: String, required: true, lowercase: true },
  program: { type: String, required: true },
  discordUsername: { type: String, required: true },

  // 2. Team Selection
  team: { 
    type: [String], 
    required: true,
    enum: ['p&c', 'build', 'm&l', 'perception']
  },

  // 3. Proof of Membership Payment, screenshot
  screenshotPath: { type: String, required: true },

  submittedAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
});