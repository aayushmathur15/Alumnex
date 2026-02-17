const Thread = require("../models/Thread.model");
const Company = require("../models/Company.model");
const JobRole = require("../models/JobRole.model");

// Create Thread
exports.createThread = async (req, res) => {
  try {
    const {
      companySlug,
      roleTitle,
      yearOfPlacement,
      difficulty,
      rounds,
      topicsCovered,
      experience,
      candidateName,
      linkedin,
    } = req.body;

    const company = await Company.findOne({ slug: companySlug });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const jobRole = await JobRole.findOne({
      title: roleTitle,
      company: company._id,
    });

    if (!jobRole) {
      return res.status(404).json({ message: "Job role not found" });
    }

    const thread = await Thread.create({
      company: company._id,
      jobRole: jobRole._id,
      yearOfPlacement,
      difficulty,
      rounds,
      topicsCovered,
      experience,
      candidateName,
      linkedin,
    });

    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Threads with Filtering
exports.getThreads = async (req, res) => {
  try {
    const { company, role, year, difficulty, page = 1, limit = 10, search } = req.query;

    let filter = {};

    // Company filter
    if (company) {
      const companyDoc = await Company.findOne({ slug: company });
      if (companyDoc) {
        filter.company = companyDoc._id;
      }
    }

    // Role filter
    if (role) {
      const roleDoc = await JobRole.findOne({ title: role });
      if (roleDoc) {
        filter.jobRole = roleDoc._id;
      }
    }

    // Year filter
    if (year) {
      filter.yearOfPlacement = Number(year);
    }

    // Difficulty filter
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Text search (experience field)
    if (search) {
      filter.experience = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const threads = await Thread.find(filter)
      .populate("company", "name slug")
      .populate("jobRole", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Thread.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      results: threads,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getThreadById = async (req, res) => {
  try {
    const { id } = req.params;

    const thread = await Thread.findById(id)
      .populate("company", "name slug")
      .populate("jobRole", "title");

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    res.status(200).json(thread);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Company Stats
exports.getCompanyStats = async (req, res) => {
  try {
    const stats = await Thread.aggregate([
      {
        $group: {
          _id: "$company",
          totalThreads: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "companyDetails",
        },
      },
      { $unwind: "$companyDetails" },
      {
        $project: {
          _id: 0,
          company: "$companyDetails.name",
          slug: "$companyDetails.slug",
          totalThreads: 1,
        },
      },
      {
        $sort: { totalThreads: -1 },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Difficulty Distribution

exports.getDifficultyStats = async (req, res) => {
  try {
    const stats = await Thread.aggregate([
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          difficulty: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get YearWise Stats
exports.getYearStats = async (req, res) => {
  try {
    const stats = await Thread.aggregate([
      {
        $group: {
          _id: "$yearOfPlacement",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          total: 1,
        },
      },
      {
        $sort: { year: -1 },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
