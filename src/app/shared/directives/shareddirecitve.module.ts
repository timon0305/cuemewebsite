import { NgModule } from "@angular/core";
import { ContactNoDirective } from './contactno';
import { OnlyIntegerDirective } from "./onlyinteger";
import { OnlyNumberDirective } from "./onlyNumber";
import { PositiveDecimal } from "./positivedecimal";
import { SafePipe } from "./safepipe";

@NgModule({
    declarations: [
        SafePipe,
        ContactNoDirective,
        OnlyNumberDirective,
        PositiveDecimal
    ],
    exports: [
        SafePipe,
        ContactNoDirective,
        OnlyNumberDirective,
        PositiveDecimal
    ]
})
export class SharedDirectiveModule { }