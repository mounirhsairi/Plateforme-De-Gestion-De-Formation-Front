import { Component, OnInit ,Renderer2 } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-programme-formation-conducteur-cms',
  templateUrl: './programme-formation-conducteur-cms.component.html',
  styleUrls: ['./programme-formation-conducteur-cms.component.css']
})

export class ProgrammeFormationConducteurCMSComponent implements OnInit {

  
  candidate = {
    name: '',
    educationLevel: '',
    hireDate: '',
    newAssignmentDate: '',
    function: '',
    assignment: ''
  };

  supervisor = {
    tutor: '',
    trainingPeriodStart: '',
    trainingPeriodEnd: '',
    function: '',
    trainingDays: 20
  };

  trainingItems = [
    {
      date: '…………….',
      horaire: '7h30-16h',
      duree: '1j',
      theme: 'Sécurité',
      programme: [
        'Présentation et définition des lieux de danger.',
        'Présentation de l’organisation générale et du système d’hygiène et de sécurité au travail',
        'Les consignes de sécurité'
      ],
      type: 'T',
      resp: 'Secouriste',
      doc: 'Document Support de formation',
      etat: 'Lieu Centre de formation'
    },
    {
      date: '…………….',
      horaire: '7h30-16h',
      duree: '1j',
      theme: 'Environnement',
      programme: [
        'Aspect et impact environnementaux',
        'Instruction AUW MD0002821',
        'Instruction AUW MD0002819'
      ],
      type: 'T',
      resp: 'Délégué',
      doc: 'Enviro',
      etat: ''
    },
    // Ajoutez plus d'items ici...
  ];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }
  saveAsPDF = () => {
    const data = document.getElementById('content');
    if (data) {
        const originalOverflow = data.style.overflow;
        const originalHeight = data.style.height;
        const originalMaxHeight = data.style.maxHeight;

        data.style.overflow = 'visible';
        data.style.height = 'auto';
        data.style.maxHeight = 'none';

        html2canvas(data).then(canvas => {
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            let heightLeft = imgHeight;
            let position = 0;

            const splitContent = () => {
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
            };

            splitContent();

            pdf.save('program-formation.pdf');

            data.style.overflow = originalOverflow;
            data.style.height = originalHeight;
            data.style.maxHeight = originalMaxHeight;
        });
    }
};
generatePdf() {
  const element = document.getElementById('content');
  const options = {
    margin: [5, 0, 0, 5],
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'pt', format: 'a4' },
    pagebreak: { mode: [ 'css', 'legacy'] } // Prevents cutoff issues
  };

  html2pdf().from(element).set(options).save();
}



}