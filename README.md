# TypeScript Node.js Backend with Zapier and Google Sheets Integration

This project is a TypeScript Node.js backend application that provides user management and data storage functionality, integrated with Zapier for webhook actions and Google Sheets for data storage.

## Table of Contents

- [Setup](#setup)
- [Building the Project](#building-the-project)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Zapier and Google Sheets Integration](#zapier-and-google-sheets-integration)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   ZAPIER_WEBHOOK_URL=your_zapier_webhook_url_here
   ```

   Replace `your_zapier_webhook_url_here` with your actual Zapier webhook URL.

## Building the Project

To build the TypeScript project, run:

```bash
npm run build
```

This command compiles the TypeScript files.

## Running Locally

To run the built version of the project:

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### 1. Create a new user

- **URL**: `/user`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "id": "1623456789",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### 2. Post data for a user

- **URL**: `/user/:id/data`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "key1": "value1",
    "key2": "value2"
  }
  ```
- **Response**:
  ```json
  {
    "userId": "1623456789",
    "data": {
      "key1": "value1",
      "key2": "value2"
    }
  }
  ```

### 3. Get user data

- **URL**: `/user/:id/data`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "userId": "1623456789",
      "data": {
        "key1": "value1",
        "key2": "value2"
      }
    }
  ]
  ```

## Zapier and Google Sheets Integration

This project includes a webhook action that sends user data to Zapier, which can then be used to store the data in a Google Sheet.

### Setup:

1. Create a Zap in Zapier.
2. Choose "Webhook" as the trigger app and select "Catch Hook" as the trigger event.
3. Copy the provided webhook URL and add it to your `.env` file as `ZAPIER_WEBHOOK_URL`.
4. Set up an action in Zapier to add a row to a Google Sheet.
5. Map the incoming data from the webhook to the appropriate columns in your Google Sheet.

Now, whenever data is posted to the `/user/:id/data` endpoint, it will be sent to Zapier and automatically added to your Google Sheet.

### Example Zapier Configuration:

1. Trigger: Webhook by Zapier
   - Event: Catch Hook
2. Action: Google Sheets
   - Action Event: Create Spreadsheet Row
   - Spreadsheet: Your Google Sheet
   - Worksheet: The specific worksheet to add data to
   - Mapped fields:
     - User Id: `{{userId}}`
     - Data Name: `{{data__Data Name}}`
     - Data Email: `{{data__Data Email}}`

This configuration assumes your Google Sheet has columns for UserId, Key1, and Key2. Adjust the mapping according to your specific data structure and sheet layout.
```
