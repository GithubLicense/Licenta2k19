import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../projects/add-project/add-project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  courseId: string;
  resources: any[];
  downloadRoute: string = "/assets/files/";
  fileNameSplitted: any[];
  textFileButton: string = "Choose a file…";
  showUploadButton: boolean;
  userInformation: any;
  reader: FileReader = new FileReader();
  file: File;
  acceptedExtensions: string[] = ["zip", "bmp", "doc", "jpg", "pdf", "png", "rar"]
  extensions: string[];

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService,
    private toaster: MatSnackBar
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.courseId = this.route.snapshot.params.id;
    this.service.getResources(this.courseId).subscribe((data: any) => {
      this.resources = data;
      this.resources.forEach(element => {
        element.downloadLink = this.downloadRoute + this.courseId + "/" + element.fileName;
        this.fileNameSplitted = element.fileName.split(".");
        element.fileType = this.fileNameSplitted.pop();
      });
    })
  }

  onFileChange(event) {
    if (event.target.files) {
      this.extensions = event.target.files[0].name.split('.');
      if(this.acceptedExtensions.indexOf(this.extensions[this.extensions.length-1]) > -1)
      {
        this.textFileButton = event.target.files[0].name;
        this.showUploadButton = true;
        this.file = event.target.files[0];
  
        if (this.file) {
          this.reader.readAsDataURL(this.file);
        }
      }
      else
      {
        this.textFileButton = "Choose a file…";
        this.showUploadButton = false;
        this.toaster.open("This is not a valid file!", 'Close', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      } 
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append(this.file.name, this.file);
    this.service.addFile(this.courseId, formData).subscribe((data) => {
      this.toaster.open("The resource has been successfully added!", 'Close', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
    })
  }

}
