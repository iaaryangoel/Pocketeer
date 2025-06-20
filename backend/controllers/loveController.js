const Love = require("../model/Love");

// Get love count
exports.getLove = async (req, res) => {
  try {
    const love = await Love.findOne();
    res.json({ count: love?.count || 0 });
  } catch (error) {
    res.json({ message: "Server Error" });
  }
};

// Update love count
exports.updateLove = async (req, res) => {
  try {
    const love = (await Love.findOne()) || new Love({ count: 0 });
    const { increment } = req.body;

    love.count += increment ? 1 : -1;
    if (love.count < 0) love.count = 0;
    await love.save();
    res.json({ count: love.count });
  } catch (error) {
    res.json({ message: "Server Error" });
  }
};
