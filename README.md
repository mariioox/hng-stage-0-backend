HNG Stage 0: Gender Classification API

A professional, high-performance Node.js API that integrates with the Genderize.io external service to provide processed gender predictions based on name queries.

🚀 Features

    Data Transformation: Renames raw API fields to a more descriptive sample_size schema.

    Confidence Logic: Implements a strict confidence check (probability≥0.7 and sample_size≥100).

    Strict Validation: Returns 400 or 422 errors for invalid inputs.

    CORS Enabled: Fully accessible for cross-origin grading scripts.

    Speed: Optimized for sub-500ms processing (excluding external API latency).

🛠️ Technical Stack

    Runtime: Node.js (v18+)

    Framework: Express.js

    HTTP Client: Axios

    Deployment: [Vercel]

📖 API Documentation
1. Classify Name

Returns gender prediction and confidence metrics for a given name.

Endpoint: GET /api/classify?name={name}

Success Response (200 OK):

    JSON
     {
       "status": "success",
       "data": {
         "name": "jeffery",
         "gender": "male",
         "probability": 0.99,
         "sample_size": 1234,
         "is_confident": true,
         "processed_at": "2026-04-01T12:00:00Z"
       }
     }
 
Error Responses:

    400 Bad Request: Name parameter is missing.

    422 Unprocessable Entity: Name is not a valid string.

    200 Error: Prediction not found (e.g., for fake/rare names).

⚙️ Local Setup

    Clone the repository:
    git clone https://github.com/mariioox/hng-stage-0-backend.git
    cd hng-stage-0-backend

    Install dependencies:
    npm install

    Start the server:
    npm start

    The server will be live at http://localhost:3000.


🧪 Testing

You can test the endpoint using curl:

curl "http://localhost:3000/api/classify?name=john"

📝 License

This project is licensed under the MIT License.

    Note to Reviewers: The processed_at timestamp is generated dynamically in ISO 8601 format for every request. All edge cases (gender: null, count: 0) are handled as per the stage requirements.
