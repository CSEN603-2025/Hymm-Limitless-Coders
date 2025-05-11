import React, { useState } from 'react';
import { useReports } from '../Context/ReportContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Award, FileCheck, FileX, Flag, Clock, Book, Loader } from 'lucide-react';
import '../Styles/Statistics.css';
import NaggarRoutes from '../NaggarRoutes';

function Statistics() {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { reports, evaluations } = useReports();

  // Report status counts
  const counts = {
    accepted: reports.filter(r => r.status === 'Accepted').length,
    rejected: reports.filter(r => r.status === 'Rejected').length,
    flagged: reports.filter(r => r.status === 'Flagged').length,
  };

  // Status chart data
  const statusData = [
    { name: 'Accepted', value: counts.accepted },
    { name: 'Rejected', value: counts.rejected },
    { name: 'Flagged', value: counts.flagged },
  ];

  // Average review time calculation
  const avgReviewTime = evaluations.length > 0
    ? (evaluations.reduce((sum, e) => sum + (e.reviewTimeDays || 0), 0) / evaluations.length).toFixed(2)
    : 'N/A';

  // Course frequency calculation
  const courseFrequency = evaluations.reduce((acc, e) => {
    acc[e.course] = (acc[e.course] || 0) + 1;
    return acc;
  }, {});

  const mostUsedCourse = Object.entries(courseFrequency).length > 0
    ? Object.entries(courseFrequency).sort((a, b) => b[1] - a[1])[0][0]
    : 'N/A';

  // Company ratings calculation
  const companyRatings = {};
  evaluations.forEach(e => {
    if (!companyRatings[e.companyName]) {
      companyRatings[e.companyName] = { total: 0, count: 0 };
    }
    companyRatings[e.companyName].total += e.rating || 0;
    companyRatings[e.companyName].count += 1;
  });

  // Top rated companies
  const topRatedCompanies = Object.entries(companyRatings)
    .map(([company, data]) => ({
      company,
      avgRating: (data.total / data.count).toFixed(2),
      count: data.count,
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 3);

  // Companies with most internships
  const topInternshipCompanies = Object.entries(companyRatings)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([company, data]) => ({ company, count: data.count }))
    .slice(0, 3);

  // Rating chart data
  const ratingData = topRatedCompanies.map(company => ({
    name: company.company,
    rating: parseFloat(company.avgRating),
  }));

  // Generate PDF report function
  const downloadReport = () => {
    setIsGeneratingReport(true);
    // Create a hidden canvas element for chart rendering
    const renderChart = (data, title, xKey, yKey, color, maxY = null) => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');

      // Draw background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Chart title
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(title, 30, 30);

      // Set chart area
      const chartArea = {
        x: 50,
        y: 50,
        width: canvas.width - 100,
        height: canvas.height - 80
      };

      // Draw axis
      ctx.strokeStyle = '#cccccc';
      ctx.beginPath();
      ctx.moveTo(chartArea.x, chartArea.y);
      ctx.lineTo(chartArea.x, chartArea.y + chartArea.height);
      ctx.lineTo(chartArea.x + chartArea.width, chartArea.y + chartArea.height);
      ctx.stroke();

      // Calculate bar width and spacing
      const barWidth = chartArea.width / data.length / 2;
      const barSpacing = barWidth;

      // Find max value for y-axis scaling
      const maxValue = maxY || Math.max(...data.map(item => item[yKey])) * 1.1;

      // Draw bars
      data.forEach((item, index) => {
        const value = item[yKey];
        const barHeight = (value / maxValue) * chartArea.height;
        const x = chartArea.x + (barWidth + barSpacing) * index + barSpacing;
        const y = chartArea.y + chartArea.height - barHeight;

        // Bar
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight);

        // X-axis label
        ctx.fillStyle = '#333333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item[xKey].substring(0, 10) + (item[xKey].length > 10 ? '...' : ''),
                    x + barWidth / 2, chartArea.y + chartArea.height + 20);

        // Value label
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText(value, x + barWidth / 2, y - 5);
      });

      return canvas.toDataURL('image/png');
    };

    // Function to format date
    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    // Import jsPDF dynamically
    import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
      .then(() => {
        import('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js')
          .then(() => {
            // Create PDF document
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'pt', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 40;
            let yPos = margin;

            // Helper function for text wrapping
            const addWrappedText = (text, y, fontSize, fontStyle = 'normal') => {
              doc.setFontSize(fontSize);
              doc.setFont('helvetica', fontStyle);
              const textWidth = pageWidth - 2 * margin;
              const textLines = doc.splitTextToSize(text, textWidth);
              doc.text(textLines, margin, y);
              return y + (textLines.length * fontSize * 1.15);
            };

            // Add Logo/Header
            doc.setFillColor(73, 114, 176);
            doc.rect(0, 0, pageWidth, 60, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            doc.text('Internship Statistics Report', margin, 40);
            yPos = 100;

            // Add date and time
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Generated on ${formatDate(new Date())} at ${new Date().toLocaleTimeString()}`, margin, yPos);
            yPos += 30;

            // Summary Section
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(73, 114, 176);
            doc.text('Executive Summary', margin, yPos);
            yPos += 25;

            // Summary content
            doc.setTextColor(60, 60, 60);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');

            yPos = addWrappedText(`This report provides a comprehensive overview of internship statistics, including report status distribution, review times, and company performance metrics. The data reflects ${reports.length} total internship reports processed through our system.`, yPos, 11);
            yPos += 20;

            // Key Metrics Table
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(73, 114, 176);
            doc.text('Key Metrics', margin, yPos);
            yPos += 20;

            doc.autoTable({
              startY: yPos,
              head: [['Metric', 'Value']],
              body: [
                ['Total Reports', reports.length],
                ['Accepted Reports', counts.accepted],
                ['Rejected Reports', counts.rejected],
                ['Flagged Reports', counts.flagged],
                ['Average Review Time', `${avgReviewTime} days`],
                ['Most Used Course', mostUsedCourse]
              ],
              theme: 'grid',
              headStyles: {
                fillColor: [73, 114, 176],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
              },
              alternateRowStyles: {
                fillColor: [240, 240, 240]
              },
              margin: { left: margin, right: margin }
            });

            yPos = doc.lastAutoTable.finalY + 30;

            // Status Distribution Chart
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(73, 114, 176);
            doc.text('Report Status Distribution', margin, yPos);
            yPos += 20;

            // Generate and add status chart
            const statusChartImage = renderChart(statusData, '', 'name', 'value', '#4C72B0');
            doc.addImage(statusChartImage, 'PNG', margin, yPos, pageWidth - 2 * margin, 200);
            yPos += 220;

            // Add new page if we're running out of space
            if (yPos > pageHeight - 200) {
              doc.addPage();
              yPos = margin;
            }

            // Top Rated Companies Section
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(73, 114, 176);
            doc.text('Top Rated Companies', margin, yPos);
            yPos += 20;

            if (topRatedCompanies.length > 0) {
              // Top Rated Companies Table
              doc.autoTable({
                startY: yPos,
                head: [['Rank', 'Company', 'Average Rating', 'Reports']],
                body: topRatedCompanies.map((company, index) => [
                  index + 1,
                  company.company,
                  company.avgRating,
                  company.count
                ]),
                theme: 'grid',
                headStyles: {
                  fillColor: [73, 114, 176],
                  textColor: [255, 255, 255],
                  fontStyle: 'bold'
                },
                alternateRowStyles: {
                  fillColor: [240, 240, 240]
                },
                margin: { left: margin, right: margin }
              });

              yPos = doc.lastAutoTable.finalY + 30;

              // Add ratings chart if there's space
              if (yPos < pageHeight - 250) {
                // Ratings Chart
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(73, 114, 176);
                doc.text('Company Ratings Comparison', margin, yPos);
                yPos += 20;

                const ratingChartImage = renderChart(ratingData, '', 'name', 'rating', '#55A868', 5);
                doc.addImage(ratingChartImage, 'PNG', margin, yPos, pageWidth - 2 * margin, 200);
                yPos += 220;
              } else {
                // Add new page
                doc.addPage();
                yPos = margin;

                // Ratings Chart
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(73, 114, 176);
                doc.text('Company Ratings Comparison', margin, yPos);
                yPos += 20;

                const ratingChartImage = renderChart(ratingData, '', 'name', 'rating', '#55A868', 5);
                doc.addImage(ratingChartImage, 'PNG', margin, yPos, pageWidth - 2 * margin, 200);
                yPos += 220;
              }
            } else {
              doc.setTextColor(100, 100, 100);
              doc.setFont('helvetica', 'italic');
              doc.setFontSize(11);
              doc.text('No company rating data available.', margin, yPos);
              yPos += 20;
            }

            // Add new page if we're running out of space
            if (yPos > pageHeight - 200) {
              doc.addPage();
              yPos = margin;
            }

            // Top Internship Providers
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(73, 114, 176);
            doc.text('Top Internship Providers', margin, yPos);
            yPos += 20;

            if (topInternshipCompanies.length > 0) {
              // Top Internship Providers Table
              doc.autoTable({
                startY: yPos,
                head: [['Rank', 'Company', 'Number of Internships']],
                body: topInternshipCompanies.map((company, index) => [
                  index + 1,
                  company.company,
                  company.count
                ]),
                theme: 'grid',
                headStyles: {
                  fillColor: [73, 114, 176],
                  textColor: [255, 255, 255],
                  fontStyle: 'bold'
                },
                alternateRowStyles: {
                  fillColor: [240, 240, 240]
                },
                margin: { left: margin, right: margin }
              });

              yPos = doc.lastAutoTable.finalY + 20;
            } else {
              doc.setTextColor(100, 100, 100);
              doc.setFont('helvetica', 'italic');
              doc.setFontSize(11);
              doc.text('No internship provider data available.', margin, yPos);
              yPos += 20;
            }

            // Footer on each page
            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
              doc.setPage(i);
              doc.setFontSize(10);
              doc.setTextColor(150, 150, 150);
              doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 40, pageHeight - 30);
              doc.text('© Internship Statistics Dashboard', margin, pageHeight - 30);
            }

            // Save the PDF
            doc.save(`InternshipStatisticsReport_${new Date().toISOString().split('T')[0]}.pdf`);
            setIsGeneratingReport(false);
          });
      })
      .catch(error => {
        console.error("Error loading PDF libraries:", error);
        alert("Could not generate PDF report. Falling back to text report.");

        // Fallback to text report
        const reportText = `
Internship Statistics Report (Generated on ${new Date().toLocaleDateString()})
===============================================================

SUMMARY
-------
Accepted Reports: ${counts.accepted}
Rejected Reports: ${counts.rejected}
Flagged Reports: ${counts.flagged}
Total Reports: ${reports.length}
Average Review Time: ${avgReviewTime} days
Most Used Course: ${mostUsedCourse}

TOP RATED COMPANIES
------------------
${topRatedCompanies.map(c => `${c.company}: ${c.avgRating} stars (${c.count} reports)`).join('\n')}

TOP INTERNSHIP PROVIDERS
----------------------
${topInternshipCompanies.map(c => `${c.company}: ${c.count} reports`).join('\n')}
        `.trim();

        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `InternshipStatisticsReport_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        setIsGeneratingReport(false);
      });
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <NaggarRoutes className="navbar" />
      </header>

      <main className="content-area" role="main">
        <div className="statistics-container">
          <div className="statistics-header">
            <h1>Internship Statistics Dashboard</h1>
            <button className="download-btn" onClick={downloadReport} disabled={isGeneratingReport}>
              {isGeneratingReport ? (
                <>
                  <Loader size={16} className="spinner" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Generate Professional PDF Report</span>
                </>
              )}
            </button>
          </div>

          <div className="statistics-overview">
            <div className="stat-card">
              <div className="stat-icon accepted">
                <FileCheck size={24} />
              </div>
              <div className="stat-content">
                <h3>Accepted</h3>
                <p className="stat-value">{counts.accepted}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon rejected">
                <FileX size={24} />
              </div>
              <div className="stat-content">
                <h3>Rejected</h3>
                <p className="stat-value">{counts.rejected}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon flagged">
                <Flag size={24} />
              </div>
              <div className="stat-content">
                <h3>Flagged</h3>
                <p className="stat-value">{counts.flagged}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon review-time">
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>Avg. Review Time</h3>
                <p className="stat-value">{avgReviewTime} days</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon course">
                <Book size={24} />
              </div>
              <div className="stat-content">
                <h3>Top Course</h3>
                <p className="stat-value">{mostUsedCourse}</p>
              </div>
            </div>
          </div>

          <div className="statistics-charts">
            <div className="chart-container">
              <h2>Report Status Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4C72B0" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h2>Top Company Ratings</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#55A868" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="statistics-lists">
            <div className="list-container">
              <h2>
                <Award size={20} />
                <span>Top Rated Companies</span>
              </h2>
              <div className="company-list">
                {topRatedCompanies.map((c, i) => (
                  <div key={i} className="company-item">
                    <div className="company-rank">{i + 1}</div>
                    <div className="company-info">
                      <h3>{c.company}</h3>
                      <div className="company-stats">
                        <div className="rating">
                          <span className="stars">{c.avgRating}</span> stars
                        </div>
                        <div className="count">
                          ({c.count} {c.count === 1 ? 'report' : 'reports'})
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="list-container">
              <h2>
                <Award size={20} />
                <span>Top Internship Providers</span>
              </h2>
              <div className="company-list">
                {topInternshipCompanies.map((c, i) => (
                  <div key={i} className="company-item">
                    <div className="company-rank">{i + 1}</div>
                    <div className="company-info">
                      <h3>{c.company}</h3>
                      <div className="company-stats">
                        <div className="count">
                          {c.count} {c.count === 1 ? 'internship' : 'internships'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Statistics;