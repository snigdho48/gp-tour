import React from 'react';
import { fmtBDT } from '../constants/tripData.js';
import { breakdownBDT } from '../utils/calculations.js';
import TranslatedButton from './TranslatedButton';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';


function TripDownloadOptions({ trip, people }) {
  const breakdown = breakdownBDT(trip);

  const downloadTripImage = () => {
    // Create canvas for image generation
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = 1000;
    canvas.height = 1400;

    // Set background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle pattern background
    ctx.fillStyle = "#f8fafc";
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        ctx.fillRect(i, j, 1, 1);
      }
    }

    // Header with gradient - draw this AFTER the white background
    const headerGradient = ctx.createLinearGradient(0, 0, 0, 250);
    headerGradient.addColorStop(0, "#0f766e");
    headerGradient.addColorStop(1, "#115e59");
    ctx.fillStyle = headerGradient;
    ctx.fillRect(50, 0, canvas.width-100, 220);

    // Add GPStar logo and branding at the top
    // Company name and logo area
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, canvas.width, 40);

    // Load and draw the actual logo image
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous"; // Handle CORS issues
    logoImg.src = logo;
    
    logoImg.onload = () => {
      // Draw logo and text in a row, centered
      const logoSize = 60;
      const textWidth = 200; // Approximate width of "GPStar Tour Planner" text
      const totalWidth = logoSize + 20 + textWidth; // Logo + spacing + text
      const startX = (canvas.width - totalWidth) / 2;

      // Draw logo
      const logoX = startX;
      const logoY = 10;

      // Draw logo with proper positioning
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

      // GPStar text to the right of logo
      ctx.fillStyle = "#3CBEF2";
      ctx.font = "bold 24px TelenorEvolution, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("GPStar Tour Planner", logoX + logoSize + 20, logoY + 45);



      // Continue with the rest of the image generation
      generateRestOfImage();
    };

    logoImg.onerror = () => {
      // Fallback if logo fails to load - just text
      const logoSize = 60;
      const textWidth = 200;
      const totalWidth = logoSize + 20 + textWidth;
      const startX = (canvas.width - totalWidth) / 2;

      // Draw a placeholder circle for logo
      ctx.fillStyle = "#3CBEF2";
      ctx.beginPath();
      ctx.arc(startX + logoSize/2, 20 + logoSize/2, logoSize/2, 0, 2 * Math.PI);
      ctx.fill();

      // GPStar text
      ctx.fillStyle = "#3CBEF2";
      ctx.font = "bold 24px TelenorEvolution, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("GPStar Tour Planner", startX + logoSize + 20, 55);

      // Tagline
      ctx.font = "14px TelenorEvolution, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Your Travel Partner", canvas.width / 2, 80);

      // Continue with the rest of the image generation
      generateRestOfImage();
    };

    // Start loading the logo
    logoImg.src = logo;

    // Function to generate the rest of the image content
    function generateRestOfImage() {
      // Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 36px TelenorEvolution, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(trip.name.toUpperCase(), canvas.width / 2, 120);

      // Subtitle
      ctx.font = "24px TelenorEvolution, sans-serif";
      ctx.fillText(`${trip.type} Trip`, canvas.width / 2, 155);

      // Stay info
      ctx.font = "18px TelenorEvolution, sans-serif";
      ctx.fillText(
        `${trip.nights} ${trip.nights > 1 ? "nights" : "night"} • ${
          trip.stay
        }`,
        canvas.width / 2,
        190
      );

      let yPosition = 250;

      // Budget Summary Section with shadow effect
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;

      ctx.fillStyle = "#1e40af";
      ctx.fillRect(50, yPosition, canvas.width - 100, 120);

      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Section title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("BUDGET SUMMARY", canvas.width / 2, yPosition + 35);

      // Budget amounts
      ctx.font = "bold 32px Arial, sans-serif";
      ctx.fillText(fmtBDT(Math.round(breakdown.total)), canvas.width / 2, yPosition + 70);

      ctx.font = "20px Arial, sans-serif";
      ctx.fillText(
        `Per Person: ${fmtBDT(Math.round(breakdown.total / people))}`,
        canvas.width / 2,
        yPosition + 100
      );

      yPosition += 150;

      // Budget Breakdown Section
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(50, yPosition, canvas.width - 100, 280);

      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Section title
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 24px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("BUDGET BREAKDOWN", canvas.width / 2, yPosition + 30);

      const breakdownItems = [
        { label: "Flight", amount: breakdown.flight, color: "#3b82f6", percentage: Math.round((breakdown.flight / breakdown.total) * 100) },
        { label: "Hotel", amount: breakdown.hotel, color: "#10b981", percentage: Math.round((breakdown.hotel / breakdown.total) * 100) },
        { label: "Activities", amount: breakdown.activities, color: "#8b5cf6", percentage: Math.round((breakdown.activities / breakdown.total) * 100) },
        { label: "Local Transport", amount: breakdown.transport, color: "#f59e0b", percentage: Math.round((breakdown.transport / breakdown.total) * 100) },
        { label: "Contingency (5%)", amount: breakdown.contingency, color: "#ef4444", percentage: Math.round((breakdown.contingency / breakdown.total) * 100) }
      ];
      
      breakdownItems.forEach((item, index) => {
        const y = yPosition + 60 + (index * 45);
        
        // Progress bar background
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(80, y + 5, 400, 20);
        
        // Progress bar fill
        ctx.fillStyle = item.color;
        ctx.fillRect(80, y + 5, (400 * item.percentage) / 100, 20);
        
        // Color indicator
        ctx.fillStyle = item.color;
        ctx.fillRect(80, y + 5, 5, 20);
        
        // Label
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.label, 500, y + 20);
        
        // Amount
        ctx.textAlign = 'right';
        ctx.fillText(fmtBDT(item.amount), canvas.width - 80, y + 20);
        
        // Percentage
        ctx.fillStyle = '#64748b';
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText(`${item.percentage}%`, 500, y + 40);
      });
      
      yPosition += 310;
      
      // Highlights Section
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(50, yPosition, canvas.width - 100, 140);
      
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Section title
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('HIGHLIGHTS', canvas.width / 2, yPosition + 30);
      
      ctx.font = '18px Arial, sans-serif';
      ctx.textAlign = 'left';
      
      trip.highlights.forEach((highlight, index) => {
        if (index < 4) {
          const y = yPosition + 60 + (index * 25);
          ctx.fillStyle = '#3b82f6';
          ctx.fillText('•', 80, y);
          ctx.fillStyle = '#1e293b';
          ctx.fillText(highlight, 100, y);
        }
      });
      
      yPosition += 170;
      
      // GPStar Perks Section (if available)
      if (trip.gpstarOffers?.extras) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        
        ctx.fillStyle = '#ecfdf5';
        ctx.fillRect(50, yPosition, canvas.width - 100, 120);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Section title
        ctx.fillStyle = '#059669';
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GPSTAR PERKS', canvas.width / 2, yPosition + 30);
        
        ctx.font = '18px Arial, sans-serif';
        ctx.textAlign = 'left';
        
        trip.gpstarOffers.extras.forEach((perk, index) => {
          if (index < 3) {
            const y = yPosition + 60 + (index * 25);
            ctx.fillStyle = '#10b981';
            ctx.fillText('★', 80, y);
            ctx.fillStyle = '#065f46';
            ctx.fillText(perk, 100, y);
          }
        });
        
        yPosition += 140;
      }
      
      // Itinerary Section
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      
      ctx.fillStyle = '#faf5ff';
      ctx.fillRect(50, yPosition, canvas.width - 100, 180);
      
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Section title
      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SAMPLE ITINERARY', canvas.width / 2, yPosition + 30);
      
      ctx.font = '18px Arial, sans-serif';
      ctx.textAlign = 'left';
      
      trip.itinerary.forEach((day, index) => {
        if (index < 6) {
          const y = yPosition + 60 + (index * 25);
          ctx.fillStyle = '#8b5cf6';
          ctx.fillText(`${index + 1}.`, 80, y);
          ctx.fillStyle = '#581c87';
          ctx.fillText(day, 110, y);
        }
      });
      
      yPosition += 200;
      
      // Roaming Suggestion (for international trips)
      if (trip.type === "International") {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        
        ctx.fillStyle = '#eff6ff';
        ctx.fillRect(50, yPosition, canvas.width - 100, 100);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Section title
        ctx.fillStyle = '#1e40af';
        ctx.font = 'bold 22px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ROAMING SUGGESTION', canvas.width / 2, yPosition + 30);
        
        ctx.font = '18px Arial, sans-serif';
        ctx.fillText('Get GPStar roaming packages for your trip to stay', canvas.width / 2, yPosition + 60);
        ctx.fillText('connected with family and share your travel moments!', canvas.width / 2, yPosition + 85);
        
        yPosition += 120;
      }
      
      // Footer with gradient
      const footerGradient = ctx.createLinearGradient(0, yPosition, 0, yPosition + 80);
      footerGradient.addColorStop(0, '#475569');
      footerGradient.addColorStop(1, '#334155');
      ctx.fillStyle = footerGradient;
      ctx.fillRect(0, yPosition, canvas.width, 80);
      
      // Footer content
      ctx.fillStyle = '#ffffff';
      ctx.font = "18px TelenorEvolution, sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(`Generated on: ${new Date().toLocaleDateString()}`, canvas.width / 2, yPosition + 30);
      ctx.fillText(`Number of People: ${people}`, canvas.width / 2, yPosition + 55);
      
      // Convert canvas to image and download
      canvas.toBlob((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${trip.name.replace(/\s+/g, "_")}_Trip_Details.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, "image/png");
    }
  };

  const downloadTripPDF = () => {
    try {
      // First generate the image (same as downloadTripImage function)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 1000;
      canvas.height = 1400;
      
      // Set background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle pattern background
      ctx.fillStyle = '#f8fafc';
      for (let i = 0; i < canvas.width; i += 40) {
        for (let j = 0; j < canvas.height; j += 40) {
          ctx.fillRect(i, j, 1, 1);
        }
      }
      
      // Header with gradient
      const headerGradient = ctx.createLinearGradient(0, 0, 0, 250);
      headerGradient.addColorStop(0, '#0f766e');
      headerGradient.addColorStop(1, '#115e59');
      ctx.fillStyle = headerGradient;
      ctx.fillRect(50, 0, canvas.width -100, 220);
      
      // Add GPStar logo and branding at the top
      // Company name and logo area
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, 40);
      
      // Load and draw the actual logo image
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      
      logoImg.onload = () => {
        // Draw logo and text in a row, centered
        const logoSize = 60;
        const textWidth = 200; // Approximate width of "GPStar Tour Planner" text
        const totalWidth = logoSize + 20 + textWidth; // Logo + spacing + text
        const startX = (canvas.width - totalWidth) / 2;
        
        // Draw logo
        const logoX = startX;
        const logoY = 10;
        
        // Draw logo with proper positioning
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        
        // GPStar text to the right of logo
        ctx.fillStyle = "#3CBEF2";
        ctx.font = "bold 24px TelenorEvolution, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("GPStar Tour Planner", logoX + logoSize + 20, logoY + 45);

        // Continue with the rest of the image generation
        generateRestOfImageForPDF();
      };

      logoImg.onerror = () => {
        // Fallback if logo fails to load - just text
        const logoSize = 60;
        const textWidth = 200;
        const totalWidth = logoSize + 20 + textWidth;
        const startX = (canvas.width - totalWidth) / 2;

        // Draw a placeholder circle for logo
        ctx.fillStyle = "#3CBEF2";
        ctx.beginPath();
        ctx.arc(startX + logoSize/2, 10 + logoSize/2, logoSize/2, 0, 2 * Math.PI);
        ctx.fill();

        // GPStar text
        ctx.fillStyle = "#3CBEF2";
        ctx.font = "bold 24px TelenorEvolution, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("GPStar Tour Planner", startX + logoSize + 20, 45);

        // Continue with the rest of the image generation
        generateRestOfImageForPDF();
      };

      // Start loading the logo
      logoImg.src = logo;

      // Function to generate the rest of the image content for PDF
      function generateRestOfImageForPDF() {
        // Title
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 36px TelenorEvolution, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(trip.name.toUpperCase(), canvas.width / 2, 120);

        // Subtitle
        ctx.font = "24px TelenorEvolution, sans-serif";
        ctx.fillText(`${trip.type} Trip`, canvas.width / 2, 155);

        // Stay info
        ctx.font = "18px TelenorEvolution, sans-serif";
        ctx.fillText(
          `${trip.nights} ${trip.nights > 1 ? "nights" : "night"} • ${
            trip.stay
          }`,
          canvas.width / 2,
          190
        );

        let yPosition = 250;
        
        // Budget Summary Section with shadow effect
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        
        ctx.fillStyle = '#1e40af';
        ctx.fillRect(50, yPosition, canvas.width - 100, 120);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Section title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('BUDGET SUMMARY', canvas.width / 2, yPosition + 35);
        
        // Budget amounts
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.fillText(fmtBDT(breakdown.total), canvas.width / 2, yPosition + 70);
        
        ctx.font = '20px Arial, sans-serif';
        ctx.fillText(`Per Person: ${fmtBDT(Math.round(breakdown.total / people))}`, canvas.width / 2, yPosition + 100);
        
        yPosition += 150;
        
        // Budget Breakdown Section
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(50, yPosition, canvas.width - 100, 280);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Section title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('BUDGET BREAKDOWN', canvas.width / 2, yPosition + 30);
        
        const breakdownItems = [
          { label: 'Flight', amount: breakdown.flight, color: '#3b82f6', percentage: Math.round((breakdown.flight / breakdown.total) * 100) },
          { label: 'Hotel', amount: breakdown.hotel, color: '#10b981', percentage: Math.round((breakdown.hotel / breakdown.total) * 100) },
          { label: 'Activities', amount: breakdown.activities, color: '#8b5cf6', percentage: Math.round((breakdown.activities / breakdown.total) * 100) },
          { label: 'Local Transport', amount: breakdown.transport, color: '#f59e0b', percentage: Math.round((breakdown.transport / breakdown.total) * 100) },
          { label: 'Contingency (5%)', amount: breakdown.contingency, color: '#ef4444', percentage: Math.round((breakdown.contingency / breakdown.total) * 100) }
        ];
        
        breakdownItems.forEach((item, index) => {
          const y = yPosition + 60 + (index * 45);
          
          // Progress bar background
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(80, y + 5, 400, 20);
          
          // Progress bar fill
          ctx.fillStyle = item.color;
          ctx.fillRect(80, y + 5, (400 * item.percentage) / 100, 20);
          
          // Color indicator
          ctx.fillStyle = item.color;
          ctx.fillRect(80, y + 5, 5, 20);
          
          // Label
          ctx.fillStyle = '#1e293b';
          ctx.font = 'bold 18px Arial, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(item.label, 500, y + 20);
          
          // Amount
          ctx.textAlign = 'right';
          ctx.fillText(fmtBDT(item.amount), canvas.width - 80, y + 20);
          
          // Percentage
          ctx.fillStyle = '#64748b';
          ctx.font = '16px Arial, sans-serif';
          ctx.fillText(`${item.percentage}%`, 500, y + 40);
        });
        
        yPosition += 310;
        
        // Highlights Section
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(50, yPosition, canvas.width - 100, 140);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Section title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('HIGHLIGHTS', canvas.width / 2, yPosition + 30);
        
        ctx.font = '18px Arial, sans-serif';
        ctx.textAlign = 'left';
        
        trip.highlights.forEach((highlight, index) => {
          if (index < 4) {
            const y = yPosition + 60 + (index * 25);
            ctx.fillStyle = '#3b82f6';
            ctx.fillText('•', 80, y);
            ctx.fillStyle = '#1e293b';
            ctx.fillText(highlight, 100, y);
          }
        });
        
        yPosition += 170;
        
        // GPStar Perks Section (if available)
        if (trip.gpstarOffers?.extras) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 5;
          
          ctx.fillStyle = '#ecfdf5';
          ctx.fillRect(50, yPosition, canvas.width - 100, 120);
          
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Section title
          ctx.fillStyle = '#059669';
          ctx.font = 'bold 24px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('GPSTAR PERKS', canvas.width / 2, yPosition + 30);
          
          ctx.font = '18px Arial, sans-serif';
          ctx.textAlign = 'left';
          
          trip.gpstarOffers.extras.forEach((perk, index) => {
            if (index < 3) {
              const y = yPosition + 60 + (index * 25);
              ctx.fillStyle = '#10b981';
              ctx.fillText('★', 80, y);
              ctx.fillStyle = '#065f46';
              ctx.fillText(perk, 100, y);
            }
          });
          
          yPosition += 140;
        }
        
        // Itinerary Section
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        
        ctx.fillStyle = '#faf5ff';
        ctx.fillRect(50, yPosition, canvas.width - 100, 180);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Section title
        ctx.fillStyle = '#7c3aed';
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SAMPLE ITINERARY', canvas.width / 2, yPosition + 30);
        
        ctx.font = '18px Arial, sans-serif';
        ctx.textAlign = 'left';
        
        trip.itinerary.forEach((day, index) => {
          if (index < 6) {
            const y = yPosition + 60 + (index * 25);
            ctx.fillStyle = '#8b5cf6';
            ctx.fillText(`${index + 1}.`, 80, y);
            ctx.fillStyle = '#581c87';
            ctx.fillText(day, 110, y);
          }
        });
        
        yPosition += 200;
        
        // Roaming Suggestion (for international trips)
        if (trip.type === "International") {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 5;
          
          ctx.fillStyle = '#eff6ff';
          ctx.fillRect(50, yPosition, canvas.width - 100, 100);
          
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Section title
          ctx.fillStyle = '#1e40af';
          ctx.font = 'bold 22px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('ROAMING SUGGESTION', canvas.width / 2, yPosition + 30);
          
          ctx.font = '18px Arial, sans-serif';
          ctx.fillText('Get GPStar roaming packages for your trip to stay', canvas.width / 2, yPosition + 60);
          ctx.fillText('connected with family and share your travel moments!', canvas.width / 2, yPosition + 85);
          
          yPosition += 120;
        }
        
        // Footer with gradient
        const footerGradient = ctx.createLinearGradient(0, yPosition, 0, yPosition + 80);
        footerGradient.addColorStop(0, '#475569');
        footerGradient.addColorStop(1, '#334155');
        ctx.fillStyle = footerGradient;
        ctx.fillRect(0, yPosition, canvas.width, 80);
        
        // Footer content
        ctx.fillStyle = '#ffffff';
        ctx.font = "18px TelenorEvolution, sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(`Generated on: ${new Date().toLocaleDateString()}`, canvas.width / 2, yPosition + 30);
        ctx.fillText(`Number of People: ${people}`, canvas.width / 2, yPosition + 55);
        
        // Convert canvas to image and then to PDF
        canvas.toBlob((blob) => {
          // Create a new PDF document
          const pdf = new jsPDF('p', 'mm', 'a4');
          
          // Get the image data as base64
          const reader = new FileReader();
          reader.onload = function() {
            const imgData = reader.result;
            
            // Calculate dimensions to fit the image properly on the PDF page
            const imgWidth = 190; // mm, leaving some margin
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            
            // Save the PDF
            const filename = `${trip.name.replace(/\s+/g, '_')}_Trip_Details.pdf`;
            pdf.save(filename);
          };
          
          reader.readAsDataURL(blob);
        }, 'image/png');
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Download Trip Details
      </h3>
      
      <div className="space-y-3">
        <TranslatedButton
          onClick={downloadTripImage}
          normalText='Download as Image'
          isLoading={false}
          className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer'
        />
        
        <TranslatedButton
          onClick={downloadTripPDF}
          normalText='Download as PDF'
          isLoading={false}
          className='w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-600 dark:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer'
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>Image: High-quality PNG for sharing</p>
        <p>PDF: Professional document format</p>
      </div>
    </div>
  );
}

export default TripDownloadOptions;
