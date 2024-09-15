const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Import routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
