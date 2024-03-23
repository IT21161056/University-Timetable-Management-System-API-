import { CustomError } from "../exceptions/baseException";
import Resource from "../models/resourceModel";
import { tryCatch } from "../utils/tryCatchWrapper";

// Controller for creating a resource
const createResource = tryCatch(async (req, res) => {
  const { resourceName, description } = req.body;

  if (!resourceName) throw new CustomError("Resource name is required!", 500);

  const newResource = await Resource.create({
    resourceName,
    description,
  });

  if (!newResource) throw new CustomError("Resource creation fail.", 500);

  res.status(201).json(savedResource);
});

// Controller for updating a resource
const updateResource = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { resourceName, description } = req.body;
  const updatedResource = await Resource.findByIdAndUpdate(
    id,
    {
      resourceName,
      description,
    },
    { new: true }
  );

  res.status(200).json(updatedResource);
});

// Controller for deleting a resource
const deleteResource = tryCatch(async (req, res) => {
  const { id } = req.params;
  const resource = await Resource.findByIdAndDelete(id);

  if (!resource) {
    throw new CustomError("Resource not found", 404);
  }

  res.status(200).json({ message: "Resource deleted" });
});

// Controller for getting all resources
const getAllResources = tryCatch(async (req, res) => {
  const resources = await Resource.find();

  if (!resources.length) throw new CustomError("Resources not found!", 404);

  res.json(resources);
});

// Controller for getting a resource by ID
const getResourceById = tryCatch(async (req, res) => {
  const { id } = req.params;
  const resource = await Resource.findById(id);

  if (!resource) {
    throw new CustomError("Resource not found", 404);
  }
  res.json(resource);
});

export {
  createResource,
  updateResource,
  deleteResource,
  getAllResources,
  getResourceById,
};
