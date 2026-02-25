const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../config/db');

// Path to your CSV file
const CSV_FILE_PATH = path.join(__dirname, '../../2605-xah-dec-data.csv');

async function importCsvData() {
    const results = [];

    // Read the CSV file
    try {
        await db.query('TRUNCATE TABLE xah_december_data;');
        console.log('✅ Existing data cleared successfully.');
    } catch (error) {
        console.error('❌ Error clearing existing data:', error);
        process.exit(1);
    }

    fs.createReadStream(CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(`Successfully parsed ${results.length} rows from CSV.`);

            try {
                // Determine all column names from the provided schema
                const columns = [
                    "year", "locationcode", "subbrandcode", "country", "storename",
                    "abm", "user_country", "user_channel", "openingdate", "store_opg_year",
                    "storetype", "customer", "docdate", "ulp", "mobileno",
                    "nps", "hni", "gep", "indian", "nr",
                    "tourist", "forbill", "invoice_type", "usd_conv", "aed_conv",
                    "inr_conv", "totalbill", "studbill", "gender", "maritalstatus",
                    "nationality", "community", "enroll_loccode", "kpitypea", "rcluster",
                    "product_group", "user_region", "tep", "active_repeat", "catchment",
                    "ltltype", "target_field", "walkins", "conversions", "qty",
                    "salesvalue", "actwt", "discount", "tax", "nsv",
                    "makingcharge", "goldprice", "stonevalue", "usd_salesvalue", "usd_discount",
                    "usd_tax", "usd_nsv", "usd_makingcharge", "usd_goldprice", "usd_stonevalue",
                    "aed_salesvalue", "aed_discount", "aed_tax", "aed_nsv", "aed_makingcharge",
                    "aed_goldprice", "aed_stonevalue", "inr_salesvalue", "inr_discount", "inr_tax",
                    "inr_nsv", "inr_makingcharge", "inr_goldprice", "inr_stonevalue", "studdedsales",
                    "plainsales", "gep_salesvalue", "studded_qty", "studgep_salesvalue", "totalbuyers",
                    "studdedbuyers", "plainbuyers", "btq"
                ];

                // Generate parameterized values "$1, $2, $3..."
                const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

                const query = `
                    INSERT INTO xah_december_data (
                        ${columns.map(col => `"${col}"`).join(', ')}
                    ) 
                    VALUES (${placeholders})
                `;

                // Loop through rows and insert them into the database
                for (const row of results) {

                    // Helper function to handle parsing numbers gracefully
                    const parseNumber = (val, isFloat = false) => {
                        if (val === undefined || val === null || val.toString().trim() === '') return null;
                        const parsed = isFloat ? parseFloat(val) : parseInt(val, 10);
                        return isNaN(parsed) ? null : parsed;
                    };

                    const values = [
                        row['year'] || null,
                        row['locationcode'] || null,
                        row['subbrandcode'] || null,
                        row['country'] || null, // Keeping the lower case if your excel header is lower case, if your excel is 'Country', change this to row['Country']
                        row['storename'] || null,
                        row['abm'] || null,
                        row['user_country'] || null,
                        row['user_channel'] || null,
                        row['openingdate'] || null,
                        row['store_opg_year'] || null,
                        row['storetype'] || null,
                        row['customer'] || null,
                        row['docdate'] || null,
                        row['ulp'] || null,
                        row['mobileno'] || null,
                        row['nps'] || null,
                        row['hni'] || null,
                        row['gep'] || null,
                        row['indian'] || null,
                        row['nr'] || null,
                        row['tourist'] || null,
                        row['forbill'] || null,
                        row['invoice_type'] || null,
                        parseNumber(row['usd_conv'], true),
                        parseNumber(row['aed_conv']),
                        parseNumber(row['inr_conv']),
                        parseNumber(row['totalbill']),
                        parseNumber(row['studbill']),
                        row['gender'] || null,
                        row['maritalstatus'] || null,
                        row['nationality'] || null,
                        row['community'] || null,
                        row['enroll_loccode'] || null,
                        row['kpitypea'] || null,
                        row['rcluster'] || null,
                        row['product_group'] || null,
                        row['user_region'] || null,
                        row['tep'] || null,
                        row['active_repeat'] || null,
                        row['catchment'] || null,
                        row['ltltype'] || null,
                        row['target_field'] || null,
                        parseNumber(row['walkins']),
                        parseNumber(row['conversions']),
                        parseNumber(row['qty']),
                        parseNumber(row['salesvalue'], true),
                        parseNumber(row['actwt'], true),
                        parseNumber(row['discount'], true),
                        parseNumber(row['tax'], true),
                        parseNumber(row['nsv'], true),
                        parseNumber(row['makingcharge'], true),
                        parseNumber(row['goldprice'], true),
                        parseNumber(row['stonevalue'], true),
                        parseNumber(row['usd_salesvalue'], true),
                        parseNumber(row['usd_discount'], true),
                        parseNumber(row['usd_tax'], true),
                        parseNumber(row['usd_nsv'], true),
                        parseNumber(row['usd_makingcharge'], true),
                        parseNumber(row['usd_goldprice'], true),
                        parseNumber(row['usd_stonevalue'], true),
                        parseNumber(row['aed_salesvalue'], true),
                        parseNumber(row['aed_discount'], true),
                        parseNumber(row['aed_tax'], true),
                        parseNumber(row['aed_nsv'], true),
                        parseNumber(row['aed_makingcharge'], true),
                        parseNumber(row['aed_goldprice'], true),
                        parseNumber(row['aed_stonevalue'], true),
                        parseNumber(row['inr_salesvalue'], true),
                        parseNumber(row['inr_discount'], true),
                        parseNumber(row['inr_tax'], true),
                        parseNumber(row['inr_nsv'], true),
                        parseNumber(row['inr_makingcharge'], true),
                        parseNumber(row['inr_goldprice'], true),
                        parseNumber(row['inr_stonevalue'], true),
                        parseNumber(row['studdedsales'], true),
                        parseNumber(row['plainsales'], true),
                        parseNumber(row['gep_salesvalue'], true),
                        parseNumber(row['studded_qty']),
                        parseNumber(row['studgep_salesvalue'], true),
                        parseNumber(row['totalbuyers']),
                        parseNumber(row['studdedbuyers']),
                        parseNumber(row['plainbuyers']),
                        row['btq'] || null
                    ];

                    await db.query(query, values);
                }

                console.log('✅ Data import completed successfully!');
                process.exit(0);

            } catch (error) {
                console.error('❌ Error inserting data into database:', error);
                process.exit(1);
            }
        });
}

// Ensure the local database is connected before running
console.log('Starting data import process...');
importCsvData();
