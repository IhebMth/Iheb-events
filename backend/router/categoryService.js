const express = require("express");
const router = express.Router();
const CategoryService = require("../models/categoryService");

// Create a new category service
router.post("/", async (req, res) => {
  const { libelle, type } = req.body;

  const maxcategoryServiceId = await CategoryService.findOne(
    {},
    {},
    { sort: { categoryServiceId: -1 }, categoryServiceId: 1 }
  );

  // Generate the new userId by incrementing the maximum value by 1
  const newcategoryServiceId = maxcategoryServiceId
    ? maxcategoryServiceId.categoryServiceId + 1
    : 1;

  const newCategoryService = new CategoryService({
    categoryServiceId: newcategoryServiceId,
    libelle,
    type,
  });

  newCategoryService
    .save()
    .then((savedCategoryService) => {
      res.status(201).json(savedCategoryService);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to create category service" + error });
    });
});

// Get all category services
router.get("/", (req, res) => {
  CategoryService.find()
    .then((categoryServices) => {
      res.status(200).json(categoryServices);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to retrieve category services" + error });
    });
});

// Get a category service by categoryServiceId
router.get("/:categoryServiceId", (req, res) => {
  const categoryServiceId = req.params.categoryServiceId;
  CategoryService.findOne({ categoryServiceId })
    .then((categoryService) => {
      if (categoryService) {
        res.status(200).json(categoryService);
      } else {
        res.status(404).json({ error: "Category service not found" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to retrieve category service" + error });
    });
});

// Update a category service by categoryServiceId
router.put("/:categoryServiceId", (req, res) => {
  const categoryServiceId = req.params.categoryServiceId;
  const { libelle, serviceId } = req.body;
  CategoryService.findOneAndUpdate(
    { categoryServiceId },
    { libelle, serviceId },
    { new: true }
  )
    .then((updatedCategoryService) => {
      if (updatedCategoryService) {
        res.status(200).json(updatedCategoryService);
      } else {
        res.status(404).json({ error: "Category service not found" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to update category service" + error });
    });
});

// Delete a category service by categoryServiceId
router.delete("/:categoryServiceId", (req, res) => {
  const categoryServiceId = req.params.categoryServiceId;
  CategoryService.findOneAndDelete({ categoryServiceId })
    .then((deletedCategoryService) => {
      if (deletedCategoryService) {
        res.status(200).json(deletedCategoryService);
      } else {
        res.status(404).json({ error: "Category service not found" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to delete category service" + error });
    });
});

module.exports = router;
