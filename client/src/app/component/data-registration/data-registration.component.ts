import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ListService } from 'src/app/service/list.service';
import { HotToastService } from '@ngneat/hot-toast';
import { TFormData } from 'src/app/types/types';

@Component({
  selector: 'app-data-registration',
  templateUrl: './data-registration.component.html',
  styleUrls: ['./data-registration.component.scss'],
})
export class DataRegistrationComponent implements OnInit {
  constructor(
    private listService: ListService,
    private location: Location,
    private toastService: HotToastService
  ) {}

  ngOnInit() {}

  backBtnClick() {
    this.location.back();
  }

  onSubmit(data: TFormData): void {
    const body = JSON.stringify(data);
    this.listService.registerData(body).subscribe(
      () => {
        this.toastService.success('データを登録しました');
        this.backBtnClick();
      },
      (err) => {
        this.toastService.error('データ登録失敗!');
      }
    );
  }
}
