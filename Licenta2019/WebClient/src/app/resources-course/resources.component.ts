import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../projects/add-project/add-project.service';

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

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
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
      console.log(this.resources);
    })
  }

  onFileChange(event) {
    if (event.target.files) {
      this.textFileButton = event.target.files[0].name;
      this.showUploadButton = true;
      this.file = event.target.files[0];

      if (this.file) {
        this.reader.readAsDataURL(this.file);
      }
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append(this.file.name, this.file);
    this.service.addFile(this.courseId, formData).subscribe((data) => {
      console.log(data);
    })
  }

}
