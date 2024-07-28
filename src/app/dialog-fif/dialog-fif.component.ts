import { Component, Inject, Input, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiF } from '../model/FIF.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiFServiceService } from '../Service/fifservice.service';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import { Assignment } from '../model/Assignment.model';
import { EvaluationServiceService } from '../Service/evaluation-service.service';
import { Evaluation } from '../model/Evaluation.model';

@Component({
  selector: 'app-dialog-fif',
  templateUrl: './dialog-fif.component.html',
  styleUrls: ['./dialog-fif.component.css']
})
export class DialogFIFComponent implements OnInit {
  BesoinPersonnel!:FormGroup;
  programFormation:boolean=false

  add:boolean=false
  candidat = {
    nomPrenom: '...........',
    niveauInstruction: '...........',
    dateEmbauche: '...........',
    dateNouvelleAffectation: '...........',
    fonction: '...........',
    affectation: '...........'
  };
  

  files: FiF[] = [];
  operateur!:Operator
  safePdfUrl: SafeResourceUrl | undefined;
  form!: FormGroup;
  role = localStorage.getItem('Role');
  imageUrl: string = '';
  asignement: Assignment[]=[];
  evaluation: Evaluation[] = [];
  showfile:boolean=true
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { files: FiF[], id: number },
    private sanitizer: DomSanitizer,
    private build:FormBuilder,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private fifService: FiFServiceService,
    private evaluationService :EvaluationServiceService,
    private operatorService:OperateurServiceService,
  ) { }

  ngOnInit(): void {
    //this.getpdfPaths()
    this.getOperateurById()
    this.BesoinPersonnel = this.build.group({
      Code:['']
    });
    if (this.data && this.data.files && this.data.files.length > 0) {
      this.files = this.data.files;
      // Example: Displaying the first PDF file
      this.safePdfUrl = this.getSafeUrl('data:application/pdf;base64,' + this.files[0].data);
    }

    this.form = this.fb.group({
      fichier: ''
    });
  }
  toggleForm() {
    this.showfile = !this.showfile;
    this.programFormation=false
  }
  toggleForm1() {
    this.programFormation = !this.programFormation;
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); // Ensure it starts from page 1
  }

  onFileSelected(event: any) {
    this.ngZone.run(() => {
      const files: FileList = event.target.files;
      if (files && files.length > 0) {
        const file: File = files[0];
        const reader: FileReader = new FileReader();

        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

          this.createFIF(url);

          // Assuming 'fichier' is a form control to hold the file data
          this.form.get('fichier')?.setValue(url);
        };

        reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
      } else {
        console.error('No files selected.');
      }
    });
  }

  createFIF(fileUrl: string) {
    const model = {
      idOperateur: this.data.id,
      data: fileUrl
    };

    this.fifService.createFIF(model).subscribe(
      (res) => {
        console.log("Données soumises avec succès:", res);
        // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
      },
      (error) => {
        console.error("Erreur lors de la soumission des données:", error);
        // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }
  selectedFile: File | null = null;
  progress: number = 0;
  message: string = '';
  onPdfFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fifService.upload(this.selectedFile).subscribe(
        event => {
          if (typeof event === 'object' && event.status === 'progress') {
            this.progress = event.message;
          } else {
            this.message = 'Upload complete';
          }
        },
        err => {
          console.log(err);
          this.message = 'Could not upload the file';
        }
      );
    }
  }

  getOperateurById() {
    this.operatorService.findOperatorById(this.data.id).subscribe((data) => {
      this.operateur = data as Operator;
      // Maintenant que this.operateur est défini, appelez getpdfPaths
      this.getpdfPaths(this.operateur.matriculeOperateur);
    });
  }
  
  CodeFormation(id:any,code:any){
    this.operatorService.updatecodeFormation(id,code).subscribe((res) => {
      console.log("Données mises à jour avec succès:", res);
      alert("Données mises à jour avec succès");

      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
  },
  (error) => {
      console.error("Erreur lors de la mise à jour des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
  }
);
  }
  methodeSuivie(id:any,code:any){
    this.operatorService.updateMethode(id,code).subscribe((res) => {
      console.log("Données mises à jour avec succès:", res);
      alert("Données mises à jour avec succès");

      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
  },
  (error) => {
      console.error("Erreur lors de la mise à jour des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
  }
);
  }
  Document(id:any,code:any){
    this.operatorService.updateDocumentIdentification(id,code).subscribe((res)=> {
      console.log("Données mises à jour avec succès:", res);
      alert("Données mises à jour avec succès");

      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
  },
  (error) => {
      console.error("Erreur lors de la mise à jour des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
  }
);

  }
  updateevaluationRR(idEvaluation:number ,evaluatioRR:string){
    this.evaluationService.updateEvaluationRR(idEvaluation, evaluatioRR).subscribe(
      (res) => {
          console.log("Données mises à jour avec succès:", res);
          alert("Données mises à jour avec succès");

          // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
      },
      (error) => {
          console.error("Erreur lors de la mise à jour des données:", error);
          // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
      }
  );
}

pdfPaths :string[]=[];
getpdfPaths(matricule:any){

  this.fifService.uploadFIF(matricule).subscribe((data)=>{
    this.pdfPaths=data as string[];

  })
}
openPdfInNewTab(pdfPath: string): void {
  window.open(pdfPath, '_blank');
}


}
