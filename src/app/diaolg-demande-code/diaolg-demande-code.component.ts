import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-diaolg-demande-code',
  templateUrl: './diaolg-demande-code.component.html',
  styleUrls: ['./diaolg-demande-code.component.css']
})
export class DiaolgDemandeCodeComponent implements OnInit {
  htmlCode: string = ''; // Variable to store HTML code
  renderedHtml: SafeHtml = ''; // Variable to store rendered HTML code

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
  }
  updatePdfTemplate() {
    this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlCode);
    
  }
  getRenderedHtml(): SafeHtml {
    return this.renderedHtml;
  }

  generatePDF() {
    const elementToPrint: any = document.getElementById('pdfTemplate');
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF();
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save('data.pdf');
    });
  }
  
}
