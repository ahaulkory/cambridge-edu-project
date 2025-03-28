const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['sciences', 'langues', 'commerce', 'arts'],
    required: true
  },
  objectives: [{
    type: String
  }],
  image: {
    type: String,
    default: '/assets/images/course-placeholder.jpg'
  },
  modules: [{
    type: Schema.Types.ObjectId,
    ref: 'Module'
  }],
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  enrolledStudents: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
