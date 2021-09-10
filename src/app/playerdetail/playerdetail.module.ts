import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlayerdetailComponent } from './playerdetail.component';
import { PlayerDetailRoutingModule } from './playerdetail-routing.module';
//import { RoleService } from '../../../service/admisistrator/role.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherIconsModule } from './../shared/component/feather-icons/feather-icons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayerService } from '../shared/services/player.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PlayerDetailRoutingModule,
        NgxDatatableModule,
        NgbModule,
        FeatherIconsModule
    ],
    providers: [PlayerService],
    declarations: [PlayerdetailComponent]
})
export class PlayerdetailModule { }
