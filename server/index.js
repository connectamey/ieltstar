import app from './api/app.js'; // Import the app

app.listen(process.env.PORT, () => { // Start the server
    console.log(`Server listening on port ${process.env.PORT}`);
});