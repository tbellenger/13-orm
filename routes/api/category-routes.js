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

router.post("/", async (req, res) => {
  // create a new category
  try {
    const create = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(create);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!update) {
      res.status(404).json({ message: "Category with id not found" });
      return;
    }
    res.json(update);
  } catch (err) {
    res.status(500).json(err);
  }
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
      res.status(404).json({ message: "No category with this ID found" });
      return;
    } else {
      res.json(deleted);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
