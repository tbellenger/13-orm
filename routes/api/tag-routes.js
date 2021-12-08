const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      where: {
        id = req.params.id
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!tag) {
      res.status(404).json({message:"Unknown tag ID"});
      return;
    } else {
      res.json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleted) {
      res.status(404).json({ message: "No Tag with this ID found" });
      return;
    } else {
      res.json(deleted);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
