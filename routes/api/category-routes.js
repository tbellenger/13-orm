const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const product = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    if (!product) {
      res.status(404).json({ message: "Category with this ID not found" });
      return;
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleted) {
      res.status(404).json({ message: "No product with this ID found" });
      return;
    } else {
      res.json(deleted);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
