import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

import Swal from 'sweetalert2';

import { NgxSpinnerService } from 'ngx-spinner';
import { LabService } from '../../../core/services/lab.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class LabViewComponent implements OnInit
{

  // bread crumb items
  breadCrumbItems: Array<{}>;

  public labData: any = [];
  public queryString;
  public queryLabel;
  public deployments;
  public labLists: string[];
  public lab: any = [];
  public status: any = [];
  public kubernetes_enabled = environment.KUBERNETES_ENABLED;

  // tslint:disable-next-line: variable-name
  constructor(
    private _labService: LabService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void
  {
    this.showStatus();
    this.breadCrumbItems = [{ label: 'Labs' }, { label: 'View', active: true }];
    this._fetchData();
    this.labLists = ['SKF-Labs', 'Juice-Shop', 'Other Labs'];
  }

  /**
   * Labs data fetches
   */
  private _fetchData()
  {
    this.spinner.show();
    this._labService
      .getLabs()
      .subscribe(lab =>
      {
        this.labData = lab;
        this.spinner.hide();
      });
  }

  showStatus()
  {
    this.status = JSON.parse(localStorage.getItem("labs-deployed"));
  }

  // Get Lab Address
  // tslint:disable-next-line: variable-name
  getLabAddress(image_tag)
  {
    this.spinner.show()
    this._labService.deployLab(image_tag).subscribe(requestData =>
    {
      this.spinner.hide();
      this.lab = requestData;
      var lab_split = this.lab.split("\\");
      this.lab = lab_split[3].substring(1);
      Swal.queue([
        {
          title: 'Lab deployment URL',
          text: this.lab,
          confirmButtonText: 'Close',
          confirmButtonColor: '#8184B2',
          showLoaderOnConfirm: true,
          onClose: () =>
          {
            this.status.push(image_tag)
            localStorage.setItem("labs-deployed", JSON.stringify(this.status));
          },
          preConfirm: () =>
          {
          }
        }
      ]);
    });
  }

  viewLabs()
  {
    this.router.navigate(['/labs/view'])
  }

  stopLabFromRunning(image_tag)
  {
    this.spinner.show()
    this._labService.deleteLab(image_tag).subscribe(requestData =>
    {
      this.deployments = requestData
      this.spinner.hide();
      Swal.queue([
        {
          title: 'Lab deployment Stopped',
          text: "The running lab has been stopped.",
          confirmButtonText: 'Close',
          confirmButtonColor: '#8184B2',
          showLoaderOnConfirm: true,
          onClose: () =>
          {
            this.status.splice(this.status.indexOf(image_tag), 1);
            localStorage.setItem("labs-deployed", JSON.stringify(this.status));
          },
          preConfirm: () =>
          {
          }
        }
      ]);
    })
  }
}
