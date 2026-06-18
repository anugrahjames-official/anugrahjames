document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section-block');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active to clicked
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Chart.js Setup for Digital Score
    const chartCanvas = document.getElementById('digitalScoreChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Visibility (35)', 'Trust (78)', 'Conversion (20)', 'Branding (55)', 'SEO (15)', 'Customer UX (60)'],
                datasets: [{
                    label: 'Digital Presence Score',
                    data: [35, 78, 20, 55, 15, 60],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: '#E4E4E7'
                        },
                        grid: {
                            color: '#E4E4E7'
                        },
                        pointLabels: {
                            color: '#52525B',
                            font: {
                                family: "'Geist Sans', -apple-system, sans-serif",
                                size: 14
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#52525B',
                            stepSize: 20,
                            max: 100,
                            min: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide legend to save space, label is descriptive enough
                    },
                    tooltip: {
                        backgroundColor: 'rgba(9, 9, 11, 0.9)',
                        titleFont: {
                            family: "'Geist Sans', -apple-system, sans-serif",
                            size: 14
                        },
                        bodyFont: {
                            family: "'Geist Sans', -apple-system, sans-serif",
                            size: 14
                        },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false
                    }
                }
            }
        });
    }
});
