let bitcoinChart;

// Read the CSV file
async function fetchCSVData() {
    const response = await fetch("data.csv");
    const data = await response.text();
    return data;
}

// Parse the CSV data
function parseCSVData(csvData) {
    const data = Papa.parse(csvData, { header: true }).data;
    const prices = data.map(row => parseFloat(row.Price.replace(",", "")));
    const dates = data.map(row => row.Date);

    return { dates, prices };
}

// Filter data based on the selected time range
function filterData(dates, prices, range) {
    const filteredDates = [];
    const filteredPrices = [];

    for (let i = 0; i < dates.length; i++) {
        let includeData = false;
        const currentDate = moment(dates[i]);

        if (range === 'weekly' && currentDate.day() === 0) {
            includeData = true;
        } else if (range === 'monthly' && currentDate.date() === 1) {
            includeData = true;
        } else if (range === 'yearly' && currentDate.dayOfYear() === 1) {
            includeData = true;
        } else if (!range) {
            includeData = true;
        }

        if (includeData) {
            filteredDates.push(dates[i]);
            filteredPrices.push(prices[i]);
        }
    }

    return { dates: filteredDates, prices: filteredPrices };
}

// Create the chart
async function createChart(range = '') {
    const csvData = await fetchCSVData();
    const { dates, prices } = parseCSVData(csvData);
    const { dates: filteredDates, prices: filteredPrices } = filterData(dates, prices, range);

    const ctx = document.getElementById("myChart");

    if (bitcoinChart) {
        bitcoinChart.destroy();
    }

    bitcoinChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: filteredDates,
            datasets: [{
                label: 'Price',
                data: filteredPrices,
                borderColor: 'rgba(0, 0, 255, 1)',
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Price'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                        
                    },
                    reverse: true,
                }
            }
        }
    });
}

// Update the chart based on the selected time range
function updateChart(range) {
    createChart(range);
}

// Initialize the chart with all data
createChart();
