# IT21161056 - Peiris M.M.A.E

# University Timetable Management System API

This RESTful API facilitates the management of a university's timetable system, allowing for the creation, modification, and querying of class schedules for students, faculty, and administrative staff.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   https://github.com/sliitcsse/assignment-01-IT21161056.git

   ```

2. **Install dependencies:**

   - navigate to backend folder

   ```bash
   cd backend
   ```

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file based on `.env.example`.
   - Modify the `.env` file to include your MongoDB connection string, JWT secret key, and any other necessary configurations.

4. **Start the server:**

   ```bash
   npm start
   ```

## Running Tests

### Unit Testing

To run unit tests, use the following command:

```bash
npm test test/<name of the test file.>
```

### Integration Testing

Integration tests ensure different parts of the application work together seamlessly. Before running integration tests, ensure you have a separate test database set up.

1. Create a test database in MongoDB.
2. Set up a separate environment configuration for testing (e.g., `.env.test`) with the test database connection string.
3. Update the `config/db.js` file to use the test environment configuration when running tests.
4. Run integration tests using the following command:

```bash
npm run test:integration
```

### Performance Testing

Performance tests evaluate the API's performance under various loads. Before running performance tests, ensure you have a tool like Artillery.io installed and configured.

1. Install Artillery.io globally if you haven't already:

   ```bash
   npm install -g artillery
   ```

2. Write your performance test scripts in the `tests/performance` directory.

3. Run performance tests using the following command:

   ```bash
   artillery run <test_script.yml>
   ```

## Additional Notes

- Ensure MongoDB is running before starting the server.
- Make sure to handle errors, validations, and security aspects appropriately throughout the codebase.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)
