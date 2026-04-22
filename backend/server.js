const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const examRoutes = require('./routes/examRoutes');
const statsRoutes = require('./routes/statsRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const studentRoutes = require('./routes/studentRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const advertisementRoutes = require('./routes/advertisementRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const winnerRoutes = require('./routes/winnerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/winners', winnerRoutes);

// Statically serve the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Talentley School API' });
});

sequelize.sync().then(async () => {
    // Seed Admin if not exists
    const bcrypt = require('bcryptjs');
    const { Admin } = require('./models');
    const adminExists = await Admin.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await Admin.create({ username: 'admin', password: hashedPassword });
        console.log('Default admin created: admin/admin123');
    }

    app.listen(PORT, () => {

        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
