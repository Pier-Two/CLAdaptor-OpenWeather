# Secure Data Links Open Weather Adaptor

This adaptor allows nodes to support the Open Weather API. It was built using the Chainlink NodeJS Template available at https://github.com/thodges-gh/CL-EA-NodeJS-Template.

## Setup

### Docker
```bash
docker build . -t openweatheradaptor
docker run --name openweatheradaptor -p 5000:80 -e PORT=80 -e API_KEY=<YOUR_API_KEY> openweatheradaptor
```

### Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-ea.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save


###  Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-ea.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key

## Parameters
The following API endpoints are supported with the related parameters. Note CitId is a ID specific to the Open Weather API. To Find the CityID for any city, visit http://bulk.openweathermap.org/sample/city.list.json.gz

- Current Weather Data
    - Endpoint: weather
    - Params
        - CityId: The City ID to get data for

- Forcasted Weather Data
    - Endpoint: forecast
    - Params
        - CityId: The City ID to get data for
        - Days: The number of days to get data for (up to 5 days)

The following premium API endpoints are also supported

- Forcasted Weather Data (Hourly)
    - Endpoint: forecast/hourly
    - Params
        - CityId: The City ID to get data for
        - Days: The number of days to get data for (up to 4 days)

- Forcasted Weather Data (16 Days)
    - Endpoint: forecast/daily
    - Params
        - CityId: The City ID to get data for
        - Days: The number of days to get data for (up to 16 days)

## Testing
```bash
API_KEY=<YOUR_API_KEY> npm test
```
