const db = require('../config/db');

exports.getDataByKeyword = async (req, res) => {
    try {
        const { keyword } = req.params;

        let query = '';
        let values = [];

        if (keyword === 'Dailytracker') {
            query = 'SELECT country, abm, user_region FROM xah_december_data WHERE 1=1';

        } else if (keyword === 'MONTHWISE') {
            query = 'SELECT rcluster, product_group FROM xah_december_data WHERE 1=1';

        } else if (keyword === 'ECpb') {
            query = 'SELECT rcluster, product_group, discount, qty FROM xah_december_data WHERE 1=1';

        } else if (keyword === 'Country') {
            query = 'SELECT user_region ,product_group, rcluster FROM xah_december_data WHERE 1=1';

        } else {
            return res.status(404).json({
                success: false,
                message: `Keyword '${keyword}' not recognized. Use Dailytracker, MONTHWISE, ECpb, or target.`
            });
        }

        const result = await db.query(query, values);

        res.status(200).json({
            success: true,
            message: `${keyword} data fetched properly`,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error(`Error in get ${req.params.keyword}:`, error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
