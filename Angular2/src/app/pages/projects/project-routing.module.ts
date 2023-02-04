import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectManageComponent } from './manage/manage.component';
import { ProjectViewComponent } from './view/view.component';
import { SummaryComponent } from './summary/summary.component';
import { ProjectUpdateComponent } from './update/update.component';
import { ProjectCreateComponent } from './create/create.component';
import { WizardComponent } from './wizard/wizard.component';


const routes: Routes = [
    { path: 'manage', component: ProjectManageComponent },
    { path: 'view/:id', component: ProjectViewComponent },
    { path: 'summary/:id', component: SummaryComponent },
    { path: 'create', component: ProjectCreateComponent },
    { path: 'update/:id', component: ProjectUpdateComponent },
    { path: 'wizard', component: WizardComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }

